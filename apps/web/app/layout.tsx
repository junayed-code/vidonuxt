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
      <body className="text-secondary bg-neutral-300">
        <header className="px-4 py-3.5">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-3xl font-bold">Vidonuxt</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
