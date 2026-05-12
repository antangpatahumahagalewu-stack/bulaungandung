# PATTERNS: Enterprise Patterns Catalog

> Reusable design patterns, code patterns, architecture patterns, and design response patterns.
> Every pattern is battle-tested and mapped to the 7 Design Sensibilities.

---

## 1. UI Component Patterns

### 1.1 Card Pattern Suite

```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │          IMAGE              │    │  ← AspectRatio 16:9, object-cover
│  │     (with overlay)          │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  BADGE (HHBK type)          │    │  ← Accent color, subtle
│  │  TITLE (1-2 lines)          │    │  ← font-semibold, clamp
│  │  DESCRIPTION (2-3 lines)    │    │  ← text-muted, line-clamp-2
│  │  ─────────────────────      │    │  ← Separator
│  │  ✦ icon  metadata           │    │  ← Desa, Luas, Harga
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘

Variants:
  MEMBER_CARD:
    - Image: foto kelompok (manusia + konteks)
    - Badge: 1-2 jenis HHBK
    - Metadata: desa, kecamatan, luas areal (ha)
    - Hover: scale(1.02), shadow-lg, image slight zoom
  
  PRODUCT_CARD:
    - Image: foto produk (close-up + konteks)
    - Badge: jenis HHBK
    - Metadata: harga kisaran, kelompok asal
    - Hover: scale(1.03), shadow-xl, badge color shifts
  
  STORY_CARD:
    - Image: foto utama cerita (hero image)
    - Badge: kategori cerita
    - Metadata: tanggal, narasumber
    - Hover: image brightness increases 10%
  
  ACTIVITY_CARD:
    - Image: thumbnail kegiatan (smaller, 4:3)
    - Badge: none
    - Metadata: tanggal, excerpt 2 baris
    - Hover: subtle border accent appears
```

### 1.2 Hero Depth Stack

```
Z-index layers:
  z-0: Background image (next/image, fill, objectFit=cover)
  z-10: Gradient overlay (absolute, inset-0, pointer-events-none)
  z-20: Content container (relative, max-w-7xl, mx-auto, px-6)
  z-30: Stats strip (absolute, bottom-8, right-8)
  z-40: Scroll indicator (absolute, bottom-4, center-x)

Parallax effect:
  onScroll: background translateY(-scrollY * 0.3)
  onScroll: overlay opacity transitions (top→80%, mid→40%, bottom→20%)
  static: content stays fixed
```

### 1.3 Glassmorphism Pattern

```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

/* Stats strip on hero */
.hero-stats {
  @apply glass;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2rem);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2vw, 1.5rem);
}

/* Navbar on scroll */
.navbar-scrolled {
  @apply glass;
  background: rgba(250, 249, 246, 0.85); /* background color with opacity */
}
```

---

## 2. Animation Patterns

### 2.1 Scroll-Triggered Reveal (Standard)

```javascript
// Fade up + slide in
gsap.from(element, {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: element,
    start: 'top 85%',
    toggleActions: 'play none none reverse',
  }
});
```

### 2.2 Stagger Card Reveal

```javascript
// Cards masuk satu per satu dengan stagger
gsap.from(cards, {
  opacity: 0,
  y: 60,
  scale: 0.95,
  duration: 0.6,
  stagger: 0.1,
  ease: 'back.out(1.7)',
  scrollTrigger: {
    trigger: container,
    start: 'top 80%',
  }
});
```

### 2.3 Counter Animation (Stats)

```javascript
// Angka statistik count-up
gsap.from(statElement, {
  textContent: 0,
  duration: 2,
  ease: 'power2.out',
  snap: { textContent: 1 },
  scrollTrigger: {
    trigger: statElement,
    start: 'top 90%',
  }
});
```

### 2.4 Pull Quote Entrance

```javascript
// Quote masuk dengan dramatic pause
gsap.from(quoteMark, { opacity: 0, scale: 3, duration: 0.4, ease: 'power3.out' });
gsap.from(quoteText, { opacity: 0, y: 30, duration: 0.8, delay: 0.2, ease: 'power3.out' });
gsap.from(quoteAuthor, { opacity: 0, x: -20, duration: 0.5, delay: 0.6, ease: 'power2.out' });
```

---

## 3. Architecture Patterns

### 3.1 Next.js App Router Pattern

```
app/
├── [locale]/           ← i18n middleware injects locale
│   ├── layout.tsx      ← Root layout (Navbar + Footer + providers)
│   ├── page.tsx        ← Beranda (ISR 60s)
│   ├── [entity]/       ← Dynamic routes
│   │   ├── page.tsx    ← List page (ISR 60s)
│   │   └── [slug]/     ← Dynamic detail
│   │       └── page.tsx ← Detail page (SSG + on-demand revalidation)
│   └── ...
├── api/                ← Server Actions / Route Handlers
│   ├── newsletter/
│   ├── contact/
│   └── revalidate/
└── studio/             ← Sanity Studio (CSR only)
```

### 3.2 Server Component / Client Component Boundary

