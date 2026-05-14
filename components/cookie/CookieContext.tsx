"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getConsent,
  setConsent,
  type CookieCategory,
  type CookieConsent,
} from "@/lib/cookie/consent";

// ── External store subscription (localStorage) ─────────
// useSyncExternalStore requires getSnapshot to return a stable reference.
// We cache the last snapshot and only create a new one when localStorage
// actually changes (detected via JSON comparison).

const listeners = new Set<() => void>();

let cachedSnapshot: CookieConsent | null = getConsent();

function subscribeToConsent(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function getSnapshot(): CookieConsent | null {
  return cachedSnapshot;
}

function getServerSnapshot(): CookieConsent | null {
  return null; // on server there is no consent yet
}

function emitChange() {
  const next = getConsent();
  const nextStr = JSON.stringify(next);
  const prevStr = JSON.stringify(cachedSnapshot);
  if (nextStr !== prevStr) {
    cachedSnapshot = next;
    listeners.forEach((l) => l());
  }
}

// ── Types ──────────────────────────────────────────────

interface CookieContextValue {
  /** Current consent state (null = never answered). */
  consent: CookieConsent | null;
  /** Whether the banner should be visible. */
  showBanner: boolean;
  /** Accept all categories. */
  acceptAll: () => void;
  /** Reject non-essential categories. */
  rejectAll: () => void;
  /** Save custom preferences. */
  savePreferences: (prefs: Record<CookieCategory, boolean>) => void;
  /** Open the preferences modal. */
  openPreferences: () => void;
  /** Close the preferences modal. */
  closePreferences: () => void;
  /** Whether the preferences modal is open. */
  preferencesOpen: boolean;
  /** Check if a specific category has consent. */
  hasConsent: (category: CookieCategory) => boolean;
}

// ── Context ────────────────────────────────────────────

const CookieContext = createContext<CookieContextValue | null>(null);

// ── Provider ───────────────────────────────────────────

export function CookieProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getSnapshot,
    getServerSnapshot,
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const showBanner = consent === null;

  const acceptAll = useCallback(() => {
    setConsent({ analytics: true });
    emitChange();
  }, []);

  const rejectAll = useCallback(() => {
    setConsent({ analytics: false });
    emitChange();
  }, []);

  const savePreferences = useCallback(
    (prefs: Record<CookieCategory, boolean>) => {
      setConsent(prefs);
      emitChange();
    },
    [],
  );

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
  }, []);

  const hasConsentFn = useCallback(
    (category: CookieCategory): boolean => {
      if (category === "essential") return true;
      return consent?.categories?.[category] === true;
    },
    [consent],
  );

  const value = useMemo(
    () => ({
      consent,
      showBanner,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
      preferencesOpen,
      hasConsent: hasConsentFn,
    }),
    [
      consent,
      showBanner,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
      preferencesOpen,
      hasConsentFn,
    ],
  );

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────

export function useCookieConsent(): CookieContextValue {
  const ctx = useContext(CookieContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used inside <CookieProvider>");
  }
  return ctx;
}
