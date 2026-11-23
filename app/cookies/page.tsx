import type { Metadata } from "next";
import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { Migas, BandaBorrador, Fila, Prosa, Pendiente } from "@/components/piezas";
import { NotasMovil } from "@/components/NotasMovil";
import { EstilosLlamadas, NumeroNota } from "@/components/notas";
import { MODO_CONCEPTO, notaUno, pie, sitio } from "@/contenido/sitio";

export const metadata: Metadata = {
  title: { absolute: "Cookies · Verax Nutrition" },
  description:
    "Política de cookies de Verax Nutrition: qué cookies usamos, para qué, cuánto duran y cómo gestionar tu consentimiento.",
  alternates: { canonical: "/cookies/" },
  robots: { index: false, follow: true },
};

const H1 = "Cookies";

export default function Cookies() {
  return (
    <>
      {MODO_CONCEPTO ? <BandaBorrador /> : null}
      <Cabecera actual="/cookies/" />
      <main id="contenido" className="con-notas">
        <div className="reticula">
          <section aria-labelledby="h-titular" className="seccion">
            <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Cookies" }]} />
            <Fila
              className="mt-6"
              texto={
                <>
                  <h1 id="h-titular" className="t-h1">
                    {H1}
                  </h1>
                </>
              }
            />
          </section>

          <section aria-labelledby="h-corto" className="seccion">
            <h2 id="h-corto" className="t-h2 h-seccion">
              Lo corto
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Usamos cookies de medición solo si las aceptas. Rechazarlas cuesta lo mismo que aceptarlas, y la web
                    funciona igual.
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-que-usamos" className="seccion">
            <h2 id="h-que-usamos" className="t-h2 h-seccion">
              Las que usamos
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>Tabla · columnas: Nombre · De quién · Para qué · Cuánto dura · Tipo.</p>
                </Prosa>
              }
            />
            <Fila
              texto={
                <div className="overflow-x-auto">
                  <table className="tabla-cookies w-full">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">De quién</th>
                        <th scope="col">Para qué</th>
                        <th scope="col">Cuánto dura</th>
                        <th scope="col">Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="5" className="pendiente text-center py-8">
                          <Pendiente>[PENDIENTE: la lista real de cookies, sacada de la web construida]</Pendiente>
                        </td>
                      </tr>
                      <tr>
                        <td>_ga / _ga_*</td>
                        <td>Google Analytics</td>
                        <td>Medición</td>
                        <td>2 años / sesión</td>
                        <td>Medición (con consentimiento)</td>
                      </tr>
                      <tr>
                        <td><Pendiente variante="linea">[PENDIENTE: cookie o almacenamiento local que la guarda]</Pendiente></td>
                        <td>Propia</td>
                        <td>Tu elección de cookies</td>
                        <td>1 año</td>
                        <td>Técnica (sin consentimiento)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              }
            />
            <Fila
              texto={
                <Prosa>
                  <ul className="lista-puntos space-y-2 mt-4">
                    <li><strong>Medición:</strong> Google Analytics, solo con consentimiento.</li>
                    <li><strong>Tu elección de cookies:</strong> <Pendiente variante="linea">[PENDIENTE: cookie o
                      almacenamiento local que la guarda; técnica, sin consentimiento]</Pendiente></li>
                  </ul>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-como-gestionar" className="seccion">
            <h2 id="h-como-gestionar" className="t-h2 h-seccion">
              Cómo gestionarlas
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Puedes aceptar, rechazar o cambiar tu elección en cualquier momento desde el banner de cookies o desde la
                    configuración de tu navegador.
                  </p>
                </Prosa>
              }
            />
          </section>
        </div>
        <EstilosLlamadas usados={[1]} />
      </main>
      <NotasMovil />
      <Pie />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: "Cookies",
                url: `${sitio.url}/cookies/`,
                inLanguage: "es-ES",
                isPartOf: { "@type": "WebSite", name: sitio.nombre, url: sitio.url },
                publisher: { "@type": "Organization", name: sitio.nombre },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Inicio", item: `${sitio.url}/` },
                  { "@type": "ListItem", position: 2, name: "Cookies", item: `${sitio.url}/cookies/` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}