import type { ReactNode } from "react";
import Link from "next/link";
import { CircleQuestionMark, Link as IconoVinculo, Unlink } from "lucide-react";
import type { UsoFrase } from "@/contenido/creatina/ficha";
import { enlaceDe, frase as fraseDe, fuente as fuenteDe, plegadaDe, vinculosDe, type FraseDatos } from "@/lib/evidencia";

export type RegistroNota = { n: number; ids: string[]; frase?: number };

/**
 * Numera las notas de una página: la 1 es siempre la de Verax y cada frase (o cada grupo de fuentes) tiene un solo
 * número en toda la página. Si una frase sale dos veces, la segunda lleva el mismo número.
 */
export class Numerador {
  private n = 1;
  private porClave = new Map<string, number>();
  usados: number[] = [1];
  registro: RegistroNota[] = [];

  private nuevo(clave: string, ids: string[], frase?: number) {
    this.n += 1;
    this.usados.push(this.n);
    this.porClave.set(clave, this.n);
    this.registro.push({ n: this.n, ids, frase });
    return this.n;
  }

  /** Número de una frase del dosier y si es la primera vez que sale en la página. */
  deFrase(numero: number): { n: number; primera: boolean } {
    const ya = this.porClave.get(`f${numero}`);
    if (ya) return { n: ya, primera: false };
    return { n: this.nuevo(`f${numero}`, ordenFuentes(fraseDe(numero)), numero), primera: true };
  }

  /** Número de un grupo de fuentes sueltas (normas, organismos). */
  deFuentes(ids: string[]): { n: number; primera: boolean } {
    const clave = `g${ids.join(",")}`;
    const ya = this.porClave.get(clave);
    if (ya) return { n: ya, primera: false };
    return { n: this.nuevo(clave, ids), primera: true };
  }
}

/** Las fuentes apartadas van primero en su nota: así la señal de «Sin ellas» cae a la altura de la frase. */
function ordenFuentes(d: FraseDatos) {
  return [...d.fuentes_apartadas.filter((id) => d.fuentes.includes(id)), ...d.fuentes.filter((id) => !d.fuentes_apartadas.includes(id))];
}

export function Llamada({ n, primera = true, apartadas }: { n: number; primera?: boolean; apartadas?: boolean }) {
  return (
    <a className="llamada" href={`#nota-${n}`} id={primera ? `llamada-${n}` : undefined} data-n={n} data-repetida={primera ? undefined : ""}>
      <span className="sr-only">Nota </span>
      {n}
      {apartadas ? <span className="sr-solo-sin-ellas">, con fuentes apartadas en esta prueba</span> : null}
    </a>
  );
}

export function Nota({ n, children, uno, id }: { n: number; children: ReactNode; uno?: boolean; id?: string }) {
  return (
    <div className={`nota${uno ? " nota-uno" : ""}`} id={id ?? `nota-${n}`} data-n={n} role="note" tabIndex={-1}>
      <div className="nota-cabeza">
        {uno ? (
          <span className="nota-num" aria-hidden="true">
            {n}
          </span>
        ) : (
          <a className="nota-num" href={`#fuentes-${n}`} aria-label={`Nota ${n}: ver sus fuentes completas`}>
            {n}
          </a>
        )}
        {uno ? <span className="sr-only">Nota {n}. </span> : null}
        <div className="nota-cuerpo">{children}</div>
        <span className="nota-filete" aria-hidden="true" />
      </div>
    </div>
  );
}

/** La nota 1: cómo se financia Verax. En el móvil va siempre abierta. */
export function NotaUno({ texto, enlace = true, grande }: { texto: string; enlace?: boolean; grande?: boolean }) {
  return (
    <div className={grande ? "nota-uno-grande" : undefined}>
      <Nota n={1} uno>
        {texto} {enlace ? <Link href="/como-se-financia/">Cómo se financia&nbsp;→</Link> : null}
      </Nota>
    </div>
  );
}

