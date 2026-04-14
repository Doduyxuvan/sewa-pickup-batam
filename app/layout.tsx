import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jasa Angkut Barang Pickup Batam Murah & Amanah 24 Jam",
  description: "Layanan angkut barang pickup terpercaya di Batam. Murah, cepat, amanah, tersedia 24 jam siap melayani seluruh wilayah Batam.",
  keywords: "jasa angkut barang batam, pickup batam, jasa pindahan batam, angkut barang murah batam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
