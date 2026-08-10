import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin", "cyrillic"], variable: "--font-editorial", display: "swap", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "STORMS — Arhitektura koja ostaje", template: "%s — STORMS" },
  description: "STORMS razvija savremene stambene, poslovne i luksuzne nekretnine u Beogradu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sr" className={`${manrope.variable} ${cormorant.variable}`}><body>{children}</body></html>;
}
