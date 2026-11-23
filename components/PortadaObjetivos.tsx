"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, CircleAlert } from "lucide-react";
import type { Circunstancia } from "@/contenido/listas";
import { CuadroLista, type FilaCuadro } from "@/components/CuadroLista";

export type OpcionObjetivo = { slug: string; texto: string; cuenta: string; sinDosier?: boolean };
export type CuadroObjetivo = { nombre: string; base: string; filas: FilaCuadro[] };

/** Sin objetivo (o sin JavaScript), el cuadro enseña lo que trae cualquier lista, sin cifras (crítica v3, punto 2). */
const CUADRO_GENERAL: FilaCuadro[] = [
  { id: "plato", texto: "Primero, el plato" },
  { id: "suplementos", texto: "Suplementos, por nivel" },
  { id: "no-necesitas", texto: "Lo que no necesitas" },
  { id: "en-que-se-basa", texto: "Quién pagó cada estudio" },
];

/**
 * El buscador por objetivo de la portada, en un paso (UX buscador v1, 2.1), con el cuadro «Tu lista, por dentro» al lado
 * del titular. En el HTML del servidor, cada objetivo es un enlace a su lista; con JavaScript, el grupo pasa a ser de una
 * sola elección, el cuadro cambia a las cifras de ese objetivo y «Ver mi lista» lleva a la lista con las circunstancias en
 * el fragmento (#vegano,sin-lactosa), que no llega al servidor ni a la medición. Nada de lo marcado se guarda.
 */
export function PortadaObjetivos({
  titular,
  objetivos,
  circunstancias,
  cuadros,
  pieCuadro,
  children,
}: {
  titular: ReactNode;
  objetivos: OpcionObjetivo[];
  circunstancias: { id: Circunstancia; texto: string }[];
  cuadros: Record<string, CuadroObjetivo>;
  pieCuadro: ReactNode;
  children?: ReactNode;
}) {
  const [listo, setListo] = useState(false);
  const [elegido, setElegido] = useState<string | null>(null);
  const [marcadas, setMarcadas] = useState<Circunstancia[]>([]);
  const [error, setError] = useState(false);
  const [anuncio, setAnuncio] = useState("");
  const primero = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fichas = decodeURIComponent(window.location.hash.slice(1)).split(",");
    const objetivo = objetivos.find((o) => fichas.includes(o.slug));
    if (objetivo) setElegido(objetivo.slug);
    setMarcadas(circunstancias.filter((c) => fichas.includes(c.id)).map((c) => c.id));
    setListo(true);
  }, [objetivos, circunstancias]);

  const nombreElegido = objetivos.find((o) => o.slug === elegido)?.texto;
  const cuadro = elegido ? cuadros[elegido] : undefined;

  const elegir = (slug: string) => {
    setElegido(slug);
    setError(false);
    const c = cuadros[slug];
    if (c) setAnuncio(`Tu lista de ${c.nombre}: ${c.filas.map((f) => `${f.texto.toLowerCase()}, ${f.n}`).join("; ")}.`);
  };

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
        {o.sinDosier ? <span className="marca-sin-dosier">Sin aprobar · no se publica</span> : <span className="objetivo-cuenta-v3">{o.cuenta}</span>}
        {listo ? (
          <span className="objetivo-elegido" aria-hidden={elegido !== o.slug}>
            Elegido
          </span>
        ) : (
          <ArrowRight className="objetivo-flecha" size={18} strokeWidth={1.5} aria-hidden="true" />
        )}
      </span>
    </>
  );

  return (
    <div className="pv">
      <div className="pv-titular">{titular}</div>
      <div className="pv-cuadro">
        <CuadroLista
          compacto
          titulo="Tu lista, por dentro"
          base={cuadro ? cuadro.base : "Lo que trae cada lista"}
          filas={cuadro ? cuadro.filas : CUADRO_GENERAL}
          pie={pieCuadro}
        />
        <p className="sr-only" aria-live="polite">
          {anuncio}
        </p>
      </div>
      <form className="po" onSubmit={verLista} noValidate>
        <fieldset className="po-objetivos" aria-describedby={error ? "po-error" : undefined}>
          <legend className="po-pregunta">¿Qué quieres conseguir?</legend>
          {error ? (
            <p id="po-error" className="po-error" role="alert">
              <CircleAlert size={18} strokeWidth={2} aria-hidden="true" /> Elige un objetivo.
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
                      onChange={() => elegir(o.slug)}
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
    </div>
  );
}
