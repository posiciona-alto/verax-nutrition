"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Circunstancia } from "@/contenido/listas";

/**
 * «Tu elección» en la lista (UX buscador v1, 3.1, bloque 2). Las circunstancias viven en el fragmento de la URL y en un
 * atributo de <html> (data-c), que el script de antes de pintar ya pone al cargar: así la lista no salta.
 * Sin JavaScript no se filtra nada y se ve la línea de cada circunstancia (respuesta del arquitecto-seo, punto 2).
 */
export function TuEleccion({
  slug,
  nombre,
  circunstancias,
  children,
}: {
  slug: string;
  nombre: string;
  circunstancias: { id: Circunstancia; texto: string }[];
  children?: ReactNode;
}) {
  const [marcadas, setMarcadas] = useState<Circunstancia[]>([]);
  const [anuncio, setAnuncio] = useState("");

  useEffect(() => {
    const fichas = (document.documentElement.dataset.c ?? "").split(" ");
    setMarcadas(circunstancias.filter((c) => fichas.includes(c.id)).map((c) => c.id));
  }, [circunstancias]);

  const cambiar = (id: Circunstancia) => {
    const nuevas = marcadas.includes(id) ? marcadas.filter((x) => x !== id) : [...marcadas, id];
    const orden = circunstancias.map((c) => c.id).filter((c) => nuevas.includes(c));
    setMarcadas(orden);
    document.documentElement.dataset.c = orden.join(" ");
    window.history.replaceState(null, "", `${window.location.pathname}${orden.length ? `#${orden.join(",")}` : ""}`);
    const cambios = document.querySelectorAll(`.lista [data-circ~="${id}"], .lista .quita-${id}`).length;
    setAnuncio(`La lista ha cambiado: ${cambios} ${cambios === 1 ? "cosa" : "cosas"}.`);
  };

  const volver = `/#${[slug, ...marcadas].join(",")}`;

  return (
    <section className="tu-eleccion" aria-labelledby="h-tu-eleccion">
      <h2 id="h-tu-eleccion" className="sr-only">
        Tu elección
      </h2>
      <p>
        Tu objetivo: <strong>{nombre}</strong> · <a href={volver}>Cambiar</a>
      </p>
      <fieldset className="te-circunstancias solo-js">
        <legend>Lo que has marcado</legend>
        <ul className="pastillas pastillas-pequenas">
          {circunstancias.map((c) => (
            <li key={c.id}>
              <label className="pastilla" data-marcada={marcadas.includes(c.id) ? "" : undefined}>
                <input type="checkbox" checked={marcadas.includes(c.id)} onChange={() => cambiar(c.id)} />
                <span>{c.texto}</span>
              </label>
            </li>
          ))}
        </ul>
        {marcadas.length === 0 ? <p className="te-nada">Nada marcado</p> : null}
        <p className="po-privacidad">Lo que marques se queda en tu navegador: no lo guardamos ni nos llega.</p>
      </fieldset>
      {children}
      <p className="sr-only" aria-live="polite">
        {anuncio}
      </p>
    </section>
  );
}
