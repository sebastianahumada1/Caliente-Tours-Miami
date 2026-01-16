import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caliente Tours - Alquiler de Botes",
  description: "Alquila los mejores botes y yates para tus aventuras náuticas. Reserva tu embarcación hoy.",
  keywords: "botes, yates, alquiler, tours, náutico",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="font-display text-white min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
