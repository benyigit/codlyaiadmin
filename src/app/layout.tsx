import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codly AI Admin",
  description: "Manage Codly AI Catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans" style={{ fontFamily: 'var(--font-bebas), Arial, sans-serif' }}>{children}</body>
    </html>
  );
}
