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
    title: `${t("syaratKetentuan.title")} — Koperasi Bulau Ngandung`,
  };
}

export default async function SyaratKetentuanPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations();

  const sections = [
    {
      title: t("syaratKetentuan.section1Title"),
      items: [t("syaratKetentuan.section1Content")],
    },
    {
      title: t("syaratKetentuan.section2Title"),
      items: [
        t("syaratKetentuan.section2Content"),
        t("syaratKetentuan.section2List1"),
        t("syaratKetentuan.section2List2"),
        t("syaratKetentuan.section2List3"),
        t("syaratKetentuan.section2List4"),
      ],
    },
    {
      title: t("syaratKetentuan.section3Title"),
      items: [t("syaratKetentuan.section3Content")],
    },
    {
      title: t("syaratKetentuan.section4Title"),
      items: [t("syaratKetentuan.section4Content")],
    },
    {
      title: t("syaratKetentuan.section5Title"),
      items: [t("syaratKetentuan.section5Content")],
    },
    {
      title: t("syaratKetentuan.section6Title"),
      items: [t("syaratKetentuan.section6Content")],
    },
    {
      title: t("syaratKetentuan.section7Title"),
      items: [t("syaratKetentuan.section7Content")],
    },
    {
      title: t("syaratKetentuan.section8Title"),
      items: [t("syaratKetentuan.section8Content")],
    },
    {
      title: t("syaratKetentuan.section9Title"),
      items: [
        t("syaratKetentuan.section9Content"),
        t("syaratKetentuan.section9Email"),
        t("syaratKetentuan.section9Address"),
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
                {t("syaratKetentuan.title")}
              </span>
              <span className="accent-line" />
            </div>
            <h1 className="font-serif text-fg">{t("syaratKetentuan.title")}</h1>
            <p className="mt-5 text-sm text-fg-dim">
              {t("syaratKetentuan.lastUpdated")}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
            {/* Pengantar */}
            <p className="mb-12 text-base leading-relaxed text-fg-dim">
              {t("syaratKetentuan.pengantar")}
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
