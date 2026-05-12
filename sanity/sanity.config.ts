import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schema";
import { structure } from "./deskStructure";

export default defineConfig({
  name: "bulaungandung",
  title: "Bulau Ngandung CMS",
  projectId: "uxisgbv4",
  dataset: "production",
  basePath: "/studio",
  apiVersion: "2025-05-01",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
