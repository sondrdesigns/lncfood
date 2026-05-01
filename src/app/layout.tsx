import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "@/styles/index.css";
import { JsonLd } from "@/lib/seo/JsonLdScript";
import { organizationLd, SITE_URL } from "@/lib/seo/jsonld";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "L&C Food Distribution",
    template: "%s | L&C Food Distribution",
  },
  description:
    "L&C Food Distribution — your trusted Asian food distribution partner since 1995. Global Foods, Local Solutions.",
  icons: {
    icon: "/images/lnc-logo.png",
    shortcut: "/images/lnc-logo.png",
    apple: "/images/lnc-logo.png",
  },
  openGraph: {
    title: "L&C Food Distribution",
    description:
      "L&C Food Distribution — your trusted Asian food distribution partner since 1995. Global Foods, Local Solutions.",
    images: ["/images/lnc-logo.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2D5F3E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>
        <JsonLd data={organizationLd()} />
        {children}
      </body>
    </html>
  );
}
