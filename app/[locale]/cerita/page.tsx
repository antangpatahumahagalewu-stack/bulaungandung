"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StoryCard } from "@/components/ui/StoryCard";
import { Button } from "@/components/ui/button";
import { storiesFallback } from "@/lib/data/loader";
import { getStories } from "@/lib/sanity/queries";

export default function CeritaPage() {
  const t = useTranslations();
  const [stories, setStories] = useState(storiesFallback);
  const [selectedKategori, setSelectedKategori] = useState<string | null>(null);

  useEffect(() => {
    getStories().then((data) => { if (data?.length) setStories(data); }).catch(() => {});
  }, []);

  const allKategori = useMemo(() => {
    const set = new Set(stories.map((s) => s.kategori));
    return Array.from(set);
  }, [stories]);

  const filtered = useMemo(() => {
    if (!selectedKategori) return stories;
    return stories.filter((s) => s.kategori === selectedKategori);
  }, [stories, selectedKategori]);

  const kategoriLabels: Record<string, string> = {
    "asal-usul": t("cerita.kategori.asal-usul"),
    anggota: t("cerita.kategori.anggota"),
    produk: t("cerita.kategori.produk"),
    dampak: t("cerita.kategori.dampak"),
    mitra: t("cerita.kategori.mitra"),
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-pri-subtle to-background">
          <div className="absolute -top-1/3 left-1/4 h-72 w-72 rounded-full bg-acc-subtle blur-[100px] opacity-50" />
          <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 lg:px-10">
            <div className="mb-8 inline-flex items-center gap-4">
              <span className="accent-line" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-acc">
                {t("cerita.title")}
              </span>
              <span className="accent-line" />
            </div>
            <h1 className="font-serif text-fg">
              {t("cerita.title")}
            </h1>
            <p className="mt-4 text-sm font-medium text-fg-dim">
              {t("common.dari", { count: filtered.length, total: stories.length })}
            </p>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedKategori ? "accent" : "outline"}
              size="sm"
              onClick={() => setSelectedKategori(null)}
            >
              {t("common.semua")}
            </Button>
            {allKategori.map((k) => (
              <Button
                key={k}
                variant={selectedKategori === k ? "accent" : "outline"}
                size="sm"
                onClick={() =>
                  setSelectedKategori(selectedKategori === k ? null : k)
                }
              >
                {kategoriLabels[k] || k}
              </Button>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-7xl px-6 pb-24 sm:px-8 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
