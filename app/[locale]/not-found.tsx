import Link from "next/link";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-32">
        <div className="text-center px-6">
          <h1 className="text-7xl font-serif font-bold text-pri">404</h1>
          <h2 className="mt-6 text-2xl font-semibold text-fg tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-3 text-fg-dim">{t("description")}</p>
          <Button asChild className="mt-8" variant="accent">
            <Link href="/">{t("back")}</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
