"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { Circunstancia } from "@/contenido/listas";

export type OpcionObjetivo = { slug: string; texto: string; cuenta: string; sinDosier?: boolean };

/**
 * El buscador por objetivo de la portada, en un paso (UX buscador v1, 2.1).
 * En el HTML del servidor, cada objetivo es un enlace a su lista; con JavaScript, el grupo pasa a ser de una sola elección
 * y «Ver mi lista» lleva a la lista con las circunstancias en el fragmento (#vegano,sin-lactosa), que no llega al servidor
 * ni a la medición. Nada de lo marcado se guarda.
 */
export function PortadaObjetivos({
  objetivos,
  circunstancias,
  children,
}: {
  objetivos: OpcionObjetivo[];
  circunstancias: { id: Circunstancia; texto: string }[];
  children?: ReactNode;
}) {
  const [listo, setListo] = useState(false);
  const [elegido, setElegido] = useState<string | null>(null);
  const [marcadas, setMarcadas] = useState<Circunstancia[]>([]);
  const [error, setError] = useState(false);
  const primero = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fichas = decodeURIComponent(window.location.hash.slice(1)).split(",");
    const objetivo = objetivos.find((o) => fichas.includes(o.slug));
    if (objetivo) setElegido(objetivo.slug);
    setMarcadas(circunstancias.filter((c) => fichas.includes(c.id)).map((c) => c.id));
    setListo(true);
  }, [objetivos, circunstancias]);

  const nombreElegido = objetivos.find((o) => o.slug === elegido)?.texto;

  const verLista = (e: React.FormEvent) => {
    e.preventDefault();
    if (!elegido) {
      setError(true);
      primero.current?.focus();
      return;
    }
    const orden = circunstancias.map((c) => c.id).filter((id) => marcadas.includes(id));
    window.location.assign(`/tu-lista/${elegido}/${orden.length ? `#${orden.join(",")}` : ""}`);
  };

  const cambiar = (id: Circunstancia) =>
    setMarcadas((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]));

  const contenido = (o: OpcionObjetivo) => (
    <>
      <span className="objetivo-nombre">{o.texto}</span>
      <span className="objetivo-pie">
        <span className="objetivo-cuenta-v3">{o.cuenta}</span>
        {listo ? (
          <span className="objetivo-elegido" aria-hidden={elegido !== o.slug}>
            Elegido
          </span>
        ) : (
          <ArrowRight className="objetivo-flecha" size={20} strokeWidth={1.5} aria-hidden="true" />
        )}
      </span>
      {o.sinDosier ? <span className="marca-sin-dosier">Sin dosier, no se publica</span> : null}
    </>
  );

  return (
    <form className="po" onSubmit={verLista} noValidate>
      <fieldset className="po-objetivos" aria-describedby={error ? "po-error" : undefined}>
        <legend className="po-pregunta">¿Qué quieres conseguir?</legend>
        {error ? (
          <p id="po-error" className="po-error" role="alert">
            Elige un objetivo.
          </p>
        ) : null}
        <ul className="po-rejilla">
          {objetivos.map((o, i) => (
            <li key={o.slug}>
              {listo ? (
                <label className="po-objetivo" data-elegido={elegido === o.slug ? "" : undefined}>
                  <input
                    ref={i === 0 ? primero : undefined}
                    className="sr-only"
                    type="radio"
                    name="objetivo"
                    value={o.slug}
                    checked={elegido === o.slug}
                    onChange={() => {
                      setElegido(o.slug);
                      setError(false);
                    }}
                  />
                  {contenido(o)}
                </label>
              ) : (
                <a className="po-objetivo" href={`/tu-lista/${o.slug}/`}>
                  {contenido(o)}
                </a>
              )}
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="po-fila solo-js">
        <fieldset className="po-circunstancias">
          <legend className="po-pregunta">¿Algo que tener en cuenta? (opcional)</legend>
          <ul className="pastillas">
            {circunstancias.map((c) => (
              <li key={c.id}>
                <label className="pastilla" data-marcada={marcadas.includes(c.id) ? "" : undefined}>
                  <input type="checkbox" checked={marcadas.includes(c.id)} onChange={() => cambiar(c.id)} />
                  <span>{c.texto}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <div className="po-boton">
          <button type="submit" className="boton boton-ver" aria-label={nombreElegido ? `Ver mi lista para ${nombreElegido}` : undefined}>
            Ver mi lista
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <p className="po-privacidad">Lo que marques se queda en tu navegador: no lo guardamos ni nos llega.</p>
        {children}
      </div>
    </form>
  );
}