```
Server Component (default):
  - Data fetching (Sanity GROQ)
  - Static rendering
  - SEO metadata

Client Component ('use client'):
  - GSAP / ScrollTrigger animations
  - Splitting.js text effects
  - Interactive components (forms, modals, galleries)
  - Browser APIs (localStorage, etc.)

Pattern: Server parent → Client child with data as props
```

### 3.3 i18n Architecture

```
middleware.ts:
  Accept-Language header → detect locale
  Redirect / → /id (default)
  Pass locale to all server components

Layout:
  next-intl NextIntlClientProvider wraps children
  Messages loaded per locale from /messages/{locale}.json

Component:
  useTranslations() for UI strings
  CMS data: locale parameter in GROQ query
  Dynamic: CMS returns object {id, en, zh, ja}, component selects current locale
```

---

## 4. Data Patterns

### 4.1 Sanity GROQ Query Pattern

```typescript
// Always filter by locale, always include slug, always use projections
const MEMBERS_QUERY = groq`
  *[_type == "member"] | order(nama asc) {
    nama,
    desa,
    kecamatan,
    luasAreal,
    jenisHhbk,
    "deskripsi": deskripsi.${locale},
    "slug": slug.current,
    "foto": foto.asset->url
  }
`;

// Detail page with related products
const MEMBER_QUERY = groq`
  *[_type == "member" && slug.current == $slug][0] {
    ...,
    "deskripsi": deskripsi.${locale},
    "foto": foto.asset->url,
    "produk": *[_type == "product" && references(^._id)] {
      nama, jenis, "slug": slug.current, "foto": foto[0].asset->url
    }
  }
`;
```

### 4.2 ISR Revalidation Pattern

```typescript
// On-demand revalidation via Sanity webhook
export async function POST(request: Request) {
  const { body, headers } = request;
  const secret = headers.get('x-sanity-secret');
  
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const { _type, slug } = body;
  
  // Revalidate specific pages
  const paths: string[] = [];
  
  switch (_type) {
    case 'member':
      paths.push(`/id/kelompok`);
      if (slug) paths.push(`/id/kelompok/${slug.current}`);
      break;
    case 'product':
      paths.push(`/id/produk`);
      if (slug) paths.push(`/id/produk/${slug.current}`);
      break;
    case 'siteSettings':
      paths.push(`/id`);
      paths.push(`/id/tentang`);
      paths.push(`/id/mitra`);
      break;
    // ... all content types
  }
  
  for (const path of paths) {
    await res.revalidate(path);
  }
  
  return Response.json({ revalidated: paths });
}
```

---

## 5. Design Response Patterns

Setiap kali Design Sense Gate memberi verdict REVISE, gunakan pattern berikut:

### 5.1 "Geser 4px" (Micro-Adjustment)

```
Trigger: SENSE #1 (Rasa Estetika) REVISE
Symptom: "Ada yang kurang enak dilihat, tapi nggak tahu kenapa"

Response:
  Step 1: Coba geser elemen ±4px horizontal, ±8px vertikal
  Step 2: Coba naik/turunkan font-size 0.125rem
  Step 3: Coba tambah/kurangi padding 4px
  Step 4: Bandingkan dengan aturan "8px grid" — apakah ada yang off-grid?
  Step 5: Jika tetap aneh → ubah 1 warna (lighten/darken 5%)
```

### 5.2 "Lapisan Depth" (Spatial Enhancement)

```
Trigger: SENSE #2 (Imajinasi Spasial) REVISE
Symptom: "Terlalu flat, nggak ada depth"

Response:
  Step 1: Tambahkan 1 layer overlay tambahan (gradient transparan)
  Step 2: Beri shadow subtle pada elemen yang harus "mengapung"
  Step 3: Coba parallax ringan pada background element
  Step 4: Tambahkan z-index hierarchy yang jelas (bg < content < interactive)
  Step 5: Beri animasi entrance yang mengesankan depth (scale + fade bersamaan)
```

### 5.3 "Ruang Bernapas" (Breathing Room)

```
Trigger: SENSE #1 or SENSE #4 REVISE
Symptom: "Terlalu padat, mata nggak bisa istirahat"

Response:
  Step 1: Tambah padding section dari 2rem → 4rem
  Step 2: Tambah gap antar elemen dari 1rem → 1.5rem
  Step 3: Kurangi jumlah elemen per section (max 3-4 focal points)
  Step 4: Hapus 1 elemen dekoratif yang tidak esensial
  Step 5: Tambah white space di sekitar CTA (isolasi untuk emphasis)
```

### 5.4 "Sentuhan Manusia" (Human Touch)

```
Trigger: SENSE #6 (Kesadaran Konteks) REVISE
Symptom: "Terlalu corporate, kurang hangat, kurang Dayak"

Response:
  Step 1: Ganti font weight dari 800 → 700 (lebih hangat)
  Step 2: Tambahkan tekstur subtle (noise 2%, grain)
  Step 3: Gunakan warna earth tone (bukan pure gray/black)
  Step 4: Foto manusia > foto landscape sebagai prioritas
  Step 5: Teks naratif > bullet point (paragraf pendek, conversational)
```

