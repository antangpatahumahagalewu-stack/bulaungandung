import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PullQuote } from "@/components/ui/PullQuote";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStoryBySlug, getAllStorySlugs } from "@/lib/data/loader";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllStorySlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export default async function DetailCeritaPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations();
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const l = locale as keyof typeof story.judul;
  const kategoriLabel = t(`cerita.kategoriLabels.${story.kategori}` as any);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative h-[55vh] overflow-hidden">
          <Image src={story.fotoUtama || "/images/placeholder.svg"} alt={story.judul[l]} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="mx-auto max-w-4xl">
              <Badge variant="accent" className="mb-3 tracking-wider">{kategoriLabel || story.kategori}</Badge>
              <h1 className="font-serif text-3xl font-bold text-fg sm:text-4xl tracking-tight">{story.judul[l]}</h1>
              {story.tanggal && (
                <p className="mt-2 flex items-center gap-2 text-sm text-fg-dim">
                  <Calendar className="h-4 w-4" />
                  {new Date(story.tanggal).toLocaleDateString(locale === "id" ? "id-ID" : locale, { year: "numeric", month: "long", day: "numeric" })}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
            <Link href="/cerita" className="inline-flex items-center gap-2 text-sm font-medium text-fg-dim hover:text-fg transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> {t("common.kembaliKe", { page: t("nav.cerita") })}
            </Link>
            <div className="mx-auto max-w-3xl space-y-5">
              {story.narasi[l]?.split("\n\n").map((par, i) => (
                <p key={i} className="text-lg leading-relaxed text-fg-dim">{par.trim()}</p>
              ))}
            </div>
            {story.kutipan[l] && (
              <div className="mt-16">
                <PullQuote data={{ quote: story.kutipan, name: story.namaNarasumber, role: story.peranNarasumber, foto: story.fotoUtama }} />
              </div>
            )}
            {story.galeri?.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-8 text-2xl font-serif font-bold text-fg text-center">{t("common.galeriFoto")}</h2>
                <PhotoGallery photos={story.galeri} alt={story.judul[l]} />
              </div>
            )}
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              {story.terkaitKelompok && (
                <Button asChild variant="outline"><Link href={{ pathname: "/kelompok/[slug]", params: { slug: story.terkaitKelompok } }}>{t("common.lihatKelompok")}</Link></Button>
              )}
              {story.terkaitProduk && (
                <Button asChild variant="outline"><Link href={{ pathname: "/produk/[slug]", params: { slug: story.terkaitProduk } }}>{t("common.lihatProduk")}</Link></Button>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
