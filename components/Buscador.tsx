"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Textos del buscador: mensaje y textos v2, bloque 2 de la portada. Las frases C-/P- llegan del servidor. */
export type TextosBuscador = {
  c2: string;
  c6: string;
  c15: string;
  c22: string;
  c22segunda: string;
  p12: string;
  p17: string;
  p20: string;
  p23: string;
};

type Objetivo = "musculo" | "resistencia" | "antes" | "cero" | "estomago";
const OBJETIVOS: { id: Objetivo; texto: string }[] = [
  { id: "musculo", texto: "Ganar músculo" },
  { id: "resistencia", texto: "Resistencia" },
  { id: "antes", texto: "Antes de entrenar" },
  { id: "cero", texto: "Empiezo de cero" },
  { id: "estomago", texto: "Estómago sensible" },
];
const DIETAS = ["Vegano", "Vegetariano", "Sin gluten", "Sin lactosa"];
const AVISOS = ["Hipertensión", "Embarazo o lactancia", "Enfermedad del riñón", "Tomo medicación"] as const;

type Tarjeta = { titulo: string; texto: string; href?: string; pendiente?: string };

/** Cuántos resultados da cada objetivo, sin avisos marcados (mismo reparto que los grupos de abajo). */
const RESULTADOS: Record<Objetivo, number> = { musculo: 5, cero: 5, resistencia: 4, antes: 2, estomago: 1 };

/**
 * Buscador por objetivo. Los avisos de salud son datos de salud (RGPD, art. 9): se quedan en este componente,
 * no se guardan, no van en la URL y no llegan a la medición ni a ningún servidor.
 */
