import type { ReactNode } from "react";
import Link from "next/link";
import { CircleQuestionMark, CornerDownLeft, Link as IconoVinculo, Unlink } from "lucide-react";
import type { UsoFrase } from "@/contenido/creatina/ficha";
import { enlaceDe, frase as fraseDe, fuente as fuenteDe, plegadaDe, vinculosDe, type FraseDatos } from "@/lib/evidencia";

/** Numera las notas de una página en el orden en que se escriben: la 1 es siempre la de Verax. */
export class Numerador {
  private n = 1;
  usados: number[] = [1];
  siguiente() {
    this.n += 1;
    this.usados.push(this.n);
    return this.n;
  }
}

export function Llamada({ n }: { n: number }) {
  return (
    <a className="llamada" href={`#nota-${n}`} id={`llamada-${n}`} data-n={n} aria-controls={`nota-${n}`}>
      <span className="sr-only">Nota </span>
      {n}
    </a>
  );
}

export function Nota({ n, children, uno, volver = true }: { n: number; children: ReactNode; uno?: boolean; volver?: boolean }) {
  return (
    <div className={`nota${uno ? " nota-uno" : ""}`} id={`nota-${n}`} data-n={n} role="note" tabIndex={-1}>
      <div className="nota-cabeza">
        <span className="nota-num" aria-hidden="true">
          {n}
        </span>
        <span className="sr-only">Nota {n}. </span>
        <div className="nota-cuerpo">
          {children}
          {volver ? (
            <>
              {" "}
              <a className="nota-volver" href={`#llamada-${n}`} aria-label={`Volver al texto de la nota ${n}`}>
                <CornerDownLeft size={14} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </>
          ) : null}
        </div>
        <span className="nota-filete" aria-hidden="true" />
      </div>
    </div>
  );
}

/** La nota 1: cómo se financia Verax. En el móvil va siempre abierta. */
export function NotaUno({ texto, enlace = true }: { texto: string; enlace?: boolean }) {
  return (
    <Nota n={1} uno volver={false}>
      {texto}{" "}
      {enlace ? <Link href="/como-se-financia/">Cómo se financia&nbsp;→</Link> : null}
    </Nota>
  );
}

export function MarcaPago({ id }: { id: string }) {
  const f = fuenteDe(id);
  const v = vinculosDe(f);
  if (f.tipo === "búsqueda propia") return <span className="pago-detalle">Búsqueda propia</span>;
  if (f.tipo === "norma") return <span className="pago-detalle">Norma de la UE</span>;
  return (
    <span className="pago">
      {v === "sin" ? (
        <Unlink size={14} strokeWidth={1.75} aria-hidden="true" />
      ) : v === "con" ? (
        <IconoVinculo size={14} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <CircleQuestionMark size={14} strokeWidth={1.75} aria-hidden="true" />
      )}
      <span>
        {v === "sin" ? "Sin vínculos conocidos" : v === "con" ? "Con financiación o vínculos del sector" : "No consta"}
        {v === "con" ? <span className="pago-detalle">. {f.vinculos_texto}</span> : null}
      </span>
    </span>
  );
}

function LineaFuente({ id, apartable, senal }: { id: string; apartable: boolean; senal?: string | null }) {
  const f = fuenteDe(id);
  const enlace = enlaceDe(f);
  return (
    <li className="fuente" data-vinculos={apartable ? "con" : "no"}>
      <div className="capa capa-completa">
        <span className="fuente-cita">{f.cita}</span>
        {enlace ? (
          <>
            {" · "}
            <a href={enlace.href} rel="noopener" className="t-secundario">
              {enlace.texto}
            </a>
          </>
        ) : null}
        <br />
        <MarcaPago id={id} />
      </div>
      {apartable ? (
        <div className="capa capa-plegada" aria-hidden="true">
          {senal ? <span className="senal-margen">{senal}</span> : null}
          Apartada en esta prueba · {plegadaDe(f)}
        </div>
      ) : null}
    </li>
  );
}

function senalDe(d: FraseDatos): string | null {
  if (d.sin_ellas === "no se sostiene") return "Sin ellas, esto no se sostiene";
  if (d.sin_ellas === "se sostiene con menos certeza")
    return `Sin ellas, se sostiene con menos certeza${d.certeza_sin_ellas ? `: «${d.certeza_sin_ellas}»` : ""}`;
  return null;
}

/** La nota de una frase: sus fuentes, cada una con su marca de quién paga, y lo que pasa con «Sin ellas». */
export function NotaFrase({ n, uso, sensibilidad }: { n: number; uso: UsoFrase; sensibilidad?: { marca: string; explica: string } }) {
  const d = fraseDe(uso.n);
  const senal = senalDe(d);
  return (
    <Nota n={n}>
      {d.sin_ellas === "sin evaluar" ? <p className="sin-evaluar">Sin evaluar en esta prueba</p> : null}
      <ul className="fuentes">
        {d.fuentes.map((id) => (
          <LineaFuente
            key={id}
            id={id}
            apartable={d.fuentes_apartadas.includes(id)}
            senal={id === d.fuentes_apartadas[0] ? senal : null}
          />
        ))}
      </ul>
      {d.pendiente_verificar ? <p className="pendiente mt-2">[Antes de publicar: {d.pendiente_motivo}]</p> : null}
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
export function TextoFrase({ n, uso, conCerteza }: { n: number; uso: UsoFrase; conCerteza?: boolean }) {
  const d = fraseDe(uso.n);
  const senal = senalDe(d);
  const estado =
    d.sin_ellas === "no se sostiene" ? "no" : d.sin_ellas === "se sostiene con menos certeza" ? "menos" : d.sin_ellas === "sin evaluar" ? "sin-evaluar" : "si";
  return (
    <span className="frase" data-se-sostiene={estado} data-frase={uso.n}>
      {senal ? <span className="senal-texto">{senal}: </span> : null}
      {conCerteza && uso.certeza ? <span className="certeza">{uso.certeza}. </span> : null}
      <span className="frase-texto">{uso.texto ?? d.texto}</span>
      <Llamada n={n} />{" "}
    </span>
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
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `@media (min-width:900px){${enfoque}}@media (min-width:900px) and (hover:hover) and (pointer:fine){${raton}}`,
      }}
    />
  );
}

/** Una nota con fuentes sueltas (no ligadas a una frase del dosier): normas, organismos, la línea del 6 bis. */
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
