"use client";

import { useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { normalizar } from "@/lib/texto";

export type Sugerencia = { texto: string; tipo: string; href: string; claves: string[] };

/**
 * El buscador de texto pequeño (UX buscador v1, 2.3): una lista de sugerencias con el patrón de combobox de ARIA.
 * Solo lleva a páginas que existen, sale de un índice cerrado y no interpreta frases. Las búsquedas delicadas llevan solo
 * a la lista de «Perder grasa» si está publicada; si no, no sugieren nada. Lo que se escribe no se mide ni sale del navegador.
 */
export function BuscadorTexto({
  indice,
  delicadas,
  destinoDelicadas,
  objetivos,
}: {
  indice: Sugerencia[];
  delicadas: string[];
  destinoDelicadas: Sugerencia | null;
  objetivos: { texto: string; href: string }[];
}) {
  const id = useId();
  const [texto, setTexto] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState(-1);

  const consulta = normalizar(texto.trim());

  const sugerencias = useMemo(() => {
    if (consulta.length < 2) return [];
    const delicada = delicadas.some((d) => consulta.includes(d) || (consulta.length >= 4 && d.startsWith(consulta)));
    if (delicada) return destinoDelicadas ? [destinoDelicadas] : [];
    return indice.filter(
      (s) =>
        normalizar(s.texto).includes(consulta) ||
        s.claves.some((c) => c.startsWith(consulta) || consulta.startsWith(c) || consulta.includes(c)),
    );
  }, [consulta, indice, delicadas, destinoDelicadas]);

  const lista = `${id}-lista`;
  const opcion = (i: number) => `${id}-op-${i}`;
  const mostrar = abierto && consulta.length >= 2;

  const ir = (s: Sugerencia) => window.location.assign(s.href);

  const teclas = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAbierto(true);
      setActiva((a) => (sugerencias.length ? (a + 1) % sugerencias.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiva((a) => (sugerencias.length ? (a <= 0 ? sugerencias.length - 1 : a - 1) : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const s = sugerencias[activa] ?? (sugerencias.length === 1 ? sugerencias[0] : undefined);
      if (s) ir(s);
    } else if (e.key === "Escape") {
      if (abierto) setAbierto(false);
      else setTexto("");
      setActiva(-1);
    }
  };

  return (
    <div className="bt">
      <label htmlFor={`${id}-campo`} className="bt-etiqueta">
        ¿Ya sabes lo que buscas?
      </label>
      <p id={`${id}-pista`} className="bt-pista">
        Por ejemplo: creatina, whey, proteína
      </p>
      <div className="bt-campo">
        <Search size={18} strokeWidth={1.5} aria-hidden="true" className="bt-lupa" />
        <input
          id={`${id}-campo`}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={mostrar && sugerencias.length > 0}
          aria-controls={lista}
          aria-activedescendant={mostrar && activa >= 0 ? opcion(activa) : undefined}
          autoComplete="off"
          spellCheck={false}
          aria-describedby={`${id}-pista`}
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value);
            setAbierto(true);
            setActiva(-1);
          }}
          onFocus={() => setAbierto(true)}
          onBlur={() => setTimeout(() => setAbierto(false), 150)}
          onKeyDown={teclas}
        />
        {texto ? (
          <button
            type="button"
            className="bt-borrar"
            aria-label="Borrar la búsqueda"
            onClick={() => {
              setTexto("");
              setActiva(-1);
            }}
          >
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <ul id={lista} role="listbox" aria-label="Sugerencias" className="bt-lista" hidden={!mostrar || sugerencias.length === 0}>
        {sugerencias.map((s, i) => (
          <li
            key={s.href}
            id={opcion(i)}
            role="option"
            aria-selected={i === activa}
            className="bt-opcion"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => ir(s)}
          >
            <span>{s.texto}</span>
            <span className="bt-tipo">{s.tipo}</span>
          </li>
        ))}
      </ul>
      {mostrar && sugerencias.length === 0 ? (
        <div className="bt-nada">
          <p>No tenemos una página sobre «{texto.trim()}».</p>
          <p className="mt-1">Empieza por tu objetivo:</p>
          <ul>
            {objetivos.map((o) => (
              <li key={o.href}>
                <a href={o.href} onMouseDown={(e) => e.preventDefault()}>
                  {o.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {mostrar && sugerencias.length ? `${sugerencias.length} sugerencias. Usa las flechas para elegir.` : ""}
      </p>
    </div>
  );
}
