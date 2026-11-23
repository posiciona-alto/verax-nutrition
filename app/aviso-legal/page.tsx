import type { Metadata } from "next";
import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { Migas, BandaBorrador, Fila, Prosa, Pendiente } from "@/components/piezas";
import { NotasMovil } from "@/components/NotasMovil";
import { EstilosLlamadas, NumeroNota } from "@/components/notas";
import { MODO_CONCEPTO, notaUno, pie, sitio } from "@/contenido/sitio";

export const metadata: Metadata = {
  title: { absolute: "Aviso legal · Verax Nutrition" },
  description:
    "Aviso legal de Verax Nutrition: titular, datos de contacto, qué es esta web, enlaces de afiliado, propiedad intelectual y ley aplicable.",
  alternates: { canonical: "/aviso-legal/" },
  robots: { index: false, follow: true },
};

const H1 = "Aviso legal";

export default function AvisoLegal() {
  return (
    <>
      {MODO_CONCEPTO ? <BandaBorrador /> : null}
      <Cabecera actual="/aviso-legal/" />
      <main id="contenido" className="con-notas">
        <div className="reticula">
          <section aria-labelledby="h-titular" className="seccion">
            <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Aviso legal" }]} />
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

          <section aria-labelledby="h-quien" className="seccion">
            <h2 id="h-quien" className="t-h2 h-seccion">
              Quién está detrás
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Verax Nutrition (veraxnutrition.es) es una web de información sobre nutrición deportiva. La edita Posiciona
                    Alto, el estudio web de Natalia Peña.
                  </p>
                  <dl className="space-y-2 mt-4">
                    <div>
                      <dt className="font-semibold">Titular:</dt>
                      <dd><Pendiente variante="linea">[PENDIENTE: dato legal]</Pendiente></dd>
                    </div>
                    <div>
                      <dt className="font-semibold">NIF:</dt>
                      <dd><Pendiente variante="linea">[PENDIENTE: dato legal]</Pendiente></dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Domicilio:</dt>
                      <dd><Pendiente variante="linea">[PENDIENTE: dato legal]</Pendiente></dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Correo:</dt>
                      <dd><Pendiente variante="linea">[PENDIENTE: dato legal]</Pendiente></dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Datos de inscripción en un registro, si los hay:</dt>
                      <dd><Pendiente variante="linea">[PENDIENTE: dato legal]</Pendiente></dd>
                    </div>
                  </dl>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-que-es" className="seccion">
            <h2 id="h-que-es" className="t-h2 h-seccion">
              Qué es esta web
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Cuenta lo que dicen los estudios de nutrición deportiva y quién los pagó, y compara productos por el precio
                    de cada dosis. Es información general.
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-no-sustituye" className="seccion">
            <h2 id="h-no-sustituye" className="t-h2 h-seccion">
              No sustituye a un profesional
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Verax informa y no sustituye a un profesional sanitario. Para tu caso concreto, lo mejor es que lo veas con
                    un dietista-nutricionista.
                  </p>
                  <p>
                    Escribe Natalia Peña, que entrena y tiene estudios de Química. No es nutricionista ni profesional sanitaria.
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-mayores" className="seccion">
            <h2 id="h-mayores" className="t-h2 h-seccion">
              Mayores de 18
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>Verax es para mayores de 18 años.</p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-precios" className="seccion">
            <h2 id="h-precios" className="t-h2 h-seccion">
              Precios y datos de los productos
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Cada precio lleva la hora en que lo tomamos de la tienda. El que vale es el de la tienda al comprar. Los
                    datos marcados «según su etiqueta» son los que declara la marca: no analizamos productos en un laboratorio.
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-afiliados" className="seccion">
            <h2 id="h-afiliados" className="t-h2 h-seccion">
              Enlaces de afiliado
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p><strong>Sin programas:</strong> Hoy Verax no tiene ningún enlace de afiliado activo.</p>
                  <p>
                    <strong>Con programas:</strong> Algunos enlaces de los comparadores y de las fichas de producto son de
                    afiliado: si compras desde ellos, la tienda nos paga una comisión. Van marcados con «afiliado» y no
                    cambian el orden ni lo que pagas tú.
                  </p>
                  <p>
                    <NumeroNota n={1} />{" "}
                    <Link href="/como-se-financia/">Cómo se financia&nbsp;→</Link>
                  </p>
                  <p>
                    <Pendiente>
                      [PENDIENTE: dato legal · la frase que exija cada programa, copiada de su acuerdo]
                    </Pendiente>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-contenido-terceros" className="seccion">
            <h2 id="h-contenido-terceros" className="t-h2 h-seccion">
              Contenido de otros
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Los datos de terceros (Open Food Facts, USDA y los estudios que citamos) se usan con su licencia y su
                    atribución:
                    {" "}
                    <Link href="/licencias/">Licencias&nbsp;→</Link>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-propiedad" className="seccion">
            <h2 id="h-propiedad" className="t-h2 h-seccion">
              Propiedad intelectual
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Los textos y las fotos propias son de <Pendiente variante="linea">[PENDIENTE: dato legal · titular]</Pendiente>.
                    <Pendiente variante="linea">[PENDIENTE: dato legal · qué se permite: citar con enlace, etc.]</Pendiente>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-enlaces" className="seccion">
            <h2 id="h-enlaces" className="t-h2 h-seccion">
              Enlaces a otras webs
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Enlazamos a estudios, organismos y tiendas. No respondemos del contenido de esas webs.
                    <Pendiente variante="linea">[PENDIENTE: dato legal · redacción]</Pendiente>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-errores" className="seccion">
            <h2 id="h-errores" className="t-h2 h-seccion">
              Errores
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Si ves un error, cómo lo corregimos:
                    {" "}
                    <Link href="/como-investigamos/#h-correcciones">/como-investigars/#correcciones&nbsp;→</Link>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-ley" className="seccion">
            <h2 id="h-ley" className="t-h2 h-seccion">
              Ley y tribunales
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    <Pendiente>
                      [PENDIENTE: dato legal · ley aplicable y tribunales, respetando los derechos de quien compra como
                      consumidor]
                    </Pendiente>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-fecha" className="seccion">
            <h2 id="h-fecha" className="t-h2 h-seccion">
              Fecha
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p className="t-secundario">Última versión: <Pendiente variante="linea">[fecha]</Pendiente></p>
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
                name: "Aviso legal",
                url: `${sitio.url}/aviso-legal/`,
                inLanguage: "es-ES",
                isPartOf: { "@type": "WebSite", name: sitio.nombre, url: sitio.url },
                publisher: { "@type": "Organization", name: sitio.nombre },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Inicio", item: `${sitio.url}/` },
                  { "@type": "ListItem", position: 2, name: "Aviso legal", item: `${sitio.url}/aviso-legal/` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}