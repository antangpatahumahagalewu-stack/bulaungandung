import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

import { members } from "../lib/data/members";
import { products } from "../lib/data/products";
import { stories } from "../lib/data/stories";
import { siteSettings, activities } from "../lib/data/site";

const envPath = path.resolve(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");

function parseEnv(content: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    out[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return out;
}

const env = parseEnv(envContent);
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.SANITY_API_WRITE_TOKEN || env.SANITY_API_READ_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity env vars in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-05-01",
  useCdn: false,
});

console.log(`Connected: ${projectId}/${dataset}`);

function toBlocks(text: string) {
  return text.split(/\n\n+/).filter(Boolean).map((p) => ({
    _type: "block",
    style: "normal",
    children: [{ _type: "span", marks: [], text: p.trim() }],
    markDefs: [],
  }));
}

function mapObj(obj: Record<string, string>, fn: (v: string) => any) {
  const r: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) r[k] = fn(v);
  return r;
}

function asString(o: Record<string, string>) {
  return { ...o };
}

function asBlock(o: Record<string, string>) {
  return mapObj(o, toBlocks);
}

async function write(doc: any) {
  const label = `${doc._type}: ${doc.slug?.current ?? doc._id}`;
  try {
    await client.createOrReplace(doc);
    console.log(`  OK  ${label}`);
  } catch (e: any) {
    console.error(`  ERR ${label} — ${e.message}`);
  }
}

async function main() {
  const memberId: Record<string, string> = {};
  const productId: Record<string, string> = {};

  // ── Step 1: Members (25) ──
  console.log(`\n[1/5] Members (${members.length})`);
  for (const m of members) {
    const id = `member-${m.slug}`;
    memberId[m.slug] = id;
    await write({
      _id: id,
      _type: "member",
      nama: m.nama,
      desa: m.desa,
      kecamatan: m.kecamatan,
      luasAreal: m.luasAreal,
      jenisHhbk: m.jenisHhbk,
      tipeIzin: m.tipeIzin,
      nomorSK: m.nomorSK,
      tanggalSK: m.tanggalSK,
      masaBerlaku: m.masaBerlaku,
      fungsiKawasan: m.fungsiKawasan,
      jenisHutan: m.jenisHutan,
      nomorPKS: m.nomorPKS,
      deskripsi: asString(m.deskripsi),
      slug: { _type: "slug", current: m.slug },
    });
  }

  // ── Step 2: Products (14) ──
  console.log(`\n[2/5] Products (${products.length})`);
  for (const p of products) {
    const id = `product-${p.slug}`;
    productId[p.slug] = id;
    await write({
      _id: id,
      _type: "product",
      nama: p.nama,
      jenis: p.jenis,
      stok: p.stok ?? 0,
      deskripsi: asString(p.deskripsi),
      cerita: asBlock(p.cerita),
      kutipan: asString(p.kutipan),
      namaPengrajin: p.namaPengrajin,
      hargaRange: p.hargaRange,
      member: memberId[p.asalKelompok]
        ? { _type: "reference", _ref: memberId[p.asalKelompok] }
        : undefined,
      slug: { _type: "slug", current: p.slug },
    });
  }

  // ── Step 3: Stories (8) ──
  console.log(`\n[3/5] Stories (${stories.length})`);
  for (const s of stories) {
    const id = `story-${s.slug}`;
    await write({
      _id: id,
      _type: "story",
      judul: asString(s.judul),
      kategori: s.kategori,
      narasi: asBlock(s.narasi),
      kutipan: asString(s.kutipan),
      namaNarasumber: s.namaNarasumber,
      peranNarasumber: s.peranNarasumber,
      terkaitKelompok:
        s.terkaitKelompok && memberId[s.terkaitKelompok]
          ? { _type: "reference", _ref: memberId[s.terkaitKelompok] }
          : undefined,
      terkaitProduk:
        s.terkaitProduk && productId[s.terkaitProduk]
          ? { _type: "reference", _ref: productId[s.terkaitProduk] }
          : undefined,
      tanggal: s.tanggal,
      slug: { _type: "slug", current: s.slug },
    });
  }

  // ── Step 4: Activities (2) ──
  console.log(`\n[4/5] Activities (${activities.length})`);
  for (const a of activities) {
    await write({
      _id: `activity-${a.slug}`,
      _type: "activity",
      judul: asString(a.judul),
      tanggal: a.tanggal,
      konten: asBlock(a.konten),
      slug: { _type: "slug", current: a.slug },
    });
  }

  // ── Step 5: Site Settings ──
  console.log(`\n[5/5] Site Settings`);
  const ss = siteSettings;
  await write({
    _id: "siteSettings",
    _type: "siteSettings",
    heroTitle: asString(ss.heroTitle),
    heroSubtitle: asString(ss.heroSubtitle),
    stats: ss.stats.map((s) => ({
      label: asString(s.label),
      value: s.value,
    })),
    aboutContent: asBlock(ss.aboutContent),
    visi: asString(ss.visi),
    misi: asString(ss.misi),
    mitra: ss.mitra.map((m) => ({
      nama: m.nama,
      url: m.url,
      deskripsi: asString(m.deskripsi),
    })),
    kontakEmail: ss.kontakEmail,
    kontakWa: ss.kontakWa,
    kontakAlamat: ss.kontakAlamat,
  });

  console.log("\nMigration complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
