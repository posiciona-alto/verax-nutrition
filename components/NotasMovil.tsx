"use client";

import { useEffect } from "react";

const MOVIL = "(max-width: 899.98px)";

/** La nota de una llamada: la de su misma fila (si la frase se repite, su nota corta de «ver arriba»). */
function notaDe(a: HTMLElement): HTMLElement | null {
  const n = a.dataset.n;
  return a.closest(".fila")?.querySelector<HTMLElement>(`.nota[data-n="${n}"]`) ?? document.getElementById(`nota-${n}`);
}

function llamadaDe(nota: HTMLElement): HTMLElement | null {
  return nota.closest(".fila")?.querySelector<HTMLElement>(`.llamada[data-n="${nota.dataset.n}"]`) ?? null;
}

/**
 * En el móvil, cada llamada abre su nota justo debajo del párrafo («Cita», movimiento-v1, 3.1).
 * Las notas cerradas llevan hidden="until-found": la búsqueda en la página las encuentra y las abre.
 * Sin este script, las notas se ven todas: nada queda escondido.
 */
export function NotasMovil() {
  useEffect(() => {
    const raiz = document.documentElement;
    const movil = window.matchMedia(MOVIL);
    raiz.classList.add("js-notas");
    const notas = () => document.querySelectorAll<HTMLElement>(".fila .nota:not(.nota-uno)");

    const abrir = (nota: HTMLElement, abierta: boolean) => {
      if (abierta) {
        nota.removeAttribute("hidden");
        nota.setAttribute("data-abierta", "");
      } else {
        nota.removeAttribute("data-abierta");
        nota.setAttribute("hidden", "until-found");
      }
      llamadaDe(nota)?.setAttribute("aria-expanded", String(abierta));
    };

    const preparar = () => {
      document.querySelectorAll<HTMLElement>(".llamada[data-n]").forEach((a) => {
        if (a.dataset.n === "1") return;
        if (movil.matches) {
          a.setAttribute("role", "button");
          if (!a.hasAttribute("aria-expanded")) a.setAttribute("aria-expanded", "false");
        } else {
          a.removeAttribute("role");
          a.removeAttribute("aria-expanded");
        }
      });
      notas().forEach((nota) => {
        if (movil.matches) {
          if (!nota.hasAttribute("data-abierta")) nota.setAttribute("hidden", "until-found");
        } else {
          nota.removeAttribute("hidden");
        }
      });
    };
    preparar();
    raiz.classList.add("notas-listas");

    const alPulsar = (evento: MouseEvent) => {
      if (!movil.matches) return;
      const a = (evento.target as HTMLElement).closest<HTMLElement>(".llamada[data-n]");
      if (!a || a.dataset.n === "1") return;
      const nota = notaDe(a);
      if (!nota) return;
      evento.preventDefault();
      abrir(nota, !nota.hasAttribute("data-abierta"));
    };
    const alEncontrar = (evento: Event) => {
      const nota = (evento.target as HTMLElement).closest<HTMLElement>(".nota");
      if (nota) abrir(nota, true);
    };

    document.addEventListener("click", alPulsar);
    document.addEventListener("beforematch", alEncontrar, true);
    movil.addEventListener("change", preparar);
    return () => {
      document.removeEventListener("click", alPulsar);
      document.removeEventListener("beforematch", alEncontrar, true);
      movil.removeEventListener("change", preparar);
      raiz.classList.remove("notas-listas");
    };
  }, []);
  return null;
}
