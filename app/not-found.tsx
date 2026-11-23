import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { Migas, Fila, Prosa } from "@/components/piezas";
import { notFound } from "next/navigation";
import { sitio } from "@/contenido/sitio";

export default function NoEncontrada() {
  notFound();
  return (
    <>
      <Cabecera />
      <main id="contenido" className="reticula seccion">
        <Migas items={[{ texto: "Inicio", href: "/" }]} />
        <Fila
          className="mt-6"
          texto={
            <Prosa>
              <h1 className="t-h1">Esta página no está aquí</h1>
              <p className="t-entrada mt-4">
                Puede que la dirección esté mal escrita o que la página haya cambiado de sitio.
              </p>
              <nav className="mt-8 flex flex-wrap gap-4" aria-label="Enlaces de navegación">
                <Link href="/tu-lista/ganar-musculo/" className="enlace-texto">
                  Tu lista por objetivo
                </Link>
                <Link href="/creatina/" className="enlace-texto">
                  Suplementos
                </Link>
                <Link href="/comparar/creatina/" className="enlace-texto">
                  Comparar
                </Link>
                <Link href="/calculadoras/dosis-creatina/" className="enlace-texto">
                  Calculadoras
                </Link>
                <Link href="/" className="enlace-texto">
                  Ir al inicio
                </Link>
              </nav>
            </Prosa>
          }
        />
      </main>
      <Pie />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Página no encontrada",
            url: `${sitio.url}/404/`,
            inLanguage: "es-ES",
            isPartOf: { "@type": "WebSite", name: sitio.nombre, url: sitio.url },
            publisher: { "@type": "Organization", name: sitio.nombre },
          }),
        }}
      />
    </>
  );
}