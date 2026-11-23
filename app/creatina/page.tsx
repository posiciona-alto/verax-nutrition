import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { Migas, BandaBorrador, Fila } from "@/components/piezas";
import { NotasMovil } from "@/components/NotasMovil";
import { SinEllas, type Cambio } from "@/components/SinEllas";
import { EstilosLlamadas, ListaNotas, Llamada, NotaFrase, NotaFuentes, NotaUno, Numerador, TextoFrase } from "@/components/notas";
import { formas, resumen, secciones, seguridad, textos, type UsoFrase } from "@/contenido/creatina/ficha";
import { certezas, MODO_CONCEPTO, notaUno, RUTA_CALCULADORA, sitio } from "@/contenido/sitio";
import { datosEnBorrador, evidenciaCreatina, frase, fuente, paginaLista, vinculosDe } from "@/lib/evidencia";

export const metadata: Metadata = {
  title: "Creatina: para qué sirve y qué no, según los estudios | Verax",
  description:
    "Qué se ha demostrado de la creatina y qué no, sus efectos secundarios, qué cambia en tus análisis y quién financió los estudios. Cada frase con su cita.",
  alternates: { canonical: "/creatina/" },
};

const ARTICULO = "articulo-creatina";
const sens = { marca: textos.marca, explica: textos.marcaExplica };

