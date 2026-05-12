# GENERATORS: Content & Data Generation Engine

> AI-driven content generation: 25 kelompok, 15+ produk, 8+ cerita — semua dalam 4 bahasa.
> Semua konten realistis, kultural-akurat, siap pakai di Sanity CMS.

---

## 1. Content Generation Pipeline

```
PRD §4 Storytelling Framework
         ↓
    Analyze context (Dayak Ngaju, Kapuas, HHBK, hutan tropis)
         ↓
    ┌──────────────────────────────────────┐
    │  Generate in ID (source language)    │
    │  → 25 kelompok profiles              │
    │  → 15+ produk stories                │
    │  → 8-12 storytelling narratives      │
    │  → 5 spotlight member stories        │
    │  → Pull quotes from members          │
    └──────────────────┬───────────────────┘
         ↓
    Translate + localize to EN, ZH, JA
         ↓
    Validate cultural accuracy (Dayak context)
         ↓
    Output: JSON ready for Sanity import
```

---

## 2. 25 Kelompok PS — Generation Template

Setiap kelompok di-generate dengan data berikut:

```yaml
generation_rules:
  nama_kelompok:
    pattern: "[Nama Desa/Dayak] [Jenis HHBK andalan]"
    examples:
      - "Manuhing Lestari Madu"
      - "Tumbang Jutuh Rotan"
      - "Buntoi Aren Sejahtera"
      - "Penda Ketapi Purun"
      - "Mandomai Gaharu"
    constraints:
      - Nama harus berbau Dayak Ngaju
      - Harus menyertakan jenis HHBK atau konsep lestari/sejahtera
  
  desa:
    source: desa_di_kabupaten_kapuas
    examples: ["Manuhing", "Tumbang Jutuh", "Buntoi", "Penda Ketapi", "Mandomai", 
               "Anjir Serapat", "Basuta", "Belawa", "Dadahup", "Hurung Tabengan"]
  
  kecamatan:
    source: kecamatan_di_kapuas
    examples: ["Kapuas Hulu", "Kapuas Tengah", "Kapuas Hilir", "Timpah", "Mantangai",
               "Kapuas Barat", "Kapuas Murung", "Basarang", "Selat"]
  
  luas_areal:
    range: [15, 350]  # hektar
    distribution: weighted_toward_small  # lebih banyak kelompok kecil
  
  jenis_hhbk:
    pool:
      - "Madu Hutan (Apis dorsata)"
      - "Gula Aren (Arenga pinnata)"
      - "Rotan (Calamus spp.)"
      - "Purun (Lepironia articulata)"
      - "Gaharu (Aquilaria malaccensis)"
      - "Getah Jelutung (Dyera costulata)"
      - "Buah Tengkawang (Shorea spp.)"
      - "Jamur Tiram Hutan"
      - "Minyak Kayu Putih"
      - "Kerajinan Bambu"
    rules:
      - Setiap kelompok minimal 1, maksimal 3 jenis HHBK
      - Madu dan Gula Aren paling umum
      - Gaharu hanya untuk kelompok dengan luas > 50ha
  
  deskripsi:
    template_structure:
      paragraf_1: "Sejarah kelompok — kapan terbentuk, siapa pendiri, kenapa terbentuk"
      paragraf_2: "Keseharian — aktivitas harian, teknik tradisional, ritme musim"
      paragraf_3: "HHBK andalan — produk utama, proses, keunikan"
      paragraf_4: "Tantangan & harapan — akses pasar, regenerasi, lingkungan"
    tone: hangat, naratif, manusiawi (sesuai PRD §4.3)
    length: 3-4 paragraf, 150-250 kata per paragraf
```

### Contoh Output — 1 Kelompok (ID)

