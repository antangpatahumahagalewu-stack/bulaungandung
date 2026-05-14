/**
 * Cookie Consent types and utilities.
 *
 * Categories:
 *   essential — strictly necessary (Next.js session, CSRF). Always on.
 *   analytics — Vercel Analytics / page views. Opt-in.
 */

export type CookieCategory = "essential" | "analytics";

export interface CookieConsent {
  /** ISO string of when consent was given */
  timestamp: string;
  /** Per-category consent */
  categories: Record<CookieCategory, boolean>;
}

const STORAGE_KEY = "bulaungandung-cookie-consent";
const CONSENT_VERSION = 1;

/** Read consent from localStorage — returns null if never set. */
export function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (!parsed.categories || typeof parsed.timestamp !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Persist consent decision. */
export function setConsent(
  categories: Partial<Record<CookieCategory, boolean>>,
): CookieConsent {
  const consent: CookieConsent = {
    timestamp: new Date().toISOString(),
    categories: {
      essential: true, // essential cannot be turned off
      analytics: categories.analytics ?? false,
    },
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage may be full or blocked; fail silently
  }
  return consent;
}

/** Check if a given category has been accepted. */
export function hasConsent(category: CookieCategory): boolean {
  if (category === "essential") return true; // always allowed
  const consent = getConsent();
  return consent?.categories?.[category] === true;
}

/** Reset consent (ask again on next visit). */
export function resetConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}

export { CONSENT_VERSION, STORAGE_KEY };
