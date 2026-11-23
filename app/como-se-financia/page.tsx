import type { Metadata } from "next";
import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { Cuadro } from "@/components/Cuadro";
import { LlamadaFija, NumeroNota } from "@/components/llamada";
import { BandaBorrador, Fila, Migas, Pendiente, Prosa } from "@/components/piezas";
import { financiacion, MODO_CONCEPTO, notaUno, paginaFinanciacion, PROGRAMAS_ACTIVOS, sitio } from "@/contenido/sitio";

const TITULO = "Cómo se financia Verax Nutrition";

export const metadata: Metadata = {
  title: { absolute: TITULO },
  description: paginaFinanciacion.description,
  alternates: { canonical: "/como-se-financia/" },
};

/** Los bloques con su H2, en el orden de los textos v2 (2.2). */
const SECCIONES = [
  { id: "donde", titulo: "Dónde hay enlaces de afiliado y dónde no" },
  { id: "tiendas", titulo: "Con qué tiendas, y cuánto nos pagan" },
  { id: "orden", titulo: "Cómo ordenamos las tablas" },
  { id: "no-aceptamos", titulo: "Lo que no aceptamos" },
  { id: "misma-vara", titulo: "La misma vara para las marcas a las que enlazamos" },
  { id: "aviso", titulo: "El aviso de tu bote" },
  { id: "detras", titulo: "Quién está detrás" },
  { id: "no-cuadra", titulo: "Si ves algo que no cuadra" },
  { id: "cambios", titulo: "Registro de cambios" },
] as const;

const titulo = (id: (typeof SECCIONES)[number]["id"]) => SECCIONES.find((s) => s.id === id)!.titulo;

/**
 * La nota 1 hecha página (sistema 3.5): composición Documento, con la contraetiqueta de la propia web en el margen, a la
 * altura del H1. Destino de cada ¹ y de `ownershipFundingInfo`.
 */
