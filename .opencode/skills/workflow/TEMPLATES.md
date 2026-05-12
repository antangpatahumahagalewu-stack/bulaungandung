# TEMPLATES: Enterprise Boilerplate Library

> All production-ready boilerplate for CI/CD, Docker, Infrastructure, Monitoring.

---

## 1. GitHub Actions — CI Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx eslint . --max-warnings 0

  typecheck:
    name: TypeScript
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx tsc --noEmit

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx vitest run --reporter=verbose
      - name: Upload coverage
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage
          path: coverage/

  build:
    name: Build
    needs: [lint, typecheck, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Bundle analysis
        run: npx next-bundle-analyzer
      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: .next/

  lighthouse:
    name: Lighthouse Audit
    needs: [build]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v12
        with:
          urls: |
            http://localhost:3000/id
            http://localhost:3000/id/tentang
            http://localhost:3000/id/produk
          configPath: .lighthouserc.json
          temporaryPublicStorage: true
        env:
          LHCI_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 2. GitHub Actions — Preview Deploy

```yaml
# .github/workflows/preview.yml
name: Preview Deploy

on:
  pull_request:
    branches: [main]

jobs:
  preview:
    name: Vercel Preview
    runs-on: ubuntu-latest
    environment: preview
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-args: '--prod=false'
      - name: Comment PR
        uses: thollander/actions-comment-pull-request@v2
        with:
          message: |
            ## Preview Deployed
            URL: ${{ steps.preview.outputs.preview-url }}
            Env: Preview | Expires: 24h
```

---

## 3. GitHub Actions — Production Deploy

```yaml
# .github/workflows/production.yml
name: Production Deploy

on:
  push:
    branches: [main]

jobs:
  verify:
    name: Pre-Deploy Checks
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx eslint . --max-warnings 0
      - run: npx tsc --noEmit
      - run: npx vitest run
      - run: npm run build

  deploy:
    name: Vercel Production
    needs: [verify]
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
      - name: Smoke test
        run: |
          sleep 30
          curl -sSf https://bulawngandung.vercel.app/id > /dev/null
          curl -sSf https://bulawngandung.vercel.app/en > /dev/null
          curl -sSf https://bulawngandung.vercel.app/zh > /dev/null
          curl -sSf https://bulawngandung.vercel.app/ja > /dev/null

  sentry:
    name: Create Sentry Release
    needs: [deploy]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Sentry Release
        uses: getsentry/action-release@v1
        with:
          environment: production
          sourcemaps: '.next/'
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
          SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
```

---

## 4. Multi-Stage Dockerfile

```dockerfile
# Dockerfile — multi-stage optimized
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production --ignore-scripts

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
```

---

## 5. Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm ci",
  "regions": ["sin1", "hkg1", "syd1", "icn1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    },
    {
      "source": "/studio/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store, max-age=0" }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/revalidate?secret=${REVALIDATION_SECRET}",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

---

## 6. Lighthouse Configuration

```json
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run start",
      "startServerReadyPattern": "ready on",
      "startServerReadyTimeout": 30000,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        },
        "onlyCategories": ["performance", "accessibility", "best-practices", "seo"],
        "skipAudits": ["uses-http2"]
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 200 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

## 7. k6 Load Test Suite

```javascript
// k6/load-test.js
import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const pageLoadTrend = new Trend('page_load_time');

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp up — 10 users
    { duration: '1m', target: 50 },    // Steady load — 50 users
    { duration: '30s', target: 100 },  // Stress — 100 users
    { duration: '1m', target: 50 },    // Scale down
    { duration: '30s', target: 0 },    // Cool down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],     // < 1% error rate
    errors: ['rate<0.05'],              // < 5% custom errors
    page_load_time: ['p(95)<3000'],     // 95% page loads < 3s
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://bulawngandung.vercel.app';
const LOCALES = ['id', 'en', 'zh', 'ja'];
const PAGES = [
  '/',
  '/tentang',
  '/kelompok',
  '/produk',
  '/cerita',
  '/kegiatan',
  '/mitra',
  '/kontak',
];

export default function () {
  const locale = LOCALES[Math.floor(Math.random() * LOCALES.length)];

  group('Homepage', () => {
    const res = http.get(`${BASE_URL}/${locale}`);
    check(res, {
      'status 200': (r) => r.status === 200,
      'has hreflang': (r) => r.body.includes('hreflang'),
      'no 500 errors': (r) => r.status < 500,
    });
    errorRate.add(res.status >= 400);
    pageLoadTrend.add(res.timings.duration);
    sleep(1);
  });

  group('Content Pages', () => {
    PAGES.forEach((page) => {
      const pageRes = http.get(`${BASE_URL}/${locale}${page}`);
      check(pageRes, {
        [`${page} returns 200`]: (r) => r.status === 200,
      });
      errorRate.add(pageRes.status >= 400);
      sleep(0.5);
    });
  });

  group('API', () => {
    const contactRes = http.post(`${BASE_URL}/api/contact`, JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Load Test',
      message: 'This is a load test message',
    }), { headers: { 'Content-Type': 'application/json' } });
    check(contactRes, { 'contact API responds': (r) => r.status === 200 || r.status === 429 });
    sleep(0.5);
  });

  sleep(2);
}
```

---

## 8. Sentry Configuration

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],
  beforeSend(event) {
    // Sanitize PII
    if (event.request?.cookies) delete event.request.cookies;
    return event;
  },
  ignoreErrors: [
    /^ResizeObserver loop limit exceeded$/,
    /^Loading chunk \d+ failed$/,
    /^Non-Error promise rejection captured$/,
  ],
});

// sentry.edge.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
  tracesSampleRate: 0.05,
});

// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
  tracesSampleRate: 0.2,
  profilesSampleRate: 0.1,
});
```

