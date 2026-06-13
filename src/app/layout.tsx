import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TestProjectBanner } from "@/components/TestProjectBanner";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#002561",
};

export const metadata: Metadata = {
  title: {
    default: "AFCA Website Revamp (Test Project)",
    template: "%s | AFCA Revamp (Test)",
  },
  description:
    "Unofficial test/demo redesign of the AFCA website. Not affiliated with AFCA. For official information visit afca.org.au.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-afca-surface">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-xl focus-visible:bg-afca-navy focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-afca-yellow focus-visible:ring-offset-2"
        >
          Skip to main content
        </a>
        <TestProjectBanner />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
