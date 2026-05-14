"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { productsFallback } from "@/lib/data/loader";
import { getProducts } from "@/lib/sanity/queries";

export default function ProdukPage() {
  const t = useTranslations();
  const [products, setProducts] = useState(productsFallback);
  const [selectedJenis, setSelectedJenis] = useState<string | null>(null);

  useEffect(() => {
    getProducts().then((data) => { if (data?.length) setProducts(data); }).catch(() => {});
  }, []);

  const allJenis = useMemo(() => {
    const set = new Set(products.map((p) => p.jenis));
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    if (!selectedJenis) return products;
    return products.filter((p) => p.jenis === selectedJenis);
  }, [products, selectedJenis]);

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-alt py-24">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-10">
            <div className="mb-8 inline-flex items-center gap-4">
              <span className="accent-line" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-acc">
                {t("produk.title")}
              </span>
              <span className="accent-line" />
            </div>
            <h1 className="font-serif text-fg">{t("produk.title")}</h1>
            <p className="mt-4 text-sm font-medium text-fg-dim">
              {t("common.dari", { count: filtered.length, total: products.length })}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex flex-wrap gap-2">
              <Button variant={!selectedJenis ? "accent" : "outline"} size="sm" onClick={() => setSelectedJenis(null)}>
                {t("common.semua")}
              </Button>
              {allJenis.map((j) => (
                <Button key={j} variant={selectedJenis === j ? "accent" : "outline"} size="sm" onClick={() => setSelectedJenis(selectedJenis === j ? null : j)}>
                  {j}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