```json
{
  "nama": "Manuhing Madu Lestari",
  "desa": "Manuhing",
  "kecamatan": "Kapuas Hulu",
  "luasAreal": 78,
  "jenisHhbk": ["Madu Hutan (Apis dorsata)", "Rotan (Calamus spp.)"],
  "deskripsi": {
    "id": "Tahun 2018, delapan keluarga petani di Desa Manuhing memutuskan sesuatu yang tidak biasa: mereka tidak lagi menjual madu sendiri-sendiri ke tengkulak dengan harga murah. Dari pertemuan di balai desa yang hanya diterangi lampu minyak, lahirlah Kelompok Manuhing Madu Lestari.\n\nSetiap malam saat bulan gelap — karena lebah Apis dorsata lebih tenang saat bulan mati — Pak Untung dan timnya mendaki pohon ulin setinggi 30-40 meter. Dengan penerangan seadanya, mereka memanen madu dari sarang liar tanpa merusak koloni. Satu pohon bisa menghasilkan 15-25kg madu per panen. Pekerjaan ini diwariskan turun-temurun — Pak Untung belajar dari ayahnya, yang belajar dari kakeknya.\n\nSelain madu, kelompok ini juga menganyam rotan menjadi tikar, keranjang, dan tas. Perempuan-perempuan di kelompok — dipimpin Ibu Rina — mengerjakan anyaman di sela mengurus rumah tangga. Satu tas rotan ukuran sedang membutuhkan 3-4 hari pengerjaan. Motif anyaman terinspirasi dari alam: daun pakis, sisik ikan, dan aliran sungai.\n\nTantangan terbesar mereka adalah akses jalan. Dari desa ke kota kabupaten butuh 3 jam melalui jalan tanah yang licin saat hujan. Tapi Pak Untung tidak mengeluh. 'Selama hutan masih berdiri, kami masih bisa hidup,' katanya sambil tersenyum. Harapannya: suatu hari produk mereka bisa dikenal sampai ke luar negeri — dan anak-anak mereka bisa sekolah tinggi tanpa harus meninggalkan desa.",
    "en": "In 2018, eight farming families in Manuhing Village made an unusual decision: they would no longer sell their honey individually to middlemen at rock-bottom prices. From a meeting in the village hall lit only by oil lamps, the Manuhing Sustainable Honey Group was born.\n\nEvery night during the dark moon — because Apis dorsata bees are calmer then — Pak Untung and his team climb 30-40 meter ironwood trees. With minimal lighting, they harvest honey from wild hives without destroying the colony. A single tree can yield 15-25kg of honey per harvest. This work has been passed down through generations — Pak Untung learned from his father, who learned from his grandfather.\n\nBeyond honey, the group also weaves rattan into mats, baskets, and bags. The women of the group — led by Ibu Rina — do the weaving between household duties. A medium-sized rattan bag takes 3-4 days to complete. The weaving patterns are inspired by nature: fern leaves, fish scales, and flowing rivers.\n\nTheir biggest challenge is road access. From the village to the district town takes 3 hours over dirt roads that become slippery when it rains. But Pak Untung doesn't complain. 'As long as the forest still stands, we can still live,' he says with a smile. His hope: one day their products will be known abroad — and their children can get higher education without having to leave the village.",
    "zh": "2018年，Manuhing村的八户农家做出了一个不寻常的决定：他们不再以低价单独向中间商出售蜂蜜。在仅靠油灯照明的村公所里，Manuhing可持续蜂蜜小组成立了。\n\n每当月黑之夜——因为Apis dorsata蜜蜂在月缺时更安静——Untung先生和他的团队爬上30-40米高的铁木树。在微弱的照明下，他们从野生蜂巢中采集蜂蜜而不破坏蜂群。一棵树每次可产出15-25公斤蜂蜜。这项技艺代代相传——Untung先生从父亲那里学来，父亲从祖父那里学来。\n\n除蜂蜜外，该小组还用藤条编织垫子、篮子和袋子。小组中的妇女——由Rina女士带领——在家务之余进行编织。一个中等大小的藤编包需要3-4天才能完成。编织图案灵感来自自然：蕨叶、鱼鳞和流动的河流。\n\n他们最大的挑战是道路通行。从村庄到县城需要3小时，途经雨天湿滑的土路。但Untung先生并无怨言。他微笑着说：\"只要森林还在，我们就能继续生活。\"他的希望是：有朝一日他们的产品能享誉海外——而他们的孩子可以接受高等教育而不必离开村庄。",
    "ja": "2018年、マヌヒン村の8家族の農家は、異例の決断をした。もはや蜂蜜を個別に仲買人に安値で売らないことにしたのだ。石油ランプだけが灯る村の集会所での会合から、マヌヒン持続可能蜂蜜グループが生まれた。\n\n月が暗い夜ごと——Apis dorsata蜂は月が欠けているときほど穏やかだから——ウンタンさんと彼のチームは30〜40メートルの鉄木の木に登る。最小限の照明で、コロニーを壊すことなく野生の巣から蜂蜜を収穫する。一本の木から一回の収穫で15〜25kgの蜂蜜が採れる。この仕事は代々受け継がれてきた——ウンタンさんは父から学び、父は祖父から学んだ。\n\n蜂蜜に加えて、グループはラタンをマットやバスケット、バッグに編む。グループの女性たち——リナさんが率いる——は家事の合間に編み物を行う。中型のラタンバッグは完成まで3〜4日かかる。編み模様は自然から着想を得ている：シダの葉、魚の鱗、流れる川。\n\n最大の課題は道路アクセスだ。村から県都まで、雨で滑りやすくなる未舗装道路を3時間かけて移動する。しかしウンタンさんは文句を言わない。「森が残っている限り、私たちは生き続けられる」と彼は微笑みながら言う。彼の願いは：いつか彼らの製品が海外で知られること——そして子供たちが村を離れずに高等教育を受けられること。"
  },
  "slug": "manuhing-madu-lestari",
  "foto": {
    "description": "Foto kelompok — 8 anggota berdiri di depan pohon ulin besar, beberapa memegang peralatan panen madu tradisional. Latar belakang hutan tropis Kapuas yang lebat. Cahaya pagi yang lembut menerobos kanopi.",
    "prompt": "A group of 8 Dayak farmers in Kapuas, Central Kalimantan, standing proudly in front of a massive ironwood tree. Some holding traditional honey harvesting tools. Lush tropical rainforest background. Soft morning light filtering through the canopy. Warm, human, documentary style photography. 8K, photorealistic."
  }
}
```