export default function ComoSeFinancia() {
  const cuadro = (
    <Cuadro
      variante="web"
      titulo="La contraetiqueta de Verax"
      base="Verax Nutrition · por página"
      filas={[
        { id: "afiliado", texto: PROGRAMAS_ACTIVOS ? "Programas activos" : "Enlaces de afiliado activos", n: PROGRAMAS_ACTIVOS ? <Pendiente>[DATO: N]</Pendiente> : 0 },
        { id: "salir", texto: "Quién paga por salir", n: "Nadie" },
        { id: "orden", texto: "Orden de las tablas", n: "Precio por dosis con envío" },
        { id: "gratis", texto: "Producto gratis a cambio de reseñas", n: "No" },
        { id: "consejo", texto: "Consejo para tu caso", n: "Ninguno" },
        { id: "revision", texto: "Revisión de esta página", n: <Pendiente>[DATO: cada cuánto]</Pendiente> },
      ]}
      pie={
        <p>
          <NumeroNota n={1} /> {notaUno.pie}
        </p>
      }
    />
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${sitio.url}/como-se-financia/#pagina`,
    url: `${sitio.url}/como-se-financia/`,
    name: TITULO,
    description: paginaFinanciacion.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${sitio.url}/#web` },
    publisher: { "@id": `${sitio.url}/#organizacion` },
  };

  return (
    <>
      {MODO_CONCEPTO ? <BandaBorrador /> : null}
      <Cabecera />
      <main id="contenido" className="con-notas reticula documento">
        <div className="pt-6 md:pt-10">
          <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Cómo se financia" }]} />
          <Fila
            className="mt-6 fila-cuadro"
            texto={
              <>
                <p className="antetitulo">Nota 1</p>
                <h1 className="t-h1">
                  {TITULO}
                  <LlamadaFija n={1} tamano="titular" decorativa />
                </h1>
                <p className="t-entrada mt-5">{paginaFinanciacion.respuesta}</p>
                <p className="mt-4">En nuestra marca, la nota 1 siempre lleva aquí. Por eso el ¹ del logo es un enlace.</p>
                <p className="confianza mt-5">
                  <span>
                    Actualizado el <Pendiente>[fecha]</Pendiente>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Escribe {sitio.autora}</span>
                  <span aria-hidden="true">·</span>
                  <a href="#cambios">Ver los cambios&nbsp;↓</a>
                </p>
              </>
            }
            notas={cuadro}
          />
        </div>

        <Prosa className="seccion-cerca">
          <h2 id="donde">{titulo("donde")}</h2>
          <p>{paginaFinanciacion.donde}</p>
          <p>
            Las fichas de ciencia, las guías, las calculadoras y «Quién pagó el estudio» no llevan ningún enlace de afiliado. Cuando
            enlazan al comparador, es un enlace normal de la web. Así lo que cuentan los estudios no se mezcla con una venta.
          </p>

          <h2 id="tiendas">{titulo("tiendas")}</h2>
          {paginaFinanciacion.programas ? (
            <p>{paginaFinanciacion.programas}</p>
          ) : (
            <>
              <table className="tabla">
                <caption className="sr-only">Programas de afiliación activos</caption>
                <thead>
                  <tr>
                    <th scope="col">Tienda</th>
                    <th scope="col">Programa</th>
                    <th scope="col">Comisión</th>
                    <th scope="col">Según sus condiciones del</th>
                    <th scope="col">Desde</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <Pendiente>
                        [DATO: cada programa activo, con la comisión que dicen sus condiciones y la fecha de esas condiciones]
                      </Pendiente>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                <Pendiente>[PENDIENTE: la frase que exige el acuerdo vigente de Afiliados de Amazon, si entra]</Pendiente>
              </p>
            </>
          )}

          <h2 id="orden">{titulo("orden")}</h2>
          <p>
            Por el precio por dosis con envío, de menos a más. Es un criterio que puedes comprobar tú con la fórmula que está encima
            de cada tabla. Ningún producto va destacado fuera de ese orden, y una tienda sin programa sale igual que una con
            programa.
          </p>
          <p>Los productos sin dato de envío van aparte, debajo, para no mezclar precios que no se pueden comparar.</p>

          <h2 id="no-aceptamos">{titulo("no-aceptamos")}</h2>
          <ul>
            <li>Dinero de una marca por salir en una tabla o por su posición.</li>
            <li>Producto gratis a cambio de una reseña: los botes que fotografiamos los compramos.</li>
            <li>Anuncios en la web: hoy no hay ninguno.</li>
            <li>
              Patrocinios: hoy no hay ninguno. Si algún día hay uno, irá marcado como «Destacado · patrocinado» y esta página lo
              dirá con su fecha.
            </li>
          </ul>

          <h2 id="misma-vara">{titulo("misma-vara")}</h2>
          <p>
            Miramos quién paga los estudios de todos: la industria alimentaria, la farmacéutica, la de los suplementos y también
            las marcas de nuestros enlaces. Si una de ellas tiene un caso documentado, lo contamos igual que cualquier otro, y esta
            página lo dice.
          </p>

          <h2 id="aviso">{titulo("aviso")}</h2>
          <p>
            Es gratis y no te pedimos nada a cambio. El correo te pregunta primero si lo sigues usando, y no lleva enlaces de
            afiliado: si quieres comparar, te lleva al comparador de la web.
          </p>

          <h2 id="detras">{titulo("detras")}</h2>
          <p>
            Verax Nutrition la edita Posiciona Alto, el estudio web de Natalia Peña, que hoy cubre sus gastos. Escribe y firma
            Natalia, que entrena y estudió Química. No es nutricionista ni profesional sanitaria.
          </p>
          <p>{financiacion.vinculos}</p>
          <p>
            <Link href="/sobre-natalia/">Sobre la autora&nbsp;→</Link>
          </p>

          <h2 id="no-cuadra">{titulo("no-cuadra")}</h2>
          <p>
            Si una marca o un lector encuentra un error, nos escribe, lo revisamos y, si hay un error, lo corregimos con fecha,
            diciendo qué había antes.
          </p>
          <p>
            <Pendiente>[DATO: correo de correcciones, D7]</Pendiente>
          </p>
          <p>
            <Link href="/como-investigamos/#correcciones">Cómo corregimos&nbsp;→</Link>
          </p>

          <h2 id="cambios">{titulo("cambios")}</h2>
          <ol className="registro-cambios">
            <li>
              <Pendiente>[dd-mm-aaaa]</Pendiente> · Publicada. Sin programas de afiliación activos.
            </li>
          </ol>
        </Prosa>
      </main>
      <Pie />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
