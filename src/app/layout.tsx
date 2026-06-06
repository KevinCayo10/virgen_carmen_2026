import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EVENT_NAME, ORGANIZER, EVENT_LOCATION } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = EVENT_NAME;
const description =
  "Formulario de inscripción para el Pregón Cultural por las Fiestas Patronales Virgen del Carmen 2026 en Puerto Quito. Participe con su grupo de danza folclórica.";
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pregoncultural2026.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#172554",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_EC",
    siteName: title,
    url: "/",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero-bg.png"],
  },
  keywords: [
    "pregón cultural",
    "virgen del carmen",
    "puerto quito",
    "fiestas patronales",
    "danza folklórica",
    "inscripción danza",
    "colonia cotopaxense",
    "carro alegórico",
    "2026",
  ],
  authors: [{ name: ORGANIZER }],
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
