import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

function normalizePathname(pathname: string) {
  const compact = pathname.replace(/\/{2,}/g, "/");
  const trimmed = compact.length > 1 ? compact.replace(/\/+$/, "") : compact;
  return trimmed.toLowerCase();
}

app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    next();
    return;
  }

  const normalizedPath = normalizePathname(req.path);
  const query = req.originalUrl.includes("?") ? req.originalUrl.slice(req.originalUrl.indexOf("?")) : "";
  const forwardedHost = req.headers["x-forwarded-host"];
  const hostHeader = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost || req.headers.host || "")
    .toString()
    .split(",")[0]
    .trim();
  const forwardedProto = req.headers["x-forwarded-proto"];
  const protocol = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto || req.protocol || "http")
    .toString()
    .split(",")[0]
    .trim()
    .toLowerCase();

  const isEefHost = /(^|\.)eef\.rs$/i.test(hostHeader);
  const enforceSiteCanonical = process.env.NODE_ENV === "production" && isEefHost;
  const targetHost = enforceSiteCanonical ? "eef.rs" : hostHeader;
  const needsHostRedirect = enforceSiteCanonical && hostHeader.toLowerCase() !== targetHost;
  const needsProtocolRedirect = enforceSiteCanonical && protocol === "http";
  const needsPathRedirect = normalizedPath !== req.path;

  if (!needsHostRedirect && !needsProtocolRedirect && !needsPathRedirect) {
    next();
    return;
  }

  const targetPath = `${normalizedPath}${query}`;
  if (targetHost) {
    const targetProtocol = enforceSiteCanonical ? "https" : protocol === "https" ? "https" : "http";
    res.redirect(301, `${targetProtocol}://${targetHost}${targetPath}`);
    return;
  }

  res.redirect(301, targetPath);
});

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    await registerRoutes(httpServer, app);

    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      console.error("Internal Server Error:", err);

      if (res.headersSent) {
        return next(err);
      }

      return res.status(status).json({ message });
    });

    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(
      {
        port,
        host: "0.0.0.0",
      },
      () => {
        log(`serving on port ${port}`);
      },
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
