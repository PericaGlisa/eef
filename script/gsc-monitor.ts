import { createSign } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { getGscMonitorConfig } from "./gsc-config";

type ServiceAccountKey = {
  client_email: string;
  private_key: string;
};

type UrlInspectionSummary = {
  url: string;
  verdict: string;
  coverageState: string;
  indexingState: string;
  lastCrawlTime: string;
  richResultTypes: string[];
};

type AlertState = {
  checkedAt: string;
  indexedCount: number;
  soft404Count: number;
  hard404Count: number;
};

const WEBMASTERS_SCOPE = "https://www.googleapis.com/auth/webmasters";

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function getServiceAccountKey(): ServiceAccountKey {
  const rawJson = process.env.GSC_SERVICE_ACCOUNT_KEY;
  const rawBase64 = process.env.GSC_SERVICE_ACCOUNT_KEY_B64;
  const email = process.env.GSC_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GSC_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (rawJson) {
    return JSON.parse(rawJson) as ServiceAccountKey;
  }

  if (rawBase64) {
    const parsed = Buffer.from(rawBase64, "base64").toString("utf8");
    return JSON.parse(parsed) as ServiceAccountKey;
  }

  if (email && privateKey) {
    return {
      client_email: email,
      private_key: privateKey.replace(/\\n/g, "\n"),
    };
  }

  throw new Error("Nedostaju GSC service account kredencijali u okruženju.");
}

async function getAccessToken() {
  const key = getServiceAccountKey();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: key.client_email,
    scope: WEBMASTERS_SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  const signature = signer.sign(key.private_key);
  const assertion = `${unsignedToken}.${base64UrlEncode(signature)}`;

  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Neuspešno preuzimanje OAuth tokena: ${message}`);
  }
  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

async function gscRequest<T>(accessToken: string, url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GSC API greška (${response.status}): ${message}`);
  }
  return (await response.json()) as T;
}

function toPropertyUrlEncoded(propertyUrl: string) {
  return encodeURIComponent(propertyUrl);
}

function toDateString(value: Date) {
  return value.toISOString().slice(0, 10);
}

function getPreviousMonthRange() {
  const now = new Date();
  const firstDayCurrentMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const end = new Date(firstDayCurrentMonth.getTime() - 24 * 3600 * 1000);
  const start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1));
  return {
    startDate: toDateString(start),
    endDate: toDateString(end),
    label: `${start.getUTCFullYear()}-${String(start.getUTCMonth() + 1).padStart(2, "0")}`,
  };
}

function hasRichResults(item: UrlInspectionSummary) {
  return item.richResultTypes.length > 0;
}

function isSoft404(item: UrlInspectionSummary) {
  return /soft\s*404/i.test(item.coverageState);
}

function isHard404(item: UrlInspectionSummary) {
  return /(not found|404)/i.test(item.coverageState) && !isSoft404(item);
}

function isIndexed(item: UrlInspectionSummary) {
  if (item.verdict.toUpperCase() === "PASS") return true;
  if (/indexed/i.test(item.coverageState) && !/(not indexed|not found|soft 404)/i.test(item.coverageState)) return true;
  return false;
}

async function inspectUrl(accessToken: string, propertyUrl: string, inspectionUrl: string): Promise<UrlInspectionSummary> {
  const data = await gscRequest<{
    inspectionResult?: {
      indexStatusResult?: {
        verdict?: string;
        coverageState?: string;
        indexingState?: string;
        lastCrawlTime?: string;
      };
      richResultsResult?: {
        detectedItems?: Array<{ richResultType?: string }>;
      };
    };
  }>(accessToken, "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    body: JSON.stringify({
      inspectionUrl,
      siteUrl: propertyUrl,
      languageCode: "sr-Latn",
    }),
  });

  const indexStatus = data.inspectionResult?.indexStatusResult;
  const richItems = data.inspectionResult?.richResultsResult?.detectedItems ?? [];
  return {
    url: inspectionUrl,
    verdict: indexStatus?.verdict ?? "UNKNOWN",
    coverageState: indexStatus?.coverageState ?? "UNKNOWN",
    indexingState: indexStatus?.indexingState ?? "UNKNOWN",
    lastCrawlTime: indexStatus?.lastCrawlTime ?? "",
    richResultTypes: richItems.map((item) => item.richResultType).filter((item): item is string => Boolean(item)),
  };
}

