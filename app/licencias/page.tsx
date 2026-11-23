import type { Metadata } from "next";
import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { Migas, BandaBorrador, Fila, Prosa, Pendiente } from "@/components/piezas";
import { NotasMovil } from "@/components/NotasMovil";
import { EstilosLlamadas, NumeroNota } from "@/components/notas";
import { MODO_CONCEPTO, notaUno, pie, sitio } from "@/contenido/sitio";

export const metadata: Metadata = {
  title: { absolute: "Licencias · Verax Nutrition" },
  description:
    "Licencias de los datos, imágenes y recursos de terceros usados en Verax Nutrition. Cada recurso con su licencia y atribución.",
  alternates: { canonical: "/licencias/" },
  robots: { index: true, follow: true },
};

const H1 = "Licencias";

export default function Licencias() {
  return (
    <>
      {MODO_CONCEPTO ? <BandaBorrador /> : null}
      <Cabecera actual="/licencias/" />
      <main id="contenido" className="con-notas">
        <div className="reticula">
          <section aria-labelledby="h-titular" className="seccion">
            <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Licencias" }]} />
            <Fila
              className="mt-6"
              texto={
                <>
                  <h1 id="h-titular" className="t-h1">
                    {H1}
                  </h1>
                  <p className="t-entrada mt-4">
                    Cada recurso de terceros que usamos en Verax Nutrition va con su licencia y su atribución. Aquí están
                    todas, por categorías.
                  </p>
                </>
              }
            />
          </section>

          <section aria-labelledby="h-datos-abiertos" className="seccion">
            <h2 id="h-datos-abiertos" className="t-h2 h-seccion">
              Datos abiertos
            </h2>

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">USDA FoodData Central</h3>
                  <p>
                    Datos de composición de alimentos del Departamento de Agricultura de EE. UU. Dominio público (U.S.
                    Government Work). Sin restricciones de uso.
                  </p>
                  <p>
                    <Link href="https://fdc.nal.usda.gov/" rel="noopener" target="_blank">
                      fdc.nal.usda.gov&nbsp;→
                    </Link>
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Open Food Facts</h3>
                  <p>
                    Base de datos colaborativa de productos alimentarios. Licencia <strong>ODbL v1.0</strong> (Open Database
                    License) + contenidos bajo <strong>CC BY-SA 4.0</strong>. Requiere atribución y compartir con la misma
                    licencia.
                  </p>
                  <p>
                    <Link href="https://openfoodfacts.org/" rel="noopener" target="_blank">
                      openfoodfacts.org&nbsp;→
                    </Link>
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">PubMed / Europe PMC</h3>
                  <p>
                    Resúmenes y metadatos de artículos biomédicos. Uso permitido para fines no comerciales con atribución.
                    Los artículos completos dependen de la licencia de cada editor.
                  </p>
                  <p>
                    <Link href="https://pubmed.ncbi.nlm.nih.gov/" rel="noopener" target="_blank">
                      pubmed.ncbi.nlm.nih.gov&nbsp;→
                    </Link>
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">EFSA (Autoridad Europea de Seguridad Alimentaria)</h3>
                  <p>
                    Dictámenes, informes y registros de declaraciones autorizadas. Licencia <strong>CC BY 4.0</strong> salvo
                    indicación contraria. Requiere atribución.
                  </p>
                  <p>
                    <Link href="https://www.efsa.europa.eu/" rel="noopener" target="_blank">
                      efsa.europa.eu&nbsp;→
                    </Link>
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">AESAN (Agencia Española de Seguridad Alimentaria y Nutrición)</h3>
                  <p>
                    Alertas, informes y tablas de composición. Licencia <strong>CC BY 4.0</strong> salvo indicación
                    contraria. Requiere atribución.
                  </p>
                  <p>
                    <Link href="https://www.aesan.gob.es/" rel="noopener" target="_blank">
                      aesan.gob.es&nbsp;→
                    </Link>
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Registro de la UE de declaraciones autorizadas</h3>
                  <p>
                    Texto y condiciones de las declaraciones de salud y nutrición permitidas. Dominio público (derecho de la
                    UE).
                  </p>
                  <p>
                    <Link href="https://ec.europa.eu/food/safety/labelling_nutrition/claims/register/public/" rel="noopener" target="_blank">
                      Registro público&nbsp;→
                    </Link>
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">COI (Comité Olímpico Internacional) — Declaración de consenso</h3>
                  <p>
                    Documentos de consenso sobre nutrición deportiva. Licencia propia del COI; se citan con atribución y
                    enlace al documento original.
                  </p>
                  <p>
                    <Link href="https://olympics.com/ioc/consensus-statements" rel="noopener" target="_blank">
                      olympics.com/ioc/consensus-statements&nbsp;→
                    </Link>
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Instituto Australiano del Deporte (AIS) — Clasificación de suplementos</h3>
                  <p>
                    Grupo A, B, C, D. Consultada el <Pendiente variante="linea">[fecha]</Pendiente>. Se cita con atribución y
                    fecha de consulta.
                  </p>
                  <p>
                    <Link href="https://www.ais.gov.au/nutrition/supplements" rel="noopener" target="_blank">
                      ais.gov.au/nutrition/supplements&nbsp;→
                    </Link>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-imagenes" className="seccion">
            <h2 id="h-imagenes" className="t-h2 h-seccion">
              Imágenes y recursos visuales
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    <Pendiente>
                      [PENDIENTE: rellenar con las fichas de licencias/ de cada imagen propia, de negocios con permiso escrito,
                      y de bancos/fuentes oficiales con licencia comercial. Cada una con su ficha en licencias/.]
                    </Pendiente>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-codigo" className="seccion">
            <h2 id="h-codigo" className="t-h2 h-seccion">
              Código y librerías
            </h2>
            <Fila
              texto={
                <Prosa>
                  <ul className="lista-puntos space-y-2">
                    <li><strong>Next.js</strong> — Licencia MIT</li>
                    <li><strong>React</strong> — Licencia MIT</li>
                    <li><strong>TypeScript</strong> — Licencia Apache 2.0</li>
                    <li><strong>Tailwind CSS</strong> — Licencia MIT</li>
                    <li><strong>lucide-react</strong> — Licencia ISC</li>
                    <li><strong>date-fns</strong> — Licencia MIT</li>
                    <li><strong>zod</strong> — Licencia MIT</li>
                  </ul>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-textos" className="seccion">
            <h2 id="h-textos" className="t-h2 h-seccion">
              Textos propios
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Los textos originales de Verax Nutrition (artículos, fichas, comparadores, guías, método, páginas legales)
                    son propiedad de <strong>Posiciona Alto</strong>. Queda prohibida su reproducción total o parcial sin
                    autorización expresa, salvo cita con enlace a la fuente original (máximo 200 caracteres).
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
                name: "Licencias",
                url: `${sitio.url}/licencias/`,
                inLanguage: "es-ES",
                isPartOf: { "@type": "WebSite", name: sitio.nombre, url: sitio.url },
                publisher: { "@type": "Organization", name: sitio.nombre },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Inicio", item: `${sitio.url}/` },
                  { "@type": "ListItem", position: 2, name: "Licencias", item: `${sitio.url}/licencias/` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}