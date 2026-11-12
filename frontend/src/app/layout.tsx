
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go Crypto Historical Data Engine",
  description:
    "High-performance cryptocurrency historical data ingestion and monitoring platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
