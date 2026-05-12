import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
