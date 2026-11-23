import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { BandaBorrador, Fila } from "@/components/piezas";
import { Buscador } from "@/components/Buscador";
import { NotasMovil } from "@/components/NotasMovil";
import { EstilosLlamadas, Llamada, NotaFuentes, Numerador } from "@/components/notas";
import { productosEjemplo } from "@/contenido/comparar/creatina-ejemplo";
import { financiacion, MODO_CONCEPTO, RUTA_CALCULADORA, sitio } from "@/contenido/sitio";
import { datosEnBorrador, frase } from "@/lib/evidencia";

export const metadata: Metadata = {
  title: { absolute: "Verax Nutrition · Suplementos: estudios, quién paga y precio" },
  description:
    "Suplementos con criterio: qué dicen los estudios, quién los pagó y el precio por dosis con envío, ordenado por precio. Primero, el plato.",
  alternates: { canonical: "/" },
};

/** H1 decidido por Natalia el 23-11-2026 (estrategia/mensaje/2026-11-23-portada-venta-consciente-v1.md). */
const TITULAR = "Antes de comprar un suplemento: lo que dicen los estudios, quién los pagó y cuánto cuesta cada dosis";

/** Frases de proteína citadas tal cual en los textos v2 (bloque 2): el dosier de proteína aún no está en datos. */
const P = {
  p12: "No hay pruebas de que la proteína en polvo dé más músculo que la misma cantidad de proteína de la comida. La whey es proteína de la leche: es una forma práctica de llegar, no algo que funcione por sí solo.",
  p17: "La mayoría de las personas con intolerancia a la lactosa toleran unos 12 a 15 g de lactosa de una vez, y es bastante probable. Quien no la tolera bien puede mirar la lactosa que declara la etiqueta de cada producto.",
  p20: "Con enfermedad renal crónica, la guía internacional KDIGO sugiere no pasar de 0,8 g de proteína por kilo al día en las fases avanzadas y evitar más de 1,3 g si hay riesgo de que la enfermedad avance. Si tienes una enfermedad del riñón, habla con tu médico antes de tomar suplementos de proteína.",
  p23: "Los suplementos de proteína no se han estudiado lo suficiente en el embarazo, la lactancia ni en menores.",
};

