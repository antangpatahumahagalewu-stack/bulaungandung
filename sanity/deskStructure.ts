import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Konten")
    .items([
      S.listItem()
        .title("Pengaturan Situs")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.listItem()
        .title("Kelompok PS (25)")
        .child(S.documentTypeList("member").title("Kelompok PS")),
      S.listItem()
        .title("Produk HHBK")
        .child(S.documentTypeList("product").title("Produk HHBK")),
      S.listItem()
        .title("Cerita")
        .child(S.documentTypeList("story").title("Cerita")),
      S.listItem()
        .title("Kegiatan")
        .child(S.documentTypeList("activity").title("Kegiatan")),
    ]);
