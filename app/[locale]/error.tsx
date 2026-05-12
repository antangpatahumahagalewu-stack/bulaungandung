"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-7xl font-serif font-bold text-destructive">500</h1>
        <h2 className="mt-6 text-2xl font-semibold text-fg tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-fg-dim">{t("description")}</p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button onClick={reset} variant="default">
            Coba Lagi
          </Button>
          <Button asChild variant="outline">
            <Link href="/">{t("back")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
