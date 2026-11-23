import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { BandaBorrador, Fila, Migas } from "@/components/piezas";
import { NotasMovil } from "@/components/NotasMovil";
import { TuEleccion } from "@/components/TuEleccion";
import { FiltroMarca } from "@/components/FiltroMarca";
import { Llevate } from "@/components/Llevate";
import { EstilosLlamadas, Llamada, MarcaPago, Nota } from "@/components/notas";
import { productosEjemplo } from "@/contenido/comparar/creatina-ejemplo";
import { bloquesDe, CIRCUNSTANCIAS, filasCuadro, LISTAS, listaDe, PROTEINA, type FraseLista, type FuenteLibre, type Tarjeta } from "@/contenido/listas";
import { CuadroLista } from "@/components/CuadroLista";
import { MODO_CONCEPTO, notaUno, pie, sitio, VER_PERDER_GRASA } from "@/contenido/sitio";
import { enlaceDe, frase as fraseDe, fuente as fuenteDe } from "@/lib/evidencia";
import { slugMarca } from "@/lib/texto";

export const dynamicParams = false;

export function generateStaticParams() {
  return LISTAS.filter((l) => l.slug !== "perder-grasa" || VER_PERDER_GRASA).map((l) => ({ objetivo: l.slug }));
}

type Props = { params: Promise<{ objetivo: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = listaDe((await params).objetivo);
  if (!l) return {};
  return {
    title: { absolute: l.title },
    description: "Para qué se ha estudiado cada cosa, con qué seguridad y quién pagó los estudios. Primero, el plato.",
    alternates: { canonical: `/tu-lista/${l.slug}/` },
    robots: { index: false, follow: true },
  };
}


type LineaNota = { tipo: "id"; id: string } | { tipo: "libre"; f: FuenteLibre };

/** Una numeración por página: la 1 es la de Verax; cada frase tiene un solo número aunque salga dos veces. */
class Notas {
  private n = 1;
  private claves = new Map<string, number>();
  usados = [1];
  registro: { n: number; lineas: LineaNota[] }[] = [];

  de(f: FraseLista): { n: number; primera: boolean } | null {
    if (f.tipo === "pendiente") return null;
    const clave = f.tipo === "creatina" ? `C-${f.n}` : f.codigo;
    const ya = this.claves.get(clave);
    if (ya) return { n: ya, primera: false };
    this.n += 1;
    this.claves.set(clave, this.n);
    this.usados.push(this.n);
    const lineas: LineaNota[] =
      f.tipo === "creatina" ? fraseDe(f.n).fuentes.map((id) => ({ tipo: "id", id })) : f.fuentes.map((x) => ({ tipo: "libre", f: x }));
    this.registro.push({ n: this.n, lineas });
    return { n: this.n, primera: true };
  }
}

function etiquetaLibre(f: FuenteLibre) {
  if (f.vinculo === "con") return `Con financiación o vínculos del sector${f.detalle ? `: ${f.detalle}` : ""}`;
  if (f.vinculo === "sin") return "Sin vínculos conocidos";
  if (f.vinculo === "organismo") return "Organismo público";
  if (f.vinculo === "norma") return "Norma de la UE";
  return f.detalle ?? null;
}

function LineaFuenteLista({ l }: { l: LineaNota }) {
  if (l.tipo === "id") {
    return (
      <li className="fuente">
        <span className="fuente-cita">{fuenteDe(l.id).cita}</span>
        <span aria-hidden="true"> · </span>
        <MarcaPago id={l.id} />
      </li>
    );
  }
  const e = etiquetaLibre(l.f);
  return (
    <li className="fuente">
      <span className="fuente-cita">{l.f.cita}</span>
      {e ? (
        <>
          <span aria-hidden="true"> · </span>
          <span className="pago">{e}</span>
        </>
      ) : null}
    </li>
  );
}

function textoDe(f: FraseLista) {
  if (f.tipo === "creatina") return fraseDe(f.n).texto;
  if (f.tipo === "libre") return f.texto;
  return "";
}

function codigoDe(f: FraseLista) {
  if (f.tipo === "creatina") return `C-${f.n}`;
  return f.codigo ?? "";
}

/** Los párrafos de unas frases, con su llamada, y sus notas para el margen. Los huecos salen marcados en el concepto. */
function prepara(notas: Notas, frases: FraseLista[]) {
  const partes = frases.map((f) => ({ f, num: notas.de(f) }));
  const parrafos = partes.map(({ f, num }) =>
    f.tipo === "pendiente" ? (
      <p key={codigoDe(f) + f.que} className="hueco">
        Pendiente de ciencia{f.codigo ? ` · ${f.codigo}` : ""}: {f.que}
      </p>
    ) : (
      <p key={codigoDe(f)} className="frase-lista" data-codigo={codigoDe(f)}>
        <span className="frase-texto">{textoDe(f)}</span>
        {num ? <Llamada n={num.n} primera={num.primera} /> : null}
      </p>
    ),
  );
  const nuevas = partes.filter((p) => p.num?.primera);
  const margen = nuevas.length ? (
    <>
      {nuevas.map(({ f, num }) => (
        <Nota key={num!.n} n={num!.n}>
          <ul className="fuentes">
            {notas.registro
              .find((r) => r.n === num!.n)
              ?.lineas.map((l, i) => <LineaFuenteLista key={i} l={l} />)}
          </ul>
          {f.tipo === "libre" ? <p className="nota-codigo">{f.codigo} · dosier de {f.dosier}</p> : null}
        </Nota>
      ))}
    </>
  ) : undefined;
  return { parrafos, margen };
}

/** Una o varias frases y sus notas, en la misma fila: la nota cae a la altura de su texto. */
function frasesEnFila(notas: Notas, frases: FraseLista[], opciones: { antes?: ReactNode; despues?: ReactNode; className?: string } = {}) {
  const { parrafos, margen } = prepara(notas, frases);
  return (
    <Fila
      className={opciones.className}
      texto={
        <>
          {opciones.antes}
          {parrafos}
          {opciones.despues}
        </>
      }
      notas={margen}
    />
  );
}

function MarcaBorrador({ texto = "Dosier en borrador, no se publica" }: { texto?: string }) {
  return <span className="marca-sin-dosier">{texto}</span>;
}

function tarjetaSuplemento({ t, notas, vegano }: { t: Tarjeta; notas: Notas; vegano: boolean }) {
  const corte = t.nivel.indexOf(", ");
  const principal = frasesEnFila(notas, [t.frase], {
    antes: (
      <div className="sup-cabeza">
        <h3 id={`h-${t.id}`} className="t-h3">
          {t.nombre}
        </h3>
        <p className="sup-nivel">
          <span className="nivel-chip">
            {corte > 0 ? t.nivel.slice(0, corte) : t.nivel}
            {corte > 0 ? <span className="sr-only">,</span> : null}
          </span>{" "}
          {corte > 0 ? <span className="nivel-ambito">{t.nivel.slice(corte + 2)}</span> : null}
        </p>
      </div>
    ),
  });
  const lactosa =
    t.id === "whey" ? (
      <div className="circ" data-circ="sin-lactosa estomago">
        {frasesEnFila(notas, [PROTEINA.p17], { className: "linea-circ" })}
      </div>
    ) : null;
  const porque = prepara(notas, t.porque);
  const aviso = (
    <Fila
      salud
      className="aviso-fila"
      texto={
        <div className="aviso-salud">
          <p className="aviso-visible">{t.avisoVisible}</p>
          <details className="porque">
            <summary>
              <span className="abrir">Por qué</span>
              <span className="cerrar">Ocultar</span>
            </summary>
            {porque.parrafos}
          </details>
        </div>
      }
      notas={porque.margen}
    />
  );
  const veganoBloque =
    t.id === "whey" && vegano ? (
      <div className="circ" data-circ="vegano">
        {frasesEnFila(notas, [PROTEINA.p13, PROTEINA.p14, PROTEINA.p15], {
          antes: <p className="linea-circ-titulo">Con «Vegano», la whey no sale: es proteína de la leche.</p>,
        })}
      </div>
    ) : null;
  const cuerpo = (
    <article className="tarjeta-sup" aria-labelledby={`h-${t.id}`}>
      {principal}
      {lactosa}
      {aviso}
      <p className="enlace-ficha">
        {t.ficha ? (
          <Link href={t.ficha}>Qué dicen los estudios&nbsp;→</Link>
        ) : MODO_CONCEPTO ? (
          <span className="pendiente">Qué dicen los estudios → [pendiente: {t.fichaPendiente}]</span>
        ) : null}
      </p>
    </article>
  );
  if (t.id !== "whey") return cuerpo;
  return (
    <>
      <div className="quita-vegano">{cuerpo}</div>
      {veganoBloque}
    </>
  );
}

export default async function PaginaLista({ params }: Props) {
  const l = listaDe((await params).objetivo);
  if (!l) notFound();
  const notas = new Notas();
  const bloques = bloquesDe(l);

  const secciones: { id: string; titulo: string; cuerpo: ReactNode }[] = [];

  if (l.plato) {
    const frases = bloques.plato;
    secciones.push({
      id: "plato",
      titulo: "Primero, el plato",
      cuerpo: (
        <>
          <p className="t-entrada h-seccion">{l.plato.entradilla}</p>
          {frases.map((f) => (
            <div key={codigoDe(f) + (f.tipo === "pendiente" ? f.que : "")}>{frasesEnFila(notas, [f])}</div>
          ))}
          {l.plato.guia && MODO_CONCEPTO ? (
            <p className="pendiente mt-4">
              {l.plato.guia.texto} → [pendiente: {l.plato.guia.pendiente}]
            </p>
          ) : null}
        </>
      ),
    });
  }

  if (l.suplementos) {
    const s = l.suplementos;
    const vegano = l.circunstancias.vegano.tipo === "whey";
    /** Se componen aquí, en orden, para que la numeración de las notas siga el orden de la página. */
    const tarjetas = s.tarjetas.map((t) => <Fragment key={t.id}>{tarjetaSuplemento({ t, notas, vegano })}</Fragment>);
    secciones.push({
      id: "suplementos",
      titulo: s.titulo,
      cuerpo: (
        <>
          <p className="t-entrada h-seccion">{s.entradilla}</p>
          <div className="tarjetas-sup">
            {tarjetas}
          </div>
          <p className="mt-6">
            <Link href="/como-investigamos/#certeza">Qué quiere decir cada nivel&nbsp;→</Link>
          </p>
        </>
      ),
    });
  }

  if (l.noNecesitas) {
    const lineas = bloques.noNecesitas;
    if (lineas.length) {
      secciones.push({
        id: "no-necesitas",
        titulo: "Lo que no necesitas",
        cuerpo: (
          <>
            <p className="t-entrada h-seccion">{l.noNecesitas.entradilla}</p>
            <ul className="no-necesitas">
              {lineas.map((x) => {
                const certeza = x.etiqueta ?? (x.frase.tipo === "creatina" ? fraseDe(x.frase.n).certeza : x.frase.tipo === "libre" ? x.frase.certeza : undefined);
                return (
                  <li key={x.nombre}>
                    {frasesEnFila(notas, [x.frase], {
                      antes: (
                        <p className="nn-nombre">
                          {x.nombre} {x.estado === "borrador" ? <MarcaBorrador /> : null}
                        </p>
                      ),
                      despues: certeza ? <p className="nn-certeza">{certeza}</p> : null,
                    })}
                    {x.ficha ? (
                      <p className="enlace-ficha">
                        <Link href={x.ficha}>Qué dicen los estudios&nbsp;→</Link>
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </>
        ),
      });
    }
  }

  if (bloques.estudiado.length) {
    secciones.push({
      id: "estudiado",
      titulo: "Lo que sí se ha estudiado",
      cuerpo: (
        <>
          {l.estudiado?.estado === "borrador" ? (
            <p className="mb-4">
              <MarcaBorrador />
            </p>
          ) : null}
          {bloques.estudiado.map((f) => (
            <div key={codigoDe(f)}>{frasesEnFila(notas, [f])}</div>
          ))}
        </>
      ),
    });
  }

  const calculadoras = bloques.calculadoras;
  if (calculadoras.length) {
    secciones.push({
      id: "calculadoras",
      titulo: "Calculadoras",
      cuerpo: (
        <ul className="tarjetas-3 tarjetas-2">
          {calculadoras.map((c) => (
            <li key={c.titulo}>
              {c.href ? (
                <Link href={c.href} className="fila-enlace">
                  <span className="fila-titulo">{c.titulo}</span>
                  <span className="block mt-2">{c.texto}</span>
                </Link>
              ) : (
                <>
                  <span className="fila-titulo">{c.titulo}</span>
                  <span className="block mt-2">{c.texto}</span>
                  <span className="pendiente block mt-2">[pendiente: {c.pendiente}]</span>
                </>
              )}
            </li>
          ))}
          <li className="tarjeta-nota">
            <p>{calculadoras.filter((c) => c.href).length > 1 ? "Ninguna te pide el peso." : "No te pide el peso."}</p>
          </li>
        </ul>
      ),
    });
  }

  if (l.compara) {
    const porMarca = new Map<string, number>();
    productosEjemplo.forEach((p) => porMarca.set(p.marca, (porMarca.get(p.marca) ?? 0) + 1));
    const marcas = [...porMarca.entries()]
      .map(([nombre, n]) => ({ nombre, slug: slugMarca(nombre), n }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    secciones.push({
      id: "compara",
      titulo: "Compara con datos de la etiqueta",
      cuerpo: (
        <>
          <p className="t-entrada h-seccion">Precio por dosis, con el envío y con la hora del precio. Lo que dice la etiqueta, marcado como tal.</p>
          {MODO_CONCEPTO ? <p className="pendiente mb-3">Marcas del comparador de ejemplo [EJEMPLO]</p> : null}
          <FiltroMarca
            marcas={marcas}
            enlaces={[
              { texto: "Comparar creatinas · precio por 3 g", href: "/comparar/creatina/" },
              ...(MODO_CONCEPTO ? [{ texto: "Comparar proteínas whey · precio por 25 g de proteína", pendiente: "comparador de whey sin construir" }] : []),
            ]}
          />
        </>
      ),
    });
  }

  secciones.push({
    id: "llevate",
    titulo: l.llevate === "dos" ? "Llévate esta lista" : "Guárdame la lista",
    cuerpo: <Llevate dos={l.llevate === "dos"} objetivo={l.nombre} />,
  });

  const cuadro = filasCuadro(l);
  const sostiene = cuadro.fuentes.todasCreatina ? "Sí" : MODO_CONCEPTO ? "[DATO]" : "Sí, salvo donde lo decimos en cada ficha";
  const cuenta: Record<string, number | undefined> = {
    plato: bloques.plato.filter((x) => x.tipo !== "pendiente").length,
    suplementos: bloques.tarjetas.length,
    "no-necesitas": bloques.noNecesitas.filter((x) => x.frase.tipo !== "pendiente").length,
    estudiado: bloques.estudiado.length,
    calculadoras: bloques.calculadoras.filter((c) => c.href).length,
  };
  const resumen = [
    { dt: "Dosieres revisados", dd: String(cuadro.dosieres) },
    { dt: "Fuentes clave", dd: `${cuadro.fuentes.total}, ${cuadro.fuentes.con} con financiación o vínculos del sector` },
    { dt: "¿Se sostiene sin ellas?", dd: sostiene === "[DATO]" ? "[DATO: lo da cada dosier]" : sostiene },
  ];
  const cuadroLista = (
    <CuadroLista
      titulo="Esta lista, por dentro"
      etiqueta="Esta lista, por dentro: índice"
      base={
        l.estado === "borrador" ? (
          <>Dosier sin aprobar · no se publica</>
        ) : (
          <>
            {cuadro.dosieres} {cuadro.dosieres === 1 ? "dosier" : "dosieres"} · revisado el {sitio.revisado}
          </>
        )
      }
      filas={[
        ...secciones.map((s) => ({ id: s.id, texto: s.titulo, n: cuenta[s.id], href: `#${s.id}` })),
        { id: "en-que-se-basa", texto: "En qué se basa", href: "#en-que-se-basa" },
      ]}
      fuentes={{ total: cuadro.fuentes.total, con: cuadro.fuentes.con, sinDato: MODO_CONCEPTO ? cuadro.fuentes.sinDato : 0, sostiene }}
      pie={
        <p>
          <span className="cl-uno">1</span> {notaUno.ciencia}{" "}
          <Link href="/como-se-financia/">Cómo se financia&nbsp;→</Link>
        </p>
      }
    />
  );

  const efectos = CIRCUNSTANCIAS.map((c) => ({ c, e: l.circunstancias[c.id] })).filter(({ e }) => e.tipo === "sin-cambios" || e.texto);

  const migas = [{ texto: "Inicio", href: "/" }, { texto: `Tu lista: ${l.nombre}` }];

  return (
    <>
      {MODO_CONCEPTO ? <BandaBorrador /> : null}
      <Cabecera />
      <main id="contenido" className="con-notas lista">
        <div className="ficha">
          <div className="cabeza-ficha pt-6 md:pt-10">
            <Migas items={migas} />
            <Fila
              texto={
                <>
                  {l.estado === "borrador" ? (
                    <p className="mb-3">
                      <MarcaBorrador texto="Dosier sin aprobar, no se publica" />
                    </p>
                  ) : null}
                  <h1 className="t-h1">{l.h1}</h1>
                  <p className="t-entrada mt-4">
                    Para qué se ha estudiado cada cosa y con qué seguridad. No es una lista para tu caso: para eso, lo mejor es un
                    dietista-nutricionista.
                  </p>
                  {l.lineaPropia ? <p className="mt-3">{l.lineaPropia}</p> : null}
                  <p className="confianza mt-4">
                    <span>Revisado el {sitio.revisado}</span>
                    <span aria-hidden="true">·</span>
                    <span>Escribe {sitio.autora}</span>
                    <span aria-hidden="true">·</span>
                    <a href="#en-que-se-basa">De dónde sale esto&nbsp;↓</a>
                  </p>
                </>
              }
              className="mt-6 fila-cuadro"
              notas={cuadroLista}
            />
            {l.acab ? (
              <p className="acab-linea">
                {pie.acab} <span className="pendiente">[PENDIENTE: teléfono y web, comprobados en acab.org]</span>
              </p>
            ) : null}
          </div>

          <aside className="carril carril-lista" aria-label="Tu elección">
            <TuEleccion slug={l.slug} nombre={l.boton} circunstancias={CIRCUNSTANCIAS}>
              {efectos.map(({ c, e }) => (
                <p key={c.id} className="circ te-efecto" data-circ={c.id}>
                  {e.texto}
                </p>
              ))}
            </TuEleccion>
          </aside>

          <article className="cuerpo">
            {secciones.map((s, i) => (
              <Fragment key={s.id}>
              {s.id === "llevate" && l.paraTuCaso ? (
                <p className="seccion t-entrada">Para tu caso concreto, lo mejor es que lo veas con un dietista-nutricionista.</p>
              ) : null}
              <section id={s.id} aria-labelledby={`h-${s.id}`} className={s.id === "llevate" ? "seccion seccion-llevate" : "seccion"}>
                <h2 id={`h-${s.id}`} className="t-h2 h-seccion">
                  <span className="h-num">{i + 1} ·</span> {s.titulo}
                </h2>
                {s.cuerpo}
              </section>
              </Fragment>
            ))}

            <section id="en-que-se-basa" aria-labelledby="h-base" className="seccion">
              <h2 id="h-base" className="t-h2 h-seccion">
                En qué se basa esta lista
              </h2>
              <div className="capa1 max-w-[46rem]">
                <dl>
                  {resumen.map((r) => (
                    <div key={r.dt}>
                      <dt>{r.dt}</dt>
                      <dd className={r.dd.startsWith("[") ? "pendiente" : undefined}>{r.dd}</dd>
                    </div>
                  ))}
                </dl>
                {notas.registro.some((r) => r.lineas.some((x) => x.tipo === "id")) ? (
                  <p className="mt-2">
                    <Link href="/creatina/#fuentes">Creatina · De dónde sale&nbsp;→</Link>
                  </p>
                ) : null}
                {MODO_CONCEPTO && notas.registro.some((r) => r.lineas.some((x) => x.tipo === "libre")) ? (
                  <p className="pendiente mt-1">Proteína y pilotos · De dónde sale → [pendiente: sus fichas, sin construir]</p>
                ) : null}
              </div>
              {notas.registro.length ? (
                <details id="fuentes" className="capa2 mt-6">
                  <summary>Todas las fuentes, por número</summary>
                  <ol className="lista-notas mt-4 t-nota">
                    {notas.registro.map((r) => (
                      <li key={r.n} id={`fuentes-${r.n}`} tabIndex={-1}>
                        <span className="lista-num">{r.n}</span>
                        <ul className="lista-fuentes">
                          {r.lineas.map((x, i) => {
                            if (x.tipo === "id") {
                              const f = fuenteDe(x.id);
                              const enlace = enlaceDe(f);
                              return (
                                <li key={i}>
                                  <span className="fuente-cita">{f.cita}</span>
                                  {enlace ? (
                                    <>
                                      {" · "}
                                      <a href={enlace.href} rel="noopener">
                                        {enlace.texto}
                                      </a>
                                    </>
                                  ) : null}
                                  <br />
                                  <MarcaPago id={x.id} detalle />
                                </li>
                              );
                            }
                            const e = etiquetaLibre(x.f);
                            return (
                              <li key={i}>
                                <span className="fuente-cita">{x.f.cita}</span>
                                {x.f.pmid ? (
                                  <>
                                    {" · "}
                                    <a href={`https://pubmed.ncbi.nlm.nih.gov/${x.f.pmid}/`} rel="noopener">
                                      PMID {x.f.pmid}
                                    </a>
                                  </>
                                ) : null}
                                {e ? (
                                  <>
                                    <br />
                                    <span className="pago">{e}</span>
                                  </>
                                ) : null}
                              </li>
                            );
                          })}
                        </ul>
                        <a href={`#nota-${r.n}`} className="t-secundario" aria-label={`Volver a la nota ${r.n}`}>
                          ↑
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              ) : null}
              <p className="mt-6 t-secundario">Esta lista informa y no sustituye a un profesional sanitario.</p>
            </section>
          </article>
        </div>
        <EstilosLlamadas usados={notas.usados} />
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
                name: l.title,
                url: `${sitio.url}/tu-lista/${l.slug}/`,
                inLanguage: "es-ES",
                isPartOf: { "@type": "WebSite", name: sitio.nombre, url: sitio.url },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Inicio", item: `${sitio.url}/` },
                  { "@type": "ListItem", position: 2, name: `Tu lista: ${l.nombre}`, item: `${sitio.url}/tu-lista/${l.slug}/` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}

