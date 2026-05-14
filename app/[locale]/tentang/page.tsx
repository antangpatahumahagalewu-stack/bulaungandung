import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Timeline } from "@/components/ui/Timeline";
import { getSite, getTimelineItems } from "@/lib/data/loader";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TentangPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations();
  const site = await getSite();
  const timelineItems = getTimelineItems();
  const l = locale as keyof typeof site.aboutContent;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-alt py-24">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-10">
            <div className="mb-8 inline-flex items-center gap-4">
              <span className="accent-line" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-acc">
                {t("tentang.title")}
              </span>
              <span className="accent-line" />
            </div>
            <h1 className="font-serif text-fg">{t("tentang.title")}</h1>
            <p className="mt-5 text-lg leading-relaxed text-fg-dim max-w-2xl mx-auto">
              {t("site.description")}
            </p>
          </div>
        </section>

        {/* Arti Nama */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
            <SectionTitle title={t("tentang.artiNama")} centered />
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-lg leading-relaxed text-fg-dim" dangerouslySetInnerHTML={{ __html: t.raw("tentang.artiNamaDesc") }} />
            </div>
          </div>
        </section>

        {/* Narasi Sejarah */}
        <section className="bg-alt py-20">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
            <SectionTitle title={t("tentang.sejarah")} centered />
            <div className="mx-auto max-w-3xl space-y-5">
              {site.aboutContent[l].split("\n\n").slice(0, 5).map((par, i) => (
                <p key={i} className="text-base leading-relaxed text-fg-dim">
                  {par.trim()}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
            <SectionTitle title={t("tentang.timeline")} centered />
            <Timeline items={timelineItems} />
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="bg-alt py-20">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-card p-8 sm:p-10 border border-bdr">
                <SectionTitle title={t("tentang.visi")} centered className="mb-4" />
                <p className="text-base leading-relaxed text-fg-dim text-center">
                  {site.visi[l]}
                </p>
              </div>
              <div className="rounded-2xl bg-card p-8 sm:p-10 border border-bdr">
                <SectionTitle title={t("tentang.misi")} centered className="mb-4" />
                <div className="space-y-3 text-base text-fg-dim">
                  {site.misi[l].split("\n").map((m, i) => (
                    <p key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-acc" />
                      {m.replace(/^\d+\.\s*/, "")}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
