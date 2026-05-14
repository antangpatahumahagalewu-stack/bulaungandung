"use client";

import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteFallback } from "@/lib/data/loader";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function KontakPage() {
  const t = useTranslations();
  const site = siteFallback;

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-alt py-24">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-10">
            <div className="mb-8 inline-flex items-center gap-4">
              <span className="accent-line" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-acc">
                {t("kontak.title")}
              </span>
              <span className="accent-line" />
            </div>
            <h1 className="font-serif text-fg">{t("kontak.title")}</h1>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <SectionTitle title={t("kontak.kirim")} centered={false} />
                <ContactForm />
              </div>
              <div className="space-y-8">
                <SectionTitle title={t("kontak.infoKontak")} centered={false} />
                <div className="space-y-6">
                  {[
                    { icon: MapPin, title: t("kontak.alamat"), value: site.kontakAlamat },
                    { icon: Mail, title: t("kontak.email"), value: site.kontakEmail, href: `mailto:${site.kontakEmail}` },
                    { icon: Phone, title: t("kontak.whatsapp"), value: site.kontakWa, href: `https://wa.me/${site.kontakWa.replace(/\D/g, "")}` },
                    { icon: Clock, title: t("kontak.jamOperasional"), value: t("kontak.jamOperasionalValue") },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pri-subtle">
                        <item.icon className="h-5 w-5 text-pri" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-fg tracking-tight">{item.title}</h3>
                        {'href' in item ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-pri hover:underline">
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm text-fg-dim leading-relaxed whitespace-pre-line">{item.value}</p>
                        )}
                      </div>
                    </div>
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
