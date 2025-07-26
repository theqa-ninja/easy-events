import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Header from "./components/Header";
import Link from "next/link";

const primaryFont = Lexend({
  variable: "--font-lexend-sans",
  subsets: ["latin"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    default: 'Easy Events',         // Base title
    template: '%s | Easy Events',   // Page titles will fill into %s
  },
  description: "A platform for easy event management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${primaryFont.variable} antialiased h-full`}
      >
        <Header />
        <main className="m-auto p-4 max-w-4xl h-[calc(100%-3.5rem)]">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
        <footer className="p-4 flex justify-center z-10 relative">
          <Link href="/site-map">Site map</Link>
        </footer>
      </body>
    </html>
  );
}
