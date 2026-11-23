import type { Metadata } from "next";
import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { Migas, BandaBorrador, Fila, Prosa, Pendiente } from "@/components/piezas";
import { NotasMovil } from "@/components/NotasMovil";
import { EstilosLlamadas, NumeroNota } from "@/components/notas";
import { MODO_CONCEPTO, notaUno, pie, sitio } from "@/contenido/sitio";

export const metadata: Metadata = {
  title: { absolute: "Avísame cuando se acabe · Verax Nutrition" },
  description:
    "Te avisamos por correo cuando tu bote esté por terminarse. Sin spam, solo un correo hacia la fecha que elijas. Te confirmamos antes y te das de baja con un clic.",
  alternates: { canonical: "/avisame-cuando-se-acabe/" },
  robots: { index: false, follow: true },
};

const H1 = "Avísame cuando se acabe";

export default function AvisameCuandoSeAcabe() {
  return (
    <>
      {MODO_CONCEPTO ? <BandaBorrador /> : null}
      <Cabecera actual="/avisame-cuando-se-acabe/" />
      <main id="contenido" className="con-notas">
        <div className="reticula">
          <section aria-labelledby="h-formulario" className="seccion">
            <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Avísame cuando se acabe" }]} />
            <Fila
              className="mt-6"
              texto={
                <>
                  <h1 id="h-formulario" className="t-h1">
                    {H1}
                  </h1>
                  <p className="t-entrada mt-4">
                    Dinos qué producto usas, cuánto tomas al día y cuándo se te acaba el bote. Te mandamos un correo hacia
                    esa fecha con un enlace al comparador, y nada más.
                  </p>
                </>
              }
            />

            <Fila
              texto={
                <form className="formulario-aviso space-y-6 max-w-md" action="/api/avisame" method="POST">
                  <div>
                    <label htmlFor="producto" className="label">
                      Producto <span aria-hidden="true">*</span>
                    </label>
                    <select id="producto" name="producto" required className="input mt-1 w-full">
                      <option value="">Elige el producto</option>
                      <option value="creatina-monohidrato">Creatina monohidrato</option>
                      <option value="creatina-creapure">Creatina Creapure</option>
                      <option value="proteina-whey">Proteína whey</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gramos" className="label">
                      Gramos del bote <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="number"
                      id="gramos"
                      name="gramos"
                      min="1"
                      max="5000"
                      required
                      placeholder="Ej. 300, 500, 1000"
                      className="input mt-1 w-full"
                    />
                    <p className="t-secundario mt-1">Escribe los gramos del bote con números, por ejemplo 500.</p>
                  </div>

                  <div>
                    <label htmlFor="dosis-diaria" className="label">
                      Qué tomas al día (en gramos) <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="number"
                      id="dosis-diaria"
                      name="dosisDiaria"
                      min="0.1"
                      max="100"
                      step="0.1"
                      required
                      placeholder="Ej. 3, 5, 10"
                      className="input mt-1 w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="fecha-fin" className="label">
                      Fecha en que se te acaba <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="date"
                      id="fecha-fin"
                      name="fechaFin"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="input mt-1 w-full"
                    />
                    <p className="t-secundario mt-1">Esa fecha ya ha pasado. Elige una a partir de mañana.</p>
                  </div>

                  <div>
                    <label htmlFor="email" className="label">
                      Tu correo <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="tu@correo.com"
                      className="input mt-1 w-full"
                    />
                  </div>

                  <button type="submit" className="btn btn-primario w-full mt-4">
                    Apuntarme
                  </button>

                  <p className="t-secundario text-center">
                    Sin confirmar, no te escribiremos.
                  </p>
                </form>
              }
            />
          </section>

          <section aria-labelledby="h-estados" className="seccion">
            <h2 id="h-estados" className="t-h2 h-seccion">
              Estados del aviso
            </h2>

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Confirmación pendiente</h3>
                  <p>Te hemos mandado un correo a tu dirección. Haz clic en el enlace para confirmar.</p>
                  <p className="t-secundario">Sin confirmar, no te escribiremos.</p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Aviso enviado (vista previa del correo)</h3>
                  <p><strong>Asunto:</strong> Tu bote de [producto] está por terminarse</p>
                  <p><strong>Vista previa:</strong> Primero, una pregunta: ¿lo sigues usando?</p>
                  <p>
                    <button className="btn btn-primario">Sí, lo sigo usando</button>{" "}
                    <button className="btn btn-secundario">No, gracias</button>
                  </p>
                  <p className="t-secundario"><strong>De acuerdo.</strong> Este aviso queda cerrado.</p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Botón «Avisarme del siguiente»</h3>
                  <p>Lleva al formulario con el bote ya relleno.</p>
                  <p className="t-secundario">Encima: Revisa la fecha y confirma.</p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Enlace de confirmación caducado</h3>
                  <p><strong>Este enlace ya no funciona.</strong> Si sigues queriendo el aviso, apúntate otra vez.</p>
                  <p>
                    <Link href="/avisame-cuando-se-acabe/" className="btn btn-primario">
                      Apuntarme otra vez
                    </Link>
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Enlace de confirmación ya usado</h3>
                  <p><strong>Ya estaba confirmado.</strong> Te escribiremos hacia el <Pendiente variante="linea">[fecha]</Pendiente>.</p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Baja con un enlace que no encontramos</h3>
                  <p><strong>No encontramos este aviso.</strong> Puede que ya te hubieras dado de baja.</p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Error al enviar</h3>
                  <p>No hemos podido apuntarte ahora. Prueba otra vez en unos minutos.</p>
                  <p className="pendiente">
                    <Pendiente>
                      [VERIFICAR con desarrollo: si falla, que no se guarde el correo, y entonces añadir «No hemos guardado tu
                      correo.»]
                    </Pendiente>
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Error: gramos</h3>
                  <p>Escribe los gramos del bote con números, por ejemplo 500.</p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <Prosa>
                  <h3 className="t-h3">Error: fecha pasada</h3>
                  <p>Esa fecha ya ha pasado. Elige una a partir de mañana.</p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-datos" className="seccion">
            <h2 id="h-datos" className="t-h2 h-seccion">
              Qué datos guardamos y para qué
            </h2>
            <Fila
              texto={
                <Prosa>
                  <ul className="lista-puntos space-y-2">
                    <li><strong>Tu correo:</strong> para mandarte el aviso.</li>
                    <li><strong>El producto, el tamaño del bote, lo que tomas al día y la fecha:</strong> para calcular cuándo
                      mandarte el correo.</li>
                    <li><strong>Base legal:</strong> tu consentimiento (art. 6.1.a del RGPD). Lo confirmas por correo y lo
                      retiras con un clic en cada correo.</li>
                    <li><strong>Cuánto tiempo:</strong> hasta que te des de baja o <Pendiente variante="linea">[PENDIENTE:
                      dato legal · plazo tras el aviso]</Pendiente>. Si no confirmas, borramos la petición a los <Pendiente variante="linea">[PENDIENTE:
                      dato legal · días]</Pendiente>.</li>
                  </ul>
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
                name: "Avísame cuando se acabe",
                url: `${sitio.url}/avisame-cuando-se-acabe/`,
                inLanguage: "es-ES",
                isPartOf: { "@type": "WebSite", name: sitio.nombre, url: sitio.url },
                publisher: { "@type": "Organization", name: sitio.nombre },
                description:
                  "Te avisamos por correo cuando tu bote esté por terminarse. Sin spam, solo un correo hacia la fecha que elijas.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Inicio", item: `${sitio.url}/` },
                  { "@type": "ListItem", position: 2, name: "Avísame cuando se acabe", item: `${sitio.url}/avisame-cuando-se-acabe/` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}