import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { locales } from "@/i18n.config";
import { AnalyticsWrapper } from "@/components/shared/AnalyticsWrapper";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Koperasi Bulau Ngandung",
  description:
    "Dari Hutan Kapuas, untuk Dunia. Koperasi Perhutanan Sosial di Kabupaten Kapuas, Kalimantan Tengah.",
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
      {children}
      <AnalyticsWrapper />
    </NextIntlClientProvider>
  );
}
