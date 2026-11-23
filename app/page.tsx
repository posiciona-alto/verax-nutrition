import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { BandaBorrador, Fila } from "@/components/piezas";
import { Buscador } from "@/components/Buscador";
import { NotaUno } from "@/components/notas";
import { financiacion, MODO_CONCEPTO, notaUno, sitio } from "@/contenido/sitio";
import { datosEnBorrador, frase } from "@/lib/evidencia";

export const metadata: Metadata = {
  title: { absolute: "Verax Nutrition · Ciencia sin humo: miramos quién paga cada estudio" },
  description:
    "Nutrición deportiva por objetivo, empezando por la comida. Cada afirmación con su estudio y con quién lo pagó. Comparadores con la hora de cada precio.",
  alternates: { canonical: "/" },
};

/** Frases de proteína citadas tal cual en los textos v2 (bloque 2): el dosier de proteína aún no está en datos. */
const P = {
  p12: "No hay pruebas de que la proteína en polvo dé más músculo que la misma cantidad de proteína de la comida. La whey es proteína de la leche: es una forma práctica de llegar, no algo que funcione por sí solo.",
  p17: "La mayoría de las personas con intolerancia a la lactosa toleran unos 12 a 15 g de lactosa de una vez, y es bastante probable. Quien no la tolera bien puede mirar la lactosa que declara la etiqueta de cada producto.",
  p20: "Con enfermedad renal crónica, la guía internacional KDIGO sugiere no pasar de 0,8 g de proteína por kilo al día en las fases avanzadas y evitar más de 1,3 g si hay riesgo de que la enfermedad avance. Si tienes una enfermedad del riñón, habla con tu médico antes de tomar suplementos de proteína.",
  p23: "Los suplementos de proteína no se han estudiado lo suficiente en el embarazo, la lactancia ni en menores.",
};

