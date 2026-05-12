import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllActivities } from "@/lib/data/loader";
import { ActivityCard } from "@/components/ui/ActivityCard";

export default async function KegiatanPage() {
  const t = await getTranslations("kegiatan");
  const activities = await getAllActivities();

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-alt py-24">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-10">
            <div className="mb-8 inline-flex items-center gap-4">
              <span className="accent-line" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-acc">
                {t("title")}
              </span>
              <span className="accent-line" />
            </div>
            <h1 className="font-serif text-fg">{t("title")}</h1>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            {activities.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {activities.map((activity) => (
                  <ActivityCard key={activity.slug} activity={activity} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-fg-dim">
                  Belum ada berita atau kegiatan. Kunjungi kembali nanti.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
