import { defineType, defineField } from "sanity";
import { localeFields } from "./localeFields";

export const product = defineType({
  name: "product",
  title: "Produk HHBK",
  type: "document",
  fields: [
    defineField({ name: "nama", title: "Nama Produk", type: "string", validation: (r) => r.required() }),
    defineField({ name: "jenis", title: "Jenis HHBK", type: "string" }),
    defineField({
      name: "deskripsi", title: "Deskripsi Produk", type: "object",
      fields: localeFields("text"),
    }),
    defineField({
      name: "cerita", title: "Cerita di Balik Produk", type: "object",
      fields: localeFields("blockContent"),
    }),
    defineField({
      name: "kutipan", title: "Kutipan Pengrajin", type: "object",
      fields: localeFields("text"),
    }),
    defineField({ name: "stok", title: "Stok Tersedia", type: "number", validation: (r) => r.min(0) }),
    defineField({ name: "namaPengrajin", title: "Nama Pengrajin", type: "string" }),
    defineField({ name: "hargaRange", title: "Kisaran Harga", type: "string" }),
    defineField({ name: "foto", title: "Foto Produk", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "fotoPengrajin", title: "Foto Pengrajin", type: "image", options: { hotspot: true } }),
    defineField({ name: "member", title: "Kelompok Asal", type: "reference", to: [{ type: "member" }] }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "nama" }, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "nama", subtitle: "jenis", media: "foto.0" } },
});
