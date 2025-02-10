import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vidonuxt",
  description: "Vidonuxt is a video streaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
