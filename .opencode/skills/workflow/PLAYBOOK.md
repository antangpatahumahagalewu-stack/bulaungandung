# PLAYBOOK: Operations Runbook

> Launch runbook, incident response, disaster recovery, rollback playbooks.
> Everything needed to operate the website in production.

---

## 1. Pre-Launch Checklist (50 Items)

```
╔══════════════════════════════════════════════════════════════╗
║        🚀 PRE-LAUNCH CHECKLIST                               ║
║        "Jika ragu, jangan deploy."                           ║
╚══════════════════════════════════════════════════════════════╝

┌─ DOMAIN & DNS ──────────────────────────────────────────────┐
│ [ ] Domain terdaftar dan aktif                               │
│ [ ] Nameserver mengarah ke Vercel / penyedia hosting         │
│ [ ] DNS records: A, CNAME, TXT verified                     │
│ [ ] WWW → root redirect berfungsi                            │
│ [ ] SSL certificate auto-issued (Vercel handles)             │
│ [ ] Domain verified di Google Search Console                  │
│ [ ] Domain verified di Bing Webmaster Tools                   │
└──────────────────────────────────────────────────────────────┘

┌─ ENVIRONMENT ────────────────────────────────────────────────┐
│ [ ] Semua .env variables ter-set di Vercel dashboard          │
│ [ ] SANITY_API_READ_TOKEN = read-only (bukan write!)         │
│ [ ] SANITY_REVALIDATE_SECRET = random string 32+ chars        │
│ [ ] RESEND_API_KEY verified (test send)                       │
│ [ ] SUPABASE_URL + keys verified                              │
│ [ ] SENTRY_DSN verified                                       │
│ [ ] RATE_LIMIT values configured                              │
│ [ ] .env.local.example updated dengan semua keys              │
└──────────────────────────────────────────────────────────────┘

┌─ BUILD & DEPLOY ─────────────────────────────────────────────┐
│ [ ] `npm run build` sukses di local (0 errors, 0 warnings)   │
│ [ ] `npm run lint` sukses (0 errors, 0 warnings)             │
│ [ ] `npx tsc --noEmit` sukses (0 errors)                      │
│ [ ] `npm test` sukses (all passing)                           │
│ [ ] Vercel production deploy sukses                           │
│ [ ] Vercel preview deploy sukses                              │
│ [ ] GitHub Actions CI pipeline passing                        │
└──────────────────────────────────────────────────────────────┘

┌─ FUNCTIONALITY ──────────────────────────────────────────────┐
│ [ ] Semua 13 halaman publik bisa diakses (200 OK)            │
│ [ ] 4 locale URLs berfungsi: /id, /en, /zh, /ja             │
│ [ ] Language switcher berfungsi di semua halaman              │
│ [ ] Sanity Studio bisa diakses di /studio                     │
│ [ ] Sanity Studio bisa login + CRUD                          │
│ [ ] Form kontak submit → email terkirim                       │
│ [ ] Newsletter subscribe → simpan di Supabase                 │
│ [ ] Newsletter subscribe → welcome email terkirim (Resend)    │
│ [ ] ISR revalidation bekerja setelah Sanity update            │
│ [ ] Semua link internal tidak ada yang 404                    │
│ [ ] 404 page muncul untuk URL tidak valid                     │
└──────────────────────────────────────────────────────────────┘

┌─ RESPONSIVE ─────────────────────────────────────────────────┐
│ [ ] Mobile 375px: semua halaman bisa di-scroll, tidak overflow │
│ [ ] Tablet 768px: layout beradaptasi                          │
│ [ ] Desktop 1440px: layout optimal                            │
│ [ ] Tidak ada horizontal scrollbar di viewport manapun        │
│ [ ] Touch targets ≥ 48px pada mobile                          │
└──────────────────────────────────────────────────────────────┘

┌─ PERFORMANCE ────────────────────────────────────────────────┐
│ [ ] Lighthouse Performance ≥ 90                               │
│ [ ] Lighthouse Accessibility ≥ 95                             │
│ [ ] Lighthouse Best Practices ≥ 90                            │
│ [ ] Lighthouse SEO ≥ 90                                       │
│ [ ] LCP < 2.5 detik (verified di Vercel Analytics)            │
│ [ ] CLS < 0.1 (verified)                                      │
│ [ ] Semua gambar menggunakan next/image (optimized)           │
│ [ ] Font loading tidak menyebabkan CLS                         │
└──────────────────────────────────────────────────────────────┘

┌─ SEO ────────────────────────────────────────────────────────┐
│ [ ] Title tag unique untuk setiap halaman (50-60 chars)      │
│ [ ] Meta description unique untuk setiap halaman              │
│ [ ] OG tags terverifikasi via opengraph.xyz                   │
│ [ ] Twitter Card tags terverifikasi                            │
│ [ ] hreflang tags auto-generated oleh next-intl               │
│ [ ] Sitemap.xml bisa diakses                                  │
│ [ ] Robots.txt bisa diakses                                   │
│ [ ] Structured data (JSON-LD) valid via schema.org validator  │
│ [ ] Canonical URL benar di setiap halaman                     │
└──────────────────────────────────────────────────────────────┘

┌─ SECURITY ───────────────────────────────────────────────────┐
│ [ ] CSP header aktif dan benar                                │
│ [ ] Security headers terpasang (X-Frame-Options, etc.)       │
│ [ ] HTTPS enforced, HTTP redirect ke HTTPS                    │
│ [ ] Sanity token publik read-only                              │
│ [ ] Rate limiting berfungsi di form kontak & newsletter       │
│ [ ] All input divalidasi Zod (server-side)                     │
│ [ ] No secrets exposed in client-side code                     │
│ [ ] Dependency audit: 0 critical/high vulnerabilities         │
└──────────────────────────────────────────────────────────────┘

┌─ MONITORING ─────────────────────────────────────────────────┐
│ [ ] Vercel Analytics tracking page views                      │
│ [ ] Custom events tracking: form submit, newsletter, CTA      │
│ [ ] Sentry error tracking configured                          │
│ [ ] Vercel Web Vitals dashboard active                        │
│ [ ] Status page / uptime monitoring configured                │
│ [ ] Alert rules: downtime > 5 min, error rate > 5%           │
└──────────────────────────────────────────────────────────────┘

┌─ CONTENT ────────────────────────────────────────────────────┐
│ [ ] Sanity Studio memiliki data dummy untuk semua content type │
│ [ ] Setiap content type memiliki minimal 3 entry              │
│ [ ] Semua locale memiliki konten (fallback: id)               │
│ [ ] Gambar placeholder diganti dengan foto real (jika ada)    │
│ [ ] Typo check semua konten                                   │
└──────────────────────────────────────────────────────────────┘

┌─ DOCUMENTATION ──────────────────────────────────────────────┐
│ [ ] .env.local.example updated                                │
│ [ ] ARCHITECTURE.md written                                   │
│ [ ] DEPLOYMENT.md written                                     │
│ [ ] README.md project description                             │
│ [ ] CHANGELOG.md started                                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Launch Sequence Protocol

```
╔══════════════════════════════════════════════════════════════╗
║             🎯 LAUNCH SEQUENCE                               ║
╚══════════════════════════════════════════════════════════════╝

