"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage(t("success"));
        setEmail("");
      } else {
        setStatus("error");
        setMessage(t("error"));
      }
    } catch {
      setStatus("error");
      setMessage(t("error"));
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-dim/60" />
          <Input
            type="email"
            placeholder={t("placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-11 h-12 rounded-xl border-bdr bg-card-bg text-sm focus:border-acc/40 focus:ring-2 focus:ring-acc/10 transition-all duration-300"
            required
            disabled={status === "loading"}
          />
        </div>
        <Button
          type="submit"
          variant="accent"
          className="h-12 px-6 rounded-xl"
          disabled={status === "loading"}
        >
          {status === "loading" ? "..." : t("subscribe")}
        </Button>
      </form>
      {status === "success" && (
        <p className="mt-3 text-center text-sm text-[hsl(150_50%_40%)] font-medium">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-center text-sm text-destructive font-medium">{message}</p>
      )}
    </div>
  );
}
