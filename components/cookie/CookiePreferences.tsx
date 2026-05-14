"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { useCookieConsent } from "@/components/cookie/CookieContext";
import { Button } from "@/components/ui/button";
import { getConsent, type CookieCategory } from "@/lib/cookie/consent";

// ── Category descriptors ───────────────────────────────

interface CategoryInfo {
  key: CookieCategory;
  titleKey: string;
  descKey: string;
  alwaysOn?: boolean;
}

const CATEGORIES: CategoryInfo[] = [
  {
    key: "essential",
    titleKey: "essentialTitle",
    descKey: "essentialDesc",
    alwaysOn: true,
  },
  {
    key: "analytics",
    titleKey: "analyticsTitle",
    descKey: "analyticsDesc",
  },
];

// ── Inner component (keyed to reset state on open) ─────

function PreferencesForm() {
  const t = useTranslations("cookie");
  const { closePreferences, savePreferences } = useCookieConsent();

  const initial = getConsent()?.categories ?? {
    essential: true,
    analytics: false,
  };
  const [prefs, setPrefs] =
    useState<Record<CookieCategory, boolean>>(initial);

  const handleSave = () => {
    savePreferences(prefs);
    closePreferences();
  };

  return (
    <>
      {/* Close */}
      <button
        onClick={closePreferences}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-lg p-1 text-fg-dim transition-colors hover:bg-mu hover:text-fg"
      >
        <X className="h-5 w-5" />
      </button>

      <h2
        className="pr-8 text-lg font-semibold text-fg"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {t("preferencesTitle")}
      </h2>
      <p className="mt-1 text-sm text-fg-dim">{t("preferencesDesc")}</p>

      {/* Categories */}
      <ul className="mt-5 space-y-4">
        {CATEGORIES.map((cat) => (
          <li
            key={cat.key}
            className="flex items-start justify-between gap-4 rounded-xl border border-bdr/60 bg-bg-alt p-3.5"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-fg">{t(cat.titleKey)}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-fg-dim">
                {t(cat.descKey)}
              </p>
            </div>
            <label className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center">
              <input
                type="checkbox"
                role="switch"
                aria-checked={prefs[cat.key]}
                className="peer sr-only"
                checked={prefs[cat.key]}
                disabled={cat.alwaysOn}
                onChange={(e) =>
                  setPrefs((prev) => ({
                    ...prev,
                    [cat.key]: e.target.checked,
                  }))
                }
              />
              <span className="absolute inset-0 rounded-full bg-mu-fg/30 transition-colors peer-checked:bg-pri peer-disabled:opacity-50 peer-disabled:cursor-not-allowed" />
              <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
            </label>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={closePreferences}>
          {t("cancel")}
        </Button>
        <Button variant="default" size="sm" onClick={handleSave}>
          {t("save")}
        </Button>
      </div>
    </>
  );
}

// ── Public component ───────────────────────────────────

export function CookiePreferences() {
  const { preferencesOpen, closePreferences } = useCookieConsent();
  const panelRef = useRef<HTMLDivElement>(null!);
  const previousActiveElement = useRef<Element | null>(null);

  // Focus trap + auto-focus + Escape key
  useEffect(() => {
    if (!preferencesOpen) return;

    previousActiveElement.current = document.activeElement;

    const panel = panelRef.current;
    // Focus the panel (or first focusable child)
    panel?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePreferences();
        return;
      }

      // Trap Tab focus within the panel
      if (e.key === "Tab" && panel) {
        const focusable = panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus
      (previousActiveElement.current as HTMLElement)?.focus?.();
    };
  }, [preferencesOpen, closePreferences]);

  if (!preferencesOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie Preferences"
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={closePreferences}
      />

      {/* Panel — keyed by `preferencesOpen` to reset state on every open */}
      <div
        ref={panelRef}
        key={String(preferencesOpen)}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-t-2xl bg-white p-6 shadow-2xl outline-none sm:rounded-2xl"
      >
        <PreferencesForm />
      </div>
    </div>
  );
}
