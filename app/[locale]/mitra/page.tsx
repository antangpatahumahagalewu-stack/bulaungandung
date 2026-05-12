import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getSite } from "@/lib/data/loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default async function MitraPage() {
  const t = await getTranslations();
  const site = await getSite();

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-alt py-24">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-10">
            <div className="mb-8 inline-flex items-center gap-4">
              <span className="accent-line" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-acc">
                {t("mitra.title")}
              </span>
              <span className="accent-line" />
            </div>
            <h1 className="font-serif text-fg">{t("mitra.title")}</h1>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
            <SectionTitle title={t("mitra.amal")} centered />
            {site.mitra.map((m, i) => (
              <div key={i} className="mx-auto max-w-3xl rounded-2xl bg-card border border-bdr p-8 sm:p-10">
                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                  <div className="relative h-24 w-48 shrink-0">
                    <Image
                      src={m.url.includes("antang.org") ? "https://antang.org/logo6.png" : (m.logo || "/images/placeholder.svg")}
                      alt={m.nama}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-fg tracking-tight">{m.nama}</h2>
                    <p className="mt-3 text-fg-dim leading-relaxed">{m.deskripsi.id}</p>
                    <Button asChild variant="outline" size="sm" className="mt-5">
                      <Link href={m.url} target="_blank" rel="noopener noreferrer">
                        {m.url}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-14 text-center">
              <p className="text-lg text-fg-dim">Ingin menjadi mitra Koperasi Bulau Ngandung?</p>
              <Button asChild variant="accent" className="mt-5">
                <Link href="/kontak">{t("nav.kontak")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