---

## 3. Produk HHBK — Generation Template

```yaml
generation_rules:
  produk:
    pool:
      - nama: "Madu Hutan Kapuas"
        jenis: "Madu Hutan"
        cerita_core: "Dipanen malam hari dari pohon ulin setinggi 40m oleh petani Dayak"
        harga_range: "Rp 150.000 - Rp 250.000 / 500ml"
        kutipan_core: "Setiap tetes madu ini adalah nyali — kami panjat pohon 40 meter dalam gelap."
        
      - nama: "Gula Aren Organik"
        jenis: "Gula Aren"
        cerita_core: "Disadap pagi buta, dimasak 6 jam dengan kayu bakar"
        harga_range: "Rp 45.000 - Rp 65.000 / kg"
        kutipan_core: "Pukul 4 pagi kami sudah di pohon. Satu pohon, tiga liter nira — cukup untuk sehari."
        
      - nama: "Anyaman Rotan Asli Dayak"
        jenis: "Kerajinan Rotan"
        cerita_core: "Dianyam tangan oleh perempuan Dayak, teknik turun-temurun 4 generasi"
        harga_range: "Rp 75.000 - Rp 350.000 (tergantung ukuran)"
        kutipan_core: "Satu tas = tiga hari kerja. Tapi ini bukan sekadar tas — ini warisan."
        
      - nama: "Kerajinan Purun Ramah Lingkungan"
        jenis: "Kerajinan Purun"
        cerita_core: "Tumbuhan gambut alami, alternatif pengganti plastik"
        harga_range: "Rp 25.000 - Rp 120.000"
        kutipan_core: "Lahan gambut bukan cuma tempat — dia hidup. Purun tumbuh di sana, kami anyam jadi masa depan."
        
      - nama: "Minyak Gaharu Premium"
        jenis: "Minyak Atsiri"
        cerita_core: "Pohon gaharu liar yang terinfeksi alami, menghasilkan resin berharga"
        harga_range: "Rp 500.000 - Rp 2.000.000 / 10ml"
        kutipan_core: "Satu pohon gaharu bisa menyekolahkan tiga anak sampai lulus."
        
      - nama: "Getah Jelutung Alami"
        jenis: "Getah Hutan"
        cerita_core: "Bahan baku permen karet alami, disadap secara lestari"
        harga_range: "Rp 80.000 - Rp 150.000 / kg"
        kutipan_core: "Kami tidak menebang pohon — kami hanya meminjam getahnya."
        
      - nama: "Buah Tengkawang Kering"
        jenis: "Hasil Hutan Pangan"
        cerita_core: "Buah musiman dari pohon tengkawang, sumber lemak nabati alami"
        harga_range: "Rp 35.000 - Rp 55.000 / kg"
        kutipan_core: "Setahun sekali pohon tengkawang berbuah. Itu saat paling dinanti."
        
      - nama: "Jamur Tiram Hutan Organik"
        jenis: "Hasil Hutan Pangan"
        cerita_core: "Tumbuh alami di batang kayu mati, dipanen pagi hari"
        harga_range: "Rp 30.000 - Rp 50.000 / kg"
        kutipan_core: "Hutan memberi kami makanan sejak nenek moyang. Kami hanya meneruskan."

  cerita_produk:
    template: |
      Paragraf 1: Dari mana asalnya? Di mana tumbuh/dipanen? Siapa yang terlibat?
      Paragraf 2: Bagaimana prosesnya? Teknik tradisional apa yang digunakan? 
      Paragraf 3: Kenapa istimewa? Apa yang membedakan dari produk serupa?
      Paragraf 4: Dampak — bagaimana produk ini mengubah hidup komunitas?
    tone: hangat, deskriptif, puitis tanpa berlebihan
    length: 250-350 kata (ID), setara di locale lain
```

