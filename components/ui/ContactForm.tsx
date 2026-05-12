"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactFormData } from "@/lib/zod/contact";

export function ContactForm() {
  const t = useTranslations("kontak");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Pesan terkirim! Kami akan menghubungi Anda segera.");
        reset();
      } else {
        setStatus("error");
        setMessage("Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch {
      setStatus("error");
      setMessage("Gagal mengirim pesan. Silakan coba lagi.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg">
      <div className="space-y-2">
        <Label htmlFor="nama">{t("nama")}</Label>
        <Input id="nama" {...register("nama")} placeholder="Nama lengkap" />
        {errors.nama && (
          <p className="text-sm text-destructive">{errors.nama.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="email@contoh.com"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subjek">{t("subjek")}</Label>
        <Input id="subjek" {...register("subjek")} placeholder="Subjek pesan" />
        {errors.subjek && (
          <p className="text-sm text-destructive">{errors.subjek.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pesan">{t("pesan")}</Label>
        <Textarea
          id="pesan"
          {...register("pesan")}
          placeholder="Tulis pesan Anda..."
          rows={5}
        />
        {errors.pesan && (
          <p className="text-sm text-destructive">{errors.pesan.message}</p>
        )}
      </div>

      <Button type="submit" variant="accent" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Mengirim..." : t("kirim")}
      </Button>

      {status === "success" && (
        <p className="text-sm text-[hsl(150_50%_40%)] font-medium">{message}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-destructive font-medium">{message}</p>
      )}
    </form>
  );
}
