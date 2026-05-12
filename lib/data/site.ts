import type { SiteSettings, StatItem, TimelineItem, PilarCerita, PullQuoteData, Activity } from "@/types";

export const siteSettings: SiteSettings = {
  heroTitle: {
    id: "Dari Hutan Kapuas, untuk Dunia",
    en: "From Kapuas Forests, to the World",
    zh: "来自卡普阿斯的森林，走向世界",
    ja: "カプアスの森から、世界へ",
  },
  heroSubtitle: {
    id: "Koperasi Perhutanan Sosial Bulau Ngandung. 25 kelompok masyarakat adat Dayak yang menjaga hutan, memberdayakan komunitas, dan membangun ekonomi dari hasil hutan bukan kayu.",
    en: "Bulau Ngandung Social Forestry Cooperative. 25 Dayak indigenous community groups protecting forests, empowering communities, and building economies from non-timber forest products.",
    zh: "Bulau Ngandung社会林业合作社。25个达雅克土著社区小组保护森林、赋能社区，并以非木材林产品建设经济。",
    ja: "ブラウ・ガンドゥン社会林業協同組合。25のダヤック先住コミュニティグループが森林を守り、コミュニティに力を与え、非木材林産物から経済を築いています。",
  },
  heroImage: "/images/hero-hutan-kapuas.jpg",
  stats: [
    {
      label: {
        id: "Kelompok Perhutanan Sosial",
        en: "Social Forestry Groups",
        zh: "社会林业小组",
        ja: "社会林業グループ",
      },
      value: "25",
    },
    {
      label: {
        id: "Total Luas Areal",
        en: "Total Managed Area",
        zh: "管理总面积",
        ja: "総管理面積",
      },
      value: "56.771 Ha",
    },
    {
      label: {
        id: "Jenis Produk HHBK",
        en: "NTFP Product Types",
        zh: "非木材林产品种类",
        ja: "非木材林産物の種類",
      },
      value: "15+",
    },
  ],
  aboutContent: {
    id: "Koperasi Perhutanan Sosial Bulau Ngandung lahir dari mimpi sederhana: masyarakat adat Dayak di Kabupaten Kapuas bisa hidup sejahtera dari hutan tanpa harus menebangnya. Didirikan pada tahun 2023, koperasi ini menjadi rumah bersama bagi 25 kelompok perhutanan sosial yang tersebar di lima kecamatan — Mantangai, Bataguh, Dadahup, Kapuas Hulu, dan Mandau Talawang.\n\nTotal areal kelola mencapai 56.771 hektar, terdiri dari hutan lindung dan hutan produksi di dua tipe ekosistem: gambut dan mineral. Di atas lahan ini, 800 lebih kepala keluarga menjalankan kehidupan mereka — bukan sebagai perambah atau perusak, tapi sebagai penjaga hutan yang mengambil hasilnya secara lestari.\n\nProduk-produk yang dihasilkan adalah hasil hutan bukan kayu (HHBK) premium: madu hutan liar, madu kelulut, gula aren, kopi liberika gambut, kerajinan purun dan rotan, minyak kayu manis, hingga ikan asap khas gambut. Setiap produk membawa cerita tentang hutan yang berdiri, tangan yang terampil, dan hati yang peduli.\n\nBulau Ngandung bukan sekadar koperasi dagang. Ia adalah gerakan. Gerakan untuk membuktikan bahwa ekonomi bisa berjalan tanpa menghancurkan ekologi. Gerakan untuk menunjukkan bahwa masyarakat adat adalah penjaga hutan terbaik — bukan korporasi, bukan pemerintah. Dan gerakan untuk memastikan bahwa anak cucu Dayak Ngaju masih bisa menghirup udara segar dari hutan yang sama yang dihirup leluhur mereka.\n\nKami membuka pintu selebar-lebarnya. Bagi pembeli yang mencari produk etis dan berkelanjutan. Bagi peneliti yang ingin belajar tentang pengelolaan hutan berbasis masyarakat. Bagi siapa pun yang percaya bahwa masa depan Kalimantan ada di hutan yang berdiri — bukan di tambang, bukan di kebun sawit, bukan di lahan yang terbakar.",
    en: "The Bulau Ngandung Social Forestry Cooperative was born from a simple dream: Dayak indigenous communities in Kapuas Regency could live prosperously from forests without having to cut them down. Founded in 2023, this cooperative is a shared home for 25 social forestry groups spread across five districts — Mantangai, Bataguh, Dadahup, Kapuas Hulu, and Mandau Talawang.\n\nTotal managed area reaches 56,771 hectares, consisting of protection and production forests across two ecosystem types: peatland and mineral soil. On this land, more than 800 families live their lives — not as encroachers or destroyers, but as forest guardians who harvest its bounty sustainably.\n\nThe products produced are premium non-timber forest products (NTFPs): wild forest honey, kelulut honey, palm sugar, peatland liberica coffee, purun and rattan crafts, cinnamon oil, and peat-style smoked fish. Every product carries a story of standing forests, skilled hands, and caring hearts.\n\nBulau Ngandung is not just a trading cooperative. It is a movement. A movement to prove that economy can run without destroying ecology. A movement to show that indigenous communities are the best forest guardians — not corporations, not governments. And a movement to ensure that Dayak Ngaju grandchildren can still breathe fresh air from the same forests their ancestors breathed.\n\nWe open our doors wide. For buyers seeking ethical and sustainable products. For researchers wanting to learn about community-based forest management. For anyone who believes that Kalimantan's future lies in standing forests — not in mines, not in palm oil plantations, not in burned land.",
    zh: "Bulau Ngandung社会林业合作社诞生于一个简单的梦想：卡普阿斯县的达雅克土著社区能够从森林中繁荣生活而无需砍伐它们。成立于2023年，该合作社是分布在五个区——曼唐艾、巴塔古、达达胡普、卡普阿斯上游和曼道塔拉旺——的25个社会林业小组的共同家园。\n\n管理总面积达56,771公顷，包括跨两个生态系统类型的保护林和生产林：泥炭地和矿质土壤。在这片土地上，800多户家庭过着他们的生活——不是作为侵占者或破坏者，而是作为可持续收获森林的守护者。\n\n生产的产品是优质非木材林产品：野生森林蜂蜜、无刺蜂蜂蜜、棕榈糖、泥炭地利比里卡咖啡、水葱和藤条工艺品、肉桂油和泥炭风味熏鱼。每件产品都承载着矗立森林、娴熟双手和关怀之心的故事。\n\nBulau Ngandung不仅仅是一个贸易合作社。它是一场运动。这场运动旨在证明经济可以在不破坏生态的情况下运行。这场运动旨在表明土著社区是最好的森林守护者——不是企业，不是政府。这场运动旨在确保达雅克·恩加朱的子孙后代仍能从祖先呼吸过的同一片森林中呼吸新鲜空气。\n\n我们敞开大门。为寻求道德和可持续产品的买家。为希望学习基于社区的森林管理的研究人员。为所有相信加里曼丹的未来在于矗立的森林——不在于矿山、不在于棕榈油种植园、不在于被烧毁的土地——的人。",
    ja: "ブラウ・ガンドゥン社会林業協同組合はシンプルな夢から生まれました：カプアス県のダヤック先住コミュニティが森林を伐採せずに豊かに暮らせること。2023年に設立されたこの協同組合は、マンタンガイ、バタグー、ダダフップ、カプアス・フル、マンダウ・タラワンの5つの郡に広がる25の社会林業グループの共有の家です。\n\n総管理面積は56,771ヘクタールに達し、泥炭地と鉱質土壌の二つの生態系タイプにわたる保護林と生産林で構成されています。この土地で、800世帯以上が生活を営んでいます——侵入者や破壊者としてではなく、森林の恵みを持続可能に収穫する守護者として。\n\n生産される製品はプレミアムな非木材林産物です：野生森林蜂蜜、ケルルット蜂蜜、パームシュガー、泥炭地リベリカコーヒー、プルンと籐の工芸品、シナモンオイル、泥炭風味の燻製魚。すべての製品が立ち続ける森、熟練した手、思いやりのある心の物語を運んでいます。\n\nブラウ・ガンドゥンは単なる取引協同組合ではありません。それは運動です。生態を破壊せずに経済が回ることを証明する運動。先住コミュニティが最高の森林守護者であることを示す運動——企業でも政府でもなく。そしてダヤック・ンガジュの子孫が、先祖が呼吸したのと同じ森から新鮮な空気をまだ吸えることを確実にする運動です。\n\n私たちは扉を大きく開きます。倫理的で持続可能な製品を求める買い手のために。コミュニティベースの森林管理について学びたい研究者のために。カリマンタンの未来は立ち続ける森にあると信じるすべての人のために——鉱山ではなく、パーム油農園ではなく、焼けた土地ではなく。",
  },
  visi: {
    id: "Kami bermimpi suatu hari nanti, 25 kelompok masyarakat adat Dayak di Kapuas hidup sejahtera dari hutan yang mereka jaga — tanpa menebang, tanpa merusak, tanpa kehilangan warisan leluhur. Hutan berdiri, ekonomi berjalan, budaya bertahan.",
    en: "We dream that one day, 25 Dayak indigenous community groups in Kapuas will live prosperously from the forests they protect — without cutting, without destroying, without losing ancestral heritage. Forests standing, economy running, culture enduring.",
    zh: "我们梦想有一天，卡普阿斯的25个达雅克土著社区小组能从他们保护的森林中繁荣生活——无需砍伐、无需破坏、无需失去祖先遗产。森林矗立，经济运行，文化延续。",
    ja: "私たちはいつか、カプアスの25のダヤック先住コミュニティグループが、彼らが守る森から豊かに暮らせることを夢見ています——伐採せず、破壊せず、先祖の遺産を失うことなく。森は立ち、経済は回り、文化は存続する。",
  },
  misi: {
    id: "1. Memperkuat kelembagaan 25 kelompok perhutanan sosial agar menjadi unit usaha yang mandiri dan profesional.\n2. Mengembangkan rantai nilai produk HHBK — dari hulu (produksi lestari) ke hilir (pemasaran global).\n3. Membangun kesadaran konsumen tentang pentingnya produk hutan lestari yang mendukung masyarakat adat.\n4. Menjadi model perhutanan sosial yang direplikasi di seluruh Indonesia — membuktikan bahwa hutan yang dikelola masyarakat adalah hutan yang paling lestari.",
    en: "1. Strengthen the institutional capacity of 25 social forestry groups to become independent and professional business units.\n2. Develop the NTFP product value chain — from upstream (sustainable production) to downstream (global marketing).\n3. Build consumer awareness about the importance of sustainable forest products that support indigenous communities.\n4. Become a replicable social forestry model across Indonesia — proving that community-managed forests are the most sustainable forests.",
    zh: "1. 增强25个社会林业小组的制度能力，使其成为独立专业的业务单位。\n2. 发展HHBK产品价值链——从上游（可持续生产）到下游（全球营销）。\n3. 提高消费者对支持土著社区的重要可持续林产品的认识。\n4. 成为可在全印尼复制推广的社会林业模式——证明社区管理的森林是最可持续的森林。",
    ja: "1. 25の社会林業グループの組織能力を強化し、自立した専門的な事業単位とする。\n2. 非木材林産物のバリューチェーンを上流（持続可能な生産）から下流（グローバルマーケティング）まで発展させる。\n3. 先住コミュニティを支援する持続可能な林産物の重要性について消費者の意識を高める。\n4. インドネシア全土で再現可能な社会林業モデルとなる——コミュニティが管理する森林が最も持続可能であることを証明する。",
  },
  mitra: [
    {
      nama: "Yayasan AMAL",
      logo: "/images/mitra/amal.png",
      url: "https://antang.org",
      deskripsi: {
        id: "Yayasan Antangpatahu Mahaga Lewu (AMAL) adalah mitra strategis Koperasi Bulau Ngandung untuk Perhutanan Sosial di Kalimantan Tengah. Berkantor di Palangka Raya, kemitraan ini dibentuk pada tahun 2025 dengan semangat meningkatkan ekonomi masyarakat Perhutanan Sosial melalui pengembangan dan penjualan produk Hasil Hutan Bukan Kayu (HHBK) yang dikoordinir oleh Koperasi Bulau Ngandung.",
        en: "Yayasan Antangpatahu Mahaga Lewu (AMAL) is a strategic partner of Koperasi Bulau Ngandung for Social Forestry in Central Kalimantan. Based in Palangka Raya, this partnership was established in 2025 with the mission of improving Social Forestry community livelihoods through the development and sale of Non-Timber Forest Products (NTFPs) coordinated by Koperasi Bulau Ngandung.",
        zh: "Yayasan Antangpatahu Mahaga Lewu (AMAL)是Koperasi Bulau Ngandung在中加里曼丹社会林业领域的战略合作伙伴，总部位于帕朗卡拉亚。该伙伴关系成立于2025年，旨在通过由Koperasi Bulau Ngandung协调的非木材林产品（HHBK）开发和销售来提升社会林业社区的经济水平。",
        ja: "Yayasan Antangpatahu Mahaga Lewu (AMAL)は、中部カリマンタンにおける社会林業のためのKoperasi Bulau Ngandungの戦略的パートナーです。パランカラヤに拠点を置き、このパートナーシップは2025年に設立され、Koperasi Bulau Ngandungが調整する非木材林産物（NTFP）の開発と販売を通じて社会林業コミュニティの生計向上を目指しています。",
      },
    },
  ],
  kontakEmail: "info@bulaungandung.org",
  kontakWa: "+62812-3456-7890",
  kontakAlamat: "Jl. Trans Kalimantan Km 17, Desa Sei Ahas, Kecamatan Mantangai, Kabupaten Kapuas, Kalimantan Tengah",
};

