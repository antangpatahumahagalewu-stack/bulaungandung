import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/ui/ProductCard";
import { Badge } from "@/components/ui/badge";
import { getMemberBySlug, getAllMemberSlugs, getAllProducts } from "@/lib/data/loader";
import Image from "next/image";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllMemberSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export default async function DetailKelompokPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations();
  const member = await getMemberBySlug(slug);
  if (!member) notFound();

  const products = await getAllProducts();
  const relatedProducts = products.filter((p: any) => p.asalKelompok === member.slug);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative h-[55vh] overflow-hidden">
          <Image src={member.foto || "/images/placeholder.svg"} alt={member.nama} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="tracking-wider">{member.tipeIzin}</Badge>
                <Badge variant="outline" className="tracking-wider">{member.jenisHutan}</Badge>
                <Badge variant="accent" className="tracking-wider">{member.luasAreal.toLocaleString()} Ha</Badge>
              </div>
              <h1 className="font-serif text-3xl font-bold text-fg sm:text-4xl tracking-tight">{member.nama}</h1>
              <p className="mt-2 text-lg text-fg-dim">{member.desa}, {member.kecamatan}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-10 md:grid-cols-3">
              <div className="md:col-span-2">
                <SectionTitle title={t("common.profilKelompok")} centered={false} />
                <div className="space-y-4">
                  {member.deskripsi[locale as keyof typeof member.deskripsi]?.split("\n\n").map((par, i) => (
                    <p key={i} className="text-base leading-relaxed text-fg-dim">{par.trim()}</p>
                  ))}
                </div>
              </div>
              <aside className="space-y-6">
                <div className="rounded-2xl bg-card border border-bdr p-6">
                  <h3 className="font-semibold text-fg mb-4 tracking-tight">{t("common.infoIzin")}</h3>
                  <dl className="space-y-3 text-sm">
                    {[
                      [t("kelompok.nomorSk") || "Nomor SK", member.nomorSK],
                      [t("kelompok.tanggalSk") || "Tanggal SK", member.tanggalSK],
                      [t("kelompok.nomorPks") || "Nomor PKS", member.nomorPKS],
                      [t("kelompok.masaBerlaku") || "Masa Berlaku", member.masaBerlaku],
                      [t("kelompok.fungsiKawasan") || "Fungsi Kawasan", member.fungsiKawasan],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <dt className="text-fg-dim/60 text-xs uppercase tracking-wider">{label}</dt>
                        <dd className="font-medium text-fg mt-0.5">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="rounded-2xl bg-card border border-bdr p-6">
                  <h3 className="font-semibold text-fg mb-4 tracking-tight">{t("common.jenisHhbk")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.jenisHhbk.map((h) => (
                      <Badge key={h} variant="accent" className="tracking-wider">{h}</Badge>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            {relatedProducts.length > 0 && (
              <div className="mt-20">
                <SectionTitle title={t("common.produkTerkait")} centered />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProducts.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