T-7 DAYS: Final Preparation
  ├── [ ] Full pre-launch checklist audit
  ├── [ ] Load test executed (k6 script)
  ├── [ ] All critical bugs fixed
  ├── [ ] DNS TTL diturunkan ke 60 detik (untuk propagasi cepat)
  └── [ ] Rollback plan verified

T-1 DAY: Soft Launch
  ├── [ ] Deploy ke production
  ├── [ ] Smoke test: semua halaman 200 OK
  ├── [ ] Verifikasi SSL aktif
  ├── [ ] Submit sitemap ke Google Search Console
  ├── [ ] Submit sitemap ke Bing Webmaster
  └── [ ] Enable indexing (remove noindex jika ada)

T-0 HOURS: GO LIVE
  ├── [ ] Announce: internal stakeholder
  ├── [ ] Announce: mitra AMAL
  ├── [ ] Announce: 25 kelompok PS (jika memungkinkan)
  ├── [ ] Monitor: real-time dashboard (Sentry + Vercel)
  └── [ ] Standby: engineer on-call for 4 hours

T+1 HOUR: Post-Launch Check
  ├── [ ] Page views tracking (Vercel Analytics)
  ├── [ ] Error rate check (Sentry)
  ├── [ ] Core Web Vitals snapshot
  ├── [ ] Check: form submissions working
  └── [ ] Check: newsletter subscriptions working

T+24 HOURS: First Day Review
  ├── [ ] Traffic analysis: top pages, bounce rate, locale distribution
  ├── [ ] Performance snapshot: LCP, CLS, INP
  ├── [ ] Error log review (Sentry)
  ├── [ ] SEO: indexed pages check (site:bulawngandung.com)
  └── [ ] User feedback collection (form entries, email)

T+7 DAYS: First Week Review
  ├── [ ] Full analytics review
  ├── [ ] SEO ranking check for target keywords
  ├── [ ] Content update plan (berdasarkan data)
  ├── [ ] Performance optimization priorities
  └── [ ] Stakeholder report

