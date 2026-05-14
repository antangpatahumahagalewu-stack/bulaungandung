"use client";

import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/components/cookie/CookieContext";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function CookieConsent() {
  const t = useTranslations("cookie");
  const { showBanner, acceptAll, rejectAll, openPreferences } =
    useCookieConsent();

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      aria-describedby="cookie-desc"
      className="fixed bottom-0 left-0 right-0 z-50 animate-fade-up border-t border-bdr/60 bg-white/95 p-4 shadow-lg backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border sm:shadow-xl"
    >
      <div className="mx-auto max-w-7xl sm:mx-0">
        <p id="cookie-desc" className="text-sm leading-relaxed text-fg-dim">
          {t("description")}
          {" "}
          <Link
            href="/kebijakan-privasi"
            className="font-medium text-pri underline-offset-2 hover:underline"
          >
            {t("privacyLink")}
          </Link>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button variant="accent" size="sm" onClick={acceptAll}>
            {t("acceptAll")}
          </Button>
          <Button variant="outline" size="sm" onClick={rejectAll}>
            {t("rejectAll")}
          </Button>
          <Button variant="ghost" size="sm" onClick={openPreferences}>
            {t("customize")}
          </Button>
        </div>
      </div>
    </div>
  );
}
