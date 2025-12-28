import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopHeader from "@/components/layout/TopHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transformation Home Health LLC",
  description:
    "Professional home care and community-based support services that promote dignity, independence, and inclusion. Serving seniors, individuals with disabilities, and families.",
  keywords: [
    "home care",
    "community support",
    "senior care",
    "disability services",
    "respite care",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopHeader />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