export default function Portada() {
  const c22 = frase(22).texto;
  const textos = {
    c2: frase(2).texto,
    c6: frase(6).texto,
    c15: "No hay ningún ensayo de creatina en mujeres embarazadas ni en lactancia.",
    c22,
    c22segunda: "Si tienes alguna enfermedad, estás embarazada o das el pecho, o tomas medicación, consúltalo antes con tu médico.",
    ...P,
  };

  const suplementos = [
    { titulo: "Creatina", nivel: "Nivel 1 · Evidencia sólida, para la fuerza en esfuerzos cortos, con entrenamiento", texto: frase(2).texto, href: "/creatina/" },
    {
      titulo: "Proteína whey",
      nivel: "Nivel 1 · Evidencia sólida, como forma práctica de llegar a la proteína del día; no da músculo por sí sola",
      texto: P.p12,
      href: "/proteina-whey/",
    },
    { titulo: "Beta-alanina", nivel: null, texto: null, pendiente: "dosier de beta-alanina, sin aprobar" },
    { titulo: "BCAA", nivel: null, texto: null, pendiente: "dosier de BCAA, sin aprobar" },
  ];

  return (
    <>
      {MODO_CONCEPTO && datosEnBorrador ? <BandaBorrador /> : null}
      <Cabecera actual="/" />
      <main id="contenido" className="reticula">
        <Fila
          className="pt-10 md:pt-20"
          texto={
            <>
              <h1 className="t-h1-portada">Ciencia sin humo: miramos quién paga cada estudio</h1>
              <p className="t-entrada mt-6">
                Empezamos por la comida y después, si quieres, el bote. Cada afirmación, con su estudio y con quién lo pagó.
              </p>
            </>
          }
          notas={<NotaUno texto={notaUno.portada} />}
        />

        <section id="objetivos" aria-labelledby="h-objetivos" className="seccion-cerca">
          <h2 id="h-objetivos" className="t-h2 h-seccion">
            ¿Qué quieres hacer?
          </h2>
          <Fila texto={<Buscador t={textos} />} />
        </section>

        <section aria-labelledby="h-plato" className="seccion">
          <h2 id="h-plato" className="t-h2">
            Empieza por el plato
          </h2>
          <p className="t-entrada mt-3 h-seccion">Antes del bote, el entreno y la comida.</p>
          <Fila
            texto={
              <ul className="fila-lista">
                {[
                  ["Alimentos para ganar músculo", "Qué alimentos llevan proteína, por ración de casa, con la fuente de cada dato.", "dosier «Alimentos para ganar músculo»"],
                  ["Qué comer antes de entrenar", "Según cuánto falta para entrenar.", "dosier «Comer antes de entrenar»"],
                  ["Calculadora de proteína", "Suma la proteína de lo que comes. No te pedimos el peso.", "dosier «Alimentos para ganar músculo» y la tabla recalculada"],
                ].map(([t, d, p]) => (
                  <li key={t}>
                    <span className="fila-titulo">{t}</span>
                    <span className="block mt-1">{d}</span>
                    <span className="pendiente block mt-1">[PENDIENTE: {p}]</span>
                  </li>
                ))}
              </ul>
            }
          />
        </section>

        <section id="suplementos" aria-labelledby="h-suplementos" className="seccion">
          <h2 id="h-suplementos" className="t-h2">
            Suplementos, por nivel de evidencia
          </h2>
          <p className="t-entrada mt-3 h-seccion">
            Lo que tiene pruebas, lo que está en estudio y lo que no las tiene, dicho igual de claro.
          </p>
          <Fila
            texto={
              <>
                <ul className="fila-lista">
                  {suplementos.map((s) => (
                    <li key={s.titulo}>
                      {s.href ? (
                        <Link href={s.href} className="fila-enlace">
                          <span className="fila-titulo">{s.titulo}</span>
                          <span className="block t-datos mt-1">{s.nivel}</span>
                          <span className="block mt-2">{s.texto}</span>
                        </Link>
                      ) : (
                        <div>
                          <span className="fila-titulo">{s.titulo}</span>
                          <span className="pendiente block mt-1">[PENDIENTE: {s.pendiente}]</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-6">
                  <Link href="/como-investigamos/#certeza">Qué quiere decir cada nivel&nbsp;→</Link>
                </p>
              </>
            }
          />
        </section>

        <section id="comparar" aria-labelledby="h-comparar" className="seccion">
          <h2 id="h-comparar" className="t-h2 h-seccion">
            Compara con datos de la etiqueta
          </h2>
          <Fila
            texto={
              <>
                <p>Precio por dosis, con el envío y con la hora del precio. Lo que dice la etiqueta, marcado como tal.</p>
                <ul className="mt-6 space-y-3">
                  <li>
                    <Link href="/comparar/creatina/" className="enlace-grande">
                      <span>Comparar creatinas</span>
                      <ArrowRight size={24} strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/comparar/proteina-whey/" className="enlace-grande">
                      <span>Comparar proteínas whey</span>
                      <ArrowRight size={24} strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </li>
                </ul>
              </>
            }
          />
        </section>

        <section id="calculadoras" aria-labelledby="h-calculadoras" className="seccion">
          <h2 id="h-calculadoras" className="t-h2 h-seccion">
            Calculadoras
          </h2>
          <Fila
            texto={
              <>
                <ul className="fila-lista">
                  <li>
                    <Link href="/calculadoras/creatina/" className="fila-enlace">
                      <span className="fila-titulo">¿Cuánta creatina? Calcula tu bote</span>
                      <span className="block mt-1">
                        La cifra de la declaración autorizada, la de los consensos y cuánto te dura tu bote.
                      </span>
                    </Link>
                  </li>
                  <li>
                    <span className="fila-titulo">Calculadora de proteína</span>
                    <span className="block mt-1">Suma la proteína de lo que comes y calcula lo que te cuesta tu bote.</span>
                    <span className="pendiente block mt-1">[PENDIENTE: dosier «Alimentos para ganar músculo» y la tabla recalculada]</span>
                  </li>
                </ul>
                <p className="mt-4">Ninguna te pide el peso.</p>
              </>
            }
          />
        </section>
      </main>

      <section id="quien-pago" aria-labelledby="h-quien-pago" className="campo-tinta sobre-tinta">
        <div className="reticula relleno-tinta">
          <Fila
            texto={
              <>
                <h2 id="h-quien-pago" className="t-h2 h-seccion">
                  Quién pagó el estudio
                </h2>
                <p className="t-entrada">
                  Casos documentados en los que una empresa o un sector pagó investigación y después la usó en su publicidad.
                  Cada caso, con su documento original, su fecha y su contexto.
                </p>
                <p className="pendiente mt-6">
                  [PENDIENTE: caso del azúcar y la grasa, dosier de enero. Sin caso publicado, este bloque no sale]
                </p>
              </>
            }
          />
        </div>
      </section>

      <div className="reticula">
        <section aria-labelledby="h-como" className="seccion">
          <h2 id="h-como" className="t-h2 h-seccion">
            Cómo investigamos y cómo se financia esta web
          </h2>
          <Fila
            texto={
              <div className="space-y-4">
                <p>
                  Cada página sale de un dosier de evidencia: los estudios, quién los pagó y si la conclusión aguanta sin los que
                  tienen vínculos. Lo aprueba {sitio.autora} antes de publicar.
                </p>
                <p>{financiacion.portada}</p>
                <p className="flex flex-wrap gap-x-6 gap-y-2">
                  <Link href="/como-investigamos/">Cómo investigamos&nbsp;→</Link>
                  <Link href="/como-se-financia/">Cómo se financia esta web&nbsp;→</Link>
                </p>
                <p className="t-secundario">
                  Escribe Natalia Peña, que entrena y estudió Química. No es nutricionista ni profesional sanitaria.
                </p>
              </div>
            }
          />
        </section>
      </div>
      <Pie />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebSite", name: sitio.nombre, url: sitio.url, inLanguage: "es-ES" },
              { "@type": "Organization", name: sitio.nombre, url: sitio.url },
            ],
          }),
        }}
      />
    </>
  );
}
