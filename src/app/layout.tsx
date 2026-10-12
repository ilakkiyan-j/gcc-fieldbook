import type { Metadata } from "next";
import "./globals.css";
import { NavPlaceholder } from "@/components/shared/NavPlaceholder";

export const metadata: Metadata = {
  title: "GCC Fieldbook — The Working Guide to India's GCC Ecosystem",
  description:
    "An evidence-first intelligence workspace for researching India's Global Capability Centre (GCC) ecosystem with transparent citations and comparative indicators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <NavPlaceholder />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4">
            <p>
              GCC Fieldbook &bull; Curated assessment dataset &bull; Source-traceable research prototype
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