export const timelineItems: TimelineItem[] = [
  {
    year: "2015",
    title: "SK Pertama Terbit",
    description: "LPHD Katunjung dan LPHD Petak Puti menerima SK Gubernur — tonggak awal perhutanan sosial di Kapuas.",
  },
  {
    year: "2023",
    title: "Koperasi Berdiri",
    description: "Koperasi Perhutanan Sosial Bulau Ngandung resmi didirikan, menyatukan 25 kelompok dalam satu rumah besar.",
  },
  {
    year: "2024",
    title: "Ekspansi Anggota",
    description: "LPHD Danau Bagantung, Mangkutup Mandiri, Berok Tunggal, dan Tampung Penyang bergabung — total anggota mencapai 25.",
  },
  {
    year: "2025",
    title: "Penandatanganan PKS",
    description: "Seluruh 25 kelompok menandatangani Perjanjian Kerja Sama (PKS) dengan koperasi — legalitas penuh kemitraan.",
  },
  {
    year: "2026",
    title: "Menuju Pasar Global",
    description: "Produk Bulau Ngandung mulai dipasarkan ke Jepang, Korea, dan Eropa — dari tangan masyarakat adat ke panggung dunia.",
  },
];

export const pilarCerita: PilarCerita[] = [
  {
    nomor: 1,
    judul: "Hutan Adalah Ibu",
    subjudul: "Tanpa hutan, kami bukan siapa-siapa.",
    deskripsi: "Setiap cerita tentang Bulau Ngandung dimulai dari hutan. Hutan bukan sekadar sumber daya — ia adalah identitas, spiritualitas, dan rumah bagi masyarakat Dayak Ngaju. Tanpa hutan yang berdiri, tidak ada madu, tidak ada rotan, tidak ada masa depan.",
  },
  {
    nomor: 2,
    judul: "Hasil Hutan Bukan Kayu",
    subjudul: "Kekayaan tanpa merusak.",
    deskripsi: "Bulau Ngandung membuktikan bahwa nilai ekonomi tertinggi dari hutan bukan berasal dari kayu yang ditebang, tetapi dari hasil yang bisa dipanen berulang kali — madu, gula, rotan, purun. Inilah ekonomi restoratif yang sesungguhnya.",
  },
  {
    nomor: 3,
    judul: "Perempuan Adalah Tulang Punggung",
    subjudul: "Dari dapur desa ke pasar global.",
    deskripsi: "Di balik setiap produk Bulau Ngandung, ada tangan perempuan. Merekalah penganyam purun, pemanen madu kelulut, penyadap aren, dan pengolah pascapanen. Koperasi memberi mereka akses ke pasar — dan dengan itu, kemandirian ekonomi.",
  },
  {
    nomor: 4,
    judul: "Koperasi Adalah Betang Modern",
    subjudul: "Bersatu kita kuat, bercerai kita jatuh.",
    deskripsi: "Filosofi betang — rumah panjang tradisional Dayak — adalah inspirasi di balik koperasi. 25 kelompok yang tadinya berjuang sendiri kini bersatu. Mereka berbagi pengetahuan, berbagi pasar, dan saling menguatkan. Inilah gotong royong versi abad 21.",
  },
  {
    nomor: 5,
    judul: "Dari Kapuas untuk Dunia",
    subjudul: "Produk lokal, cita rasa global.",
    deskripsi: "Produk-produk Bulau Ngandung membawa cerita dari pedalaman Kalimantan ke dunia. Setiap pembelian adalah dukungan langsung untuk konservasi hutan dan pemberdayaan masyarakat adat. Konsumen bukan sekadar pembeli — mereka adalah bagian dari gerakan.",
  },
];