T+30 DAYS: Monthly Review
  ├── [ ] Monthly analytics report
  ├── [ ] Content strategy evaluation
  ├── [ ] Feature request backlog grooming
  ├── [ ] Dependency updates check
  └── [ ] Security audit
```

---

## 3. Incident Response Playbook

```
╔══════════════════════════════════════════════════════════════╗
║           🚨 INCIDENT RESPONSE                               ║
╚══════════════════════════════════════════════════════════════╝

SEVERITY LEVELS:
  🔴 P0 CRITICAL — Website down / white screen / semua halaman error
  🟠 P1 HIGH     — Major feature broken (form, CMS, i18n)
  🟡 P2 MEDIUM   — Minor UI bug / visual glitch
  🟢 P3 LOW      — Typo / cosmetic / enhancement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INCIDENT: Website Down (P0)
  Symptoms:
    - Semua halaman return 500 atau blank white screen
    - Vercel dashboard menunjukkan failed deployment
    - Sentry spike errors
  
  Response (immediate):
    1. Check Vercel dashboard → see latest deployment status
    2. Check Sentry → identify error type and frequency
    3. Check recent git commits → any breaking changes?
    4. Check Sanity status → is CMS down?
    
  Fix:
    Option A: Rollback deploy via Vercel dashboard (instant)
    Option B: Rollback git commit → push → auto-deploy (5 min)
    Option C: Fix forward → commit fix → deploy (15-30 min)
    
  Post-Incident:
    - Root cause analysis
    - Update runbook with findings
    - Add monitoring for this specific failure mode

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INCIDENT: Form Tidak Berfungsi (P1)
  Symptoms:
    - Contact form: submit gagal, toast error muncul
    - Newsletter: subscribe gagal
    - User report via email
  
  Response:
    1. Check Vercel function logs for /api/contact and /api/newsletter
    2. Check Resend API status
    3. Check Supabase connection
    4. Check rate limiting (too many requests?)
    
  Fix (ordered):
    1. Resend API down → wait or switch to backup email provider
    2. Supabase connection issue → check connection string, restart
    3. Rate limiting → adjust thresholds temporarily
    4. Code bug → fix, test, deploy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INCIDENT: Konten Tidak Update (P2)
  Symptoms:
    - Update di Sanity tidak muncul di website
    - ISR cache stale
    
  Response:
    1. Check Sanity webhook URL di Vercel dashboard
    2. Verify SANITY_REVALIDATE_SECRET matches
    3. Manual revalidate via /api/revalidate
    4. Check Vercel ISR cache logs
    
  Fix:
    1. Webhook misconfigured → update in Sanity dashboard
    2. Secret mismatch → sync .env
    3. Cache issue → purge Vercel cache

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INCIDENT: Performance Degradation (P2)
  Symptoms:
    - Lighthouse score turun > 10 points
    - LCP > 3 detik
    - User complaint: "website lambat"
    
  Response:
    1. Run Lighthouse audit
    2. Check Vercel Web Vitals dashboard
    3. Check recent deployment changes
    4. Check Sanity image sizes (uploaded too-large images?)
    
  Fix:
    1. Large image → compress via Sanity, or limit upload size
    2. JS bundle too large → tree-shake, lazy load, code split
    3. Too many fonts → subset, reduce variants
    4. Third-party script slow → defer or remove
```

---

## 4. Disaster Recovery Plan

```
╔══════════════════════════════════════════════════════════════╗
║         🔄 DISASTER RECOVERY PLAN                            ║
╚══════════════════════════════════════════════════════════════╝

SCENARIO A: Vercel Platform Down (RARE)
  Impact: Website tidak bisa diakses
  RTO (Recovery Time Objective): 30 minutes
  RPO (Recovery Point Objective): 0 (static content), CMS content from Sanity
  
  Recovery Steps:
    1. Confirm: check status.vercel.com
    2. Wait for Vercel recovery (typically < 30 min)
    3. If extended (> 1 hour):
       a. Deploy static export to alternative host (Netlify, Cloudflare Pages)
       b. DNS switch to backup host
       c. Note: dynamic features (forms, ISR) will be limited

SCENARIO B: Sanity CMS Down (RARE)
  Impact: Konten tidak bisa diupdate, website tetap tampil (ISR cache)
  RTO: 1 hour (wait for Sanity recovery)
  RPO: Last ISR cache snapshot (max 60s stale)
  
  Recovery Steps:
    1. Confirm: check status.sanity.io
    2. Website still serves from ISR cache — users unaffected
    3. Freeze content updates until Sanity recovered
    4. If extended (> 4 hours): switch to static data fallback

