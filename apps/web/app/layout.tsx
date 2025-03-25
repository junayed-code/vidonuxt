import Image from "next/image";
import type { Metadata } from "next";

import Header from "@components/header";

import watching from "../assets/watching.jpg";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vidonuxt | Just Paste & Play",
  description:
    "Vidonuxt is a video streaming platform. Watch anything that you want to. Just paste and play.",
  keywords: "video, streaming, watch, play, url, link, paste, stream, vidonuxt",
  openGraph: {
    type: "website",
    title: "Vidonuxt | Just Paste & Play",
    description:
      "Vidonuxt is a video streaming platform. Watch anything that you want to. Just paste and play.",
    siteName: "Vidonuxt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-secondary relative grid min-h-dvh grid-rows-[auto_1fr]">
        <Image
          fill
          alt="Background Image"
          src={watching}
          placeholder="blur"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-neutral-200/75" />
        <Header />
        <main className="grid grid-cols-1 grid-rows-1 px-4 py-14">
          {children}
        </main>
      </body>
    </html>
  );
}
