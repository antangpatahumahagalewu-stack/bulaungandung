import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "@/app/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Koperasi Bulau Ngandung",
    template: "%s | Koperasi Bulau Ngandung",
  },
  description:
    "Dari Hutan Kapuas, untuk Dunia. Koperasi Perhutanan Sosial di Kabupaten Kapuas, Kalimantan Tengah.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
