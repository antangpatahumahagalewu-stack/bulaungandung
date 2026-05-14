"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Cookie } from "lucide-react";
import { useCookieConsent } from "@/components/cookie/CookieContext";

export function Footer() {
  const t = useTranslations();
  const navT = useTranslations("nav");
  const footerT = useTranslations("footer");
  const cookieT = useTranslations("cookie");
  const { openPreferences } = useCookieConsent();

  const navLinks = [
    { key: "beranda", href: "/" },
    { key: "tentang", href: "/tentang" },
    { key: "kelompok", href: "/kelompok" },
    { key: "produk", href: "/produk" },
    { key: "cerita", href: "/cerita" },
    { key: "kegiatan", href: "/kegiatan" },
    { key: "mitra", href: "/mitra" },
    { key: "kontak", href: "/kontak" },
  ] as const;

  return (
    <footer className="bg-footer text-[hsl(240_2%_72%)]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-base font-semibold tracking-tight text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <Image
                src="/logo.png"
                alt="Bulau Ngandung"
                width={72}
                height={72}
                className="h-14 w-auto brightness-0 invert"
              />
              <span>Bulau Ngandung</span>
            </Link>
            <p className="text-sm leading-relaxed text-[hsl(240_2%_62%)]">
              {footerT("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wider uppercase text-[hsl(240_2%_82%)]" style={{ fontFamily: "var(--font-sans)" }}>
              {t("site.title")}
            </h3>
            <ul className="space-y-2">
              {navLinks
                .filter((l) => l.key !== "beranda")
                .map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-sm text-[hsl(240_2%_62%)] transition-colors hover:text-white"
                    >
                      {navT(link.key)}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wider uppercase text-[hsl(240_2%_82%)]" style={{ fontFamily: "var(--font-sans)" }}>
              {navT("kontak")}
            </h3>
            <ul className="space-y-2.5 text-sm text-[hsl(240_2%_62%)]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(240_2%_50%)]" />
                <span>Kabupaten Kapuas, Kalimantan Tengah</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(240_2%_50%)]" />
                <span>info@bulaungandung.org</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(240_2%_50%)]" />
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
          </div>

          {/* Partner */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wider uppercase text-[hsl(240_2%_82%)]" style={{ fontFamily: "var(--font-sans)" }}>
              {t("mitra.title")}
            </h3>
            <a
              href="https://antang.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[hsl(240_2%_62%)] transition-colors hover:text-white"
            >
              Yayasan Antangpatahu Mahaga Lewu (AMAL)
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[hsl(240_2%_18%)] pt-6 sm:flex-row">
          <p className="text-xs text-[hsl(240_2%_48%)]">
            &copy; {new Date().getFullYear()} {footerT("hakCipta")}. Developed by Boby Mihing.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/kebijakan-privasi"
              className="text-[hsl(240_2%_48%)] transition-colors hover:text-white"
            >
              {navT("kebijakanPrivasi")}
            </Link>
            <Link
              href="/syarat-ketentuan"
              className="text-[hsl(240_2%_48%)] transition-colors hover:text-white"
            >
              {navT("syaratKetentuan")}
            </Link>
            <button
              onClick={openPreferences}
              className="inline-flex items-center gap-1 text-[hsl(240_2%_48%)] transition-colors hover:text-white"
            >
              <Cookie className="h-3 w-3" />
              {cookieT("settingsLink")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
