import type { ReactNode } from "react";
import Link from "next/link";

export function Migas({ items }: { items: { texto: string; href?: string }[] }) {
  return (
    <nav className="migas" aria-label="Estás aquí">
      <ol>
        {items.map((m) =>
          m.href ? (
            <li key={m.texto}>
              <Link href={m.href}>{m.texto}</Link>
            </li>
          ) : (
            <li key={m.texto} aria-current="page">
              {m.texto}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

/** Solo en la rama de conceptos: los datos de evidencia aún son un borrador sin el sí de Natalia. */
export function BandaBorrador() {
  return <p className="banda-borrador">Datos en borrador · concepto</p>;
}

/** Un párrafo (o bloque) y sus notas, en la misma fila de la retícula: la nota cae a la altura de su texto. */
export function Fila({
  texto,
  notas,
  className = "",
  salud,
}: {
  texto: ReactNode;
  notas?: ReactNode;
  className?: string;
  salud?: boolean;
}) {
  return (
    <div className={`fila${notas ? "" : " sin-notas"}${salud ? " salud" : ""} ${className}`}>
      <div className="texto">{texto}</div>
      {notas ? <div className="notas">{notas}</div> : null}
    </div>
  );
}