function IconoPago({ id }: { id: string }) {
  const v = vinculosDe(fuenteDe(id));
  if (v === "sin") return <Unlink size={14} strokeWidth={1.75} aria-hidden="true" />;
  if (v === "con") return <IconoVinculo size={14} strokeWidth={1.75} aria-hidden="true" />;
  return <CircleQuestionMark size={14} strokeWidth={1.75} aria-hidden="true" />;
}

function etiquetaPago(id: string) {
  const f = fuenteDe(id);
  if (f.tipo === "búsqueda propia") return "Búsqueda propia";
  if (f.tipo === "norma") return "Norma de la UE";
  const v = vinculosDe(f);
  return v === "sin" ? "Sin vínculos conocidos" : v === "con" ? "Con financiación o vínculos del sector" : "No consta";
}

/** Marca de quién paga, corta: icono y palabras. El detalle está en «En qué se basa». */
export function MarcaPago({ id, detalle }: { id: string; detalle?: boolean }) {
  const f = fuenteDe(id);
  const propia = f.tipo === "búsqueda propia" || f.tipo === "norma";
  return (
    <span className="pago">
      {propia ? null : <IconoPago id={id} />}
      <span>
        {etiquetaPago(id)}
        {detalle && vinculosDe(f) === "con" ? <span className="pago-detalle">. {f.vinculos_texto}</span> : null}
      </span>
    </span>
  );
}

function LineaFuente({ id, apartable, senal }: { id: string; apartable: boolean; senal?: string | null }) {
  const f = fuenteDe(id);
  return (
    <li className="fuente" data-vinculos={apartable ? "con" : "no"}>
      <div className="capa capa-completa">
        <span className="fuente-cita">{f.cita}</span>
        <span aria-hidden="true"> · </span>
        <MarcaPago id={id} />
      </div>
      {apartable ? (
        <div className="capa capa-plegada">
          {senal ? <span className="senal-margen">{senal}</span> : null}
          Apartada en esta prueba · {plegadaDe(f)}
        </div>
      ) : null}
    </li>
  );
}

export function senalDe(d: FraseDatos): string | null {
  if (d.sin_ellas === "no se sostiene") return "Sin ellas, esto no se sostiene";
  if (d.sin_ellas === "se sostiene con menos certeza")
    return `Sin ellas, se sostiene con menos certeza${d.certeza_sin_ellas ? `: «${d.certeza_sin_ellas}»` : ""}`;
  return null;
}

/** La nota de una frase: sus fuentes en una línea cada una, y lo que pasa con «Sin ellas». */
export function NotaFrase({
  n,
  uso,
  primera = true,
  sensibilidad,
}: {
  n: number;
  uso: UsoFrase;
  primera?: boolean;
  sensibilidad?: { marca: string; explica: string };
}) {
  if (!primera) {
    return (
      <Nota n={n} id={`nota-${n}-repetida`}>
        <a href={`#nota-${n}`} className="nota-repetida">
          Sus fuentes, en la nota {n} de arriba&nbsp;↑
        </a>
      </Nota>
    );
  }
  const d = fraseDe(uso.n);
  const senal = senalDe(d);
  const ids = ordenFuentes(d);
  return (
    <Nota n={n}>
      {d.sin_ellas === "sin evaluar" ? <p className="sin-evaluar">Sin evaluar en esta prueba</p> : null}
      <ul className="fuentes">
        {ids.map((id, i) => (
          <LineaFuente key={id} id={id} apartable={d.fuentes_apartadas.includes(id)} senal={i === 0 ? senal : null} />
        ))}
      </ul>
      {d.pendiente_verificar ? <p className="pendiente mt-1">[Pendiente de comprobar antes de publicar]</p> : null}
      {uso.sensibilidad && sensibilidad ? (
        <details className="marca-sensibilidad">
          <summary>
            <IconoVinculo size={14} strokeWidth={1.75} aria-hidden="true" />
            <span>
              {sensibilidad.marca}. <span className="que">¿Qué quiere decir?</span>
            </span>
          </summary>
          <p>{sensibilidad.explica}</p>
        </details>
      ) : null}
    </Nota>
  );
}

