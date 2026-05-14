import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PullQuote } from "@/components/ui/PullQuote";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getAllProductSlugs } from "@/lib/data/loader";
import { getAllMembers } from "@/lib/data/loader";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export default async function DetailProdukPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations();
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const l = locale as keyof typeof product.deskripsi;
  const members = await getAllMembers();
  const member = members.find((m: any) => m.slug === (product as any).asalKelompok);

  return (
    <>
      <Navbar />
      <main>
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
            <Link href="/produk" className="inline-flex items-center gap-2 text-sm font-medium text-fg-dim hover:text-fg transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> {t("common.kembaliKe", { page: t("produk.title") })}
            </Link>

            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mu">
                  <Image src={product.foto?.[0] || "/images/placeholder.svg"} alt={product.nama} fill className="object-cover" priority />
                </div>
                <PhotoGallery photos={product.foto?.slice(1) ?? []} alt={product.nama} />
              </div>
              <div className="space-y-6">
                <Badge variant="accent" className="text-xs tracking-wider">{product.jenis}</Badge>
                <h1 className="font-serif text-3xl font-bold text-fg sm:text-4xl leading-tight tracking-tight">{product.nama}</h1>
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-bold text-pri tracking-tight">{product.hargaRange}</p>
                  <p className={`text-sm font-semibold tracking-wide ${product.stok > 0 ? "text-[hsl(150_50%_40%)]" : "text-destructive"}`}>
                    {product.stok > 0 ? t("common.stok", { count: product.stok }) : t("common.habis")}
                  </p>
                </div>
                <div className="space-y-4">
                  {product.deskripsi[l]?.split("\n\n").map((par, i) => (
                    <p key={i} className="text-base leading-relaxed text-fg-dim">{par.trim()}</p>
                  ))}
                </div>
                {member && (
                  <Link href={{ pathname: "/kelompok/[slug]", params: { slug: member.slug } }} className="inline-flex items-center gap-1.5 text-sm font-medium text-pri hover:underline">
                    <span className="text-fg-dim">{t("common.asal")}</span> {member.nama}
                  </Link>
                )}
              </div>
            </div>

            {product.cerita[l] && (
              <section className="mt-20">
                <SectionTitle title={t("common.ceritaProduk")} centered />
                <div className="mx-auto max-w-3xl space-y-4">
                  {product.cerita[l]?.split("\n\n").map((par, i) => (
                    <p key={i} className="text-base leading-relaxed text-fg-dim">{par.trim()}</p>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-20">
              <SectionTitle title={t("common.kisahPengrajin")} centered />
              <div className="mx-auto max-w-3xl">
                <div className="flex items-center gap-5 mb-8 justify-center">
                  <Image src={product.fotoPengrajin || "/images/placeholder.svg"} alt={product.namaPengrajin} width={72} height={72} className="rounded-full object-cover ring-2 ring-acc/20" />
                  <div>
                    <h3 className="font-semibold text-fg tracking-tight">{product.namaPengrajin}</h3>
                    <p className="text-sm text-fg-dim mt-0.5">{t("common.pengrajin")}</p>
                  </div>
                </div>
                <PullQuote data={{ quote: product.kutipan, name: product.namaPengrajin, role: t("common.pengrajin"), foto: product.fotoPengrajin }} />
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
