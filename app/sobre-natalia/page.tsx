import type { Metadata } from "next";
import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { Migas, BandaBorrador, Fila, Prosa, Pendiente } from "@/components/piezas";
import { NotasMovil } from "@/components/NotasMovil";
import { EstilosLlamadas, NumeroNota } from "@/components/notas";
import { MODO_CONCEPTO, notaUno, pie, sitio } from "@/contenido/sitio";

export const metadata: Metadata = {
  title: { absolute: "Quién escribe Verax Nutrition: Natalia Peña" },
  description:
    "Escribe Natalia Peña, que entrena y tiene estudios de Química. No es nutricionista ni profesional sanitaria. Qué hace aquí, qué no y quién paga la web.",
  alternates: { canonical: "/sobre-natalia/" },
  robots: { index: true, follow: true },
};

const H1 = "Quién escribe Verax Nutrition";

export default function SobreNatalia() {
  return (
    <>
      {MODO_CONCEPTO ? <BandaBorrador /> : null}
      <Cabecera actual="/sobre-natalia/" />
      <main id="contenido" className="con-notas">
        <div className="reticula">
          <section aria-labelledby="h-quien-soy" className="seccion">
            <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Sobre la autora" }]} />
            <Fila
              className="mt-6"
              texto={
                <>
                  <h1 id="h-quien-soy" className="t-h1">
                    {H1}
                  </h1>
                  <p className="t-entrada mt-4">
                    Escribe Natalia Peña, que entrena y tiene estudios de Química. No es nutricionista ni profesional
                    sanitaria.
                  </p>
                </>
              }
            />
          </section>

          <section aria-labelledby="h-quien-soy-detalle" className="seccion">
            <h2 id="h-quien-soy-detalle" className="t-h2 h-seccion">
              Quién soy
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    <Pendiente>
                      [NATALIA: qué entrenas y desde cuándo, y tus estudios de Química, con tus palabras. Solo lo que quieras
                      contar; sin foto. Sin decir que terminaste la carrera]
                    </Pendiente>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-por-que" className="seccion">
            <h2 id="h-por-que" className="t-h2 h-seccion">
              Por qué hago Verax
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    <Pendiente>
                      [NATALIA: el motivo con tus palabras. En el método hay una frase tuya del 22-11 sobre la industria de la
                      alimentación; solo sale si la confirmas tal cual para publicarla. Si es opinión, va como opinión tuya y
                      sin datos de estudios; si trae algún dato, pasa antes por el ciencia-nutricion]
                    </Pendiente>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-que-hago" className="seccion">
            <h2 id="h-que-hago" className="t-h2 h-seccion">
              Qué hago aquí
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Elijo los temas, leo y apruebo cada dosier de evidencia antes de que salga nada, y firmo cada página. Las
                    frases sobre nutrición salen del dosier tal cual, con su cita.
                    {" "}
                    <Link href="/como-investigamos/">Cómo investigamos&nbsp;→</Link>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-que-no-hago" className="seccion">
            <h2 id="h-que-no-hago" className="t-h2 h-seccion">
              Lo que no hago
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    No doy consejo para tu caso ni hago dietas ni consultas: para eso, un dietista-nutricionista. No recomiendo
                    ni avalo ningún producto. No hablo como profesional sanitaria, porque no lo soy.
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-quien-paga" className="seccion">
            <h2 id="h-quien-paga" className="t-h2 h-seccion">
              Quién paga la web
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Verax Nutrition la edita Posiciona Alto, mi estudio web, que hoy cubre sus gastos.
                  </p>
                  <p>
                    <strong>Sin programas:</strong> Hoy Posiciona Alto no vende suplementos ni trabaja para ninguna marca de
                    suplementos, y Verax no tiene ningún vínculo con marcas ni tiendas de suplementos.
                  </p>
                  <p>
                    <strong>Con programas:</strong> [Texto de Natalia de la v2 (2.2, bloque 9) — pendiente de confirmar]
                  </p>
                  <p>
                    <NumeroNota n={1} />{" "}
                    <Link href="/como-se-financia/">Cómo se financia&nbsp;→</Link>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-errores" className="seccion">
            <h2 id="h-errores" className="t-h2 h-seccion">
              Si ves un error
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Escríbeme a <Pendiente variante="linea">[DATO: correo de correcciones, D7]</Pendiente>.
                    {" "}
                    <Link href="/como-investigamos/#h-correcciones">Cómo corregimos&nbsp;→</Link>
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-linea-sanitaria" className="seccion">
            <h2 id="h-linea-sanitaria" className="t-h2 h-seccion">
              Línea sanitaria
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>Verax informa y no sustituye a un profesional sanitario.</p>
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
                "@type": "ProfilePage",
                name: "Quién escribe Verax Nutrition",
                url: `${sitio.url}/sobre-natalia/`,
                inLanguage: "es-ES",
                isPartOf: { "@type": "WebSite", name: sitio.nombre, url: sitio.url },
                mainEntity: {
                  "@type": "Person",
                  name: "Natalia Peña",
                  url: `${sitio.url}/sobre-natalia/`,
                  "@id": `${sitio.url}/sobre-natalia/#person`,
                  description:
                    "Escribe Natalia Peña, que entrena y tiene estudios de Química. No es nutricionista ni profesional sanitaria.",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Inicio", item: `${sitio.url}/` },
                  { "@type": "ListItem", position: 2, name: "Sobre la autora", item: `${sitio.url}/sobre-natalia/` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}