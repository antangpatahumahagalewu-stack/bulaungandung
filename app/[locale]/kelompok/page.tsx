"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MemberCard } from "@/components/ui/MemberCard";
import { Button } from "@/components/ui/button";
import { membersFallback } from "@/lib/data/loader";
import { getMembers } from "@/lib/sanity/queries";

export default function KelompokPage() {
  const t = useTranslations("kelompok");
  const [members, setMembers] = useState(membersFallback);
  const [selectedHhbk, setSelectedHhbk] = useState<string | null>(null);
  const [selectedDesa, setSelectedDesa] = useState<string | null>(null);

  useEffect(() => {
    getMembers().then((data) => { if (data?.length) setMembers(data); }).catch(() => {});
  }, []);

  const allHhbk = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => m.jenisHhbk.forEach((h) => set.add(h)));
    return Array.from(set).sort();
  }, [members]);

  const allDesa = useMemo(() => {
    const set = new Set(members.map((m) => m.desa));
    return Array.from(set).sort();
  }, [members]);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (selectedHhbk && !m.jenisHhbk.includes(selectedHhbk)) return false;
      if (selectedDesa && m.desa !== selectedDesa) return false;
      return true;
    });
  }, [members, selectedHhbk, selectedDesa]);

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-alt py-24">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-10">
            <div className="mb-8 inline-flex items-center gap-4">
              <span className="accent-line" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-acc">
                {t("title")}
              </span>
              <span className="accent-line" />
            </div>
            <h1 className="font-serif text-fg">{t("title")}</h1>
            <p className="mt-4 text-sm font-medium text-fg-dim">
              {filtered.length} dari {members.length} kelompok
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex flex-wrap gap-2">
              <Button variant={!selectedHhbk ? "accent" : "outline"} size="sm" onClick={() => setSelectedHhbk(null)}>
                Semua HHBK
              </Button>
              {allHhbk.map((h) => (
                <Button key={h} variant={selectedHhbk === h ? "accent" : "outline"} size="sm" onClick={() => setSelectedHhbk(selectedHhbk === h ? null : h)}>
                  {h}
                </Button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant={!selectedDesa ? "default" : "outline"} size="sm" onClick={() => setSelectedDesa(null)}>
                Semua Desa
              </Button>
              {allDesa.map((d) => (
                <Button key={d} variant={selectedDesa === d ? "default" : "outline"} size="sm" onClick={() => setSelectedDesa(selectedDesa === d ? null : d)}>
                  {d}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((member) => (
                <MemberCard key={member.slug} member={member} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
