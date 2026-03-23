# Search Console monitoring

## Potrebni secrets u GitHub

- `GSC_SITE_URL` primer: `https://eef.rs`
- `GSC_PROPERTY_URL` primer: `sc-domain:eef.rs` ili `https://eef.rs/`
- `GSC_SERVICE_ACCOUNT_KEY` JSON service account ključa
- alternativno:
  - `GSC_SERVICE_ACCOUNT_KEY_B64`
  - `GSC_SERVICE_ACCOUNT_EMAIL`
  - `GSC_SERVICE_ACCOUNT_PRIVATE_KEY`
- `SEO_ALERT_WEBHOOK_URL` opcionalno za Slack/Teams webhook

## Workflow režimi

- `Search Console Monitor` workflow:
  - mesečni report: svakog 1. u mesecu
  - alert check: dnevno
  - ručni `workflow_dispatch` sa `mode=monthly` ili `mode=alert`

## Lokalno pokretanje

- Mesečni report:

```bash
npm run seo:gsc:monthly
```

- Alert check:

```bash
npm run seo:gsc:alert
```

## Output fajlovi

- `reports/seo/monthly-YYYY-MM.md`
- `reports/seo/monthly-YYYY-MM.json`
- `reports/seo/latest-monthly.json`
- `.seo-monitor-state/latest-alert.json`