export default function FichaCreatina() {
  const num = new Numerador();

  /** Todas las frases que salen en la página, para el recuento de la capa 1 y de «Sin ellas». */
  const usos: UsoFrase[] = [
    ...resumen.flatMap((r) => r.frases),
    ...secciones.flatMap((s) => s.parrafos.flatMap((p) => p.frases)),
    ...seguridad.flatMap((s) => s.frases),
    ...formas.parrafos.flatMap((p) => p.frases),
  ];
  const numeros = [...new Set(usos.map((x) => x.n))];
  const datos = numeros.map(frase);
  const idsFuentes = [...new Set(datos.flatMap((d) => d.fuentes))];
  const conVinculos = idsFuentes.filter((id) => vinculosDe(fuente(id)) === "con");
  const apartadas = [...new Set(datos.flatMap((d) => d.fuentes_apartadas))];
  const evaluadas = datos.filter((d) => d.sin_ellas !== "sin evaluar");
  const recuento = {
    apartadas: apartadas.length,
    evaluadas: evaluadas.length,
    sostienen: evaluadas.filter((d) => d.sin_ellas !== "no se sostiene").length,
    sinEvaluar: datos.length - evaluadas.length,
  };
  /** Dónde cambia algo con «Sin ellas»: las preguntas de seguridad cuyas frases no se sostienen igual. */
  const cambios: Cambio[] = seguridad
    .filter((q) => q.frases.some((f) => ["no se sostiene", "se sostiene con menos certeza"].includes(frase(f.n).sin_ellas)))
    .map((q) => ({ texto: q.pregunta, href: `#${q.id}` }));
  const conBoton = MODO_CONCEPTO || (paginaLista("/creatina/") && recuento.sinEvaluar === 0);

  const capa1 = (lugar: string, boton: boolean) => (
    <div className="capa1" aria-labelledby={`capa1-${lugar}`}>
      <p id={`capa1-${lugar}`} className="font-semibold">
        De dónde sale esto, en 10 segundos
      </p>
      <dl className="mt-2">
        <dt>{idsFuentes.length} fuentes clave</dt>
        <dd>{conVinculos.length} con financiación o vínculos del sector</dd>
        <dt>¿Se sostiene sin ellas?</dt>
        <dd>{textos.seSostiene}</dd>
      </dl>
      {boton && conBoton ? (
        <>
          <SinEllas articulo={ARTICULO} recuento={recuento} cambios={cambios} />
          <p className="t-secundario mt-3">{evidenciaCreatina.texto_junto_al_boton.texto}</p>
        </>
      ) : null}
    </div>
  );

  /** Párrafo con sus llamadas y, al margen, una nota por frase (la misma si la frase ya salió más arriba). */
  const parrafo = (frases: UsoFrase[], enlace?: { texto: string; href: string }, clave?: string, salud?: boolean) => {
    const ns = frases.map((f) => num.deFrase(f.n));
    return (
      <Fila
        key={clave}
        salud={salud}
        texto={
          <p>
            {frases.map((f, i) => (
              <TextoFrase key={i} n={ns[i].n} primera={ns[i].primera} uso={f} />
            ))}
            {enlace ? (
              <>
                {" "}
                <Link href={enlace.href}>{enlace.texto}</Link>
              </>
            ) : null}
          </p>
        }
        notas={frases.map((f, i) => (
          <NotaFrase key={i} n={ns[i].n} primera={ns[i].primera} uso={f} sensibilidad={sens} />
        ))}
      />
    );
  };

  const h2 = (id: string, t: string) => (
    <h2 id={id} className="t-h2 h-seccion">
      {t}
    </h2>
  );

  const enlacesCompra = (final: boolean) => (
    <ul className="space-y-3">
      <li>
        <Link href="/comparar/creatina/" className="enlace-grande">
          <span>{final ? textos.ctaFinalP : textos.ctaP}</span>
          <ArrowRight size={24} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </li>
      <li>
        <Link href={RUTA_CALCULADORA} className="enlace-texto">
          {textos.ctaS} <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </li>
    </ul>
  );

  const cabeza = (
    <div className="cabeza-ficha pt-6 md:pt-10">
      <Migas items={textos.migas} />
      <Fila
        className="mt-6"
        texto={
          <>
            <h1 className="t-h1 h1-ficha">{textos.h1}</h1>
            <div className="confianza mt-5">
              <span>Revisado el {sitio.revisado}</span>
              <span aria-hidden="true">·</span>
              <span>Escribe {sitio.autora}</span>
              <span aria-hidden="true">·</span>
              <a href="#en-que-se-basa">De dónde sale esto ↓</a>
            </div>
            {conBoton ? (
              <div className="mt-6">
                <SinEllas articulo={ARTICULO} recuento={recuento} cambios={cambios} variante="texto" />
              </div>
            ) : null}
          </>
        }
        notas={<NotaUno texto={notaUno.ciencia} />}
      />
    </div>
  );

  const resumenBloque = (
    <section aria-labelledby="en-resumen" className="seccion-cerca">
      {h2("en-resumen", "En resumen")}
      <div className="space-y-8">
        {resumen.map((r) => {
          const ns = r.frases.map((f) => num.deFrase(f.n));
          return (
            <Fila
              key={r.titulo}
              className="resumen-item"
              texto={
                <div>
                  <h3 className="t-h3">{r.titulo}</h3>
                  {r.frases.map((f, i) => (
                    <p key={i} className="mt-2">
                      <span className="certeza-linea block">{f.certeza}</span>
                      <TextoFrase n={ns[i].n} primera={ns[i].primera} uso={f} />
                    </p>
                  ))}
                  {r.enlace ? (
                    <p className="mt-1">
                      <Link href={r.enlace.href}>{r.enlace.texto}</Link>
                    </p>
                  ) : null}
                </div>
              }
              notas={r.frases.map((f, i) => (
                <NotaFrase key={i} n={ns[i].n} primera={ns[i].primera} uso={f} sensibilidad={sens} />
              ))}
            />
          );
        })}
      </div>
      <Fila className="mt-12" texto={enlacesCompra(false)} />
    </section>
  );

  const cuerpo = secciones.map((s) => (
    <section key={s.id} aria-labelledby={s.id} className="seccion-cerca">
      {h2(s.id, s.titulo)}
      {s.pendiente ? <p className="pendiente mb-4">{s.pendiente}</p> : null}
      <div className="space-y-6">{s.parrafos.map((p, i) => parrafo(p.frases, p.enlace, `${s.id}-${i}`))}</div>
    </section>
  ));

  const seguridadBloque = (
    <section aria-labelledby="seguridad" className="seccion-cerca salud">
      {h2("seguridad", "Efectos secundarios y seguridad")}
      <div>
        {seguridad.map((q) =>
          q.abierta ? (
            <div key={q.id} className="pregunta">
              <h3 id={q.id} className="t-h3 py-4">
                {q.pregunta}
              </h3>
              {parrafo(q.frases, undefined, q.id, true)}
            </div>
          ) : (
            <details key={q.id} className="pregunta" id={q.id}>
              <summary>
                <h3 className="t-h3">{q.pregunta}</h3>
                <span className="signo signo-abrir" aria-hidden="true">
                  +
                </span>
                <span className="signo signo-cerrar" aria-hidden="true">
                  −
                </span>
              </summary>
              {parrafo(q.frases, undefined, q.id, true)}
            </details>
          ),
        )}
      </div>
    </section>
  );

  const formasBloque = (
    <section aria-labelledby={formas.id} className="seccion-cerca">
      {h2(formas.id, formas.titulo)}
      <div className="space-y-6">{formas.parrafos.map((p, i) => parrafo(p.frases, p.enlace, `f-${i}`))}</div>
      <Fila
        className="mt-8"
        texto={
          <Link href="/comparar/creatina/" className="enlace-grande">
            <span>{textos.ctaP}</span>
            <ArrowRight size={24} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        }
      />
    </section>
  );

  const nivelBloque = dosCosas(num);

  const nPago = num.deFuentes(["O6", "O7"]).n;
  const quienPago = (
    <section aria-labelledby="quien-pago" className="seccion-cerca">
      {h2("quien-pago", "Quién pagó los estudios de la creatina")}
      <Fila
        texto={
          <p>
            {evidenciaCreatina.linea_6bis}
            <Llamada n={nPago} /> <Link href="/quien-pago-el-estudio/">Más casos: Quién pagó el estudio&nbsp;→</Link>
          </p>
        }
        notas={<NotaFuentes n={nPago} ids={["O6", "O7"]} />}
      />
    </section>
  );

  return (
    <>
      {MODO_CONCEPTO && datosEnBorrador ? <BandaBorrador /> : null}
      <Cabecera actual="/#suplementos" />
      <main id="contenido" className="con-notas">
        <div className="ficha">
          <aside className="carril" aria-label="De dónde sale esto e índice">
            {capa1("carril", true)}
            <nav className="indice mt-8" aria-label="En esta página">
              <p className="indice-titulo">En esta página</p>
              <Indice />
            </nav>
          </aside>
          {cabeza}
          <article id={ARTICULO} className="cuerpo" data-sin-ellas="no">
            <p id={`${ARTICULO}-aviso`} className="sr-only" aria-live="polite" />
            {resumenBloque}
            <nav className="indice indice-en-linea seccion-cerca" aria-label="En esta página">
              <details>
                <summary className="capa2">Ver el índice</summary>
                <Indice />
              </details>
            </nav>
            {cuerpo}
            {seguridadBloque}
            {formasBloque}
            {nivelBloque}
            {quienPago}
            <section className="seccion-cerca" aria-label="Comparar y calcular">
              <Fila texto={enlacesCompra(true)} />
            </section>
            <section aria-labelledby="en-que-se-basa" className="seccion">
              {h2("en-que-se-basa", "En qué se basa este artículo")}
              <Fila
                texto={capa1("final", false)}
                notas={
                  <div className="t-nota">
                    <p className="font-semibold">Qué quiere decir cada certeza</p>
                    <dl className="mt-2 space-y-2">
                      {Object.entries(certezas).map(([c, d]) => (
                        <div key={c}>
                          <dt className="font-semibold">{c}</dt>
                          <dd>{d}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                }
              />
              <details className="capa2 mt-12" id="fuentes">
                <summary>Ver las fuentes de cada nota, con quién las pagó</summary>
                <ListaNotas registro={num.registro} />
              </details>
              <div className="t-nota mt-8 space-y-1">
                <p>{textos.proximaRevision}</p>
                <p>
                  <Link href="/como-investigamos/">Cómo investigamos&nbsp;→</Link>
                </p>
                <p className="t-secundario">{textos.sanitaria}</p>
              </div>
            </section>
          </article>
        </div>
        <EstilosLlamadas usados={num.usados} />
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
                "@type": "Article",
                headline: textos.h1,
                author: { "@type": "Person", name: sitio.autora },
                publisher: { "@type": "Organization", name: sitio.nombre },
                about: { "@type": "DietarySupplement", name: "Creatina monohidrato" },
              },
              {
                "@type": "FAQPage",
                mainEntity: seguridad.map((q) => ({
                  "@type": "Question",
                  name: q.pregunta,
                  acceptedAnswer: { "@type": "Answer", text: q.frases.map((f) => frase(f.n).texto).join(" ") },
                })),
              },
            ],
          }),
        }}
      />
    </>
  );
}

