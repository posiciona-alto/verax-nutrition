"use client";

import { useEffect, useRef, useState } from "react";

type Recuento = { apartadas: number; sostienen: number; evaluadas: number; sinEvaluar: number };

const ESTADO = "verax:sin-ellas";

/**
 * El momento estrella «Sin ellas» (movimiento-v1, apartado 2): un botón que cambia un atributo del artículo.
 * El CSS hace el resto. Hay un botón en el carril o en «En qué se basa» y otro en la línea de confianza del móvil:
 * los dos comparten el estado a través de un evento.
 */
export function SinEllas({ articulo, recuento, variante = "caja" }: { articulo: string; recuento: Recuento; variante?: "caja" | "linea" }) {
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
        ? `Leyendo sin las ${recuento.apartadas} fuentes que apartamos: se sostienen ${recuento.sostienen} de ${recuento.evaluadas} frases evaluadas.`
        : "Leyendo con todas las fuentes.";
    window.dispatchEvent(new CustomEvent(ESTADO, { detail: nuevo }));
  };

  if (variante === "linea") {
    return (
      <button ref={boton} type="button" className="boton-linea" aria-pressed={activo} onClick={cambiar}>
        {activo ? "Volver a leer con todas" : "Leer sin ellas"}
      </button>
    );
  }

  return (
    <div>
      <button ref={boton} type="button" className="boton-sin-ellas" aria-pressed={activo} onClick={cambiar}>
        <span>{activo ? "Volver a leer con todas" : "Leer sin las fuentes con vínculos"}</span>
      </button>
      <p className="mt-3" aria-hidden="true">
        {activo ? (
          <>
            Sin las {recuento.apartadas} fuentes que apartamos: <strong>se sostienen {recuento.sostienen} de {recuento.evaluadas}</strong>{" "}
            frases evaluadas
            {recuento.sinEvaluar ? `; ${recuento.sinEvaluar} sin evaluar` : ""}.
          </>
        ) : (
          <>Con todas las fuentes.</>
        )}
      </p>
    </div>
  );
}
