import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-50">{children}</body>
    </html>
  );
}
