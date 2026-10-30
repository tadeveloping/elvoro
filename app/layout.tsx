import type { Metadata } from "next";
import { Doto, Inter, JetBrains_Mono, Syne } from "next/font/google";
import { DEFINICIA, SITE_URL } from "./config";
import "./globals.css";

// Písma sa hostujú spolu s webom, prehliadač sa nepýta Googlu (GDPR).
const syne = Syne({ subsets: ["latin", "latin-ext"], weight: ["600", "700"], variable: "--f-syne" });
const inter = Inter({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--f-inter" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--f-mono" });
const doto = Doto({ subsets: ["latin"], weight: ["700", "900"], variable: "--f-doto" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Elvoro · Ukážeme vám kde. A postavíme to.",
  description: DEFINICIA,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: "Elvoro",
    title: "Elvoro · Ukážeme vám kde. A postavíme to.",
    description: DEFINICIA,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={`${syne.variable} ${inter.variable} ${mono.variable} ${doto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
