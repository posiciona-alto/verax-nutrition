"use client";

import { useEffect } from "react";

const MOVIL = "(max-width: 899.98px)";

/**
 * En el móvil, cada llamada abre su nota justo debajo del párrafo («Cita», movimiento-v1, 3.1).
 * Sin este script, las notas se ven todas: nada queda escondido.
 */
export function NotasMovil() {
  useEffect(() => {
    const raiz = document.documentElement;
    const movil = window.matchMedia(MOVIL);
    raiz.classList.add("js-notas");

    const prepararLlamadas = () => {
      document.querySelectorAll<HTMLAnchorElement>(".llamada[data-n]").forEach((a) => {
        if (a.dataset.n === "1") return;
        if (movil.matches) {
          a.setAttribute("role", "button");
          if (!a.hasAttribute("aria-expanded")) a.setAttribute("aria-expanded", "false");
        } else {
          a.removeAttribute("role");
          a.removeAttribute("aria-expanded");
        }
      });
    };
    prepararLlamadas();

    const alPulsar = (evento: MouseEvent) => {
      if (!movil.matches) return;
      const a = (evento.target as HTMLElement).closest<HTMLAnchorElement>(".llamada[data-n]");
      if (!a || a.dataset.n === "1") return;
      const nota = document.getElementById(`nota-${a.dataset.n}`);
      if (!nota) return;
      evento.preventDefault();
      const abierta = nota.hasAttribute("data-abierta");
      if (abierta) nota.removeAttribute("data-abierta");
      else nota.setAttribute("data-abierta", "");
      a.setAttribute("aria-expanded", String(!abierta));
    };

    document.addEventListener("click", alPulsar);
    movil.addEventListener("change", prepararLlamadas);
    return () => {
      document.removeEventListener("click", alPulsar);
      movil.removeEventListener("change", prepararLlamadas);
      raiz.classList.remove("js-notas");
    };
  }, []);
  return null;
}
