import { defineType, defineField } from "sanity";
import { localeFields } from "./localeFields";

export const member = defineType({
  name: "member",
  title: "Kelompok PS",
  type: "document",
  fields: [
    defineField({ name: "nama", title: "Nama Kelompok", type: "string", validation: (r) => r.required() }),
    defineField({ name: "desa", title: "Desa", type: "string" }),
    defineField({ name: "kecamatan", title: "Kecamatan", type: "string" }),
    defineField({ name: "luasAreal", title: "Luas Areal (ha)", type: "number" }),
    defineField({ name: "jenisHhbk", title: "Jenis HHBK", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tipeIzin", title: "Tipe Izin", type: "string", options: { list: ["HKM", "LPHD", "HTR"] } }),
    defineField({ name: "nomorSK", title: "Nomor SK", type: "string" }),
    defineField({ name: "tanggalSK", title: "Tanggal SK", type: "string" }),
    defineField({ name: "masaBerlaku", title: "Masa Berlaku", type: "string" }),
    defineField({ name: "fungsiKawasan", title: "Fungsi Kawasan", type: "string" }),
    defineField({ name: "jenisHutan", title: "Jenis Hutan", type: "string", options: { list: ["Gambut", "Mineral"] } }),
    defineField({ name: "nomorPKS", title: "Nomor PKS", type: "string" }),
    defineField({ name: "foto", title: "Foto Kelompok", type: "image", options: { hotspot: true } }),
    defineField({
      name: "deskripsi", title: "Deskripsi / Cerita Kelompok", type: "object",
      fields: localeFields("text"),
    }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "nama" }, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "nama", subtitle: "desa", media: "foto" } },
});