async function listSitemaps(accessToken: string, propertyUrl: string) {
  const property = toPropertyUrlEncoded(propertyUrl);
  return gscRequest<{ sitemap?: Array<{ path?: string; warnings?: string; errors?: string; isPending?: boolean; lastSubmitted?: string }> }>(
    accessToken,
    `https://www.googleapis.com/webmasters/v3/sites/${property}/sitemaps`,
  );
}

async function submitSitemap(accessToken: string, propertyUrl: string, sitemapUrl: string) {
  const property = toPropertyUrlEncoded(propertyUrl);
  const feedPath = encodeURIComponent(sitemapUrl);
  await gscRequest(accessToken, `https://www.googleapis.com/webmasters/v3/sites/${property}/sitemaps/${feedPath}`, {
    method: "PUT",
    body: JSON.stringify({}),
  });
}

async function queryTopQueries(accessToken: string, propertyUrl: string, startDate: string, endDate: string) {
  const property = toPropertyUrlEncoded(propertyUrl);
  const data = await gscRequest<{ rows?: Array<{ keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number }> }>(
    accessToken,
    `https://www.googleapis.com/webmasters/v3/sites/${property}/searchAnalytics/query`,
    {
      method: "POST",
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 25,
        dataState: "final",
      }),
    },
  );
  return data.rows ?? [];
}

async function queryKeywordPosition(accessToken: string, propertyUrl: string, keyword: string, startDate: string, endDate: string) {
  const property = toPropertyUrlEncoded(propertyUrl);
  const data = await gscRequest<{ rows?: Array<{ keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number }> }>(
    accessToken,
    `https://www.googleapis.com/webmasters/v3/sites/${property}/searchAnalytics/query`,
    {
      method: "POST",
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 1,
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: "query",
                operator: "contains",
                expression: keyword,
              },
            ],
          },
        ],
        dataState: "final",
      }),
    },
  );
  const row = data.rows?.[0];
  return {
    keyword,
    clicks: row?.clicks ?? 0,
    impressions: row?.impressions ?? 0,
    ctr: row?.ctr ?? 0,
    position: row?.position ?? 0,
    matchedQuery: row?.keys?.[0] ?? "",
  };
}