function Indice() {
  const items = [
    { id: "en-resumen", t: "En resumen" },
    ...secciones.map((s) => ({ id: s.id, t: s.titulo })),
    { id: "seguridad", t: "Efectos secundarios y seguridad" },
    { id: formas.id, t: formas.titulo },
    { id: "nivel", t: "Nivel de evidencia y declaración de la UE" },
    { id: "quien-pago", t: "Quién pagó los estudios" },
    { id: "en-que-se-basa", t: "En qué se basa este artículo" },
  ];
  return (
    <ol>
      {items.map((i) => (
        <li key={i.id}>
          <a href={`#${i.id}`}>{i.t}</a>
        </li>
      ))}
    </ol>
  );
}

function dosCosas(num: Numerador) {
  const nNivel = num.deFuentes(["O5"]).n;
  const nDecl = num.deFuentes(["O1"]).n;
  const d = evidenciaCreatina.declaracion_autorizada;
  return (
    <section aria-labelledby="nivel" className="seccion-cerca">
      <h2 id="nivel" className="t-h2 h-seccion">
        Nivel de evidencia y declaración de la UE
      </h2>
      <Fila
        texto={
          <div>
            <p className="pendiente mb-3">[No se publica hasta comprobar la declaración en el registro de la UE y en el Excel de AESAN]</p>
            <table className="dos-cosas">
              <caption className="t-h3 pb-3">Son dos cosas distintas</caption>
              <tbody>
                <tr>
                  <th scope="row">Nivel de evidencia</th>
                  <td>
                    {textos.nivel.valor}
                    <Llamada n={nNivel} />
                    <span className="block mt-2 t-secundario">{textos.nivel.cantidad}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Declaración autorizada en la UE</th>
                  <td>
                    Sí. «{d.texto_exacto}» Condición: «{d.condicion}» Para adultos que hacen ejercicio de alta intensidad.
                    <Llamada n={nDecl} />
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4">{textos.explicaNivel}</p>
            <p className="mt-1">
              <Link href="/como-investigamos/#certeza">Cómo damos el nivel&nbsp;→</Link>
            </p>
          </div>
        }
        notas={
          <>
            <NotaFuentes n={nNivel} ids={["O5"]} />
            <NotaFuentes n={nDecl} ids={["O1"]} />
          </>
        }
      />
    </section>
  );
}
