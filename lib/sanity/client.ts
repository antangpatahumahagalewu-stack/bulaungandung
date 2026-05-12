import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "uxisgbv4",
  dataset: "production",
  apiVersion: "2025-05-01",
  useCdn: true,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});

const builder = createImageUrlBuilder({ projectId: "uxisgbv4", dataset: "production" });

export function image(source: any) {
  return builder.image(source);
}
