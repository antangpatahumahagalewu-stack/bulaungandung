import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("kebijakanPrivasi.title")} — Koperasi Bulau Ngandung`,
  };
}

export default async function KebijakanPrivasiPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations();

  const sections = [
    {
      title: t("kebijakanPrivasi.section1Title"),
      items: [
        t("kebijakanPrivasi.section1Content1"),
        t("kebijakanPrivasi.section1List1"),
        t("kebijakanPrivasi.section1List2"),
        t("kebijakanPrivasi.section1List3"),
        t("kebijakanPrivasi.section1List4"),
        t("kebijakanPrivasi.section1List5"),
        t("kebijakanPrivasi.section1Content2"),
      ],
    },
    {
      title: t("kebijakanPrivasi.section2Title"),
      items: [
        t("kebijakanPrivasi.section2Content"),
        t("kebijakanPrivasi.section2List1"),
        t("kebijakanPrivasi.section2List2"),
        t("kebijakanPrivasi.section2List3"),
        t("kebijakanPrivasi.section2List4"),
      ],
    },
    {
      title: t("kebijakanPrivasi.section3Title"),
      items: [t("kebijakanPrivasi.section3Content")],
    },
    {
      title: t("kebijakanPrivasi.section4Title"),
      items: [
        t("kebijakanPrivasi.section4Content"),
        t("kebijakanPrivasi.section4List1"),
        t("kebijakanPrivasi.section4List2"),
        t("kebijakanPrivasi.section4List3"),
      ],
    },
    {
      title: t("kebijakanPrivasi.section5Title"),
      items: [
        t("kebijakanPrivasi.section5Content"),
        t("kebijakanPrivasi.section5List1"),
        t("kebijakanPrivasi.section5List2"),
        t("kebijakanPrivasi.section5List3"),
        t("kebijakanPrivasi.section5List4"),
      ],
    },
    {
      title: t("kebijakanPrivasi.section6Title"),
      items: [t("kebijakanPrivasi.section6Content")],
    },
    {
      title: t("kebijakanPrivasi.section7Title"),
      items: [t("kebijakanPrivasi.section7Content")],
    },
    {
      title: t("kebijakanPrivasi.section8Title"),
      items: [
        t("kebijakanPrivasi.section8Content"),
        t("kebijakanPrivasi.section8Email"),
        t("kebijakanPrivasi.section8Address"),
      ],
    },
  ];

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
                {t("kebijakanPrivasi.title")}
              </span>
              <span className="accent-line" />
            </div>
            <h1 className="font-serif text-fg">{t("kebijakanPrivasi.title")}</h1>
            <p className="mt-5 text-sm text-fg-dim">
              {t("kebijakanPrivasi.lastUpdated")}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
            {/* Pengantar */}
            <p className="mb-12 text-base leading-relaxed text-fg-dim">
              {t("kebijakanPrivasi.pengantar")}
            </p>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, i) => (
                <div key={i}>
                  <SectionTitle title={section.title} centered={false} className="mb-4" />
                  <div className="space-y-3 text-base leading-relaxed text-fg-dim">
                    {section.items.map((item, j) => {
                      const isFirst = j === 0;
                      const isLast = j === section.items.length - 1;
                      // List items are those between first and last
                      if (!isFirst && !isLast && section.items.length > 2) {
                        return (
                          <p key={j} className="flex items-start gap-3 pl-4">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-acc" />
                            <span>{item}</span>
                          </p>
                        );
                      }
                      return (
                        <p key={j} className={j > 0 ? "pl-4" : ""}>
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
