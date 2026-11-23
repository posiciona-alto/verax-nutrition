import type { Metadata } from "next";
import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { Migas, BandaBorrador, Fila, Prosa, Pendiente } from "@/components/piezas";
import { NotasMovil } from "@/components/NotasMovil";
import { EstilosLlamadas, NumeroNota } from "@/components/notas";
import { MODO_CONCEPTO, notaUno, pie, sitio } from "@/contenido/sitio";

export const metadata: Metadata = {
  title: { absolute: "Política de privacidad · Verax Nutrition" },
  description:
    "Política de privacidad de Verax Nutrition: qué datos tratamos, para qué, base legal, cuánto tiempo, encargados, tus derechos y cómo ejercerlos.",
  alternates: { canonical: "/privacidad/" },
  robots: { index: false, follow: true },
};

const H1 = "Política de privacidad";

export default function Privacidad() {
  return (
    <>
      {MODO_CONCEPTO ? <BandaBorrador /> : null}
      <Cabecera actual="/privacidad/" />
      <main id="contenido" className="con-notas">
        <div className="reticula">
          <section aria-labelledby="h-titular" className="seccion">
            <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Privacidad" }]} />
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

          <section aria-labelledby="h-responsable" className="seccion">
            <h2 id="h-responsable" className="t-h2 h-seccion">
              Quién trata tus datos
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Responsable: <Pendiente variante="linea">[PENDIENTE: dato legal · titular, NIF y domicilio]</Pendiente>.
                    Contacto para privacidad: <Pendiente variante="linea">[PENDIENTE: dato legal · correo]</Pendiente>.
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-no-pedimos" className="seccion">
            <h2 id="h-no-pedimos" className="t-h2 h-seccion">
              Lo que no te pedimos
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    No te pedimos el peso, la edad, tus objetivos ni ningún dato de salud. Las circunstancias que marcas en el
                    buscador por objetivo (vegano, embarazo, una enfermedad, medicación…) se quedan en tu navegador: no nos
                    llegan y no se miden. Las calculadoras hacen la cuenta en tu navegador y no nos envían lo que escribes.
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-aviso-bote" className="seccion">
            <h2 id="h-aviso-bote" className="t-h2 h-seccion">
              1 · El aviso de tu bote
            </h2>
            <Fila
              texto={
                <Prosa>
                  <dl className="space-y-3">
                    <div>
                      <dt className="font-semibold">Qué datos:</dt>
                      <dd>tu correo, el producto, el tamaño del bote, lo que tomas al día para la cuenta y la fecha en que se
                        acaba.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Para qué:</dt>
                      <dd>mandarte un correo hacia esa fecha, con un enlace al comparador, y nada más.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Base:</dt>
                      <dd>tu consentimiento (art. 6.1.a del RGPD). Lo confirmas por correo y lo retiras con un clic en cada
                        correo.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Cuánto tiempo:</dt>
                      <dd>
                        hasta que te des de baja o <Pendiente variante="linea">[PENDIENTE: dato legal · plazo tras el
                        aviso]</Pendiente>. Si no confirmas, borramos la petición a los <Pendiente variante="linea">[PENDIENTE:
                        dato legal · días]</Pendiente>.
                      </dd>
                    </div>
                  </dl>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-guarda-lista" className="seccion">
            <h2 id="h-guarda-lista" className="t-h2 h-seccion">
              2 · «Guárdame la lista»
            </h2>
            <Fila
              texto={
                <Prosa>
                  <dl className="space-y-3">
                    <div>
                      <dt className="font-semibold">Qué datos:</dt>
                      <dd>tu correo y la lista que pides.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Para qué:</dt>
                      <dd>mandártela una sola vez.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Base:</dt>
                      <dd>tu consentimiento.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Cuánto tiempo:</dt>
                      <dd>
                        borramos tu correo después de enviarla <Pendiente variante="linea">[VERIFICAR con desarrollo]</Pendiente>.
                      </dd>
                    </div>
                  </dl>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-escribes" className="seccion">
            <h2 id="h-escribes" className="t-h2 h-seccion">
              3 · Si nos escribes
            </h2>
            <Fila
              texto={
                <Prosa>
                  <dl className="space-y-3">
                    <div>
                      <dt className="font-semibold">Qué datos:</dt>
                      <dd>tu correo y lo que nos cuentes.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Para qué:</dt>
                      <dd>contestarte y, si hay un error, corregirlo.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Base:</dt>
                      <dd><Pendiente variante="linea">[PENDIENTE: dato legal · consentimiento o interés legítimo]</Pendiente></dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Cuánto tiempo:</dt>
                      <dd><Pendiente variante="linea">[PENDIENTE: dato legal]</Pendiente></dd>
                    </div>
                  </dl>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-medicion" className="seccion">
            <h2 id="h-medicion" className="t-h2 h-seccion">
              4 · Medición de visitas
            </h2>
            <Fila
              texto={
                <Prosa>
                  <dl className="space-y-3">
                    <div>
                      <dt className="font-semibold">Solo si aceptas las cookies de medición.</dt>
                      <dd></dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Qué datos:</dt>
                      <dd>un identificador de la cookie y las páginas y botones que usas. Nunca el correo, los avisos de salud
                        del buscador, lo que sumas en una calculadora ni el clic a ACAB.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Con quién:</dt>
                      <dd>Google Analytics (Google).</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Base:</dt>
                      <dd>tu consentimiento.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Cuánto tiempo:</dt>
                      <dd><Pendiente variante="linea">[PENDIENTE: dato legal · plazo configurado]</Pendiente></dd>
                    </div>
                  </dl>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-encargados" className="seccion">
            <h2 id="h-encargados" className="t-h2 h-seccion">
              Quién nos ayuda (encargados)
            </h2>
            <Fila
              texto={
                <Prosa>
                  <dl className="space-y-3">
                    <div>
                      <dt className="font-semibold"><strong>Resend</strong>, que envía los correos, desde EE. UU.</dt>
                      <dd>Garantía de la transferencia: <Pendiente variante="linea">[PENDIENTE: dato legal · la que dé su
                        contrato de tratamiento de datos (DPA), comprobada]</Pendiente>.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold"><strong>Google</strong> (medición, solo con tu consentimiento)</dt>
                      <dd>con <Pendiente variante="linea">[PENDIENTE: dato legal · garantía de transferencia]</Pendiente>.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold"><strong>Alojamiento de la web:</strong></dt>
                      <dd><Pendiente variante="linea">[PENDIENTE: dato legal · proveedor, registros del servidor y garantía;
                        VERIFICAR]</Pendiente></dd>
                    </div>
                    <div>
                      <dt className="font-semibold">No vendemos ni cedemos tus datos a nadie más.</dt>
                      <dd></dd>
                    </div>
                  </dl>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-perfiles" className="seccion">
            <h2 id="h-perfiles" className="t-h2 h-seccion">
              Perfiles
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>No tomamos decisiones sobre ti ni hacemos perfiles con tus datos.</p>
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
                  <p>Verax y sus avisos son para mayores de 18 años.</p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-derechos" className="seccion">
            <h2 id="h-derechos" className="t-h2 h-seccion">
              Tus derechos
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Puedes pedir ver tus datos, corregirlos, borrarlos, llevártelos, limitar su uso u oponerte, y retirar tu
                    consentimiento cuando quieras, escribiendo a <Pendiente variante="linea">[PENDIENTE: dato legal · correo]</Pendiente>.
                  </p>
                  <p>
                    Si crees que no lo hemos hecho bien, puedes reclamar ante la Agencia Española de Protección de Datos
                    (aepd.es).
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-cambios" className="seccion">
            <h2 id="h-cambios" className="t-h2 h-seccion">
              Cambios
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>Última versión: <Pendiente variante="linea">[fecha]</Pendiente>. Si cambia algo importante, lo decimos aquí con la fecha.</p>
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
                name: "Política de privacidad",
                url: `${sitio.url}/privacidad/`,
                inLanguage: "es-ES",
                isPartOf: { "@type": "WebSite", name: sitio.nombre, url: sitio.url },
                publisher: { "@type": "Organization", name: sitio.nombre },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Inicio", item: `${sitio.url}/` },
                  { "@type": "ListItem", position: 2, name: "Privacidad", item: `${sitio.url}/privacidad/` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}