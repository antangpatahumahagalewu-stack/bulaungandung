/**
 * Centralized data loader with Sanity CMS + local fallback.
 *
 * Server components use the async functions (tries Sanity, falls back to local data).
 * Client components import the sync fallback data directly from local files.
 *
 * After the Sanity migration script runs and data is populated,
 * the async functions will return Sanity data transparently.
 */

import type { Member, Product, Story, Activity, SiteSettings, PullQuoteData, TimelineItem } from "@/types";
import { blocksToText } from "@/lib/portable-text";

// ─── Helpers ───────────────────────────────────────────────

function normalizeLocale(obj: Record<string, unknown>) {
  return { id: blocksToText(obj?.id), en: blocksToText(obj?.en), zh: blocksToText(obj?.zh), ja: blocksToText(obj?.ja) };
}

function normalizeMember(m: any): Member {
  return { ...m, deskripsi: normalizeLocale(m.deskripsi) };
}
function normalizeProduct(p: any): Product {
  return { ...p, deskripsi: normalizeLocale(p.deskripsi), cerita: normalizeLocale(p.cerita), kutipan: normalizeLocale(p.kutipan) };
}
function normalizeStory(s: any): Story {
  return { ...s, narasi: normalizeLocale(s.narasi), kutipan: normalizeLocale(s.kutipan) };
}
function normalizeActivity(a: any): Activity {
  return { ...a, konten: normalizeLocale(a.konten) };
}

// ─── Sanity query imports ───────────────────────────────────

import { getMembers as getSanityMembers, getMember as getSanityMember, getMemberSlugs as getSanityMemberSlugs } from "@/lib/sanity/queries";
import { getProducts as getSanityProducts, getProduct as getSanityProduct, getProductSlugs as getSanityProductSlugs } from "@/lib/sanity/queries";
import { getStories as getSanityStories, getStory as getSanityStory, getStorySlugs as getSanityStorySlugs } from "@/lib/sanity/queries";
import { getActivities as getSanityActivities, getActivity as getSanityActivity, getActivitySlugs as getSanityActivitySlugs } from "@/lib/sanity/queries";
import { getSiteSettings as getSanitySiteSettings } from "@/lib/sanity/queries";

// ─── Local data (fallback) ──────────────────────────────────

import { members as localMembers } from "./members";
import { products as localProducts } from "./products";
import { stories as localStories } from "./stories";
import { siteSettings as localSiteSettings, timelineItems as localTimeline, pullQuotes as localPullQuotes, activities as localActivities } from "./site";

// ─── Members ───────────────────────────────────────────────

export async function getAllMembers(): Promise<Member[]> {
  try {
    const data = await getSanityMembers();
    if (data?.length) return data.map(normalizeMember);
  } catch {}
  return localMembers;
}

export async function getAllMemberSlugs(): Promise<string[]> {
  try {
    const slugs = await getSanityMemberSlugs();
    if (slugs?.length) return slugs as string[];
  } catch {}
  return localMembers.map((m) => m.slug);
}

export async function getMemberBySlug(slug: string): Promise<Member | null> {
  try {
    const data = await getSanityMember(slug);
    if (data) return normalizeMember(data);
  } catch {}
  return localMembers.find((m) => m.slug === slug) ?? null;
}

// ─── Products ──────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  try {
    const data = await getSanityProducts();
    if (data?.length) return data.map(normalizeProduct);
  } catch {}
  return localProducts;
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const slugs = await getSanityProductSlugs();
    if (slugs?.length) return slugs as string[];
  } catch {}
  return localProducts.map((p) => p.slug);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await getSanityProduct(slug);
    if (data) return normalizeProduct(data);
  } catch {}
  return localProducts.find((p) => p.slug === slug) ?? null;
}

// ─── Stories ───────────────────────────────────────────────

export async function getAllStories(): Promise<Story[]> {
  try {
    const data = await getSanityStories();
    if (data?.length) return data.map(normalizeStory);
  } catch {}
  return localStories;
}

export async function getAllStorySlugs(): Promise<string[]> {
  try {
    const slugs = await getSanityStorySlugs();
    if (slugs?.length) return slugs as string[];
  } catch {}
  return localStories.map((s) => s.slug);
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  try {
    const data = await getSanityStory(slug);
    if (data) return normalizeStory(data);
  } catch {}
  return localStories.find((s) => s.slug === slug) ?? null;
}

// ─── Activities ────────────────────────────────────────────

export async function getAllActivities(): Promise<Activity[]> {
  try {
    const data = await getSanityActivities();
    if (data?.length) return data.map(normalizeActivity);
  } catch {}
  return localActivities;
}

export async function getAllActivitySlugs(): Promise<string[]> {
  try {
    const slugs = await getSanityActivitySlugs();
    if (slugs?.length) return slugs as string[];
  } catch {}
  return localActivities.map((a) => a.slug);
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  try {
    const data = await getSanityActivity(slug);
    if (data) return normalizeActivity(data);
  } catch {}
  return localActivities.find((a) => a.slug === slug) ?? null;
}

// ─── Site Settings & Misc ──────────────────────────────────

export async function getSite(): Promise<SiteSettings> {
  try {
    const data = await getSanitySiteSettings();
    if (data) {
      if (data.aboutContent) {
        data.aboutContent = {
          id: blocksToText(data.aboutContent.id),
          en: blocksToText(data.aboutContent.en),
          zh: blocksToText(data.aboutContent.zh),
          ja: blocksToText(data.aboutContent.ja),
        };
      }
      return data as SiteSettings;
    }
  } catch {}
  return localSiteSettings;
}

export function getTimelineItems(): TimelineItem[] {
  return localTimeline;
}

export function getPullQuotes(): PullQuoteData[] {
  return localPullQuotes;
}

// ─── Sync fallback exports for client components ───────────

export { members as membersFallback } from "./members";
export { products as productsFallback } from "./products";
export { stories as storiesFallback } from "./stories";
export { siteSettings as siteFallback, activities as activitiesFallback } from "./site";
