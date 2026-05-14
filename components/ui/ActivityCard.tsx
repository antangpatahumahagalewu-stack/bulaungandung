"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Activity } from "@/types";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const locale = useLocale() as "id" | "en" | "zh" | "ja";

  return (
    <Link href={{ pathname: "/kegiatan/[slug]", params: { slug: activity.slug } }} className="group block">
      <Card className="h-full overflow-hidden border-bdr-subtle bg-card-bg hover:shadow-md hover:border-pri/20 hover:-translate-y-1 transition-all duration-500">
        <div className="relative aspect-[16/10] overflow-hidden bg-mu">
          {activity.foto?.[0] && (
            <Image
              src={activity.foto[0]}
              alt={activity.judul[locale]}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-2 text-lg">
            {activity.judul[locale]}
          </CardTitle>
          <p className="text-xs text-fg-dim tracking-wide">
            {new Date(activity.tanggal).toLocaleDateString(
              locale === "id"
                ? "id-ID"
                : locale === "en"
                ? "en-US"
                : locale === "zh"
                ? "zh-CN"
                : "ja-JP",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </p>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-fg-dim leading-relaxed">
            {activity.konten[locale]?.slice(0, 150) || ""}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
