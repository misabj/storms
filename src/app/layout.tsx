import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-manrope", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin", "latin-ext"], variable: "--font-editorial", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "STORMS — Arhitektura koja ostaje", template: "%s — STORMS" },
  description: "STORMS razvija savremene stambene, poslovne i luksuzne nekretnine u Beogradu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sr" className={`${manrope.variable} ${bodoni.variable}`}><body>{children}</body></html>;
}
