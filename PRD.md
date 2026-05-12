# PRD — Website Koperasi Perhutanan Sosial Bulau Ngandung

> **Versi:** 1.0  
> **Status:** Final  
> **Lokasi:** Kabupaten Kapuas, Kalimantan Tengah  
> **Mitra Utama:** Yayasan Antangpatahu Mahaga Lewu (AMAL) — [antang.org](https://antang.org)

---

## Daftar Isi

1. [Ringkasan Produk](#1-ringkasan-produk)
2. [Target Audiens](#2-target-audiens)
3. [Fitur & Halaman](#3-fitur--halaman)
4. [Storytelling Framework](#4-storytelling-framework)
5. [Arsitektur Teknis](#5-arsitektur-teknis)
6. [Desain](#6-desain)
7. [Keamanan](#7-keamanan)
8. [Newsletter](#8-newsletter)
9. [SEO](#9-seo)
10. [Analytics](#10-analytics)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [Struktur Folder](#12-struktur-folder)
13. [Milestone & Estimasi](#13-milestone--estimasi)
14. [Risiko & Mitigasi](#14-risiko--mitigasi)
15. [Definisi Done](#15-definisi-done)

---

## 1. Ringkasan Produk

### 1.1 Nama Produk
**Website Koperasi Perhutanan Sosial Bulau Ngandung**

### 1.2 Ringkasan Eksekutif
Website branding untuk mempromosikan koperasi, 25 kelompok perhutanan sosial anggota, produk HHBK (Hasil Hutan Bukan Kayu), dan kemitraan strategis dengan Yayasan AMAL. Website bersifat **informatif & publik** — tanpa fitur login, ecommerce, atau manajemen internal. Konten dikelola melalui **Sanity headless CMS**, foto diupload oleh admin non-teknis via Sanity Studio.

### 1.3 Latar Belakang
Koperasi Bulau Ngandung terintegrasi dengan Yayasan Antangpatahu Mahaga Lewu (AMAL) sebagai mitra dalam pengembangan HHBK Perhutanan Sosial di Kabupaten Kapuas, Kalimantan Tengah. Koperasi berkoordinasi dengan 25 kelompok PS anggota dalam hal HHBK — mulai dari pemanenan, pengolahan, hingga pemasaran. Website ini menjadi **wajah digital** koperasi ke publik, buyer, mitra, dan pemerintah.

### 1.4 Tujuan Strategis

| Tujuan | Indikator |
|---|---|
| Branding & kredibilitas | Professional online presence |
| Promosi HHBK | Katalog produk per kelompok terpublikasi |
| Storytelling | Cerita di balik produk & anggota terpapar publik |
| Visibilitas ke buyer & mitra | SEO & discoverability |
| Transparansi ke anggota | Informasi publik dapat diakses |
| Mendukung proposal pendanaan | Landing page profesional untuk donor/dinas |

---

## 2. Target Audiens

| Segmen | Kebutuhan |
|---|---|
| **Buyer/pembeli HHBK** | Melihat katalog produk, kontak koperasi |
| **Calon mitra (NGO, perusahaan)** | Memahami profil & kredibilitas koperasi |
| **Pemerintah (Dinas Kehutanan, BPKH, UPT KPHL)** | Informasi kepatuhan & aktivitas |
| **25 Kelompok PS anggota** | Informasi jadwal, berita, produk terdaftar |
| **Publik umum / media** | Edukasi perhutanan sosial & HHBK |

---

## 3. Fitur & Halaman

### 3.1 Site Map

```
/                       → Beranda
/tentang                → Profil Koperasi
/kelompok               → Daftar 25 Kelompok PS
/kelompok/[slug]        → Detail Kelompok
/produk                 → Katalog HHBK
/produk/[slug]          → Detail Produk
/cerita                 → Semua Cerita (grid)
/cerita/[slug]          → Detail Cerita
/kegiatan               → Berita & Kegiatan
/kegiatan/[slug]        → Detail Kegiatan
/mitra                  → Mitra Strategis
/kontak                 → Form Kontak
/studio/[[...index]]    → Sanity Studio (admin CMS)
```

**Total: 13 halaman publik + 1 halaman admin CMS**

### 3.2 Deskripsi Halaman

#### Beranda (`/`)

> **Tujuan:** Hook emosional dalam 5 detik pertama. Visitor langsung paham siapa koperasi ini dan kenapa penting.

| Section | Konten |
|---|---|
| **Hero** | Foto aerial hutan Kapuas, tagline naratif, CTA "Kenali Cerita Kami" |
| **Statistik Dampak** | 3 angka besar: 25 Kelompok, X Hektar, Y Produk HHBK |
| **Cerita Singkat** | 2-3 kalimat naratif tentang siapa koperasi + foto manusia |
| **Produk Unggulan** | 3-6 produk HHBK featured card — masing-masing dengan cerita asal singkat |
| **Testimoni/Kutipan** | Pull quote dari anggota/pengurus dengan foto |
| **Mitra** | Logo Yayasan AMAL + mitra lain |
| **Newsletter** | Form subscribe email |
| **CTA Akhir** | Ajakan bermitra / kontak |

#### Tentang (`/tentang`)

> **Tujuan:** Membangun kredibilitas dan koneksi emosional melalui narasi, bukan bullet point kaku.

| Section | Konten |
|---|---|
| **Arti Nama** | Filosofi "Bulau Ngandung" dalam bahasa Dayak Ngaju |
| **Narasi Sejarah** | Paragraf storytelling — kenapa koperasi berdiri, siapa pendiri, momen kunci |
| **Timeline** | Vertikal scroll: 2023 (ide) → 2024 (pendampingan AMAL) → 2025 (koperasi berdiri, 25 kelompok gabung) → 2026 (website lahir) |
| **Visi & Misi** | Naratif, bukan bullet point — "Kami bermimpi suatu hari nanti..." |
| **Tim / Pengurus** | Foto placeholder + nama + peran |

#### Kelompok (`/kelompok`)

> **Tujuan:** Menampilkan skala & keberagaman 25 kelompok PS.

| Section | Konten |
|---|---|
| **Grid Card** | 25 card dengan: nama kelompok, desa, luas areal, 1-2 jenis HHBK, foto |
| **Filter** | Berdasarkan nama desa atau jenis HHBK |

#### Detail Kelompok (`/kelompok/[slug]`)

> **Tujuan:** Humanisasi — kelompok bukan sekadar data, tapi manusia dengan cerita.

| Section | Konten |
|---|---|
| **Foto Besar** | Foto kelompok — orang, bukan pohon |
| **Profil** | Nama, desa, kecamatan, luas areal (ha) |
| **Cerita Kelompok** | 2-4 paragraf naratif: sejarah, keseharian, HHBK andalan, tantangan |
| **Jenis HHBK** | Tag/badge |
| **Produk Terkait** | Daftar produk dari kelompok ini (card + link) |

#### Produk (`/produk`)

> **Tujuan:** Katalog informasional — bukan ecommerce.

| Section | Konten |
|---|---|
| **Grid Katalog** | Card produk: foto, nama, jenis HHBK, harga kisaran |
| **Filter** | Berdasarkan jenis HHBK (madu, rotan, gula aren, purun, dll) |

#### Detail Produk (`/produk/[slug]`)

> **Tujuan:** Produk bukan komoditas — ada cerita di baliknya.

| Section | Konten |
|---|---|
| **Foto Produk** | Multiple foto: close-up + konteks |
| **Info** | Nama, jenis HHBK, harga kisaran |
| **Cerita Produk** | Dari mana asalnya? Siapa yang membuat/memanen? Bagaimana prosesnya? Kenapa istimewa? |
| **Kisah di Balik Produk** | Portrait petani/pengrajin + kutipan (pull quote) |
| **Kelompok Asal** | Link ke detail kelompok |
| **Catatan** | Tidak ada tombol beli — redirect ke platform ecommerce koperasi |

#### Cerita (`/cerita`)

> **Tujuan:** Hub konten storytelling — visitors yang ingin menyelami cerita lebih dalam.

| Section | Konten |
|---|---|
| **Grid Card** | Semua cerita dari semua kategori |
| **Filter** | Berdasarkan kategori: Asal-usul, Anggota, Produk, Dampak, Mitra |

#### Detail Cerita (`/cerita/[slug]`)

> **Tujuan:** Immersive reading experience.

| Section | Konten |
|---|---|
| **Foto Utama** | Full-width hero image |
| **Judul + Kategori + Tanggal** | Header |
| **Narasi** | Rich text — paragraf storytelling |
| **Kutipan** | Pull quote dengan nama narasumber + peran |
| **Galeri Foto** | Lightbox gallery |
| **Link Terkait** | Link ke kelompok atau produk terkait |

#### Kegiatan (`/kegiatan`)

| Section | Konten |
|---|---|
| **Daftar Card** | Thumbnail + judul + tanggal + excerpt |
| **Paginasi** | Load more atau halaman |

#### Detail Kegiatan (`/kegiatan/[slug]`)

| Section | Konten |
|---|---|
| **Konten Rich Text** | Berita lengkap dengan foto inline |
| **Galeri Foto** | Foto kegiatan |

#### Mitra (`/mitra`)

| Section | Konten |
|---|---|
| **Profil AMAL** | Partner utama — deskripsi, logo, link ke antang.org |
| **Mitra Lain** | Grid card mitra strategis lainnya (placeholder) |

#### Kontak (`/kontak`)

| Section | Konten |
|---|---|
| **Form Kontak** | Nama, email, subjek, pesan — validasi Zod + toast Sonner |
| **Info Kontak** | Alamat, WhatsApp, email, jam operasional |
| **(Opsional)** | Embed Google Maps |

---

## 4. Storytelling Framework

### 4.1 Naratif Utama (Core Narrative)

**"Dari Hutan Kapuas, untuk Dunia"**

Koperasi ini bukan sekadar koperasi — ini cerita tentang **25 kelompok masyarakat adat Dayak** yang menjaga hutan, mengambil secukupnya, dan membangun ekonomi dari hasil hutan bukan kayu tanpa merusak.

```
┌──────────────────────────────────────────────────────────┐
│                    STORY ARC                              │
│                                                           │
│  MASALAH ──► PERJUANGAN ──► SOLUSI ──► DAMPAK ──► MASA DEPAN
│                                                           │
│  Hutan       Koperasi      HHBK       25          Pasar
│  terancam    berdiri       sebagai    kelompok    global
│              + AMAL        jawaban    berdaya     +
│              mendampingi             mandiri     lestari
└──────────────────────────────────────────────────────────┘
```

### 4.2 Pilar Cerita

#### Pilar 1 — Asal-usul & Identitas
> *Siapa kita? Kenapa kita ada?*

- Arti nama "Bulau Ngandung" dalam bahasa Dayak Ngaju
- Sejarah koperasi: kapan berdiri, siapa pendiri, momen kunci
- Kenapa pilih bentuk koperasi, bukan badan usaha lain
- Koneksi spiritual masyarakat Dayak dengan hutan

#### Pilar 2 — Manusia di Baliknya
> *Siapa yang berjuang?*

- Profil ketua koperasi — cerita personal + visi
- Spotlight 3-5 kelompok paling unik / paling berdampak
- Cerita pengrajin: siapa yang menyadap aren, memanen madu, menganyam rotan?
- **Prioritas foto manusia** — orang bekerja, tersenyum, di hutan

#### Pilar 3 — Produk dengan Cerita
> *Dari mana asalnya? Kenapa istimewa?*

| Produk | Cerita |
|---|---|
| **Madu Hutan Kapuas** | Lebah Apis dorsata liar, dipanen malam hari dengan teknik tradisional, dari pohon ulin setinggi 40m |
| **Gula Aren** | Disadap pagi hari, dimasak 6 jam dengan kayu bakar, 1 pohon = 3 liter nira/hari |
| **Rotan** | Dianyam oleh tangan perempuan Dayak, teknik turun-temurun, 1 tas = 3 hari kerja |
| **Purun** | Tumbuhan gambut, kerajinan eco-friendly, alternatif pengganti plastik |

#### Pilar 4 — Dampak & Perubahan
> *Apa yang berubah?*

- "Sebelum vs sesudah koperasi" — comparison
- Hutan yang tetap berdiri — luas areal terjaga
- Dampak ekonomi → pendidikan
- Pemberdayaan perempuan pengrajin

#### Pilar 5 — Masa Depan
> *Mau ke mana?*

- Target 5 tahun: jangkauan pasar, jumlah kelompok, produk baru
- Undangan kolaborasi: "Anda bisa jadi bagian cerita ini"
- Keberlanjutan hutan untuk generasi depan

### 4.3 Copywriting Tone of Voice

| Atribut | Deskripsi |
|---|---|
| **Hangat & manusiawi** | Bukan korporat kaku — seperti bercerita di teras rumah |
| **Bangga tapi rendah hati** | Merayakan pencapaian tanpa menyombongkan diri |
| **Mengundang** | "Kami", bukan "Koperasi" — visitor merasa diajak masuk |
| **Visual** | Deskripsi yang bisa dibayangkan (warna, suara, bau hutan) |
| **Ringkas** | Paragraf pendek, maksimal 3-4 kalimat per blok |

#### Contoh Perbandingan

| ❌ Kaku | ✅ Storytelling |
|---|---|
| "Koperasi Bulau Ngandung didirikan pada tahun 2025 dengan 25 anggota." | "Tahun 2025, 25 kelompok penjaga hutan duduk bersama di Kapuas. Mereka bertanya: bagaimana kami bisa sejahtera tanpa menebang pohon? Dari pertanyaan itu, lahirlah Koperasi Bulau Ngandung." |
| "Kami menjual madu hutan dengan kualitas premium." | "Setiap malam, petani kami mendaki pohon ulin setinggi 40 meter — dengan penerangan seadanya — untuk memanen madu dari lebah liar Apis dorsata. Satu pohon, satu keluarga, satu warisan." |

### 4.4 Teknik Storytelling Visual

| Teknik | Implementasi |
|---|---|
| **Foto dengan subjek manusia** | Prioritas di hero & card, bukan landscape kosong |
| **Pull Quote** | Kutipan anggota ditampilkan prominent dengan font besar + tanda kutip dekoratif |
| **Before/After** | Dampak koperasi dalam 2 foto side-by-side (jika tersedia) |
| **Video embed** | (Future) YouTube — cerita pendek 60 detik |
| **Parallax/animasi subtle** | Background hutan bergerak lambat saat scroll |
| **Mini Infografis** | Proses HHBK: pohon → panen → olah → produk jadi |

---

## 5. Arsitektur Teknis

### 5.1 Tech Stack

| Layer | Teknologi | Versi |
|---|---|---|
| **Framework** | Next.js (App Router) | 15.x |
| **Bahasa** | TypeScript | 5.x |
| **Styling** | Tailwind CSS + shadcn/ui | 4.x |
| **CMS** | Sanity.io | latest |
| **i18n** | next-intl | latest |
| **Form** | react-hook-form + Zod | latest |
| **Newsletter** | Resend (send) + Supabase (store) | latest |
| **Analytics** | @vercel/analytics | latest |
| **Ikon** | Lucide React | latest |
| **Deployment** | Vercel | — |

### 5.2 Dependency List (33 packages)

#### Production Dependencies

| Library | Kegunaan |
|---|---|
| `next` | Framework fullstack |
| `react` `react-dom` | UI library |
| `typescript` | Type system |
| `next-sanity` | Sanity + Next.js integration |
| `@sanity/client` | Sanity API client |
| `@sanity/image-url` | Optimized image URL generation |
| `@sanity/vision` | GROQ query playground di Studio |
| `@portabletext/react` | Safe rich text rendering |
| `next-intl` | Internationalization (4 locale) |
| `tailwindcss` `@tailwindcss/postcss` | Utility CSS |
| `tailwind-merge` `clsx` | Class utilities (cn) |
| `class-variance-authority` | Variant components |
| `tailwindcss-animate` | CSS animations |
| `lucide-react` | Icon set |
| `@radix-ui/react-slot` | Button asChild |
| `@radix-ui/react-dialog` | Sheet (mobile nav) |
| `@radix-ui/react-navigation-menu` | Desktop nav |
| `@radix-ui/react-dropdown-menu` | Language switcher |
| `@radix-ui/react-separator` | Section divider |
| `@radix-ui/react-avatar` | Member photos |
| `@radix-ui/react-aspect-ratio` | Consistent image containers |
| `zod` | Schema validation |
| `react-hook-form` `@hookform/resolvers` | Form state management |
| `resend` | Email delivery (newsletter) |
| `@supabase/supabase-js` | Subscriber data store |
| `@vercel/analytics` | Page views + Web Vitals |

#### Dev Dependencies

| Library | Kegunaan |
|---|---|
| `eslint` `eslint-config-next` | Linting |
| `postcss` | Tailwind requirement |
| `@types/node` `@types/react` `@types/react-dom` | TypeScript types |

### 5.3 Arsitektur Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                       Vercel                             │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Next.js 15 (App Router)               │  │
│  │                                                    │  │
│  │  ┌──────────┐  ┌───────────┐  ┌───────────────┐  │  │
│  │  │  Page    │  │  Server   │  │  Middleware    │  │  │
│  │  │ (SSG/ISR)│  │  Actions  │  │  i18n + CSP   │  │  │
│  │  └────┬─────┘  └─────┬─────┘  └───────────────┘  │  │
│  │       │              │                             │  │
│  │       │    ┌─────────┼─────────┐                  │  │
│  │       │    │         │         │                  │  │
│  └───────┼────┼─────────┼─────────┼──────────────────┘  │
│          │    │         │         │                      │
└──────────┼────┼─────────┼─────────┼──────────────────────┘
           │    │         │         │
    ┌──────▼──┐ │   ┌─────▼───┐ ┌──▼────────┐
    │ Sanity  │ │   │  Resend │ │ Supabase   │
    │  CDN    │ │   │ (email) │ │(subscriber)│
    └─────────┘ │   └─────────┘ └───────────┘
                │
         ┌──────▼──────┐
         │   Sanity     │
         │   Studio     │
         │  (/studio)   │
         └─────────────┘
```

### 5.4 Sanity Content Schema

```typescript
// Helper: locale-aware fields (id, en, zh, ja)
function localeFields(type: string) {
  return [
    { name: 'id', title: 'Indonesia', type },
    { name: 'en', title: 'English', type },
    { name: 'zh', title: '中文', type },
    { name: 'ja', title: '日本語', type },
  ]
}

// ── member (25 kelompok PS) ──
{
  name: 'member',
  type: 'document',
  fields: [
    { name: 'nama', title: 'Nama Kelompok', type: 'string' },
    { name: 'desa', title: 'Desa', type: 'string' },
    { name: 'kecamatan', title: 'Kecamatan', type: 'string' },
    { name: 'luasAreal', title: 'Luas Areal (ha)', type: 'number' },
    { name: 'jenisHhbk', title: 'Jenis HHBK', type: 'array', of: [{ type: 'string' }] },
    { name: 'foto', title: 'Foto Kelompok', type: 'image', options: { hotspot: true } },
    {
      name: 'deskripsi',
      title: 'Deskripsi / Cerita Kelompok',
      type: 'object',
      fields: localeFields('text'),
    },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'nama' } },
  ],
}

// ── product (Katalog HHBK) ──
{
  name: 'product',
  type: 'document',
  fields: [
    { name: 'nama', title: 'Nama Produk', type: 'string' },
    { name: 'jenis', title: 'Jenis HHBK', type: 'string' },
    {
      name: 'deskripsi',
      title: 'Deskripsi Produk',
      type: 'object',
      fields: localeFields('text'),
    },
    {
      name: 'cerita',
      title: 'Cerita di Balik Produk',
      type: 'object',
      fields: localeFields('blockContent'),
    },
    { name: 'kutipan', title: 'Kutipan Pengrajin', type: 'object', fields: localeFields('text') },
    { name: 'namaPengrajin', title: 'Nama Pengrajin', type: 'string' },
    { name: 'hargaRange', title: 'Kisaran Harga', type: 'string' },
    { name: 'foto', title: 'Foto Produk', type: 'array', of: [{ type: 'image' }] },
    { name: 'member', title: 'Kelompok Asal', type: 'reference', to: [{ type: 'member' }] },
    {
      name: 'fotoPengrajin',
      title: 'Foto Pengrajin',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'nama' } },
  ],
}

// ── story (Cerita Storytelling) ──
{
  name: 'story',
  type: 'document',
  fields: [
    { name: 'judul', title: 'Judul', type: 'object', fields: localeFields('string') },
    {
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: { list: ['asal-usul', 'anggota', 'produk', 'dampak', 'mitra'] },
    },
    { name: 'narasi', title: 'Narasi', type: 'object', fields: localeFields('blockContent') },
    { name: 'kutipan', title: 'Kutipan', type: 'object', fields: localeFields('text') },
    { name: 'namaNarasumber', title: 'Nama Narasumber', type: 'string' },
    { name: 'peranNarasumber', title: 'Peran Narasumber', type: 'string' },
    {
      name: 'fotoUtama',
      title: 'Foto Utama',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'galeri', title: 'Galeri', type: 'array', of: [{ type: 'image' }] },
    {
      name: 'terkaitKelompok',
      title: 'Kelompok Terkait',
      type: 'reference',
      to: [{ type: 'member' }],
    },
    {
      name: 'terkaitProduk',
      title: 'Produk Terkait',
      type: 'reference',
      to: [{ type: 'product' }],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'judul.id', maxLength: 96 },
    },
    { name: 'tanggal', title: 'Tanggal', type: 'date' },
  ],
}

// ── activity (Berita & Kegiatan) ──
{
  name: 'activity',
  type: 'document',
  fields: [
    { name: 'judul', title: 'Judul', type: 'object', fields: localeFields('string') },
    { name: 'tanggal', title: 'Tanggal', type: 'date' },
    { name: 'konten', title: 'Konten', type: 'object', fields: localeFields('blockContent') },
    { name: 'foto', title: 'Foto', type: 'array', of: [{ type: 'image' }] },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'judul.id', maxLength: 96 },
    },
  ],
}

// ── siteSettings (Singleton) ──
{
  name: 'siteSettings',
  type: 'document',
  fields: [
    { name: 'heroTitle', title: 'Judul Hero', type: 'object', fields: localeFields('string') },
    {
      name: 'heroSubtitle',
      title: 'Subjudul Hero',
      type: 'object',
      fields: localeFields('string'),
    },
    { name: 'heroImage', title: 'Foto Hero', type: 'image', options: { hotspot: true } },
    {
      name: 'stats',
      title: 'Statistik Dampak',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'object', fields: localeFields('string') },
            { name: 'value', title: 'Nilai', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'aboutContent',
      title: 'Konten Tentang',
      type: 'object',
      fields: localeFields('blockContent'),
    },
    {
      name: 'visi',
      title: 'Visi',
      type: 'object',
      fields: localeFields('text'),
    },
    {
      name: 'misi',
      title: 'Misi',
      type: 'object',
      fields: localeFields('text'),
    },
    {
      name: 'mitra',
      title: 'Mitra',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'nama', title: 'Nama', type: 'string' },
            { name: 'logo', title: 'Logo', type: 'image' },
            { name: 'url', title: 'URL', type: 'url' },
            {
              name: 'deskripsi',
              title: 'Deskripsi',
              type: 'object',
              fields: localeFields('text'),
            },
          ],
        },
      ],
    },
    { name: 'kontakEmail', title: 'Email', type: 'string' },
    { name: 'kontakWa', title: 'WhatsApp', type: 'string' },
    { name: 'kontakAlamat', title: 'Alamat', type: 'string' },
  ],
}
```

### 5.5 Internationalization (i18n)

```
Strategy: next-intl App Router
Middleware: Accept-Language header auto-detect

Route Pattern:
  /id/...   → default locale
  /en/...
  /zh/...
  /ja/...

Messages:
  messages/id.json   ← semua label UI
  messages/en.json
  messages/zh.json
  messages/ja.json

CMS Content:
  Setiap field text multilingual (id, en, zh, ja)
  GROQ query filter by locale parameter
```

### 5.6 Rendering Strategy

| Route Pattern | Rendering | Revalidation |
|---|---|---|
| `/` `/[locale]` | ISR | 60s / Sanity webhook |
| `/[locale]/tentang` | ISR | 60s / webhook |
| `/[locale]/kelompok` | ISR | 60s / webhook |
| `/[locale]/kelompok/[slug]` | SSG | On-demand via webhook |
| `/[locale]/produk` | ISR | 60s / webhook |
| `/[locale]/produk/[slug]` | SSG | On-demand via webhook |
| `/[locale]/cerita` | ISR | 60s / webhook |
| `/[locale]/cerita/[slug]` | SSG | On-demand via webhook |
| `/[locale]/kegiatan` | ISR | 60s / webhook |
| `/[locale]/kegiatan/[slug]` | SSG | On-demand via webhook |
| `/[locale]/mitra` | ISR | 60s / webhook |
| `/[locale]/kontak` | Static | — |
| `/studio/[[...index]]` | CSR only | — |

---

## 6. Desain

### 6.1 Palet Warna

| Token | Hex | CSS Variable | Kegunaan |
|---|---|---|---|
| **Primary** | `#2D6A4F` | `--primary` | Navbar, headings, buttons, links |
| **Secondary** | `#8B6F47` | `--secondary` | Card borders, secondary text |
| **Accent** | `#D4A373` | `--accent` | CTA, highlights, badges |
| **Background** | `#FAF9F6` | `--background` | Page background |
| **Foreground** | `#1B4332` | `--foreground` | Body text |
| **Muted** | `#6B7280` | `--muted` | Captions, subtle text |
| **Border** | `#E5E7EB` | `--border` | Card borders, dividers |

### 6.2 Tipografi

| Level | Font | Ukuran |
|---|---|---|
| Heading 1 (Hero) | Inter / Geist | 48-64px / 3-4rem |
| Heading 2 (Section) | Inter / Geist | 32-40px / 2-2.5rem |
| Heading 3 (Card title) | Inter / Geist | 20-24px / 1.25-1.5rem |
| Body | Inter / Geist | 16px / 1rem |
| Caption | Inter / Geist | 14px / 0.875rem |

### 6.3 shadcn/ui Theme Config

```css
@layer base {
  :root {
    --background: 40 33% 98%;
    --foreground: 160 30% 15%;
    --primary: 160 43% 28%;
    --primary-foreground: 0 0% 100%;
    --secondary: 35 25% 42%;
    --secondary-foreground: 0 0% 100%;
    --accent: 30 48% 64%;
    --accent-foreground: 160 30% 15%;
    --muted: 220 14% 54%;
    --muted-foreground: 220 14% 45%;
    --border: 220 13% 91%;
    --radius: 0.5rem;
  }
}
```

### 6.4 Komponen shadcn/ui yang Digunakan

| Komponen | Kegunaan |
|---|---|
| `Button` | CTA, form submit, newsletter |
| `Card` | MemberCard, ProductCard, ActivityCard, StoryCard |
| `Input` | Name, email fields |
| `Textarea` | Message field |
| `Label` | Form labels |
| `Sheet` | Mobile hamburger navbar |
| `DropdownMenu` | Language switcher |
| `NavigationMenu` | Desktop navbar |
| `Separator` | Section dividers |
| `Skeleton` | Loading states (ISR) |
| `Avatar` | Member profile photos |
| `AspectRatio` | Consistent image containers (16:9) |
| `Sonner` | Toast notifications |
| `Badge` | HHBK category tags, story categories |

### 6.5 Komponen UI Kustom

| Komponen | Fungsi |
|---|---|
| `Hero.tsx` | Hero section dengan overlay teks + foto background |
| `StatCard.tsx` | Angka statistik dampak |
| `SectionTitle.tsx` | Judul section dengan dekorasi |
| `MemberCard.tsx` | Card untuk grid kelompok |
| `ProductCard.tsx` | Card untuk grid produk |
| `StoryCard.tsx` | Card untuk grid cerita |
| `ActivityCard.tsx` | Card untuk grid kegiatan |
| `PullQuote.tsx` | Kutipan besar dengan tanda kutip dekoratif |
| `Timeline.tsx` | Timeline vertikal (halaman Tentang) |
| `ProcessFlow.tsx` | Mini infografis proses HHBK |
| `PhotoGallery.tsx` | Galeri foto dengan lightbox |
| `NewsletterForm.tsx` | Form subscribe email |
| `ContactForm.tsx` | Form kontak |
| `RichText.tsx` | Render Portable Text dari Sanity |
| `LanguageSwitcher.tsx` | Dropdown ganti bahasa |

---

## 7. Keamanan

| Vektor | Mitigasi | Implementasi |
|---|---|---|
| **XSS** | `@portabletext/react` — tidak ada `dangerouslySetInnerHTML` | Semua rich text dari Sanity |
| **XSS (form)** | Zod schema validation + server action | Form kontak & newsletter |
| **CSP** | Header Content-Security-Policy | `next.config.ts` headers() |
| **Spam form** | Rate limiting + email validation | Server action + Zod `.email()` |
| **Sanity token leak** | Token read-only publik + CORS lock | `.env.local` |
| **Supply chain** | Dependabot + lockfile | `package-lock.json` |
| **/studio access** | Sanity Authentication (OAuth) | Sanity built-in |

### CSP Policy

```typescript
// next.config.ts
{
  async headers() {
    return [
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
    ];
  },
}
```

---

## 8. Newsletter

### 8.1 Flow

```
User input email → Zod validasi (server action)
  ├─ Gagal → return error message → Sonner toast error
  └─ Sukses →
       ├─ INSERT INTO Supabase: subscribers (email, subscribed_at, locale)
       ├─ Kirim welcome email via Resend
       └─ Sonner toast sukses
```

### 8.2 Supabase Schema

```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  locale TEXT DEFAULT 'id'
);
```

### 8.3 Resend Welcome Template

```
Subject (per locale):
  ID: Selamat bergabung dengan Koperasi Bulau Ngandung
  EN: Welcome to Koperasi Bulau Ngandung
  ZH: 欢迎加入Koperasi Bulau Ngandung
  JA: Koperasi Bulau Ngandungへようこそ

Body:
  Teks welcome + link ke website + info produk unggulan (per locale)
```

---

## 9. SEO

### 9.1 Metadata Strategy

| Elemen | Sumber Data |
|---|---|
| Title tag | `{pageTitle} | Koperasi Bulau Ngandung` |
| Meta description | Dari Sanity siteSettings / per-page |
| OG Image | Hero image atau foto konten dari Sanity |
| Canonical URL | Auto dari path |
| hreflang tags | next-intl auto-generate |
| Sitemap | `sitemap.ts` di App Router |
| Robots.txt | Next.js built-in `robots.ts` |

### 9.2 Structured Data (JSON-LD)

| Schema | Halaman |
|---|---|
| `Organization` | Semua halaman |
| `Product` | Halaman detail produk |
| `Article` | Halaman detail kegiatan & cerita |
| `BreadcrumbList` | Semua halaman detail |

---

## 10. Analytics

| Tool | Data yang Ditracking |
|---|---|
| `@vercel/analytics` | Page views, unique visitors, referrer, country, browser, device |
| Vercel Web Vitals | LCP, CLS, INP, FCP |
| Vercel Dashboard | Deployment history, ISR cache hit rate, function logs |

---

## 11. Non-Functional Requirements

| Kategori | Target |
|---|---|
| **Performance** | Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO) |
| **Mobile Responsive** | Ya — mobile-first design |
| **Aksesibilitas** | WCAG 2.1 AA basic (alt text, aria labels, keyboard nav via Radix primitives) |
| **Browser Support** | Chrome, Firefox, Safari, Edge (last 2 versions) |
| **ISR Cache** | 60 detik default, instant via Sanity webhook |
| **Dark Mode** | Dinonaktifkan — konsistensi branding |
| **Offline** | Tidak diperlukan |

---

## 12. Struktur Folder

```
bulawngandung/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── tentang/page.tsx
│   │   ├── kelompok/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── produk/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── cerita/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── kegiatan/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── mitra/page.tsx
│   │   └── kontak/page.tsx
│   ├── api/
│   │   ├── newsletter/route.ts
│   │   ├── contact/route.ts
│   │   └── revalidate/route.ts
│   ├── studio/[[...index]]/page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── ui/
│   │   ├── Hero.tsx
│   │   ├── StatCard.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── MemberCard.tsx
│   │   ├── ProductCard.tsx
│   │   ├── StoryCard.tsx
│   │   ├── ActivityCard.tsx
│   │   ├── PullQuote.tsx
│   │   ├── Timeline.tsx
│   │   ├── ProcessFlow.tsx
│   │   ├── PhotoGallery.tsx
│   │   ├── NewsletterForm.tsx
│   │   └── ContactForm.tsx
│   └── shared/
│       └── RichText.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── client-server.ts
│   │   ├── queries.ts
│   │   ├── image.ts
│   │   └── localeFields.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── resend.ts
│   ├── zod/
│   │   ├── contact.ts
│   │   └── newsletter.ts
│   └── utils.ts
├── hooks/
│   └── use-toast.ts
├── messages/
│   ├── id.json
│   ├── en.json
│   ├── zh.json
│   └── ja.json
├── sanity/
│   ├── schema/
│   │   ├── index.ts
│   │   ├── member.ts
│   │   ├── product.ts
│   │   ├── story.ts
│   │   ├── activity.ts
│   │   └── siteSettings.ts
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   └── structure.ts
├── types/
│   └── index.ts
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── og-default.jpg
│   └── favicon.ico
├── middleware.ts
├── i18n.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── .env.local
├── .env.local.example
├── .eslintrc.json
└── .gitignore
```

---

## 13. Milestone & Estimasi

| # | Milestone | Estimasi |
|---|---|---|
| 1 | Init project + config (next, tailwind, shadcn, sanity, i18n) | 30 min |
| 2 | Sanity schema (5 schemas) + studio setup | 30 min |
| 3 | Layout: Navbar, Footer, LanguageSwitcher | 30 min |
| 4 | UI components (15 komponen) | 45 min |
| 5 | Halaman: Beranda, Tentang, Mitra, Kontak | 45 min |
| 6 | Halaman: Kelompok + Produk (list + detail) | 45 min |
| 7 | Halaman: Cerita + Kegiatan (list + detail) | 45 min |
| 8 | Newsletter (Supabase + Resend) | 30 min |
| 9 | i18n messages (ID, EN, ZH, JA) | 30 min |
| 10 | SEO (metadata, sitemap, structured data) | 30 min |
| 11 | Security hardening (CSP, Zod, rate limit) | 20 min |
| 12 | Vercel Analytics + testing | 15 min |
| 13 | Deploy + data dummy via Sanity Studio | 30 min |

**Total estimasi:** ~6.5 jam

---

## 14. Risiko & Mitigasi

| Risiko | Likelihood | Mitigasi |
|---|---|---|
| Data 25 kelompok belum tersedia | Tinggi | Gunakan data dummy dulu, update via Sanity Studio |
| Logo & foto real kosong | Tinggi | Placeholder (unsplash/picsum), ganti via Sanity Studio |
| Domain belum ada | Sedang | Deploy ke Vercel subdomain dulu (`bulawngandung.vercel.app`) |
| Admin tidak familiar Sanity Studio | Sedang | Sanity Studio user-friendly — cukup login & edit form fields |
| Vercel Hobby tier limit | Rendah | 100GB bandwidth, cukup untuk tahap awal |
| Konten multilingual kosong | Sedang | Isi `id` dulu, locale lain pakai fallback atau Google Translate |

---

## 15. Definisi Done

### Fungsional

- [ ] Semua 13 halaman publik render dengan benar di 4 locale
- [ ] Sanity Studio bisa login & CRUD semua content type
- [ ] Revalidasi ISR jalan via Sanity webhook
- [ ] Form kontak terkirim ke email koperasi
- [ ] Newsletter subscribe → simpan di Supabase + kirim welcome email via Resend

### Storytelling

- [ ] Setiap produk punya cerita asal minimal 2 paragraf
- [ ] Setiap kelompok punya narasi profil minimal 3 paragraf
- [ ] Minimal 3 spotlight cerita anggota (dari 25 kelompok)
- [ ] Halaman Tentang pakai narasi + timeline, bukan bullet point
- [ ] Hero homepage punya hook emosional
- [ ] Minimal 1 kutipan/testimoni (placeholder dulu)
- [ ] Foto di website menampilkan **manusia + konteks**, bukan produk doang

### Teknis

- [ ] Lighthouse score ≥ 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Mobile responsive (semua halaman)
- [ ] CSP header aktif
- [ ] Vercel Analytics tracking
- [ ] Metadata SEO + sitemap + robots.txt + structured data
- [ ] Language switcher berfungsi di semua halaman
- [ ] Deploy di Vercel

### Keamanan

- [ ] Semua rich text dirender via `@portabletext/react` (no XSS)
- [ ] Semua input form divalidasi Zod
- [ ] Sanity token publik hanya read-only
- [ ] Rate limiting di form kontak & newsletter

---

> **Dokumen ini disusun berdasarkan diskusi kolaboratif.**  
> **Revisi terakhir:** 12 Mei 2026
