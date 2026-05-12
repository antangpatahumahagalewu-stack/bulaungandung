"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  image?: string;
}

export function Hero({ title, subtitle, image }: HeroProps) {
  const t = useTranslations();

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-white">
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover opacity-[0.08]"
            priority
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 lg:px-10">
        <div className="mb-8 inline-flex items-center gap-4">
          <span className="accent-line" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-acc">
            Kapuas, Kalimantan
          </span>
          <span className="accent-line" />
        </div>

        <h1 className="text-balance font-serif font-bold leading-[1.08] tracking-tight text-fg">
          {title}
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-fg-dim sm:text-xl">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" variant="accent">
            <Link href="/cerita">
              {t("hero.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/kontak">{t("nav.kontak")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
