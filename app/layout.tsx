import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, Fraunces, Newsreader } from "next/font/google";
import "./globals.css";
import { sitio } from "@/contenido/sitio";

/** Tipografías de la marca, autoalojadas: next/font las descarga al compilar y las sirve desde el propio dominio. */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--fuente-titulos",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--fuente-texto",
});
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], display: "swap", variable: "--fuente-datos" });

const indexar = process.env.VERAX_INDEXAR === "si";

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: { default: "Verax Nutrition · Ciencia sin humo: miramos quién paga cada estudio", template: "%s" },
  applicationName: sitio.nombre,
  authors: [{ name: sitio.autora }],
  publisher: sitio.estudio,
  robots: indexar ? undefined : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F4EEE3",
  width: "device-width",
  initialScale: 1,
};

/** «Firma»: el ¹ del logotipo llega el último, una vez por sesión y solo en la portada (movimiento-v1, 3.5). */
const FIRMA = `try{if(location.pathname==="/"&&!sessionStorage.getItem("vx-firma")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("firma");sessionStorage.setItem("vx-firma","1")}}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${newsreader.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FIRMA }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
