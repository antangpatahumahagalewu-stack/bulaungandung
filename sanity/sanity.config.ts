import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schema";
import { structure } from "./deskStructure";

export default defineConfig({
  name: "bulawngandung",
  title: "Bulau Ngandung CMS",
  projectId: "uxisgbv4",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