SCENARIO C: Supabase Down (for newsletter)
  Impact: Newsletter subscription gagal
  RTO: 4 hours
  RPO: Lost subscriber emails during downtime
  
  Recovery Steps:
    1. Queue subscription attempts in temporary storage (Redis/Upstash)
    2. Retry when Supabase recovered
    3. Alert: notify team
    4. If extended: switch to backup database (PlanetScale, Neon)

SCENARIO D: Resend Email Down
  Impact: Welcome email tidak terkirim
  RTO: 4 hours
  RPO: None (emails queued)
  
  Recovery Steps:
    1. Subscriptions still saved in Supabase
    2. Queue welcome emails for later delivery
    3. Option: switch to SendGrid / Mailgun temporarily

SCENARIO E: DNS Hijack / Domain Issue
  Impact: Domain tidak resolving
  RTO: 2 hours
  RPO: 0 (content safe)
  
  Recovery Steps:
    1. Verify domain registration active (not expired)
    2. Verify nameserver settings at registrar
    3. Contact registrar support
    4. Emergency: deploy to Vercel subdomain (bulawngandung.vercel.app)

BACKUP STRATEGY:
  ├── Sanity: automatic backups (Sanity handles)
  ├── Supabase: enable Point-in-Time Recovery
  ├── Code: Git repository (GitHub)
  ├── Env vars: documented in .env.local.example + Vercel dashboard
  └── Content: Sanity export script (weekly cron)
```

---

## 5. Rollback Protocol

```
╔══════════════════════════════════════════════════════════════╗
║          ⏪ ROLLBACK PROTOCOL                                ║
╚══════════════════════════════════════════════════════════════╝

DECISION TREE:
  Bug ditemukan di production?
  │
  ├── P0/P1 Critical? → ROLLBACK IMMEDIATELY (don't fix forward)
  │   └── Step 1: Vercel Dashboard → Deployments → select previous → "Promote to Production"
  │   └── Step 2: Verify (smoke test)
  │   └── Step 3: Investigate root cause
  │   └── Step 4: Fix in separate branch → test → deploy → verify
  │
  └── P2/P3 Minor? → FIX FORWARD (don't rollback)
      └── Step 1: Create hotfix branch from main
      └── Step 2: Fix + test locally
      └── Step 3: PR → review → merge → auto-deploy
      └── Step 4: Verify in production

ROLLBACK COMMANDS:
  # Via Vercel CLI
  vercel rollback                    # Instant rollback to previous deployment
  vercel deploy --prod               # Redeploy previous commit
  
  # Via Git (if Vercel auto-deploys on push)
  git revert HEAD                    # Revert last commit
  git push origin main               # Push revert → triggers deploy
  
  # Via GitHub Actions
  # Manually trigger "Production Deploy" workflow with specific commit SHA

ROLLBACK VERIFICATION:
  After rollback, verify:
  [ ] Homepage loads (200 OK, no errors)
  [ ] Main navigation works
  [ ] Contact form submits
  [ ] Language switcher works
  [ ] Sanity content renders
  [ ] Sentry error rate returns to baseline
  [ ] Vercel Analytics shows normal page views
```

---

## 6. Monitoring Dashboard Spec

```
METRICS TO WATCH:
  Real-time (Vercel Analytics):
    ├── Page views per minute
    ├── Unique visitors
    ├── Bounce rate per page
    ├── Top exit pages
    └── Traffic source breakdown

  Performance (Vercel Web Vitals):
    ├── LCP (Largest Contentful Paint) — target < 2500ms
    ├── CLS (Cumulative Layout Shift) — target < 0.1
    ├── INP (Interaction to Next Paint) — target < 200ms
    └── FCP (First Contentful Paint) — target < 1800ms

  Errors (Sentry):
    ├── Error count per minute
    ├── Error type distribution
    ├── Affected pages
    ├── Affected browser versions
    └── Unhandled promise rejections

  Alerts (to configure):
    ├── PagerDuty: Error rate > 5% for > 5 minutes
    ├── Slack: Deployment failed
    ├── Email: Weekly performance report
    └── SMS: Website down for > 2 minutes (if critical)

  Custom Dashboards:
    ├── Newsletter: subscribers per day, per locale
    ├── Contact: form submissions per day, top subjects
    ├── Content: most viewed pages, most searched terms
    └── SEO: Google Search Console impressions, clicks, CTR
```

---

*This playbook is a living document. After every incident, update it. After every launch, refine it. Operations excellence is built one incident at a time.*
