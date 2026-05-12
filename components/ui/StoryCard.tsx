"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Story } from "@/types";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const locale = useLocale() as "id" | "en" | "zh" | "ja";
  const t = useTranslations("cerita");

  const categoryLabels: Record<string, string> = {
    "asal-usul": t("kategori.asal-usul"),
    anggota: t("kategori.anggota"),
    produk: t("kategori.produk"),
    dampak: t("kategori.dampak"),
    mitra: t("kategori.mitra"),
  };

  return (
    <Link href={`/cerita/${story.slug}`} className="group block">
      <Card className="h-full overflow-hidden border-bdr-subtle bg-card-bg hover:shadow-md hover:border-acc/20 hover:-translate-y-1 transition-all duration-500">
        <div className="relative aspect-[16/10] overflow-hidden bg-mu">
          <Image
            src={story.fotoUtama || "/images/placeholder.svg"}
            alt={story.judul[locale]}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Badge variant="accent" className="text-[11px] tracking-wider">
              {categoryLabels[story.kategori] || story.kategori}
            </Badge>
          </div>
          <CardTitle className="line-clamp-2 text-lg">
            {story.judul[locale]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-fg-dim leading-relaxed">
            {story.narasi[locale]?.slice(0, 150) || ""}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
