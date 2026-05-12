"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { locales, localeLabels, type Locale } from "@/i18n.config";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending] = useTransition();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    const pathWithoutLocale = pathname.replace(/^\/(id|en|zh|ja)/, "") || "/";
    router.push(`/${nextLocale}${pathWithoutLocale}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg"
          disabled={isPending}
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={loc === locale ? "bg-pri-subtle font-semibold" : ""}
          >
            <span className="text-base mr-2">
              {loc === "id" ? "🇮🇩" : loc === "en" ? "🇬🇧" : loc === "zh" ? "🇨🇳" : "🇯🇵"}
            </span>
            {localeLabels[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
