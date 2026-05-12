"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const pathWithoutLocale = pathname.replace(/^\/(id|en|zh|ja)/, "") || "/";

  return (
    <header className="sticky top-0 z-40 w-full bg-card border-b border-bdr-subtle shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-pri transition-opacity hover:opacity-80"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <span className="text-xl tracking-widest text-acc">B</span>
          <span className="hidden sm:inline">Bulau Ngandung</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const itemHref = `/${item.key === "beranda" ? "" : item.key}`;
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
                  const itemHref = `/${item.key === "beranda" ? "" : item.key}`;
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
