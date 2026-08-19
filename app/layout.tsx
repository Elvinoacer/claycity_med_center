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

export const metadata: Metadata = {
  metadataBase: new URL("https://claycitymed.co.ke"),
  title: {
    default: "Claycity Medical Centre Kasarani | Trusted Outpatient Care in Nairobi",
    template: "%s · Claycity Medical Centre",
  },
  description:
    "Claycity Medical Centre Kasarani is a licensed Level-2 outpatient clinic in Clay City, Nairobi. We offer maternal & child health, immunisation, family planning, HIV testing, laboratory services and general outpatient care. Open Mon–Sat.",
  keywords: [
    "Claycity Medical Centre",
    "Kasarani clinic",
    "Clay City clinic Nairobi",
    "outpatient clinic Nairobi",
    "maternal care Kasarani",
    "immunisation Nairobi",
    "family planning Kasarani",
    "lab services Clay City",
  ],
  authors: [{ name: "Claycity Medical Centre" }],
  openGraph: {
    type: "website",
    title: "Claycity Medical Centre Kasarani — Trusted Outpatient Care",
    description:
      "Licensed Level-2 outpatient clinic in Clay City, Kasarani. Maternal & child health, immunisation, family planning, lab services and general outpatient care.",
    siteName: "Claycity Medical Centre",
    locale: "en_KE",
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
