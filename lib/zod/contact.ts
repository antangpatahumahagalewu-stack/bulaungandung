import { z } from "zod";

export const contactSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  subjek: z.string().min(3, "Subjek minimal 3 karakter"),
  pesan: z.string().min(10, "Pesan minimal 10 karakter"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
