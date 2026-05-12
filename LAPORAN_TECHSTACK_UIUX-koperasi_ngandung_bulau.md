# Laporan Tech Stack & UI/UX — Website Koperasi Bulau Ngandung

> **Proyek:** Website Koperasi Perhutanan Sosial Bulau Ngandung  
> **Lokasi:** Kabupaten Kapuas, Kalimantan Tengah  
> **Mitra Utama:** Yayasan Antangpatahu Mahaga Lewu (AMAL)  
> **Tanggal Laporan:** 12 Mei 2026  
> **Versi:** 1.0

---

## Daftar Isi

1. [Ringkasan Proyek](#1-ringkasan-proyek)
2. [Tech Stack](#2-tech-stack)
3. [Arsitektur Teknis](#3-arsitektur-teknis)
4. [Desain UI/UX](#4-desain-uiux)
5. [Implementasi Halaman](#5-implementasi-halaman)
6. [Komponen UI](#6-komponen-ui)
7. [Internationalization (i18n)](#7-internationalization-i18n)
8. [SEO & Performance](#8-seo--performance)
9. [Keamanan](#9-keamanan)
10. [CMS — Sanity.io](#10-cms--sanityio)
11. [Database & API](#11-database--api)
12. [Analytics & Monitoring](#12-analytics--monitoring)
13. [Status Implementasi](#13-status-implementasi)

---

## 1. Ringkasan Proyek

Website branding & informatif untuk mempromosikan Koperasi Perhutanan Sosial Bulau Ngandung, 25 kelompok PS anggota, produk HHBK (Hasil Hutan Bukan Kayu), dan kemitraan strategis dengan Yayasan AMAL.

**Jenis Website:** Informatif / publik — tanpa login, tanpa ecommerce.  
**Konten dikelola via:** Sanity headless CMS (admin non-teknis).  
**Deployment:** Vercel (Edge Network).

---

## 2. Tech Stack

### 2.1 Core Stack

| Layer | Teknologi | Versi | Keterangan |
|-------|-----------|-------|------------|
| Framework | **Next.js** (App Router) | 16.2.6 | React fullstack framework, SSG/ISR/CSR |
| Bahasa | **TypeScript** | 5.x | Type-safe development |
| UI Library | **React** + **React DOM** | 19.2.4 | Komponen UI |
| Styling | **Tailwind CSS** | 4.x | Utility-first CSS framework |
| PostCSS Plugin | **@tailwindcss/postcss** | 4.x | Tailwind v4 PostCSS integration |
| CMS | **Sanity.io** | 5.24.0 | Headless CMS — semua konten teks & gambar |
| i18n | **next-intl** | 4.11.2 | 4-locale internationalization |
| Linting | **ESLint** + **eslint-config-next** | 9.x | Code quality |
| Runtime | **Node.js** | ≥22 | Server runtime |

### 2.2 UI & Komponen

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `lucide-react` | 1.14.0 | Icon set (1.400+ ikon SVG) |
| `@radix-ui/react-dialog` | 1.1.15 | Sheet (mobile nav) |
| `@radix-ui/react-navigation-menu` | 1.2.14 | Desktop navbar |
| `@radix-ui/react-dropdown-menu` | 2.1.16 | Language switcher dropdown |
| `@radix-ui/react-avatar` | 1.1.11 | Foto anggota (fallback + image) |
| `@radix-ui/react-aspect-ratio` | 1.1.8 | Konsistensi rasio gambar (16:9) |
| `@radix-ui/react-separator` | 1.1.8 | Section divider dekoratif |
| `@radix-ui/react-slot` | 1.2.4 | Polimorfik "asChild" untuk button |
| `class-variance-authority` | 0.7.1 | Variant-driven component API |
| `clsx` | 2.1.1 | Conditional class merging |
| `tailwind-merge` | 3.6.0 | Smart conflict resolution untuk class Tailwind |
| `tailwindcss-animate` | 1.0.7 | Animasi CSS utility classes |

### 2.3 CMS & Konten

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `sanity` | 5.24.0 | Sanity Studio (embedded di `/studio`) |
| `next-sanity` | 12.4.5 | Sanity + Next.js integration helpers |
| `@sanity/client` | 7.22.0 | Sanity API client (GROQ queries) |
| `@sanity/image-url` | 2.1.1 | Optimized image URL builder |
| `@sanity/vision` | 5.24.0 | GROQ query playground di Studio |
| `@portabletext/react` | 6.2.0 | Safe rich text rendering (no XSS) |

### 2.4 Form & Validasi

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `react-hook-form` | 7.75.0 | Performant form state management |
| `@hookform/resolvers` | 5.2.2 | Zod schema resolver bridge |
| `zod` | 4.4.3 | TypeScript-first schema validation |

### 2.5 Database & Email

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `@supabase/supabase-js` | 2.86.2 | Supabase client (newsletter subscribers) |
| `pg` | 8.20.0 | PostgreSQL driver (dev dependency, Supabase) |

### 2.6 Analytics & Deployment

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `@vercel/analytics` | 1.5.0 | Page views, visitors, Web Vitals |

### 2.7 Dev Dependencies

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `typescript` | 5.x | Type checker |
| `@types/node` | 22.x | Node.js type definitions |
| `@types/react` | 19.x | React type definitions |
| `@types/react-dom` | 19.x | React DOM type definitions |

**Total: 34 packages** (28 production + 6 dev)

---

## 3. Arsitektur Teknis

### 3.1 Data Flow

```
┌──────────────────────────────────────────────────────┐
│                      Vercel Edge                      │
│  ┌────────────────────────────────────────────────┐  │
│  │           Next.js 16 (App Router)               │  │
│  │                                                 │  │
│  │  ┌──────────┐  ┌───────────┐  ┌────────────┐  │  │
│  │  │  Pages   │  │  Server   │  │  Middleware │  │  │
│  │  │ (SSG/ISR)│  │  Actions  │  │  i18n + CSP │  │  │
│  │  └────┬─────┘  └─────┬─────┘  └────────────┘  │  │
│  │       │              │                          │  │
│  │       │    ┌─────────┼──────────┐              │  │
│  │       │    │         │          │              │  │
│  └───────┼────┼─────────┼──────────┼──────────────┘  │
│          │    │         │          │                  │
└──────────┼────┼─────────┼──────────┼──────────────────┘
           │    │         │          │
    ┌──────▼──┐ │  ┌──────▼───┐ ┌───▼────────┐
    │ Sanity  │ │  │  Resend  │ │  Supabase   │
    │   CDN   │ │  │  (email) │ │ (subscriber)│
    └─────────┘ │  └──────────┘ └────────────┘
                │
         ┌──────▼──────┐
         │    Sanity    │
         │    Studio    │
         │  (/studio)   │
         └─────────────┘
```

### 3.2 Strategy: Sanity-first, Local-fallback

```
lib/data/loader.ts
  ├── GET dari Sanity (GROQ queries via lib/sanity/queries.ts)
  │     └── Normalisasi portable text → plain text string
  └── CATCH: fallback ke local static data (lib/data/*.ts)
```

**Alur:**
1. Server Component memanggil `getAllMembers()` (contoh)
2. Loader mencoba Sanity GROQ query
3. Sukses → return data + normalisasi block content
4. Gagal → fallback ke data lokal statis di `lib/data/members.ts`
5. Data dirender dengan `getTranslations()` untuk label UI

### 3.3 Rendering Strategy

| Route Pattern | Rendering | Revalidation |
|---------------|-----------|--------------|
| `/` (Beranda) | Server (dinamis) | Per request |
| `/tentang` | Server (dinamis) | Per request |
| `/kelompok` | Client (filter interaktif) | — |
| `/kelompok/[slug]` | **SSG** + ISR | On-demand via webhook |
| `/produk` | Client (filter interaktif) | — |
| `/produk/[slug]` | **SSG** + ISR | On-demand via webhook |
| `/cerita` | Client (filter interaktif) | — |
| `/cerita/[slug]` | **SSG** + ISR | On-demand via webhook |
| `/kegiatan` | Server (dinamis) | Per request |
| `/kegiatan/[slug]` | **SSG** + ISR | On-demand via webhook |
| `/mitra` | Server (dinamis) | Per request |
| `/kontak` | Client (form interaktif) | — |
| `/studio/[[...index]]` | CSR only | — |

**generateStaticParams()** digunakan pada semua route `[slug]` untuk pre-build halaman detail.

### 3.4 Struktur Folder

```
bulawngandung/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — fonts + html/body
│   ├── globals.css               # Design tokens + base styles (234 lines)
│   ├── robots.ts                 # robots.txt generation
│   ├── sitemap.ts                # Dynamic sitemap (all locales × pages)
│   ├── [locale]/
│   │   ├── layout.tsx            # Locale layout — NextIntlClientProvider
│   │   ├── page.tsx              # Beranda (homepage)
│   │   ├── error.tsx             # 500 Error boundary
│   │   ├── not-found.tsx         # 404 page
│   │   ├── tentang/page.tsx      # Tentang
│   │   ├── kelompok/
│   │   │   ├── page.tsx          # Daftar kelompok (client, filterable)
│   │   │   └── [slug]/page.tsx   # Detail kelompok (SSG)
│   │   ├── produk/
│   │   │   ├── page.tsx          # Katalog produk (client, filterable)
│   │   │   └── [slug]/page.tsx   # Detail produk (SSG)
│   │   ├── cerita/
│   │   │   ├── page.tsx          # Semua cerita (client, filterable)
│   │   │   └── [slug]/page.tsx   # Detail cerita (SSG)
│   │   ├── kegiatan/
│   │   │   ├── page.tsx          # Berita & kegiatan (server)
│   │   │   └── [slug]/page.tsx   # Detail kegiatan (SSG)
│   │   ├── mitra/page.tsx        # Mitra strategis (server)
│   │   └── kontak/page.tsx       # Form kontak (client)
│   ├── studio/[[...index]]/      # Sanity Studio embedded
│   └── api/
│       ├── newsletter/route.ts   # POST — subscribe email → Supabase
│       ├── contact/route.ts      # POST — form kontak
│       └── revalidate/route.ts   # POST — ISR on-demand revalidation
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky nav + desktop dropdown + mobile sheet
│   │   ├── Footer.tsx            # 4-column footer
│   │   └── LanguageSwitcher.tsx  # Locale switcher dropdown (bendera)
│   ├── ui/
│   │   ├── Hero.tsx              # Full-viewport hero dengan overlay
│   │   ├── StatCard.tsx          # Angka statistik dampak
│   │   ├── SectionTitle.tsx      # Section heading + accent line
│   │   ├── MemberCard.tsx        # Card kelompok PS
│   │   ├── ProductCard.tsx       # Card katalog produk
│   │   ├── StoryCard.tsx         # Card cerita storytelling
│   │   ├── ActivityCard.tsx      # Card berita & kegiatan
│   │   ├── PullQuote.tsx         # Blockquote + foto narasumber
│   │   ├── NewsletterForm.tsx    # Form subscribe email
│   │   ├── ContactForm.tsx       # Form kontak (zod validated)
│   │   ├── RichText.tsx          # Render portable text
│   │   ├── PhotoGallery.tsx      # Grid foto + lightbox
│   │   ├── ProcessFlow.tsx       # Step-by-step HHBK process
│   │   ├── Timeline.tsx          # Timeline vertikal (alternating)
│   │   ├── button.tsx            # shadcn-style Button
│   │   ├── badge.tsx             # shadcn-style Badge
│   │   ├── card.tsx              # shadcn-style Card
│   │   └── ... (input, label, textarea, skeleton, etc.)
│   └── shared/
│       └── AnalyticsWrapper.tsx  # Vercel Analytics
├── lib/
│   ├── utils.ts                  # cn() utility (clsx + tailwind-merge)
│   ├── portable-text.ts          # Sanity block → plain text converter
│   ├── data/
│   │   ├── loader.ts             # Centralized async data layer
│   │   ├── members.ts            # 25 kelompok PS (data fallback)
│   │   ├── products.ts           # 12 produk HHBK (data fallback)
│   │   ├── stories.ts            # ~5 cerita storytelling (data fallback)
│   │   └── site.ts               # Site settings, timeline, pull quotes
│   ├── sanity/
│   │   ├── client.ts             # Sanity client (read-only, CDN)
│   │   └── queries.ts            # All GROQ queries + locale normalization
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   └── server.ts             # Server Supabase client
│   └── zod/
│       ├── newsletter.ts         # Newsletter schema
│       └── contact.ts            # Contact form schema
├── sanity/
│   ├── schema/
│   │   ├── index.ts              # Schema registry
│   │   ├── member.ts             # 25 kelompok PS schema
│   │   ├── product.ts            # Produk HHBK schema
│   │   ├── story.ts              # Cerita schema
│   │   ├── activity.ts           # Kegiatan schema
│   │   ├── siteSettings.ts       # Site settings (singleton)
│   │   ├── blockContent.ts       # Reusable rich text
│   │   └── localeFields.ts       # Helper: id/en/zh/ja field generator
│   ├── sanity.config.ts          # Sanity Studio config
│   └── deskStructure.ts          # Custom Studio sidebar
├── messages/
│   ├── id.json                   # Bahasa Indonesia (default)
│   ├── en.json                   # English
│   ├── zh.json                   # 中文 (Chinese)
│   └── ja.json                   # 日本語 (Japanese)
├── types/
│   └── index.ts                  # All TypeScript interfaces (149 lines)
├── public/
│   └── images/
├── i18n.config.ts                # Locale definitions
├── i18n/
│   └── request.ts                # next-intl request config
├── next.config.ts                # Next.js config (CSP, images, i18n)
├── package.json                  # 34 packages
├── tsconfig.json                 # TypeScript config
├── postcss.config.mjs            # PostCSS config
├── .env.local                    # Environment variables
└── .env.local.example            # Env template
```

**Total: ~65 source files** (tidak termasuk node_modules & .next/)

---

## 4. Desain UI/UX

### 4.1 Filosofi Desain

**Tema:** "Bening / Fresh / Luxe" — hangat, bersih, alami.

**Prinsip:**
- Tidak korporat, tapi **manusiawi** — seperti bercerita di teras rumah
- Warna hutan tropis + aksen emas untuk kesan premium
- Tipografi serif untuk narasi, sans-serif untuk fungsional
- Spacing lapang, whitespace generous

### 4.2 Palet Warna (Design Tokens)

| Token | CSS Variable | Value | Deskripsi |
|-------|-------------|-------|-----------|
| **Background** | `--bg` | `hsl(45, 30%, 97%)` | Warm off-white, seperti kertas alami |
| **Foreground** | `--fg` | `hsl(160, 18%, 12%)` | Dark emerald, teks body |
| **Foreground Dim** | `--fg-dim` | `hsl(160, 10%, 35%)` | Teks paragraf (lebih soft) |
| **Primary** | `--pri` | `hsl(160, 50%, 22%)` | Deep emerald — navbar, heading, button |
| **Primary Subtle** | `--pri-subtle` | `hsl(160, 40%, 92%)` | Background hover, badge |
| **Accent** | `--acc` | `hsl(42, 80%, 52%)` | Luminous honey gold — CTA, highlight |
| **Accent Glow** | `--acc-glow` | `hsl(42, 85%, 62%)` | Glow effect untuk accent elements |
| **Accent Subtle** | `--acc-subtle` | `hsl(42, 70%, 94%)` | Background accent soft |
| **Secondary** | `--sec` | `hsl(140, 20%, 60%)` | Muted sage — secondary elements |
| **Muted** | `--mu` | `hsl(220, 12%, 94%)` | Background muted sections |
| **Muted FG** | `--mu-fg` | `hsl(160, 8%, 48%)` | Caption, subtle text |
| **Border** | `--bdr` | `hsl(200, 10%, 88%)` | Card borders, dividers |
| **Card BG** | `--card-bg` | `hsl(46, 40%, 99%)` | Crisp white card background |
| **Destructive** | `--dest` | `hsl(0, 70%, 55%)` | Error states |

### 4.3 Tipografi

| Level | Font Family | Weight | Style |
|-------|------------|--------|-------|
| **h1 – h4** (headings) | **Playfair Display** (serif) | 600 | `letter-spacing: -0.02em` |
| **Body, UI, Caption** | **DM Sans** (sans-serif) | 400–500 | `line-height: 1.7` (paragraph) |

**Fluid Typography (clamp):**

| Element | Ukuran |
|---------|--------|
| h1 | `clamp(2.5rem, 5vw, 4.5rem)` |
| h2 | `clamp(2rem, 4vw, 3.25rem)` |
| h3 | `clamp(1.5rem, 3vw, 2.25rem)` |
| h4 | `clamp(1.25rem, 2vw, 1.75rem)` |

### 4.4 Elevation & Shadow System

| Level | Tokens |
|-------|--------|
| **xs** | `0 1px 2px hsl(160 15% 10% / 0.04)` |
| **sm** | `0 1px 3px / 0 4px 12px` |
| **md** | `0 4px 16px / 0 12px 32px` |
| **lg** | `0 8px 32px / 0 24px 64px` |

Semua shadow menggunakan hue emerald gelap (`hsl(160, 15%, 10%)`) — bukan hitam netral — untuk konsistensi warmth.

### 4.5 Glass Morphism

```css
.glass {
  background: hsl(46 40% 99% / 0.72);
  backdrop-filter: blur(16px);
  border: 1px solid hsl(200 10% 88% / 0.6);
  box-shadow: 0 1px 3px / 0 8px 32px;
}

.glass-subtle {
  background: hsl(46 40% 99% / 0.5);
  backdrop-filter: blur(8px);
}
```

Digunakan untuk: **Navbar sticky** (efek transparan saat scroll).

### 4.6 Accent Elements

```css
.accent-dot    → 8px circle, gold glow (12px blur)
.accent-line   → 48px × 3px horizontal line, gold glow
```

Digunakan di: Section title dekorasi, list markers, CTA highlights.

### 4.7 Animasi

| Keyframe | Deskripsi | Durasi | Easing |
|----------|-----------|--------|--------|
| `fade-up` | Opacity 0→1 + translateY 24px→0 | 0.7s | ease-out |
| `fade-in` | Opacity 0→1 | — | — |
| `shimmer` | Skeleton loading background sweep | — | — |

**Reduced Motion:** Semua animasi dinonaktifkan jika `prefers-reduced-motion: reduce`.

### 4.8 Radius

| Token | Ukuran |
|-------|--------|
| `sm` | `calc(0.75rem - 4px)` = 8px |
| `md` | `calc(0.75rem - 2px)` = 10px |
| `lg` | `0.75rem` = 12px |
| `xl` | `calc(0.75rem + 4px)` = 16px |
| `2xl` | `calc(0.75rem + 8px)` = 20px |

### 4.9 Spacing System

| Token | Value |
|-------|-------|
| `--space-section` | `clamp(4rem, 8vw, 8rem)` |
| `--space-gap` | `clamp(1rem, 2vw, 2rem)` |

### 4.10 Custom UI Elements

| Element | Implementasi |
|---------|-------------|
| **Custom scrollbar** | Width 6px, border-radius thumb, hover color change |
| **Text selection** | Background gold transparan (`hsl(42 80% 52% / 0.25)`) |
| **Font smoothing** | `antialiased` + `optimizeLegibility` |

---

## 5. Implementasi Halaman

### 5.1 Site Map (13 halaman publik + 1 admin)

```
/                               → Beranda
/tentang                        → Profil Koperasi
/kelompok                       → Daftar 25 Kelompok PS
/kelompok/[slug]                → Detail Kelompok
/produk                         → Katalog HHBK
/produk/[slug]                  → Detail Produk
/cerita                         → Semua Cerita (grid)
/cerita/[slug]                  → Detail Cerita
/kegiatan                       → Berita & Kegiatan
/kegiatan/[slug]                → Detail Kegiatan
/mitra                          → Mitra Strategis
/kontak                         → Form Kontak
/studio/[[...index]]            → Sanity Studio (admin CMS)
```

### 5.2 Status per Halaman

| Halaman | Status | Tipe | Keterangan |
|---------|--------|------|------------|
| **Beranda** (`/`) | ✅ Implemented | Server | Hero, stats, featured products, about, pull quote, mitra, newsletter, CTA |
| **Tentang** (`/tentang`) | ✅ Implemented | Server | Arti nama, narasi sejarah, timeline (5 tahun), visi & misi |
| **Kelompok** (`/kelompok`) | ✅ Implemented | Client | Grid card 25 kelompok + filter (desa, HHBK) |
| **Detail Kelompok** (`/kelompok/[slug]`) | ✅ Implemented | SSG | Foto hero, profil, info SK/perizinan, HHBK badges, produk terkait |
| **Produk** (`/produk`) | ✅ Implemented | Client | Grid card 12 produk + filter (jenis HHBK) |
| **Detail Produk** (`/produk/[slug]`) | ✅ Implemented | SSG | Multiple foto, deskripsi, cerita produk, pengrajin profile + kutipan |
| **Cerita** (`/cerita`) | ✅ Implemented | Client | Grid card + filter (5 kategori) |
| **Detail Cerita** (`/cerita/[slug]`) | ✅ Implemented | SSG | Foto hero, narasi, pullquote, galeri foto, link terkait |
| **Kegiatan** (`/kegiatan`) | ✅ Implemented | Server | Daftar card kegiatan |
| **Detail Kegiatan** (`/kegiatan/[slug]`) | ✅ Implemented | SSG | Konten rich text + galeri foto |
| **Mitra** (`/mitra`) | ✅ Implemented | Server | Profil AMAL + mitra lain |
| **Kontak** (`/kontak`) | ✅ Implemented | Client | Form (zod validated) + info kontak |
| **Error 500** | ✅ Implemented | Client | Error boundary + tombol retry |
| **404** | ✅ Implemented | — | Full page 404 dengan Navbar + Footer |
| **Sanity Studio** (`/studio`) | ✅ Implemented | CSR | Embedded Sanity Studio |

**Semua 13 halaman publik + error/404 + CMS studio TERIMPLEMENTASI.**

### 5.3 Data Fallback (Statis)

| Data | Jumlah | File |
|------|--------|------|
| Kelompok PS | **25 kelompok** | `lib/data/members.ts` (554+ lines) |
| Produk HHBK | **12 produk** | `lib/data/products.ts` (439 lines) |
| Cerita | **5 cerita** | `lib/data/stories.ts` (230+ lines) |
| Kegiatan | **2 kegiatan** | `lib/data/site.ts` |
| Timeline | **5 tahun** (2023–2027) | `lib/data/site.ts` |
| Pull Quotes | **4 kutipan** | `lib/data/site.ts` |

---

## 6. Komponen UI

### 6.1 Layout Components

| Komponen | File | Kegunaan |
|----------|------|----------|
| **Navbar** | `components/layout/Navbar.tsx` | Sticky nav, desktop dropdown menu, mobile sheet (Radix Dialog) |
| **Footer** | `components/layout/Footer.tsx` | 4-column: navigasi, kontak, mitra, newsletter |
| **LanguageSwitcher** | `components/layout/LanguageSwitcher.tsx` | Dropdown 4 bahasa dengan bendera emoji |

### 6.2 Custom UI Components

| Komponen | File | Kegunaan |
|----------|------|----------|
| **Hero** | `Hero.tsx` | Full-viewport hero — foto background + overlay teks + CTA |
| **StatCard** | `StatCard.tsx` | Angka besar + label (contoh: "25 Kelompok") |
| **SectionTitle** | `SectionTitle.tsx` | Judul section dengan garis aksen emas |
| **MemberCard** | `MemberCard.tsx` | Card kelompok — foto, nama, desa, luas, badge HHBK |
| **ProductCard** | `ProductCard.tsx` | Card produk — foto, nama, jenis, harga, stok |
| **StoryCard** | `StoryCard.tsx` | Card cerita — foto, kategori badge, excerpt |
| **ActivityCard** | `ActivityCard.tsx` | Card kegiatan — thumbnail, tanggal, excerpt |
| **PullQuote** | `PullQuote.tsx` | Blockquote besar — kutipan, nama, peran, foto |
| **NewsletterForm** | `NewsletterForm.tsx` | Form email — Zod validation, toast feedback |
| **ContactForm** | `ContactForm.tsx` | Form kontak — nama, email, subjek, pesan (Zod) |
| **RichText** | `RichText.tsx` | Render HTML string dari Sanity portable text |
| **PhotoGallery** | `PhotoGallery.tsx` | Grid foto + lightbox modal |
| **ProcessFlow** | `ProcessFlow.tsx` | Visualisasi proses HHBK step-by-step |
| **Timeline** | `Timeline.tsx` | Timeline vertikal dengan layout alternating (kiri/kanan) |

### 6.3 shadcn-style Primitives

| Komponen | Berbasis Radix | Kegunaan |
|----------|---------------|----------|
| `Button` | Slot | CTA, form submit, link |
| `Badge` | — | Tag HHBK, kategori cerita |
| `Card` | — | Container card universal |
| `Input` | — | Text input (form) |
| `Textarea` | — | Textarea (form pesan) |
| `Label` | — | Form label |
| `Sheet` | Dialog | Mobile hamburger navbar |
| `DropdownMenu` | DropdownMenu | Language switcher |
| `Separator` | Separator | Section divider |
| `Skeleton` | — | Skeleton loading (ISR states) |
| `Avatar` | Avatar | Foto anggota/pengrajin |
| `AspectRatio` | AspectRatio | Rasio gambar konsisten 16:9 |

---

## 7. Internationalization (i18n)

### 7.1 Konfigurasi

| Setting | Value |
|---------|-------|
| **Library** | `next-intl` 4.11.2 |
| **Locales** | `id` (default), `en`, `zh`, `ja` |
| **Prefix strategy** | `always` — semua URL diawali `/id/`, `/en/`, dll. |
| **Detection** | Accept-Language header (auto via next-intl plugin) |
| **Fallback** | `id` (Bahasa Indonesia) |

### 7.2 Route Pattern

```
/id/             → default locale
/en/...
/zh/...
/ja/...
```

### 7.3 Translation Coverage

**Messages files:** `messages/{id,en,zh,ja}.json` — masing-masing ~110 lines, 14 top-level keys:

| Key | Konten |
|-----|--------|
| `site` | Nama website, tagline (per locale) |
| `nav` | 8 item navigasi |
| `hero` | Judul, subtitle, CTA |
| `stats` | 3 label statistik |
| `home` | 6 section judul |
| `tentang` | 7 label/teks |
| `kelompok` | 6 label (filter, card, dll.) |
| `produk` | 6 label |
| `cerita` | 6 label + 5 nama kategori |
| `kegiatan` | Label kegiatan |
| `mitra` | Label mitra |
| `kontak` | 9 label (form, info, button) |
| `newsletter` | 4 label |
| `footer` | Teks footer |
| `language` | Nama bahasa |
| `notFound` | 3 teks 404 |
| `error` | 3 teks error |

**CMS Content:** Setiap field teks multilingual dengan 4 sub-field (`id`, `en`, `zh`, `ja`).

---

## 8. SEO & Performance

### 8.1 Metadata Strategy

| Elemen | Implementasi |
|--------|-------------|
| **Title template** | `%s | Koperasi Bulau Ngandung` |
| **Meta description** | Per-page dari Sanity siteSettings |
| **OG Image** | Hero image atau foto konten |
| **Canonical URL** | Auto-generated via path |
| **hreflang** | `next-intl` auto-generate `alternates.languages` |
| **Sitemap** | `app/sitemap.ts` — all 4 locales × all dynamic pages |
| **Robots.txt** | `app/robots.ts` — disallow `/studio/` & `/api/`, allow else |

### 8.2 Structured Data (JSON-LD)

| Schema | Halaman |
|--------|---------|
| `Organization` | Semua halaman |
| `Product` | Detail produk |
| `Article` | Detail kegiatan & cerita |
| `BreadcrumbList` | Semua halaman detail |

### 8.3 Performance

| Metrik | Target |
|--------|--------|
| **Lighthouse Performance** | ≥ 90 |
| **Lighthouse Accessibility** | ≥ 90 |
| **Lighthouse Best Practices** | ≥ 90 |
| **Lighthouse SEO** | ≥ 90 |
| **ISR Cache** | 60 detik default, instant via Sanity webhook |
| **Image Optimization** | Sanity CDN (`@sanity/image-url`) + Next.js `<Image>` |
| **Font Loading** | Google Fonts via `next/font` (subset, display swap) |

### 8.4 Mobile Responsive

- Mobile-first design approach
- Navbar: hamburger sheet (Radix Dialog) pada mobile
- Grid: 1 col (mobile) → 2 col (tablet) → 3–4 col (desktop)
- Typography: fluid `clamp()` values adapt to all viewports

---

## 9. Keamanan

| Vektor | Mitigasi | Status |
|--------|----------|--------|
| **XSS (Rich Text)** | `@portabletext/react` — tidak ada `dangerouslySetInnerHTML` | ✅ |
| **XSS (Form Input)** | Zod schema validation + server actions | ✅ |
| **CSP** | `Content-Security-Policy` header di `next.config.ts` | ✅ |
| **Clickjacking** | `X-Frame-Options: DENY` | ✅ |
| **MIME Sniffing** | `X-Content-Type-Options: nosniff` | ✅ |
| **Referrer Leak** | `Referrer-Policy: strict-origin-when-cross-origin` | ✅ |
| **Sanity Token** | Read-only public token + CORS lock di Sanity dashboard | ✅ |
| **Spam Form** | Server-side validation via Zod `.email()` | ✅ |
| **Supply Chain** | `package-lock.json` (locked versions) | ✅ |
| **Studio Access** | Sanity built-in OAuth authentication | ✅ |

### CSP Policy (Detail)

```
default-src 'self'
img-src 'self' cdn.sanity.io https: data:
style-src 'self' 'unsafe-inline'
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com
connect-src 'self' *.sanity.io *.supabase.co api.resend.com https://va.vercel-scripts.com
frame-src 'self'
font-src 'self'
```

---

## 10. CMS — Sanity.io

### 10.1 Konfigurasi

| Setting | Value |
|---------|-------|
| **Project ID** | `uxisgbv4` |
| **Dataset** | `production` |
| **API Version** | `2025-01-01` |
| **Perspective** | `published` (draft tidak tampil di publik) |
| **CDN** | Enabled |
| **Studio** | Embedded di `/studio/[[...index]]` |

### 10.2 Content Schema (5 types)

| Schema Type | Nama | Deskripsi |
|-------------|------|-----------|
| `member` | Kelompok PS | 25 kelompok perhutanan sosial |
| `product` | Produk HHBK | Katalog hasil hutan bukan kayu |
| `story` | Cerita | Storytelling content (5 kategori) |
| `activity` | Kegiatan | Berita & kegiatan |
| `siteSettings` | Pengaturan Situs | Singleton: hero, about, mitra, kontak |

### 10.3 Locale Fields Pattern

Setiap field teks multilingual menggunakan helper `localeFields()`:

```typescript
// Menghasilkan 4 sub-field:
{ name: 'id', title: '🇮🇩 Indonesia', type }
{ name: 'en', title: '🇬🇧 English', type }
{ name: 'zh', title: '🇨🇳 中文', type }
{ name: 'ja', title: '🇯🇵 日本語', type }
```

### 10.4 Studio Desk Structure

```
📋 Pengaturan Situs (singleton)
📋 Kelompok PS (25)
📋 Produk HHBK
📋 Cerita
📋 Kegiatan
```

---

## 11. Database & API

### 11.1 Supabase (Newsletter)

| Setting | Detail |
|---------|--------|
| **Tabel** | `subscribers` |
| **Kolom** | `id` (UUID PK), `email` (UNIQUE), `subscribed_at` (TIMESTAMPTZ), `locale` (TEXT) |
| **Client** | `@supabase/supabase-js` (server + browser) |
| **Environment** | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` |

### 11.2 API Routes

| Route | Method | Fungsi |
|-------|--------|--------|
| `/api/newsletter` | POST | Zod-validated email → INSERT ke Supabase `subscribers` |
| `/api/contact` | POST | Zod-validated form → log (TODO: Resend email integration) |
| `/api/revalidate` | POST | On-demand ISR revalidation by path (Sanity webhook) |

---

## 12. Analytics & Monitoring

| Tool | Data |
|------|------|
| **@vercel/analytics** | Page views, unique visitors, referrer, country, browser, device |
| **Vercel Web Vitals** | LCP, CLS, INP, FCP |
| **Vercel Dashboard** | Deployment history, ISR cache hit rate, function logs |

---

## 13. Status Implementasi

### ✅ Completed

| Area | Detail |
|------|--------|
| **Framework Setup** | Next.js 16 App Router + TypeScript + Tailwind CSS v4 |
| **CMS Integration** | Sanity.io (5 schemas, studio embedded, queries, locale normalization) |
| **Data Layer** | Sanity-first with local fallback (25 members, 12 products, 5 stories) |
| **All Pages** | 13 public pages + error/404 + Sanity Studio |
| **Layout** | Navbar (desktop + mobile), Footer (4-col), LanguageSwitcher |
| **UI Components** | 14 custom + 12 shadcn-style primitives |
| **i18n** | 4 locales (id, en, zh, ja), ~110 translations per locale |
| **Design System** | Complete token system, fluid typography, glass morphism, animations |
| **Forms** | Newsletter + Contact (react-hook-form + Zod) |
| **SEO** | Sitemap, robots.txt, metadata, structured data |
| **Security** | CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |
| **Analytics** | Vercel Analytics + Web Vitals |
| **API Routes** | Newsletter subscribe, Contact form, ISR revalidation |

### 🔜 Pending / TODO

| Item | Keterangan |
|------|------------|
| **Resend Email Integration** | Contact form & newsletter welcome email via Resend |
| **Rate Limiting** | Form kontak & newsletter (currently Zod-only) |
| **Real Photos** | Ganti placeholder foto via Sanity Studio |
| **Real Content** | Isi konten multilingual (id sudah, en/zh/ja via fallback) |
| **Sanity Webhook** | Setup revalidation webhook di Sanity dashboard |
| **Dark Mode** | **Dinonaktifkan** (sesuai PRD — konsistensi branding) |

---

> **Laporan ini mencerminkan status implementasi per 12 Mei 2026.**  
> **Total file source:** ~65 files | **Total packages:** 34 | **Total halaman:** 13 publik + 3 special + 1 admin
