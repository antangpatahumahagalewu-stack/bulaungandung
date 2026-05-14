import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { getActivityBySlug, getAllActivitySlugs } from "@/lib/data/loader";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllActivitySlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export default async function DetailKegiatanPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations();
  const activity = await getActivityBySlug(slug);
  if (!activity) notFound();
  const l = locale as keyof typeof activity.judul;

  return (
    <>
      <Navbar />
      <main>
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
            <Link href="/kegiatan" className="inline-flex items-center gap-2 text-sm font-medium text-fg-dim hover:text-fg transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> {t("common.kembaliKe", { page: t("kegiatan.title") })}
            </Link>
            <h1 className="font-serif text-3xl font-bold text-fg sm:text-4xl tracking-tight">{activity.judul[l]}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-fg-dim">
              <Calendar className="h-4 w-4" />
              {new Date(activity.tanggal).toLocaleDateString(locale === "id" ? "id-ID" : locale, { year: "numeric", month: "long", day: "numeric" })}
            </p>
            {activity.foto?.[0] && (
              <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-mu">
                <Image src={activity.foto[0]} alt={activity.judul[l]} fill className="object-cover" />
              </div>
            )}
            <div className="mx-auto mt-10 max-w-3xl space-y-5">
              {activity.konten[l]?.split("\n\n").map((par, i) => (
                <p key={i} className="text-base leading-relaxed text-fg-dim">{par.trim()}</p>
              ))}
            </div>
            {activity.foto?.length > 1 && (
              <div className="mt-16">
                <h2 className="mb-8 text-2xl font-serif font-bold text-fg text-center">{t("common.galeriFoto")}</h2>
                <PhotoGallery photos={activity.foto.slice(1)} alt="Galeri" />
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
