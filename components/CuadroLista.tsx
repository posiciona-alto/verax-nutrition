import type { ReactNode } from "react";

/** `nVegano`: la cifra cuando «Vegano» quita algo de la sección; las dos van en el HTML, apiladas, y cambian en seco (R4-C7). */
export type FilaCuadro = { id: string; texto: string; n?: number | string; nVegano?: number; href?: string };

function Cifra({ f }: { f: FilaCuadro }) {
  if (f.n === undefined) return null;
  if (f.nVegano === undefined || f.nVegano === f.n) return <span className="cl-n">{f.n}</span>;
  return (
    <span className="cl-n cl-n-doble">
      <span className="cl-n-todas">{f.n}</span>
      <span className="cl-n-vegano">{f.nVegano}</span>
    </span>
  );
}

/**
 * «Esta lista, por dentro»: la contraetiqueta de B aplicada a una lista (crítica v3, puntos 1 y 2).
 * Describe la lista, nunca a la persona: sin nivel, sin precio y sin producto. En la lista, cada fila lleva a su sección.
 */
export function CuadroLista({
  titulo,
  base,
  filas,
  fuentes,
  pie,
  compacto,
  etiqueta,
}: {
  titulo: string;
  base: ReactNode;
  filas: FilaCuadro[];
  fuentes?: { total: number; con: number; sinDato?: number; sostiene: string } | null;
  pie: ReactNode;
  compacto?: boolean;
  etiqueta?: string;
}) {
  return (
    <aside className={`cuadro-lista${compacto ? " cuadro-lista-compacto" : ""}`} aria-label={etiqueta ?? titulo}>
      <p className="cl-titulo">{titulo}</p>
      <p className="cl-base">{base}</p>
      <ol className="cl-filas">
        {filas.map((f) => (
          <li key={f.id}>
            {f.href ? (
              <a href={f.href} className="cl-fila">
                <span>{f.texto}</span>
                <Cifra f={f} />
              </a>
            ) : (
              <span className="cl-fila">
                <span>{f.texto}</span>
                <Cifra f={f} />
              </span>
            )}
          </li>
        ))}
      </ol>
      {fuentes ? (
        <dl className="cl-fuentes">
          <div>
            <dt>Fuentes</dt>
            <dd>{fuentes.total}</dd>
          </div>
          <div>
            <dt>Con vínculos del sector</dt>
            <dd>
              {fuentes.con}
              {fuentes.sinDato ? <span className="pendiente"> · {fuentes.sinDato} por pasar del dosier</span> : null}
            </dd>
          </div>
          <div>
            <dt>¿Se sostiene sin ellas?</dt>
            <dd className={fuentes.sostiene.startsWith("[") ? "pendiente" : undefined}>{fuentes.sostiene}</dd>
          </div>
        </dl>
      ) : null}
      <div className="cl-pie">{pie}</div>
    </aside>
  );
}
