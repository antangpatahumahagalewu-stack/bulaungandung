# 🌿 Koperasi Perhutanan Sosial Bulau Ngandung

**Dari Hutan Kapuas, untuk Dunia.**

Situs web resmi Koperasi Perhutanan Sosial Bulau Ngandung — wadah bagi 25 kelompok perhutanan sosial di Kabupaten Kapuas, Kalimantan Tengah. Menampilkan profil kelompok, katalog produk hasil hutan bukan kayu (HHBK), cerita anggota, kegiatan, dan mitra strategis.

Dibangun dengan **[Next.js](https://nextjs.org)** (App Router) dan dikelola melalui **[Sanity CMS](https://www.sanity.io)**.

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|---|---|
| **Profil 25 Kelompok** | Halaman daftar & detail kelompok perhutanan sosial dengan filter desa dan jenis HHBK |
| **Katalog Produk** | Produk HHBK lengkap dengan foto, kisaran harga, cerita di balik produk, dan profil pengrajin |
| **Cerita & Narasi** | Artikel storytelling dengan kategori (asal-usul, anggota, produk, dampak, mitra) |
| **Kegiatan & Berita** | Update kegiatan dan berita terbaru dengan pagination |
| **Manajemen Konten** | CMS headless via Sanity Studio di `/studio` |
| **Multibahasa** | 4 bahasa: Indonesia, English, 中文, 日本語 |
| **Formulir Kontak** | Form kontak dengan validasi Zod + penyimpanan aman |
| **Newsletter** | Langganan email via Supabase + Resend |
| **Cookie Consent** | Sistem persetujuan kuki dengan gating analitik |
| **SEO** | Sitemap dinamis, hreflang, canonical URL, JSON-LD structured data, OG images |
| **Keamanan** | CSP headers, X-Frame-Options, HSTS, validasi input ketat |

---

## 🛠️ Teknologi

| Lapisan | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Bahasa** | TypeScript (strict) |
| **Styling** | Tailwind CSS v4 + shadcn/ui + Radix UI |
| **CMS** | Sanity.io v5 (GROQ, Portable Text) |
| **i18n** | next-intl v4 |
| **Database** | Supabase (newsletter subscribers) |
| **Email** | Resend (welcome email) |
| **Form** | react-hook-form + Zod |
| **Analitik** | Vercel Analytics (consent-gated) |
| **Font** | Playfair Display + DM Sans |
| **Deployment** | Vercel |

---

## 📁 Struktur Direktori

```
bulaungandung/
├── app/                    # Halaman & API routes
│   ├── [locale]/           # Rute per bahasa
│   ├── api/                # API: contact, newsletter, revalidate
│   └── studio/             # Sanity Studio (CSR)
├── components/
│   ├── layout/             # Navbar, Footer, LanguageSwitcher
│   ├── ui/                 # Komponen UI (shadcn + kustom)
│   ├── shared/             # Komponen bersama
│   └── cookie/             # Sistem cookie consent
├── lib/
│   ├── sanity/             # Client & GROQ queries
│   ├── supabase/           # Client browser & server
│   ├── data/               # Data lokal (fallback) + loader terpusat
│   └── zod/                # Skema validasi form
├── sanity/                 # Konfigurasi Sanity Studio
│   └── schema/             # Skema konten (5 tipe dokumen)
├── messages/               # File terjemahan (id, en, zh, ja)
├── i18n/                   # Konfigurasi routing multibahasa
├── types/                  # TypeScript interfaces
├── public/                 # Aset statis
└── scripts/                # Utilitas (migrasi data)
```

---

## 🚀 Memulai

### Prasyarat

- Node.js >= 20
- npm / yarn / pnpm

### Instalasi

```bash
# Clone repositori
git clone https://github.com/amal-kalteng/bulaungandung.git
cd bulaungandung

# Install dependencies
npm install

# Salin environment variables
cp .env.example .env.local
```

### Variabel Lingkungan

Isi `.env.local` dengan:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token

# Supabase (newsletter)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend (email)
RESEND_API_KEY=your_resend_api_key
RESEND_AUDIENCE_ID=your_audience_id

# Vercel Analytics (opsional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

### Menjalankan Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) — atau [http://localhost:3000/en](http://localhost:3000/en) untuk versi Inggris.

### Build Produksi

```bash
npm run build
npm run start
```

---

## 📦 Skrip

| Skrip | Perintah | Kegunaan |
|---|---|---|
| `dev` | `next dev --turbopack` | Server development |
| `build` | `next build` | Build produksi |
| `start` | `next start` | Jalankan production server |
| `lint` | `next lint` | Linting ESLint |
| `typecheck` | `tsc --noEmit` | Cek tipe TypeScript |

---

## 🌐 Manajemen Konten (Sanity Studio)

Akses CMS di `/studio` setelah login dengan akun Sanity yang diundang ke project.

Tipe dokumen yang tersedia:
- **Member** — Profil 25 kelompok perhutanan sosial
- **Product** — Produk HHBK
- **Story** — Artikel naratif
- **Activity** — Kegiatan & berita
- **SiteSettings** — Pengaturan global (hero, stats, partner, dll.)

Setiap field konten memiliki sub-field untuk 4 bahasa: `id`, `en`, `zh`, `ja`.

---

## 🤝 Lisensi

Hak cipta © Yayasan Antangpatahu Mahaga Lewu (AMAL) — Kalimantan Tengah, Indonesia.

---

## 📞 Kontak

- **Website:** [bulaungandung.com](https://bulaungandung.com)
- **Email:** info@bulaungandung.com
- **Yayasan AMAL:** [amalkalteng.org](https://amalkalteng.org)

---

> _Bulau Ngandung — dalam bahasa Dayak Ngaju berarti "hutan yang mengandung" atau "hutan yang memberi kehidupan."_
