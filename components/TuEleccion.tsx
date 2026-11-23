"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
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
  const [abierta, setAbierta] = useState(false);
  const [aviso, setAviso] = useState("");
  const id = useId();

  useEffect(() => {
    const fichas = (document.documentElement.dataset.c ?? "").split(" ");
    setMarcadas(circunstancias.filter((c) => fichas.includes(c.id)).map((c) => c.id));
  }, [circunstancias]);

  const cambiar = (id: Circunstancia) => {
    const marcar = !marcadas.includes(id);
    const nuevas = marcar ? [...marcadas, id] : marcadas.filter((x) => x !== id);
    const orden = circunstancias.map((c) => c.id).filter((c) => nuevas.includes(c));

    /* Lo que puede aparecer o irse con una circunstancia, sin contar las líneas del propio carril (R4-C1). */
    const piezas = [...document.querySelectorAll<HTMLElement>(".lista .cuerpo .circ, .lista .cuerpo [class*='quita-']")];
    const antes = piezas.map((el) => el.getClientRects().length > 0);

    /* «Ancla del lector» (movimiento 2.3, R4-C2): en el escritorio el carril va fijo y lo que cambia puede estar por encima
       de lo que se lee; la primera línea a la vista se queda en su sitio, en el mismo fotograma y sin animar. */
    const ancla =
      window.matchMedia("(min-width: 1200px)").matches && window.scrollY > 0
        ? [...document.querySelectorAll<HTMLElement>(".lista .cuerpo :is(h2, h3, p, li)")].find((el) => {
            if (el.closest(".circ, [class*='quita-']")) return false;
            return el.getBoundingClientRect().top >= 0;
          })
        : undefined;
    const arriba = ancla?.getBoundingClientRect().top;

    document.documentElement.dataset.c = orden.join(" ");
    if (ancla && arriba !== undefined) {
      const diferencia = ancla.getBoundingClientRect().top - arriba;
      if (Math.abs(diferencia) >= 1) window.scrollBy(0, diferencia);
    }

    setMarcadas(orden);
    window.history.replaceState(null, "", `${window.location.pathname}${orden.length ? `#${orden.join(",")}` : ""}`);

    const cambios = piezas.filter((el, i) => (el.getClientRects().length > 0) !== antes[i]).length;
    const nombreC = circunstancias.find((c) => c.id === id)?.texto ?? "";
    const texto =
      cambios === 0
        ? `${nombreC} ${marcar ? "marcado" : "desmarcado"}: la lista no cambia.`
        : !marcar && orden.length === 0
          ? `${nombreC} desmarcado: la lista vuelve a como estaba.`
          : `${nombreC} ${marcar ? "marcado" : "desmarcado"}: ${cambios} ${cambios === 1 ? "cambio" : "cambios"} en la lista.`;
    setAviso(texto);
    /* Si coincide con el anterior, se vacía y se rellena en el fotograma siguiente para que se vuelva a decir. */
    if (texto === anuncio) {
      setAnuncio("");
      requestAnimationFrame(() => setAnuncio(texto));
    } else setAnuncio(texto);
  };

  const volver = `/#${[slug, ...marcadas].join(",")}`;
  const nombres = circunstancias.filter((c) => marcadas.includes(c.id)).map((c) => c.texto);
  /* En el móvil, un nombre y «y N más», en una sola línea (R4-C3). */
  const resumen = nombres.length
    ? nombres.length > 1
      ? `${nombres[0]} y ${nombres.length - 1} más`
      : nombres[0]
    : "Nada marcado";

  return (
    <section className="tu-eleccion" aria-labelledby="h-tu-eleccion">
      <h2 id="h-tu-eleccion" className="sr-only">
        Tu elección
      </h2>
      <p className="te-linea">
        <strong className="te-objetivo">{nombre}</strong>
        <span aria-hidden="true" className="te-sep-resumen"> · </span>
        <button
          type="button"
          className="te-resumen solo-js"
          aria-expanded={abierta}
          aria-controls={`${id}-circ`}
          onClick={() => setAbierta((a) => !a)}
        >
          <span aria-hidden="true">{resumen}</span>
          <span className="sr-only">Lo que has marcado: {nombres.length ? nombres.join(", ") : "nada"}</span>
        </button>
        <span aria-hidden="true" className="solo-js"> · </span>
        <a href={volver}>Cambiar</a>
      </p>
      <fieldset id={`${id}-circ`} className="te-circunstancias solo-js" data-abierta={abierta ? "" : undefined}>
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
        {/* R4-C6, resuelta con el criterio de la revisión: la misma frase del aviso, a la vista, en un hueco reservado y sin aria-live. */}
        <p className="te-aviso">{aviso}</p>
        <p className="po-privacidad">Lo que marques se queda en tu navegador: no lo guardamos ni nos llega.</p>
      </fieldset>
      {children}
      <p className="sr-only" aria-live="polite">
        {anuncio}
      </p>
    </section>
  );
}
