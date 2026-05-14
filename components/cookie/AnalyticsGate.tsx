"use client";

import { useCookieConsent } from "@/components/cookie/CookieContext";
import { AnalyticsWrapper } from "@/components/shared/AnalyticsWrapper";

/**
 * Conditionally renders Vercel Analytics based on cookie consent.
 * Drop-in replacement for <AnalyticsWrapper />.
 */
export function AnalyticsGate() {
  const { hasConsent } = useCookieConsent();

  // Only load analytics if user has consented.
  if (!hasConsent("analytics")) return null;

  return <AnalyticsWrapper />;
}
