import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { StatCard } from "@/components/ui/StatCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/ui/ProductCard";
import { PullQuote } from "@/components/ui/PullQuote";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Button } from "@/components/ui/button";
import { getSite, getPullQuotes, getAllProducts } from "@/lib/data/loader";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default async function BerandaPage() {
  const t = await getTranslations();
  const site = await getSite();
  const pullQuotes = getPullQuotes();
  const products = await getAllProducts();

  return (
    <>
      <Navbar />
      <main>
        {/* Featured Products */}
        <section className="bg-alt py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <SectionTitle title={t("home.produkUnggulan")} centered />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/produk">
                  {t("produk.title")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Hero */}
        <Hero
          title={site.heroTitle.id}
          subtitle={site.heroSubtitle.id}
          image={site.heroImage}
        />

        {/* Stats Bar */}
        <section className="bg-alt py-20">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 divide-y divide-bdr sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {site.stats.map((stat, i) => (
                <StatCard key={i} value={stat.value} label={stat.label.id} />
              ))}
            </div>
          </div>
        </section>

        {/* About snippet */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
            <SectionTitle title={t("home.ceritaSingkat")} centered />
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-lg leading-relaxed text-fg-dim">
                {site.aboutContent.id.slice(0, 400)}...
              </p>
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/tentang">
                  {t("tentang.title")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pull quote */}
        {pullQuotes[0] && (
          <section className="bg-alt py-20">
            <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
              <SectionTitle title={t("home.testimoni")} centered />
              <PullQuote data={pullQuotes[0]} />
            </div>
          </section>
        )}

        {/* Partners */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
            <SectionTitle title={t("home.mitraKami")} centered />
            <div className="flex flex-wrap items-center justify-center gap-8">
              {site.mitra.map((m, i) => (
                <Link
                  key={i}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-xl border border-bdr bg-card p-6 transition-all duration-300 hover:border-acc/20 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="relative h-16 w-40 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src={m.logo || "/images/placeholder.svg"}
                      alt={m.nama}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-fg-dim group-hover:text-fg transition-colors">
                    {m.nama}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-alt py-20">
          <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-10">
            <SectionTitle title={t("home.newsletter")} centered />
            <NewsletterForm />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-pri py-24 text-center text-pri-fg">
          <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
            <h2>{t("home.ctaAkhir")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-pri-fg/75">
              {t("site.description")}
            </p>
            <div className="mt-9">
              <Button asChild size="lg" variant="accent">
                <Link href="/kontak">
                  {t("nav.kontak")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
