import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/app/i18n/context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PDF XML Sync — Adjunte XML a PDF | 100% local y privado",
    template: "%s | PDF XML Sync",
  },
  description:
    "Adjunte archivos XML a documentos PDF de forma rápida, segura y 100% local. Combina su comprobante electrónico con su representación PDF en un solo archivo, sin enviar datos a servidores externos.",
  keywords: [
    "PDF XML",
    "adjuntar XML a PDF",
    "XML en PDF",
    "comprobante electrónico",
    "factura electronica",
    "boleta electronica",
    "factura XML",
    "PDF privado",
    "local PDF tool",
    "embed XML in PDF",
  ],
  authors: [{ name: "PDF XML Sync" }],
  creator: "PDF XML Sync",
  metadataBase: new URL("https://pdfxmlsync.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es",
    alternateLocale: "en",
    siteName: "PDF XML Sync",
    title: "PDF XML Sync — Adjunte XML a PDF | 100% local y privado",
    description:
      "Adjunte archivos XML a documentos PDF de forma rápida, segura y 100% local. Sin envío de datos a servidores externos.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PDF XML Sync",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF XML Sync — Adjunte XML a PDF",
    description:
      "Adjunte archivos XML a documentos PDF de forma rápida, segura y 100% local.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