export function Buscador({ t }: { t: TextosBuscador }) {
  const [objetivo, setObjetivo] = useState<Objetivo | null>(null);
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [avisos, setAvisos] = useState<Set<string>>(new Set());
  const titulo = useRef<HTMLHeadingElement>(null);

  const ir = (p: 1 | 2 | 3) => {
    setPaso(p);
    requestAnimationFrame(() => titulo.current?.focus());
  };

  const plato: Tarjeta[] = [
    { titulo: "Alimentos para ganar músculo", texto: "Qué alimentos llevan proteína, por ración de casa, con la fuente de cada dato.", pendiente: "dosier «Alimentos para ganar músculo»" },
    { titulo: "Qué comer antes de entrenar", texto: "Según cuánto falta para entrenar.", pendiente: "dosier «Comer antes de entrenar»" },
  ];
  const suplementos: Tarjeta[] = avisos.has("Embarazo o lactancia")
    ? []
    : [
        { titulo: "Creatina", texto: t.c2, href: "/creatina/" },
        { titulo: "Proteína whey", texto: t.p12, href: "/proteina-whey/" },
      ];

  let g2: Tarjeta[] = [];
  let g3: Tarjeta[] = [];
  if (objetivo === "musculo" || objetivo === "cero") {
    g2 = suplementos;
    g3 = [{ titulo: "BCAA", texto: "", pendiente: "dosier de BCAA" }];
  } else if (objetivo === "resistencia") {
    g3 = [
      { titulo: "Creatina", texto: t.c6, href: "/creatina/#resistencia" },
      { titulo: "BCAA y beta-alanina", texto: "", pendiente: "dosieres de BCAA y beta-alanina" },
    ];
  }

  const tarjeta = (c: Tarjeta) => (
    <li key={c.titulo} className="fila-lista-item">
      {c.href ? (
        <Link href={c.href} className="fila-enlace">
          <span className="fila-titulo">{c.titulo}</span>
          {c.texto ? <span className="block mt-1">{c.texto}</span> : null}
        </Link>
      ) : (
        <div>
          <span className="fila-titulo">{c.titulo}</span>
          {c.texto ? <span className="block mt-1">{c.texto}</span> : null}
        </div>
      )}
      {c.pendiente ? <p className="pendiente mt-1">[PENDIENTE: {c.pendiente}]</p> : null}
    </li>
  );

  const total = (objetivo === "estomago" ? 0 : plato.length) + g2.length + g3.length;

  return (
    <div className="buscador">
      {paso === 1 ? (
        <ul className="objetivos">
          {OBJETIVOS.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                className="objetivo"
                onClick={() => {
                  setObjetivo(o.id);
                  ir(2);
                }}
              >
                <span>{o.texto}</span>
                <span className="objetivo-cuenta">
                  {RESULTADOS[o.id]} {RESULTADOS[o.id] === 1 ? "resultado" : "resultados"}
                  <ArrowRight size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {paso === 2 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ir(3);
          }}
        >
          <h3 ref={titulo} tabIndex={-1} className="t-h3">
            ¿Algo que debamos tener en cuenta?
          </h3>
          <fieldset className="grupo-filtro mt-4">
            <legend className="sr-only">Alimentación</legend>
            {DIETAS.map((d) => (
              <label key={d} className="opcion">
                <input type="checkbox" name="dieta" value={d} />
                <span>{d}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="grupo-filtro mt-4">
            <legend>Avisos</legend>
            {AVISOS.map((a) => (
              <label key={a} className="opcion">
                <input
                  type="checkbox"
                  checked={avisos.has(a)}
                  onChange={(e) => {
                    const s = new Set(avisos);
                    if (e.target.checked) s.add(a);
                    else s.delete(a);
                    setAvisos(s);
                  }}
                />
                <span>{a}</span>
              </label>
            ))}
          </fieldset>
          <div className="flex flex-wrap gap-3 mt-6">
            <button type="submit" className="boton">
              Ver resultados
            </button>
            <button type="button" className="boton boton-claro" onClick={() => ir(1)}>
              Volver
            </button>
          </div>
        </form>
      ) : null}

      {paso === 3 ? (
        <div>
          <h3 ref={titulo} tabIndex={-1} className="t-h3">
            {OBJETIVOS.find((o) => o.id === objetivo)?.texto}
          </h3>
          <p className="sr-only" aria-live="polite">
            {total} resultados
          </p>
          {avisos.size ? <p className="caja-salud mt-4">{t.c22segunda}</p> : null}
          {avisos.has("Embarazo o lactancia") ? (
            <div className="caja-salud mt-3 space-y-2">
              <p>{t.c15}</p>
              <p>{t.p23}</p>
            </div>
          ) : null}
          {avisos.has("Enfermedad del riñón") ? (
            <div className="caja-salud mt-3 space-y-2">
              <p>{t.p20}</p>
              <p>{t.c22}</p>
            </div>
          ) : null}

          {objetivo === "estomago" ? (
            <div className="mt-6 space-y-3">
              <p>
                Aquí no recomendamos nada: te contamos lo que dicen los estudios. Para tu caso concreto, lo mejor es que lo veas
                con un dietista-nutricionista.
              </p>
              <p>{t.p17}</p>
              <p className="pendiente">[PENDIENTE: enlace a «Qué comer antes de entrenar», con el dosier aprobado]</p>
            </div>
          ) : (
            <>
              {objetivo === "resistencia" ? (
                <p className="mt-6">Aún no tenemos una guía de resistencia. Esto es lo que ya hay para este objetivo:</p>
              ) : null}
              <h4 className="fila-titulo mt-8">Primero, el plato</h4>
              <ul className="fila-lista mt-2">{plato.map(tarjeta)}</ul>
              {g2.length ? (
                <>
                  <h4 className="fila-titulo mt-8">Si además quieres un suplemento</h4>
                  <ul className="fila-lista mt-2">{g2.map(tarjeta)}</ul>
                </>
              ) : null}
              {g3.length ? (
                <>
                  <h4 className="fila-titulo mt-8">Lo que no tiene pruebas suficientes</h4>
                  <ul className="fila-lista mt-2">{g3.map(tarjeta)}</ul>
                </>
              ) : null}
            </>
          )}
          <button
            type="button"
            className="boton boton-claro mt-8"
            onClick={() => {
              setAvisos(new Set());
              ir(1);
            }}
          >
            Volver
          </button>
        </div>
      ) : null}
    </div>
  );
}
