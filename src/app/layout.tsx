import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/shell/AppShell";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GCC Fieldbook — India's Global Capability Centre Intelligence Workspace",
  description:
    "An evidence-first intelligence workspace for researching India's Global Capability Centre (GCC) ecosystem with transparent citations, confidence ratings, and location telemetry.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-brand-soft selection:text-brand-ink">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
