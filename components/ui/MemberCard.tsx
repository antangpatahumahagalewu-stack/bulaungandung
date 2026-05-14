"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Member } from "@/types";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const locale = useLocale() as "id" | "en" | "zh" | "ja";

  return (
    <Link href={{ pathname: "/kelompok/[slug]", params: { slug: member.slug } }} className="group block">
      <Card className="h-full overflow-hidden border-bdr-subtle bg-card-bg hover:shadow-md hover:border-pri/20 hover:-translate-y-1 transition-all duration-500">
        <div className="relative aspect-[16/10] overflow-hidden bg-mu">
          <Image
            src={member.foto || "/images/placeholder.svg"}
            alt={member.nama}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[11px] tracking-wider">
              {member.tipeIzin}
            </Badge>
            <Badge variant="outline" className="text-[11px] tracking-wider">
              {member.jenisHutan}
            </Badge>
          </div>
          <CardTitle className="line-clamp-1 text-lg">{member.nama}</CardTitle>
          <p className="text-sm text-fg-dim">{member.desa}, {member.kecamatan}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-fg-dim">
            <span>{member.luasAreal.toLocaleString()} Ha</span>
            <span className="text-bdr">|</span>
            <span>{member.jenisHhbk.slice(0, 2).join(", ")}</span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-fg-dim leading-relaxed">
            {member.deskripsi[locale]?.slice(0, 150) || ""}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