function toMonthlyMarkdown(params: {
  reportLabel: string;
  generatedAt: string;
  indexedCount: number;
  inspectedCount: number;
  soft404Count: number;
  hard404Count: number;
  richUrlsCount: number;
  topQueries: Array<{ query: string; clicks: number; impressions: number; ctr: number; position: number }>;
  keywordPositions: Array<{ keyword: string; matchedQuery: string; clicks: number; impressions: number; ctr: number; position: number }>;
  sitemaps: Array<{ path: string; warnings: string; errors: string; isPending: boolean; lastSubmitted: string }>;
}) {
  const queryRows = params.topQueries
    .map(
      (row) =>
        `| ${row.query} | ${row.clicks.toFixed(0)} | ${row.impressions.toFixed(0)} | ${(row.ctr * 100).toFixed(2)}% | ${row.position.toFixed(2)} |`,
    )
    .join("\n");

  const keywordRows = params.keywordPositions
    .map(
      (row) =>
        `| ${row.keyword} | ${row.matchedQuery || "-"} | ${row.clicks.toFixed(0)} | ${row.impressions.toFixed(0)} | ${(row.ctr * 100).toFixed(2)}% | ${row.position.toFixed(2)} |`,
    )
    .join("\n");

  const sitemapRows = params.sitemaps
    .map((row) => `| ${row.path} | ${row.lastSubmitted || "-"} | ${row.warnings || "0"} | ${row.errors || "0"} | ${row.isPending ? "yes" : "no"} |`)
    .join("\n");

  return `# SEO mesečni izveštaj (${params.reportLabel})

Generisano: ${params.generatedAt}

## Indexing i coverage

- Inspektovane URL adrese: ${params.inspectedCount}
- Indeksirane URL adrese: ${params.indexedCount}
- Soft 404: ${params.soft404Count}
- Hard 404: ${params.hard404Count}
- URL sa rich results signalom: ${params.richUrlsCount}

## Sitemaps status

| Sitemap | Last submitted | Warnings | Errors | Pending |
| --- | --- | --- | --- | --- |
${sitemapRows || "| - | - | - | - | - |"}

## CTR po upitima

| Query | Clicks | Impressions | CTR | Avg position |
| --- | --- | --- | --- | --- |
${queryRows || "| - | - | - | - | - |"}

## Pozicije za primarne keyword-e

| Keyword | Matched query | Clicks | Impressions | CTR | Avg position |
| --- | --- | --- | --- | --- | --- |
${keywordRows || "| - | - | - | - | - | - |"}
`;
}

async function ensureDir(filePath: string) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function maybeSendWebhook(message: string) {
  const webhook = process.env.SEO_ALERT_WEBHOOK_URL;
  if (!webhook) return;
  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  });
}

