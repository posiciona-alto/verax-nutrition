"use client";

import { useEffect, useRef, useState } from "react";

export type Recuento = { apartadas: number; sostienen: number; evaluadas: number; sinEvaluar: number };
export type Cambio = { texto: string; href: string };

const ESTADO = "verax:sin-ellas";

/**
 * El momento estrella «Sin ellas» (movimiento-v1, apartado 2): un botón que cambia un atributo del artículo.
 * El CSS hace el resto. Hay un botón en el carril y otro bajo la línea de confianza; comparten el estado con un evento.
 * Los dos textos del botón y del recuento están siempre en el HTML, apilados en la misma celda: al cambiar no se mueve nada.
 */
export function SinEllas({
  articulo,
  recuento,
  cambios,
  variante = "carril",
}: {
  articulo: string;
  recuento: Recuento;
  cambios: Cambio[];
  variante?: "carril" | "texto";
}) {
  const [activo, setActivo] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const alCambiar = (e: Event) => setActivo((e as CustomEvent<boolean>).detail);
    window.addEventListener(ESTADO, alCambiar);
    return () => window.removeEventListener(ESTADO, alCambiar);
  }, []);

  const cambiar = () => {
    const nuevo = !activo;
    const el = document.getElementById(articulo);
    if (!el) return;
    const antes = boton.current?.getBoundingClientRect().top ?? 0;
    el.setAttribute("data-sin-ellas", nuevo ? "si" : "no");
    const despues = boton.current?.getBoundingClientRect().top ?? 0;
    if (Math.abs(despues - antes) > 0.5) window.scrollBy(0, despues - antes);
    const aviso = document.getElementById(`${articulo}-aviso`);
    if (aviso)
      aviso.textContent = nuevo
        ? `Sin las ${recuento.apartadas} fuentes con vínculos: se sostienen ${recuento.sostienen} de ${recuento.evaluadas} frases.`
        : "Leyendo con todas las fuentes.";
    window.dispatchEvent(new CustomEvent(ESTADO, { detail: nuevo }));
  };

  /** Las preguntas de salud van plegadas: el enlace abre la suya antes de saltar. */
  const abrir = (href: string) => {
    const destino = document.getElementById(href.slice(1));
    if (destino instanceof HTMLDetailsElement) destino.open = true;
  };

  return (
    <div className={`sin-ellas sin-ellas-${variante}`} data-activo={activo ? "si" : "no"}>
      <button ref={boton} type="button" className="boton-sin-ellas" aria-pressed={activo} onClick={cambiar}>
        <span className="pila">
          <span className="pila-a">Leer sin las fuentes con vínculos</span>
          <span className="pila-b">Volver a leer con todas</span>
        </span>
      </button>
      <div className="recuento pila">
        <p className="pila-a recuento-reposo">Con todas las fuentes.</p>
        <div className="pila-b">
          <p className="recuento-cifra">
            Sin las {recuento.apartadas} con vínculos: se sostienen {recuento.sostienen} de {recuento.evaluadas} frases
            {recuento.sinEvaluar ? `; ${recuento.sinEvaluar} sin evaluar` : ""}.
          </p>
          {cambios.length ? (
            <p className="recuento-cambios">
              Cambian:{" "}
              {cambios.map((c, i) => (
                <span key={c.href}>
                  {i ? " · " : ""}
                  <a href={c.href} onClick={() => abrir(c.href)}>
                    {c.texto}&nbsp;↓
                  </a>
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