---

## 4. Storytelling Narrative — Generation Template

```yaml
cerita_categories:
  - asal_usul: "Cerita tentang asal-usul koperasi, filosofi nama, sejarah"
  - anggota: "Spotlight anggota — petani, pengrajin, pengurus"
  - produk: "Kisah di balik produk spesifik"
  - dampak: "Dampak koperasi terhadap komunitas"
  - mitra: "Cerita kemitraan dengan AMAL dan lainnya"

narrative_structure:
  opening: "Hook emosional dalam 1-2 kalimat pertama"
  body: "Kronologi naratif, detail spesifik, kutipan narasumber"
  climax: "Momen transformatif — titik balik cerita"
  closing: "Refleksi, harapan, ajakan halus"
  
tone: "Hangat, manusiawi, visual — seperti mendengar cerita di teras rumah (PRD §4.3)"
min_length: 400 kata
max_length: 800 kata
```

---

## 5. Pull Quote Generator

```yaml
generation_rules:
  sumber: anggota_kelompok | pengrajin | pengurus_koperasi | mitra_AMAL
  karakteristik:
    - Mengandung kebijaksanaan lokal
    - Spesifik (ada detail konkret)
    - Emosional (bisa menyentuh)
    - Singkat (15-30 kata)
  examples:
    - '"Saya tidak punya ijazah, tapi saya bisa membaca hutan." — Pak Untung, 58 tahun, petani madu'
    - '"Setiap anyaman adalah doa. Kami anyam pelan-pelan, sambil berharap anak cucu bisa hidup lebih baik." — Ibu Rina, 42 tahun, penganyam rotan'
    - '"Hutan bukan warisan nenek moyang — hutan adalah titipan anak cucu." — Pak Daud, ketua koperasi'
    - '"Dulu saya malu jadi petani. Sekarang saya bangga. Ternyata dunia butuh madu kami." — Pak Untung'
```

---

## 6. Multi-Locale Translation Pipeline

```yaml
translation_strategy:
  source: id (Bahasa Indonesia)
  targets: [en, zh, ja]
  
  rules:
    - Preserve nama orang, nama desa, istilah Dayak (tidak diterjemahkan)
    - HHBK terms harus akurat secara teknis (cek terminologi kehutanan)
    - Tone harus konsisten antar locale (hangat, manusiawi)
    - Idiom lokal di-parafrase, bukan diterjemahkan literal
    - Zh: gunakan 普通话 (Mandarin standar)
    - Ja: gunakan です・ます調 (formal-polite) untuk tone profesional tapi hangat
  
  quality_check:
    - Native speaker review (simulasi)
    - Back-translation consistency check
    - Cultural sensitivity check (tiap locale)
```

---

## 7. Image Prompt Generator

Untuk DALL-E / Midjourney / Stable Diffusion:

```yaml
style: "Documentary photography — photorealistic, warm tones, natural lighting"
specs: "8K resolution, 16:9 aspect ratio, no text/watermark"

prompts:
  hero:
    - "Aerial drone photography of dense tropical rainforest in Kapuas, Central Kalimantan. Morning mist rising above the canopy. Golden sunlight piercing through clouds. Majestic, mysterious, hopeful atmosphere. 8K, ultra-realistic, National Geographic style."
  
  kelompok:
    - "Portrait of 5-10 Dayak indigenous farmers standing together in front of traditional wooden house. Some holding rattan baskets and honey harvesting tools. Proud, dignified expressions. Natural jungle background. Soft golden hour light. Documentary style photography, warm earth tones."
  
  produk:
    - "Close-up product photography of wild forest honey jar on rustic wooden table. Golden honey visible through glass. Rattan weaving, tropical leaves, and traditional tools as props. Soft natural window light. Warm amber and green tones. 8K, commercial quality, minimal style."
  
  proses:
    - "Dayak farmer climbing tall ironwood tree at dusk, traditional honey harvesting. Silhouette against orange sunset sky. Dramatic, heroic composition. 8K, photorealistic, adventure documentary style."
```

---

*Semua konten yang di-generate siap untuk langsung diimpor ke Sanity CMS. Setiap konten memiliki versi 4 bahasa lengkap. Data realistis, kultural-akurat, dan secara naratif kohesif dengan PRD §4.*
