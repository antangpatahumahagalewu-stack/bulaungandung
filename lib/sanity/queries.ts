import { client } from "./client";
import { blocksToText } from "@/lib/portable-text";

const SITE_ID = "siteSettings";

function normalizeLocaleBlocks(obj: Record<string, unknown> | null | undefined): Record<string, string> {
  if (!obj) return { id: "", en: "", zh: "", ja: "" };
  return {
    id: blocksToText(obj.id),
    en: blocksToText(obj.en),
    zh: blocksToText(obj.zh),
    ja: blocksToText(obj.ja),
  };
}

export async function getSiteSettings() {
  return client.fetch(`*[_id == $id][0]`, { id: SITE_ID });
}

export async function getMembers() {
  return client.fetch(`*[_type == "member"] | order(nama asc) {
    "slug": slug.current, nama, desa, kecamatan, luasAreal, jenisHhbk,
    tipeIzin, nomorSK, tanggalSK, masaBerlaku, fungsiKawasan, jenisHutan,
    nomorPKS, "foto": foto.asset->url, deskripsi
  }`);
}

export async function getMember(slug: string) {
  return client.fetch(
    `*[_type == "member" && slug.current == $slug][0] {
      "slug": slug.current, nama, desa, kecamatan, luasAreal, jenisHhbk,
      tipeIzin, nomorSK, tanggalSK, masaBerlaku, fungsiKawasan, jenisHutan,
      nomorPKS, "foto": foto.asset->url, deskripsi
    }`,
    { slug }
  );
}

export async function getMemberSlugs() {
  return client.fetch(`*[_type == "member"].slug.current`);
}

export async function getProducts() {
  const data = await client.fetch(`*[_type == "product"] | order(nama asc) {
    "slug": slug.current, nama, jenis, stok, hargaRange, namaPengrajin,
    "foto": foto[].asset->url,
    "fotoPengrajin": fotoPengrajin.asset->url,
    "asalKelompok": member->slug.current,
    deskripsi, cerita, kutipan
  }`);
  return data?.map((item: Record<string, unknown>) => ({
    ...item,
    cerita: normalizeLocaleBlocks(item.cerita as Record<string, unknown>),
  }));
}

export async function getProduct(slug: string) {
  const data = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      "slug": slug.current, nama, jenis, stok, hargaRange, namaPengrajin,
      "foto": foto[].asset->url,
      "fotoPengrajin": fotoPengrajin.asset->url,
      "asalKelompok": member->slug.current,
      deskripsi, cerita, kutipan
    }`,
    { slug }
  );
  if (data) {
    data.cerita = normalizeLocaleBlocks(data.cerita as Record<string, unknown>);
  }
  return data;
}

export async function getProductSlugs() {
  return client.fetch(`*[_type == "product"].slug.current`);
}

export async function getStories() {
  const data = await client.fetch(`*[_type == "story"] | order(tanggal desc) {
    "slug": slug.current, judul, kategori, narasi, kutipan,
    namaNarasumber, peranNarasumber, tanggal,
    "fotoUtama": fotoUtama.asset->url,
    "galeri": galeri[].asset->url,
    "terkaitKelompok": terkaitKelompok->slug.current,
    "terkaitProduk": terkaitProduk->slug.current
  }`);
  return data?.map((item: Record<string, unknown>) => ({
    ...item,
    narasi: normalizeLocaleBlocks(item.narasi as Record<string, unknown>),
  }));
}

export async function getStory(slug: string) {
  const data = await client.fetch(
    `*[_type == "story" && slug.current == $slug][0] {
      "slug": slug.current, judul, kategori, narasi, kutipan,
      namaNarasumber, peranNarasumber, tanggal,
      "fotoUtama": fotoUtama.asset->url,
      "galeri": galeri[].asset->url,
      "terkaitKelompok": terkaitKelompok->slug.current,
      "terkaitProduk": terkaitProduk->slug.current
    }`,
    { slug }
  );
  if (data) {
    data.narasi = normalizeLocaleBlocks(data.narasi as Record<string, unknown>);
  }
  return data;
}

export async function getStorySlugs() {
  return client.fetch(`*[_type == "story"].slug.current`);
}

export async function getActivities() {
  const data = await client.fetch(`*[_type == "activity"] | order(tanggal desc) {
    "slug": slug.current, judul, tanggal, konten,
    "foto": foto[].asset->url
  }`);
  return data?.map((item: Record<string, unknown>) => ({
    ...item,
    konten: normalizeLocaleBlocks(item.konten as Record<string, unknown>),
  }));
}

export async function getActivity(slug: string) {
  const data = await client.fetch(
    `*[_type == "activity" && slug.current == $slug][0] {
      "slug": slug.current, judul, tanggal, konten,
      "foto": foto[].asset->url
    }`,
    { slug }
  );
  if (data) {
    data.konten = normalizeLocaleBlocks(data.konten as Record<string, unknown>);
  }
  return data;
}

export async function getActivitySlugs() {
  return client.fetch(`*[_type == "activity"].slug.current`);
}
