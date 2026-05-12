import { defineType, defineField } from "sanity";
import { localeFields } from "./localeFields";

export const story = defineType({
  name: "story",
  title: "Cerita",
  type: "document",
  fields: [
    defineField({
      name: "judul", title: "Judul", type: "object",
      fields: localeFields("string"),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kategori", title: "Kategori", type: "string",
      options: { list: ["asal-usul", "anggota", "produk", "dampak", "mitra"] },
    }),
    defineField({
      name: "narasi", title: "Narasi", type: "object",
      fields: localeFields("blockContent"),
    }),
    defineField({
      name: "kutipan", title: "Kutipan", type: "object",
      fields: localeFields("text"),
    }),
    defineField({ name: "namaNarasumber", title: "Nama Narasumber", type: "string" }),
    defineField({ name: "peranNarasumber", title: "Peran Narasumber", type: "string" }),
    defineField({ name: "fotoUtama", title: "Foto Utama", type: "image", options: { hotspot: true } }),
    defineField({ name: "galeri", title: "Galeri", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "terkaitKelompok", title: "Kelompok Terkait", type: "reference", to: [{ type: "member" }] }),
    defineField({ name: "terkaitProduk", title: "Produk Terkait", type: "reference", to: [{ type: "product" }] }),
    defineField({ name: "tanggal", title: "Tanggal", type: "date" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "judul.id", maxLength: 96 }, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "judul.id", subtitle: "kategori", media: "fotoUtama" } },
});
