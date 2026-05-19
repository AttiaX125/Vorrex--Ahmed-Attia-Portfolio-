import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import PageTransition from "@/Components/layout/PageTransition";
import Footer from "@/Components/Footer/Footer";

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets:  ["latin"],
  weight:   ["300", "400", "500"],
  display:  "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets:  ["latin"],
  weight:   ["300", "400", "600"],
  style:    ["normal", "italic"],
  display:  "swap",
});

/* ─────────────────────────────────────────
   METADATA
───────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default:  "Vorrex — Ahmed Attia",
    template: "%s | Vorrex",
  },
  description:
    "Ahmed Attia — Frontend Developer based in Cairo, Egypt. Building premium, animated web experiences with Next.js, React, and Framer Motion.",
  keywords: [
    "Ahmed Attia",
    "Frontend Developer",
    "Next.js",
    "React",
    "Framer Motion",
    "Cairo",
    "Egypt",
    "Web Developer",
    "UI Developer",
    "Portfolio",
  ],
  authors:  [{ name: "Ahmed Attia" }],
  creator:  "Ahmed Attia",

  openGraph: {
    type:      "website",
    locale:    "en_US",
    url:       "https://ahmedattia.com",
    siteName:  "Vorrex",
    title:     "Vorrex — Ahmed Attia · Frontend Developer",
    description:
      "Building premium, animated web experiences with Next.js, React, and Framer Motion. Based in Cairo, Egypt.",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "Vorrex — Ahmed Attia · Frontend Developer",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Vorrex — Ahmed Attia · Frontend Developer",
    description: "Building premium, animated web experiences with Next.js and React.",
    images:      ["/og-image.png"],
  },

  themeColor: "#09090A",

  robots: {
    index:  true,
    follow: true,
  },
};

/* ─────────────────────────────────────────
   ROOT LAYOUT
───────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#09090A] text-[#F0EAE0] antialiased font-light">

        {/* ── NAVBAR — always visible, never transitions ── */}
        <Navbar />

        {/* ── PAGE CONTENT — transitions on route change ── */}
        <PageTransition>
          <main className="flex-1">
            {children}
          </main>
        </PageTransition>

        {/* ── FOOTER — always visible, never transitions ── */}
        <Footer />

      </body>
    </html>
  );
}
