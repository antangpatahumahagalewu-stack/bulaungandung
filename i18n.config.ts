export const locales = ["id", "en", "zh", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";
export const localePrefix = "always" as const;

export const localeLabels: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
  zh: "中文",
  ja: "日本語",
};