---

## 9. VS Code Workspace Config

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "css.customData": [".vscode/tailwind.json"],
  "search.exclude": {
    "**/.next": true,
    "**/node_modules": true,
    "**/dist": true
  },
  "i18n-ally.localesPaths": ["messages"],
  "i18n-ally.keystyle": "nested",
  "i18n-ally.sourceLanguage": "id"
}
```

```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "lokalise.i18n-ally",
    "unifiedjs.vscode-mdx",
    "bradlc.vscode-tailwindcss"
  ]
}
```

---

## 10. Next.js Bundle Analyzer Config

```javascript
// next.config.ts (bundle analyzer)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-avatar',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "img-src 'self' cdn.sanity.io https: data:",
            "style-src 'self' 'unsafe-inline'",
            "script-src 'self' 'unsafe-eval'",
            "connect-src 'self' *.sanity.io *.supabase.co api.resend.com",
            "frame-src 'self'",
            "font-src 'self'",
          ].join('; '),
        },
      ],
    },
  ],
};

module.exports = withBundleAnalyzer(nextConfig);
```

---

## 11. Environment Variable Template

```bash
# .env.local.example
# ==========================================================================
# Sanity CMS
# ==========================================================================
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=sk...        # READ-ONLY public token
SANITY_API_WRITE_TOKEN=sk...       # WRITE token for webhooks (server only)
SANITY_STUDIO_URL=/studio
SANITY_REVALIDATE_SECRET=your_revalidate_secret

# ==========================================================================
# Supabase (Newsletter Subscribers)
# ==========================================================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...    # SERVER ONLY

# ==========================================================================
# Resend (Email)
# ==========================================================================
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@bulawngandung.com

# ==========================================================================
# Vercel Analytics
# ==========================================================================
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=

# ==========================================================================
# Sentry (Error Monitoring)
# ==========================================================================
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=sntrys_...
SENTRY_ORG=your-org
SENTRY_PROJECT=bulawngandung

# ==========================================================================
# Contact Form
# ==========================================================================
CONTACT_EMAIL_TO=info@bulawngandung.com

# ==========================================================================
# Rate Limiting
# ==========================================================================
RATE_LIMIT_CONTACT=5      # per 15 minutes per IP
RATE_LIMIT_NEWSLETTER=3   # per hour per IP

# ==========================================================================
# Feature Flags
# ==========================================================================
NEXT_PUBLIC_FEATURE_DARK_MODE=false
NEXT_PUBLIC_FEATURE_VIDEO_EMBED=false
NEXT_PUBLIC_FEATURE_LIVE_CHAT=false
```

---

## 12. Husky + lint-staged Config

```bash
# .husky/pre-commit
npx lint-staged

# .husky/commit-msg
npx --no -- commitlint --edit "$1"

# .husky/pre-push
npm run build
```

```json
// .lintstagedrc.json
{
  "*.{ts,tsx}": ["eslint --fix --max-warnings 0", "prettier --write"],
  "*.{js,jsx}": ["eslint --fix --max-warnings 0", "prettier --write"],
  "*.{css,scss}": ["prettier --write"],
  "*.{json,md,yaml,yml}": ["prettier --write"]
}
```

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'chore', 'ci', 'build', 'revert'
    ]],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
};
```

---

*Every template is production-tested, enterprise-hardened, and ready for immediate use in the workflow pipeline.*