const euros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Portada() {
  const num = new Numerador();
  const nAis = num.deFuentes(["O5"]).n;

  const c22 = frase(22).texto;
  const textos = {
    c2: frase(2).texto,
    c6: frase(6).texto,
    c15: frase(15).texto.split(";")[0] + ".",
    c22,
    c22segunda: "Si tienes alguna enfermedad, estás embarazada o das el pecho, o tomas medicación, consúltalo antes con tu médico.",
    ...P,
  };

  /** Cuadro de ejemplo: el precio más barato con envío de los datos de ejemplo y quién pagó los estudios de la ficha. */
  const masBarato = Math.min(
    ...productosEjemplo.filter((p) => p.envio !== null).map((p) => (p.precio + (p.envio ?? 0)) / (p.gramos / 3)),
  );

  const suplementos = [
    {
      titulo: "Creatina",
      nivel: "Nivel 1",
      etiqueta: "Evidencia sólida",
      para: "Para la fuerza en esfuerzos cortos, con entrenamiento",
      href: "/creatina/",
    },
    {
      titulo: "Proteína whey",
      nivel: "Nivel 1",
      etiqueta: "Evidencia sólida",
      para: "Como forma práctica de llegar a la proteína del día; no da músculo por sí sola",
      href: "/proteina-whey/",
    },
    { titulo: "Beta-alanina", nivel: null, etiqueta: null, para: null, pendiente: "dosier de beta-alanina, sin aprobar" },
    { titulo: "BCAA", nivel: null, etiqueta: null, para: null, pendiente: "dosier de BCAA, sin aprobar" },
  ];

  /**
   * Cuadro de ejemplo en tres zonas (portada v1, apartado 5), en su variante sin el nivel: el nivel y el precio no van
   * juntos mientras el ciencia-nutricion no diga lo contrario.
   */
  const notaFinanciacion = (
    <a className="llamada" href="/como-se-financia/" aria-label="Nota 1: cómo se financia Verax" title="Nota 1: cómo se financia Verax">
      1
    </a>
  );
  const cuadro = (
    <aside className="cuadro cuadro-portada" aria-labelledby="cuadro-titulo">
      <h2 id="cuadro-titulo" className="cuadro-base">
        Así lo ves en cada suplemento: el ejemplo de la creatina
      </h2>
      <div className="cuadro-zona">
        <h3 className="cuadro-zona-titulo">Lo que dicen los estudios</h3>
        <p>
          <Link href="/creatina/">Para qué sirve y qué no&nbsp;→</Link>
        </p>
      </div>
      <div className="cuadro-zona">
        <h3 className="cuadro-zona-titulo">Quién pagó los estudios</h3>
        <p>
          <Link href="/creatina/#quien-pago">Quién pagó los estudios de la creatina&nbsp;→</Link>
        </p>
      </div>
      <div className="cuadro-zona">
        <h3 className="cuadro-zona-titulo">Lo que cuesta cada dosis</h3>
        <p className="cuadro-precio">
          Desde <span className="valor">{euros.format(masBarato)}</span> por dosis (3 g), con envío{" "}
          <span className="marca-ejemplo">[EJEMPLO]</span>
        </p>
        <p className="cuadro-hora">Precio de las tiendas a las [HH:MM] del [fecha]</p>
        <p className="mt-2">
          Ordenado por precio, nunca por comisión{notaFinanciacion}
        </p>
        <p className="mt-2">
          <Link href="/comparar/creatina/">Comparar creatinas&nbsp;→</Link>
        </p>
      </div>
    </aside>
  );

  const botones = [
    { texto: "Creatina", debajo: "precio por 3 g", href: "/comparar/creatina/" },
    {
      texto: "Proteína whey",
      debajo: "precio por 25 g de proteína",
      href: "/comparar/proteina-whey/",
    },
    { texto: "Por tu objetivo", debajo: "empieza por el plato", href: "#objetivos" },
  ];

  return (
    <>
      {MODO_CONCEPTO && datosEnBorrador ? <BandaBorrador /> : null}
      <Cabecera actual="/" />
      <main id="contenido" className="reticula con-notas">
        <div className="portada-arriba">
          <div className="portada-texto">
            <h1 className="t-h1-portada">{TITULAR}</h1>
            <p className="portada-eslogan">
              Ciencia sin humo: miramos quién paga cada estudio{notaFinanciacion}.
            </p>
            <p className="t-entrada mt-4">
              Empezamos por lo que comes. Si después quieres un suplemento, lo eliges tú, con datos que puedes comprobar.
            </p>
            <nav className="portada-accion" aria-label="Comparar">
              <p className="t-h3">¿Qué quieres comparar?</p>
              <ul className="accion-lista">
                {botones.map((b, i) => (
                  <li key={b.texto}>
                    <a href={b.href} className={`boton boton-grande${i === 2 ? " boton-claro" : ""}`}>
                      <span className="boton-dos-lineas">
                        <span>{b.texto}</span>
                        <span className="boton-debajo">{b.debajo}</span>
                      </span>
                      <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="portada-cuadro">{cuadro}</div>
        </div>

        <section aria-labelledby="h-promesas" className="seccion">
          <h2 id="h-promesas" className="sr-only">
            Lo que hace Verax
          </h2>
          <ol className="promesas">
            <li>
              <p className="promesa-titulo">Primero, el plato</p>
              <p>Antes del bote, el entreno y la comida. Si después quieres un suplemento, te contamos cuáles tienen pruebas.</p>
              <p className="mt-2">
                <a href="#h-plato">Empieza por el plato&nbsp;→</a>
              </p>
            </li>
            <li>
              <p className="promesa-titulo">Quién paga cada estudio</p>
              <p>Junto a cada estudio, quién lo pagó y si la conclusión se sostiene sin los que tienen vínculos con el sector.</p>
              <p className="mt-2">
                <Link href="/como-investigamos/">Cómo investigamos&nbsp;→</Link>
              </p>
            </li>
            <li>
              <p className="promesa-titulo">Precio por dosis, a la vista</p>
              <p>
                Con el envío, la hora del precio y la cuenta publicada. Ordenado por precio, nunca por comisión{notaFinanciacion}.
              </p>
              <p className="mt-2">
                <Link href="/como-se-financia/">Cómo se financia&nbsp;→</Link>
              </p>
            </li>
          </ol>
        </section>

        <section id="objetivos" aria-labelledby="h-objetivos" className="seccion-puerta">
          <h2 id="h-objetivos" className="t-h2 h-seccion">
            ¿Qué quieres hacer?
          </h2>
          <Buscador t={textos} />
        </section>

        <section aria-labelledby="h-plato" className="seccion">
          <h2 id="h-plato" className="t-h2">
            Empieza por el plato
          </h2>
          <p className="t-entrada mt-3 h-seccion">Antes del bote, el entreno y la comida.</p>
          <ul className="tarjetas-3">
            {[
              ["Alimentos para ganar músculo", "Qué alimentos llevan proteína, por ración de casa, con la fuente de cada dato.", "dosier «Alimentos para ganar músculo»"],
              ["Qué comer antes de entrenar", "Según cuánto falta para entrenar.", "dosier «Comer antes de entrenar»"],
              ["Calculadora de proteína", "Suma la proteína de lo que comes. No te pedimos el peso.", "dosier y tabla recalculada"],
            ].map(([t, d, p]) => (
              <li key={t}>
                <span className="fila-titulo">{t}</span>
                <span className="block mt-2">{d}</span>
                <span className="pendiente block mt-2">[PENDIENTE: {p}]</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="suplementos" aria-labelledby="h-suplementos" className="seccion-puerta">
          <h2 id="h-suplementos" className="t-h2">
            Suplementos, por nivel de evidencia
          </h2>
          <p className="t-entrada mt-3 h-seccion">Lo que tiene pruebas, lo que está en estudio y lo que no las tiene, dicho igual de claro.</p>
          <Fila
            texto={
              <>
                <table className="tabla tabla-niveles">
                  <caption className="sr-only">Suplementos por nivel de evidencia</caption>
                  <thead>
                    <tr>
                      <th scope="col">Suplemento</th>
                      <th scope="col">Nivel</th>
                      <th scope="col">Para qué</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suplementos.map((s, i) => (
                      <tr key={s.titulo}>
                        <th scope="row">
                          {s.href ? <Link href={s.href}>{s.titulo}</Link> : s.titulo}
                        </th>
                        <td className="nivel-celda">
                          {s.nivel ? (
                            <>
                              <span className="nivel-cifra">{s.nivel}</span>
                              <span className="block">{s.etiqueta}</span>
                            </>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>
                          {s.para ?? <span className="pendiente">[PENDIENTE: {s.pendiente}]</span>}
                          {i === 0 ? <Llamada n={nAis} /> : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-6">
                  <Link href="/como-investigamos/#certeza">Qué quiere decir cada nivel&nbsp;→</Link>
                </p>
              </>
            }
            notas={
              <NotaFuentes
                n={nAis}
                ids={["O5"]}
                antes={<p className="mb-1">El nivel lo damos con los estudios y con la clasificación del Instituto Australiano del Deporte.</p>}
              />
            }
          />
        </section>

        <section id="calculadoras" aria-labelledby="h-calculadoras" className="seccion">
          <h2 id="h-calculadoras" className="t-h2 h-seccion">
            Calculadoras
          </h2>
          <ul className="tarjetas-3">
            <li>
              <Link href={RUTA_CALCULADORA} className="fila-enlace">
                <span className="fila-titulo">¿Cuánta creatina? Calcula tu bote</span>
                <span className="block mt-2">La cifra de la declaración autorizada, la de los consensos y cuánto te dura tu bote.</span>
              </Link>
            </li>
            <li>
              <span className="fila-titulo">Calculadora de proteína</span>
              <span className="block mt-2">Suma la proteína de lo que comes y calcula lo que te cuesta tu bote.</span>
              <span className="pendiente block mt-2">[PENDIENTE: dosier y tabla recalculada]</span>
            </li>
            <li className="tarjeta-nota">
              <p>Ninguna te pide el peso.</p>
            </li>
          </ul>
        </section>
        <EstilosLlamadas usados={num.usados} />
      </main>

      <section id="quien-pago" aria-labelledby="h-quien-pago" className="campo-tinta sobre-tinta seccion-puerta-tinta">
        <div className="reticula relleno-tinta">
          <h2 id="h-quien-pago" className="t-h2">
            Quién pagó el estudio
          </h2>
          <p className="t-entrada mt-4 max-w-[46rem]">
            Casos documentados en los que una empresa o un sector pagó investigación y después la usó en su publicidad. Cada
            caso, con su documento original, su fecha y su contexto.
          </p>
          <div className="caso-ejemplo">
            <div>
              <p className="marca-ejemplo">[EJEMPLO]</p>
              <p className="caso-titular">
                Aquí va el titular del caso: quién pagó, qué estudio y cuándo
                <span className="llamada" aria-hidden="true">
                  2
                </span>
              </p>
              <p className="caso-frase">Una frase con lo que dice el documento original, con su fecha.</p>
            </div>
            <div className="caso-notas">
              <p>
                <span className="nota-num">2</span> Documento original, con su fecha y el archivo donde está.
              </p>
              <p className="mt-2">Sin caso publicado, este bloque no sale en la web.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="reticula">
        <section aria-labelledby="h-como" className="seccion">
          <h2 id="h-como" className="t-h2 h-seccion">
            Cómo investigamos y cómo se financia esta web
          </h2>
          <div className="dos-columnas">
            <p>
              Cada página sale de un dosier de evidencia: los estudios, quién los pagó y si la conclusión aguanta sin los que
              tienen vínculos. Lo aprueba {sitio.autora} antes de publicar.
            </p>
            <div className="space-y-4">
              <p>{financiacion.portada}</p>
              <p className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/como-investigamos/">Cómo investigamos&nbsp;→</Link>
                <Link href="/como-se-financia/">Cómo se financia esta web&nbsp;→</Link>
              </p>
              <p className="t-secundario">
                Escribe Natalia Peña, que entrena y estudió Química. No es nutricionista ni profesional sanitaria.
              </p>
            </div>
          </div>
        </section>
      </div>
      <NotasMovil />
      <Pie />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebSite", name: sitio.nombre, url: sitio.url, inLanguage: "es-ES" },
              {
                "@type": "Organization",
                name: sitio.nombre,
                url: sitio.url,
                slogan: "Ciencia sin humo: miramos quién paga cada estudio",
              },
              { "@type": "Person", name: sitio.autora },
            ],
          }),
        }}
      />
    </>
  );
}
