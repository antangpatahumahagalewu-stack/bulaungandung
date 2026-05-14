"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navItems = [
  { key: "beranda", href: "/" },
  { key: "tentang", href: "/tentang" },
  { key: "kelompok", href: "/kelompok" },
  { key: "produk", href: "/produk" },
  { key: "cerita", href: "/cerita" },
  { key: "kegiatan", href: "/kegiatan" },
  { key: "mitra", href: "/mitra" },
  { key: "kontak", href: "/kontak" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [logoHovered, setLogoHovered] = useState(false);

  const pathWithoutLocale = pathname.replace(/^\/(id|en|zh|ja)/, "") || "/";

  return (
    <header className="sticky top-0 z-40 w-full bg-card border-b border-bdr-subtle shadow-sm">
      <div className={cn(
        "mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10 transition-all duration-300",
        logoHovered ? "h-40" : "h-20"
      )}>
        <Link
          href="/"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="group flex items-center gap-2.5 text-lg font-semibold tracking-tight text-pri transition-opacity hover:opacity-80"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <Image
            src="/logo.png"
            alt="Bulau Ngandung"
            width={192}
            height={192}
            className="h-[72px] w-auto transition-transform duration-300 group-hover:scale-[2]"
          />
          <span className="text-lg tracking-tight transition-transform duration-300 group-hover:translate-x-8">Bulau Ngandung</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const itemHref = (item.key === "beranda" ? "/" : `/${item.key}`) as "/" | "/tentang" | "/produk" | "/kelompok" | "/cerita" | "/kegiatan" | "/kontak" | "/mitra";
            const isActive =
              item.key === "beranda"
                ? pathWithoutLocale === "/"
                : pathWithoutLocale.startsWith(itemHref);
            return (
              <Link
                key={item.key}
                href={itemHref}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium tracking-tight transition-colors",
                  isActive
                    ? "text-pri"
                    : "text-mu-fg hover:text-fg"
                )}
              >
                {t(item.key)}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-acc" />
                )}
              </Link>
            );
          })}
          <span className="mx-1.5 h-5 w-px bg-bdr" />
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] pt-14">
              <nav className="flex flex-col gap-0.5">
                  {navItems.map((item) => {
                  const itemHref = (item.key === "beranda" ? "/" : `/${item.key}`) as "/" | "/tentang" | "/produk" | "/kelompok" | "/cerita" | "/kegiatan" | "/kontak" | "/mitra";
                  const isActive =
                    item.key === "beranda"
                      ? pathWithoutLocale === "/"
                      : pathWithoutLocale.startsWith(itemHref);
                  return (
                    <Link
                      key={item.key}
                      href={itemHref}
                      className={cn(
                        "rounded-lg px-3.5 py-2.5 text-base font-medium tracking-tight transition-colors",
                        isActive
                          ? "bg-pri-subtle text-pri"
                          : "text-mu-fg hover:bg-mu hover:text-fg"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-6 border-t border-bdr pt-4">
                <div className="flex flex-col gap-1">
                  <Link
                    href="/kebijakan-privasi"
                    className="rounded-lg px-3.5 py-2 text-sm text-mu-fg transition-colors hover:bg-mu hover:text-fg"
                  >
                    {t("kebijakanPrivasi")}
                  </Link>
                  <Link
                    href="/syarat-ketentuan"
                    className="rounded-lg px-3.5 py-2 text-sm text-mu-fg transition-colors hover:bg-mu hover:text-fg"
                  >
                    {t("syaratKetentuan")}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