### 5.5 "Keberanian Bereksperimen" (Bold Experimentation)

```
Trigger: SENSE #5 (Eksplorasi) REVISE
Symptom: "Aman-aman saja, membosankan, templat banget"

Response:
  Step 1: Coba layout alternatif (grid asimetris, bukan simetris)
  Step 2: Coba 1 elemen yang "melanggar" grid (overlap, full-bleed)
  Step 3: Coba tipografi eksperimental untuk 1 heading
  Step 4: Coba animasi yang tidak biasa (bukan fade-up melulu)
  Step 5: Evaluasi setelah 3 alternatif — pilih yang paling "bernyawa"
```

### 5.6 "Empati Dulu" (Empathy First)

```
Trigger: SENSE #3 (Empati) REVISE
Symptom: "Mungkin susah buat user X"

Response:
  Step 1: Switch persona ke yang paling rentan (lansia, low-vision, slow-internet)
  Step 2: Tes touch target — semua harus ≥ 48px
  Step 3: Tes contrast — semua teks harus ≥ 4.5:1
  Step 4: Tes tanpa JavaScript — konten utama harus tetap bisa diakses
  Step 5: Tes keyboard — semua interaksi harus bisa via Tab+Enter
```

---

## 6. Anti-Patterns (JANGAN)

```
❌ HERO ANTI-PATTERNS:
   - 5+ elemen bersaing dalam hero (pesan hilang)
   - Teks di atas foto tanpa overlay (tidak terbaca)
   - CTA "Pelajari Lebih Lanjut" (generik, nggak spesifik)
   - Animasi masuk yang > 2 detik (visitor sudah pergi)

❌ CARD ANTI-PATTERNS:
   - Grid 5+ kolom (terlalu padat, overload kognitif)
   - Semua card ukuran sama (membosankan, nggak ada hierarki)
   - Deskripsi terlalu panjang di card (card = pintu, bukan kamar)
   - Foto tanpa manusia (terlalu abstrak)

❌ NAVIGATION ANTI-PATTERNS:
   - Menu > 7 item (gunakan dropdown/submenu)
   - Hamburger menu di desktop (mengapa disembunyikan?)
   - Language switcher tanpa bendera/nama bahasa (bingung)
   - Navbar scroll-aware tanpa smooth transition (kaku)

❌ ANIMATION ANTI-PATTERNS:
   - Animasi dengan durasi > 1 detik (visitor menunggu)
   - Animasi properti width/height/top/left (jank, bukan 60fps)
   - Semua elemen dianimasikan (tidak ada yang spesial)
   - Tidak ada prefers-reduced-motion fallback (exclusionary)
```

---

## 7. The "Bulau Ngandung" Pattern Language

Pattern spesifik untuk website ini, terinspirasi dari alam Kalimantan:

```
PATTERN: Canopy Light
  Deskripsi: Seperti sinar matahari menembus kanopi — terang di tengah, gelap di tepi
  Implementasi: Radial gradient dari center-bright ke edge-dark sebagai section background
  Digunakan di: Hero overlay, Section divider, Card hover state

PATTERN: River Flow
  Deskripsi: Navigasi dan scroll mengalir seperti sungai — tidak terputus, tidak kaku
  Implementasi: Smooth scroll (Lenis), transisi antar section yang seamless, 
                animasi yang "mengalir" (ease inOut, bukan linear)
  Digunakan di: Seluruh website — scroll philosophy

PATTERN: Woven Grid
  Deskripsi: Grid card tidak kaku 3x3 — ada variasi ukuran, seperti anyaman
  Implementasi: CSS Grid dengan named areas, beberapa card span 2 kolom,
                susunan yang tidak monoton
  Digunakan di: /kelompok, /produk, /cerita

PATTERN: Forest Depth
  Deskripsi: Website memiliki "depth of field" — foreground tajam, background blur
  Implementasi: Glassmorphism + backdrop-filter, z-index layering,
                parallax multi-layer (3 lapis: foreground, midground, background)
  Digunakan di: Hero, Stat strip overlay, Modal/gallery

PATTERN: Morning Mist
  Deskripsi: Gradien dan overlay yang transparan, seperti kabut pagi di hutan
  Implementasi: Gradien dengan opacity rendah, transisi warna halus,
                elemen UI yang "nyaris tak terlihat" tapi penting
  Digunakan di: Section dividers, Card borders, Background texture

PATTERN: Earth Anchor
  Deskripsi: Footer dan elemen bawah website "membumi" — kokoh, gelap, berat
  Implementasi: Footer dengan background gelap (forest green near-black),
                tipografi yang lebih bold, kontras tinggi
  Digunakan di: Footer, Bottom CTA, Copyright bar
```

---

*Patterns are not rules — they are wisdom crystallized from experience. Apply with sensitivity, not rigidity.*