async function runMonthly() {
  const config = getGscMonitorConfig();
  const accessToken = await getAccessToken();
  const range = getPreviousMonthRange();

  for (const sitemapUrl of config.sitemaps) {
    await submitSitemap(accessToken, config.propertyUrl, sitemapUrl);
  }

  const inspected = await Promise.all(config.keyUrls.map((url) => inspectUrl(accessToken, config.propertyUrl, url)));
  const indexedCount = inspected.filter(isIndexed).length;
  const soft404Count = inspected.filter(isSoft404).length;
  const hard404Count = inspected.filter(isHard404).length;
  const richUrlsCount = inspected.filter(hasRichResults).length;

  const topQueryRows = await queryTopQueries(accessToken, config.propertyUrl, range.startDate, range.endDate);
  const topQueries = topQueryRows.map((row) => ({
    query: row.keys?.[0] ?? "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));

  const keywordPositions = [];
  for (const keyword of config.primaryKeywords) {
    keywordPositions.push(await queryKeywordPosition(accessToken, config.propertyUrl, keyword, range.startDate, range.endDate));
  }

  const sitemapListing = await listSitemaps(accessToken, config.propertyUrl);
  const sitemaps = (sitemapListing.sitemap ?? []).map((item) => ({
    path: item.path ?? "",
    warnings: item.warnings ?? "0",
    errors: item.errors ?? "0",
    isPending: Boolean(item.isPending),
    lastSubmitted: item.lastSubmitted ?? "",
  }));

  const report = {
    generatedAt: new Date().toISOString(),
    range,
    inspection: inspected,
    metrics: {
      inspectedCount: inspected.length,
      indexedCount,
      soft404Count,
      hard404Count,
      richUrlsCount,
    },
    topQueries,
    keywordPositions,
    sitemaps,
  };

  const reportDir = path.resolve(process.cwd(), "reports/seo");
  const jsonPath = path.resolve(reportDir, `monthly-${range.label}.json`);
  const markdownPath = path.resolve(reportDir, `monthly-${range.label}.md`);
  const latestPath = path.resolve(reportDir, "latest-monthly.json");

  await ensureDir(jsonPath);
  await writeFile(jsonPath, JSON.stringify(report, null, 2), "utf8");
  await writeFile(latestPath, JSON.stringify(report, null, 2), "utf8");
  await writeFile(
    markdownPath,
    toMonthlyMarkdown({
      reportLabel: range.label,
      generatedAt: report.generatedAt,
      indexedCount,
      inspectedCount: inspected.length,
      soft404Count,
      hard404Count,
      richUrlsCount,
      topQueries,
      keywordPositions,
      sitemaps,
    }),
    "utf8",
  );

  console.log(`Mesečni SEO izveštaj je kreiran: ${markdownPath}`);
}

async function runAlert() {
  const config = getGscMonitorConfig();
  const accessToken = await getAccessToken();
  const inspected = await Promise.all(config.keyUrls.map((url) => inspectUrl(accessToken, config.propertyUrl, url)));

  const indexedCount = inspected.filter(isIndexed).length;
  const soft404Count = inspected.filter(isSoft404).length;
  const hard404Count = inspected.filter(isHard404).length;
  const indexedRatio = inspected.length > 0 ? indexedCount / inspected.length : 0;

  const alerts: string[] = [];

  if (indexedRatio < config.alertThresholds.minIndexedRatio) {
    alerts.push(
      `Indexed ratio je ispod praga: ${(indexedRatio * 100).toFixed(2)}% < ${(config.alertThresholds.minIndexedRatio * 100).toFixed(2)}%`,
    );
  }

  if (soft404Count > config.alertThresholds.maxSoft404) {
    alerts.push(`Soft 404 je iznad praga: ${soft404Count} > ${config.alertThresholds.maxSoft404}`);
  }

  if (hard404Count > config.alertThresholds.maxHard404) {
    alerts.push(`Hard 404 je iznad praga: ${hard404Count} > ${config.alertThresholds.maxHard404}`);
  }

  const stateFilePath = path.resolve(process.cwd(), config.alertStatePath);
  let previousState: AlertState | null = null;
  try {
    const raw = await readFile(stateFilePath, "utf8");
    previousState = JSON.parse(raw) as AlertState;
  } catch {
    previousState = null;
  }

  if (previousState) {
    const indexedDropPct =
      previousState.indexedCount > 0 ? (previousState.indexedCount - indexedCount) / previousState.indexedCount : 0;
    if (indexedDropPct > config.alertThresholds.maxIndexedDropPct) {
      alerts.push(
        `Pad indeksacije je iznad praga: ${(indexedDropPct * 100).toFixed(2)}% > ${(config.alertThresholds.maxIndexedDropPct * 100).toFixed(2)}%`,
      );
    }
    if (soft404Count - previousState.soft404Count > config.alertThresholds.maxSoft404Increase) {
      alerts.push(
        `Soft 404 rast je iznad praga: +${soft404Count - previousState.soft404Count} > +${config.alertThresholds.maxSoft404Increase}`,
      );
    }
    if (hard404Count - previousState.hard404Count > config.alertThresholds.maxHard404Increase) {
      alerts.push(
        `Hard 404 rast je iznad praga: +${hard404Count - previousState.hard404Count} > +${config.alertThresholds.maxHard404Increase}`,
      );
    }
  }

  const state: AlertState = {
    checkedAt: new Date().toISOString(),
    indexedCount,
    soft404Count,
    hard404Count,
  };
  await ensureDir(stateFilePath);
  await writeFile(stateFilePath, JSON.stringify(state, null, 2), "utf8");

  const summary = `SEO alert check: indexed=${indexedCount}/${inspected.length}, soft404=${soft404Count}, hard404=${hard404Count}`;
  console.log(summary);

  if (alerts.length > 0) {
    const message = `SEO Alert\n${alerts.map((item) => `- ${item}`).join("\n")}`;
    await maybeSendWebhook(message);
    console.error(message);
    process.exit(1);
  }
}

async function main() {
  const mode = process.argv[2] || "monthly";
  if (mode === "monthly") {
    await runMonthly();
    return;
  }
  if (mode === "alert") {
    await runAlert();
    return;
  }
  throw new Error('Nepodržan režim. Koristite "monthly" ili "alert".');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
