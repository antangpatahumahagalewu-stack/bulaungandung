export type Locale = "id" | "en" | "zh" | "ja";

export interface Member {
  slug: string;
  nama: string;
  desa: string;
  kecamatan: string;
  luasAreal: number;
  jenisHhbk: string[];
  tipeIzin: "HKM" | "LPHD" | "LDPH" | "HTR";
  nomorSK: string;
  tanggalSK: string;
  masaBerlaku: string;
  fungsiKawasan: string;
  jenisHutan: "Gambut" | "Mineral";
  nomorPKS: string;
  foto: string;
  deskripsi: {
    id: string;
    en: string;
    zh: string;
    ja: string;
  };
}

export interface Product {
  slug: string;
  nama: string;
  jenis: string;
  stok: number;
  hargaRange: string;
  namaPengrajin: string;
  foto: string[];
  fotoPengrajin: string;
  asalKelompok: string;
  deskripsi: {
    id: string;
    en: string;
    zh: string;
    ja: string;
  };
  cerita: {
    id: string;
    en: string;
    zh: string;
    ja: string;
  };
  kutipan: {
    id: string;
    en: string;
    zh: string;
    ja: string;
  };
}

export interface Story {
  slug: string;
  judul: {
    id: string;
    en: string;
    zh: string;
    ja: string;
  };
  kategori: "asal-usul" | "anggota" | "produk" | "dampak" | "mitra";
  narasi: {
    id: string;
    en: string;
    zh: string;
    ja: string;
  };
  kutipan: {
    id: string;
    en: string;
    zh: string;
    ja: string;
  };
  namaNarasumber: string;
  peranNarasumber: string;
  fotoUtama: string;
  galeri: string[];
  terkaitKelompok?: string;
  terkaitProduk?: string;
  tanggal: string;
}

export interface Activity {
  slug: string;
  judul: {
    id: string;
    en: string;
    zh: string;
    ja: string;
  };
  tanggal: string;
  konten: {
    id: string;
    en: string;
    zh: string;
    ja: string;
  };
  foto: string[];
}

export interface SiteSettings {
  heroTitle: { id: string; en: string; zh: string; ja: string };
  heroSubtitle: { id: string; en: string; zh: string; ja: string };
  heroImage: string;
  stats: Array<{
    label: { id: string; en: string; zh: string; ja: string };
    value: string;
  }>;
  aboutContent: { id: string; en: string; zh: string; ja: string };
  visi: { id: string; en: string; zh: string; ja: string };
  misi: { id: string; en: string; zh: string; ja: string };
  mitra: Array<{
    nama: string;
    logo: string;
    url: string;
    deskripsi: { id: string; en: string; zh: string; ja: string };
  }>;
  kontakEmail: string;
  kontakWa: string;
  kontakAlamat: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface PilarCerita {
  nomor: number;
  judul: string;
  subjudul: string;
  deskripsi: string;
}

export interface PullQuoteData {
  quote: string;
  name: string;
  role: string;
  foto: string;
}
