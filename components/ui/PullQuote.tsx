"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Quote } from "lucide-react";
import type { PullQuoteData } from "@/types";

interface PullQuoteProps {
  data: PullQuoteData;
  className?: string;
}

export function PullQuote({ data, className }: PullQuoteProps) {
  const locale = useLocale();

  return (
    <blockquote
      className={`relative mx-auto max-w-3xl py-14 text-center ${className || ""}`}
    >
      <Quote className="mx-auto mb-6 h-10 w-10 text-acc/30" aria-hidden="true" />
      <p className="text-xl font-medium italic leading-relaxed text-fg sm:text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
        &ldquo;{data.quote}&rdquo;
      </p>
      <footer className="mt-8 flex items-center justify-center gap-4">
        {data.foto && (
          <Image
            src={data.foto}
            alt={data.name}
            width={52}
            height={52}
            className="rounded-full object-cover ring-2 ring-acc/20"
          />
        )}
        <div className="text-left">
          <cite className="not-italic font-semibold text-fg tracking-tight">
            {data.name}
          </cite>
          <p className="text-sm text-fg-dim mt-0.5">{data.role}</p>
        </div>
      </footer>
    </blockquote>
  );
}
