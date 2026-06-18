import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atul Todo",
  description: "An Instagram-style todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}