export const pullQuotes: PullQuoteData[] = [
  {
    quote: "\"Dulu kami dianggap perambah. Sekarang kami adalah penjaga hutan yang diakui negara.\"",
    name: "Pak Urbanus",
    role: "Ketua LPHD Tambak Bajai",
    foto: "/images/anggota/pak-urbanus.jpg",
  },
  {
    quote: "\"Tangan ini mungkin kasar, tapi anyaman yang kami hasilkan sehalus mimpi.\"",
    name: "Ibu Veronika",
    role: "Penganyam Purun, HKM Gapoktan Tumbang Muroi",
    foto: "/images/anggota/ibu-veronika.jpg",
  },
  {
    quote: "\"Hutan tidak butuh diselamatkan. Hutan butuh dijaga. Dan yang paling bisa menjaga adalah kami yang hidup di dalamnya.\"",
    name: "Pak Kornelius",
    role: "Ketua LPHD Mangkutup Mandiri",
    foto: "/images/anggota/pak-kornelius.jpg",
  },
  {
    quote: "\"Setiap botol madu yang Anda beli, Anda ikut menanam satu pohon di hutan Kapuas. Tanpa Anda sadari.\"",
    name: "Ibu Seravina",
    role: "Peternak Lebah Kelulut, HKM Harapan Baru",
    foto: "/images/anggota/ibu-seravina.jpg",
  },
];

