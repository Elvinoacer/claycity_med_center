import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

/* Only the weights actually used — keeps the self-hosted font payload small */
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://claycity-med-center.vercel.app";
const SOCIAL_IMAGE = `${SITE_URL}/images/claycity_banner.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Claycity Medical Centre Kasarani | Trusted Outpatient Care in Nairobi",
    template: "%s · Claycity Medical Centre",
  },
  description:
    "Claycity Medical Centre Kasarani is a licensed Level-2 outpatient clinic in Clay City, Nairobi. We offer maternal & child health, immunisation, family planning, HIV testing, laboratory services and general outpatient care. Open 24/7.",
  keywords: [
    "Claycity Medical Centre",
    "Kasarani clinic",
    "Clay City clinic Nairobi",
    "outpatient clinic Nairobi",
    "24/7 clinic Kasarani",
    "maternal care Kasarani",
    "immunisation Nairobi",
    "family planning Kasarani",
    "lab services Clay City",
  ],
  authors: [{ name: "Claycity Medical Centre" }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Claycity Medical Centre Kasarani — Trusted Outpatient Care",
    description:
      "Licensed Level-2 outpatient clinic in Clay City, Kasarani. Maternal & child health, immunisation, family planning, lab services and general outpatient care. Open 24/7.",
    siteName: "Claycity Medical Centre",
    locale: "en_KE",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Claycity Medical Centre — Kasarani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claycity Medical Centre Kasarani — Trusted Outpatient Care",
    description:
      "Licensed Level-2 outpatient clinic in Clay City, Kasarani. Maternal & child health, immunisation, lab services and general outpatient care. Open 24/7.",
    images: [SOCIAL_IMAGE],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0284c7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink pb-[4.5rem] lg:pb-0">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
