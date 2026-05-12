import { defineType, defineField } from "sanity";
import { localeFields } from "./localeFields";

export const activity = defineType({
  name: "activity",
  title: "Kegiatan",
  type: "document",
  fields: [
    defineField({
      name: "judul", title: "Judul", type: "object",
      fields: localeFields("string"),
      validation: (r) => r.required(),
    }),
    defineField({ name: "tanggal", title: "Tanggal", type: "date" }),
    defineField({
      name: "konten", title: "Konten", type: "object",
      fields: localeFields("blockContent"),
    }),
    defineField({ name: "foto", title: "Foto", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "judul.id", maxLength: 96 }, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "judul.id", subtitle: "tanggal", media: "foto.0" } },
});