export const activities: Activity[] = [
  {
    slug: "pendampingan-kelompok-2025",
    judul: {
      id: "Pendampingan Kelompok Perhutanan Sosial Tahap I 2025",
      en: "Social Forestry Group Assistance Phase I 2025",
      zh: "2025年社会林业小组第一阶段援助",
      ja: "社会林業グループ支援フェーズI 2025",
    },
    tanggal: "2025-08-15",
    konten: {
      id: "Yayasan AMAL bersama Koperasi Bulau Ngandung melaksanakan pendampingan tahap pertama kepada 25 kelompok Perhutanan Sosial di Kabupaten Kapuas. Kegiatan mencakup pelatihan pengolahan HHBK, manajemen keuangan kelompok, dan penyusunan rencana kerja tahunan.\n\nPendampingan dilakukan selama tiga bulan penuh di 8 kecamatan dengan melibatkan 12 pendamping lapangan. Setiap kelompok mendapatkan modul pelatihan yang disesuaikan dengan jenis HHBK andalan masing-masing.\n\nHasil dari pendampingan ini: 25 kelompok kini memiliki rencana bisnis tertulis dan sistem pencatatan keuangan dasar. Tiga produk unggulan — madu hutan, gula aren, dan kerajinan purun — siap dipasarkan ke luar daerah.",
      en: "Yayasan AMAL together with Koperasi Bulau Ngandung conducted the first phase of assistance to 25 Social Forestry groups in Kapuas Regency. Activities included NTFP processing training, group financial management, and annual work plan preparation.\n\nThe assistance was carried out over three full months in 8 sub-districts involving 12 field assistants. Each group received training modules tailored to their main NTFP types.\n\nResults from this assistance: all 25 groups now have written business plans and basic financial recording systems. Three flagship products — forest honey, palm sugar, and purun crafts — are ready for marketing outside the region.",
      zh: "Yayasan AMAL与Koperasi Bulau Ngandung合作社共同为卡普阿斯县的25个社会林业小组提供了第一阶段援助。活动包括非木材林产品加工培训、小组财务管理和年度工作计划制定。\n\n援助在8个区进行了整整三个月，涉及12名现场辅导员。每个小组都收到了根据其各自主要非木材林产品类型量身定制的培训模块。\n\n此次援助的成果：所有25个小组现在都有了书面商业计划和基本财务记录系统。三种旗舰产品——森林蜂蜜、棕榈糖和蒲苇工艺品——已准备好在区域外进行营销。",
      ja: "Yayasan AMALとKoperasi Bulau Ngandungは、カプアス県の25の社会林業グループに対して第1フェーズの支援を実施しました。活動には非木材林産物の加工研修、グループ財務管理、年間作業計画の作成が含まれます。\n\n支援は8つの郡で3か月間にわたり、12名のフィールドアシスタントが参加して行われました。各グループは、それぞれの主要な非木材林産物の種類に合わせた研修モジュールを受け取りました。\n\nこの支援の成果として、25グループすべてが文書化された事業計画と基本的な財務記録システムを持つようになりました。森林蜂蜜、パームシュガー、プルン工芸品の3つの主力製品が地域外への販売準備が整いました。",
    },
    foto: ["/images/kegiatan/pendampingan-1.jpg", "/images/kegiatan/pendampingan-2.jpg"],
  },
  {
    slug: "penandatanganan-pks-amal",
    judul: {
      id: "Penandatanganan PKS antara Koperasi Bulau Ngandung dan Yayasan AMAL",
      en: "MoU Signing between Koperasi Bulau Ngandung and Yayasan AMAL",
      zh: "Koperasi Bulau Ngandung与Yayasan AMAL签署谅解备忘录",
      ja: "Koperasi Bulau NgandungとYayasan AMALの覚書調印",
    },
    tanggal: "2025-01-20",
    konten: {
      id: "Bertempat di Desa Sei Ahas, Kecamatan Mantangai, Koperasi Bulau Ngandung resmi menandatangani Perjanjian Kerja Sama (PKS) dengan Yayasan Antangpatahu Mahaga Lewu (AMAL).\n\nPKS ini menandai dimulainya kemitraan strategis dalam pengembangan HHBK Perhutanan Sosial di 25 kelompok dampingan. AMAL akan memberikan pendampingan teknis, akses pasar, dan penguatan kelembagaan.\n\nAcara dihadiri oleh perwakilan Dinas Kehutanan Kabupaten Kapuas, Camat Mantangai, dan seluruh ketua kelompok PS",
      en: "Located in Sei Ahas Village, Mantangai District, Koperasi Bulau Ngandung officially signed a Cooperation Agreement with Yayasan Antangpatahu Mahaga Lewu (AMAL).\n\nThis agreement marks the beginning of a strategic partnership in developing Social Forestry NTFPs across 25 assisted groups. AMAL will provide technical assistance, market access, and institutional strengthening.\n\nThe event was attended by representatives from the Kapuas Regency Forestry Office, Mantangai Sub-district Head, and all PS group leaders.",
      zh: "在曼唐盖区Sei Ahas村，Koperasi Bulau Ngandung正式与Yayasan Antangpatahu Mahaga Lewu (AMAL)签署了合作协议。\n\n该协议标志着在25个受援小组中发展社会林业非木材林产品的战略伙伴关系的开始。AMAL将提供技术援助、市场准入和机构加强。\n\n活动由卡普阿斯县林业局代表、曼唐盖区长和所有PS小组组长出席。",
      ja: "マンタンガイ郡セイアハス村において、Koperasi Bulau NgandungはYayasan Antangpatahu Mahaga Lewu (AMAL)との協力協定に正式に署名しました。\n\nこの協定は、25の支援グループ全体での社会林業非木材林産物の開発における戦略的パートナーシップの始まりを示します。AMALは技術支援、市場アクセス、組織強化を提供します。\n\nこのイベントには、カプアス県林業局代表、マンタンガイ郡長、および全PSグループリーダーが出席しました。",
    },
    foto: ["/images/kegiatan/pks-amal-1.jpg", "/images/kegiatan/pks-amal-2.jpg"],
  },
];