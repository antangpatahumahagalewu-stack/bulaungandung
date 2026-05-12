import { defineType, defineField } from "sanity";
import { localeFields } from "./localeFields";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Situs",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle", title: "Judul Hero", type: "object",
      fields: localeFields("string"),
    }),
    defineField({
      name: "heroSubtitle", title: "Subjudul Hero", type: "object",
      fields: localeFields("string"),
    }),
    defineField({ name: "heroImage", title: "Foto Hero", type: "image", options: { hotspot: true } }),
    defineField({
      name: "stats", title: "Statistik Dampak", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", title: "Label", type: "object", fields: localeFields("string") },
          { name: "value", title: "Nilai", type: "string" },
        ],
      }],
    }),
    defineField({
      name: "aboutContent", title: "Konten Tentang", type: "object",
      fields: localeFields("blockContent"),
    }),
    defineField({
      name: "visi", title: "Visi", type: "object",
      fields: localeFields("text"),
    }),
    defineField({
      name: "misi", title: "Misi", type: "object",
      fields: localeFields("text"),
    }),
    defineField({
      name: "mitra", title: "Mitra", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "nama", title: "Nama", type: "string" },
          { name: "logo", title: "Logo", type: "image" },
          { name: "url", title: "URL", type: "url" },
          { name: "deskripsi", title: "Deskripsi", type: "object", fields: localeFields("text") },
        ],
      }],
    }),
    defineField({ name: "kontakEmail", title: "Email", type: "string" }),
    defineField({ name: "kontakWa", title: "WhatsApp", type: "string" }),
    defineField({ name: "kontakAlamat", title: "Alamat", type: "string" }),
  ],
});
