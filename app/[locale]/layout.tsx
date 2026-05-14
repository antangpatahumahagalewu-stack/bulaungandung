import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { locales } from "@/i18n.config";
import { CookieProvider } from "@/components/cookie/CookieContext";
import { CookieConsent } from "@/components/cookie/CookieConsent";
import { CookiePreferences } from "@/components/cookie/CookiePreferences";
import { AnalyticsGate } from "@/components/cookie/AnalyticsGate";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Koperasi Bulau Ngandung",
  description:
    "From the Kapuas Forest, to the World. Social Forestry Cooperative in Kapuas Regency, Central Kalimantan.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CookieProvider>
        {children}
        <CookieConsent />
        <CookiePreferences />
        <AnalyticsGate />
      </CookieProvider>
    </NextIntlClientProvider>
  );
}