/** El texto de una frase, con su llamada. La señal para el móvil y el lector de pantalla va dentro, oculta hasta «Sin ellas». */
export function TextoFrase({ n, uso, primera = true }: { n: number; uso: UsoFrase; primera?: boolean }) {
  const d = fraseDe(uso.n);
  const senal = senalDe(d);
  const estado =
    d.sin_ellas === "no se sostiene" ? "no" : d.sin_ellas === "se sostiene con menos certeza" ? "menos" : d.sin_ellas === "sin evaluar" ? "sin-evaluar" : "si";
  return (
    <span className="frase" data-se-sostiene={estado} data-frase={uso.n}>
      {senal ? <span className="senal-texto">{senal}: </span> : null}
      <span className="frase-texto">{uso.texto ?? d.texto}</span>
      <Llamada n={n} primera={primera} apartadas={d.fuentes_apartadas.length > 0} />{" "}
    </span>
  );
}

/** Una nota con fuentes sueltas (no ligadas a una frase del dosier): normas, organismos. */
export function NotaFuentes({ n, ids, antes }: { n: number; ids: string[]; antes?: ReactNode }) {
  return (
    <Nota n={n}>
      {antes}
      <ul className="fuentes">
        {ids.map((id) => (
          <LineaFuente key={id} id={id} apartable={false} />
        ))}
      </ul>
    </Nota>
  );
}

/** «En qué se basa»: cada número del margen, con sus fuentes completas. Los números coinciden uno a uno. */
export function ListaNotas({ registro }: { registro: RegistroNota[] }) {
  return (
    <ol className="lista-notas mt-4 t-nota">
      {registro.map((r) => (
        <li key={r.n} id={`fuentes-${r.n}`} tabIndex={-1}>
          <span className="lista-num">{r.n}</span>
          <ul className="lista-fuentes">
            {r.ids.map((id) => {
              const f = fuenteDe(id);
              const enlace = enlaceDe(f);
              return (
                <li key={id}>
                  <span className="fuente-cita">{f.cita}</span>
                  {f.revista ? <em>, {f.revista}</em> : null} · {f.tipo}
                  {enlace ? (
                    <>
                      {" · "}
                      <a href={enlace.href} rel="noopener">
                        {enlace.texto}
                      </a>
                    </>
                  ) : null}
                  <br />
                  <MarcaPago id={id} detalle />
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
  );
}

/** «Llamada» sin JavaScript: el filete de la nota al pasar o enfocar su llamada, y al revés (movimiento-v1, 3.1). */
export function EstilosLlamadas({ usados }: { usados: number[] }) {
  const enfoque = usados
    .map(
      (n) =>
        `.con-notas:has(.llamada[data-n="${n}"]:focus-visible) .nota[data-n="${n}"] .nota-filete{transform:scaleX(1);transition:transform var(--mov-llamada) var(--curva-salida)}`,
    )
    .join("");
  const raton = usados
    .map(
      (n) =>
        `.con-notas:has(.llamada[data-n="${n}"]:hover) .nota[data-n="${n}"] .nota-filete{transform:scaleX(1);transition:transform var(--mov-llamada) var(--curva-salida)}.con-notas:has(.nota[data-n="${n}"]:hover) .llamada[data-n="${n}"]::after{transform:scaleX(1);transition:transform var(--mov-llamada) var(--curva-salida)}`,
    )
    .join("");
  /* En las partes de salud, la llamada va en seco (movimiento-v1, 3.1). */
  const salud = `.salud .nota-filete,.salud .llamada::after,.con-notas .salud .nota-filete,.con-notas .salud .llamada::after{transition:none!important}`;
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `@media (min-width:900px){${enfoque}}@media (min-width:900px) and (hover:hover) and (pointer:fine){${raton}}${salud}`,
      }}
    />
  );
}
