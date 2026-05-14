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
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale() as "id" | "en" | "zh" | "ja";

  return (
    <Link href={{ pathname: "/produk/[slug]", params: { slug: product.slug } }} className="group block">
      <Card className="h-full overflow-hidden border-bdr-subtle bg-card-bg hover:shadow-md hover:border-acc/20 hover:-translate-y-1 transition-all duration-500">
        <div className="relative aspect-[4/3] overflow-hidden bg-mu">
          <Image
            src={product.foto?.[0] || "/images/placeholder.svg"}
            alt={product.nama}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <CardHeader className="pb-2">
          <Badge variant="accent" className="w-fit text-[11px] tracking-wider">
            {product.jenis}
          </Badge>
          <CardTitle className="line-clamp-1 text-lg">
            {product.nama}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-pri tracking-tight">
              {product.hargaRange}
            </p>
            <p className={`text-xs font-medium tracking-wide ${product.stok > 0 ? "text-[hsl(150_50%_40%)]" : "text-destructive"}`}>
              {product.stok > 0 ? `Stok: ${product.stok}` : "Habis"}
            </p>
          </div>
          <p className="mt-2.5 line-clamp-2 text-sm text-fg-dim leading-relaxed">
            {product.deskripsi[locale]?.slice(0, 120) || ""}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
