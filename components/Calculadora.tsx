"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ATAJOS = [250, 300, 500, 1000];
const euros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fechaLarga = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });
const hoyFormato = "23/11/2026";
const entero = new Intl.NumberFormat("es-ES", { useGrouping: "always" });

function hoyTexto() {
  const d = new Date();
  const z = (n: number) => String(n).padStart(2, "0");
  return `${z(d.getDate())}/${z(d.getMonth() + 1)}/${d.getFullYear()}`;
}

/** Fecha escrita como día/mes/año (23/11/2026); también vale con guiones o puntos. */
function leerFecha(texto: string): Date | null {
  const m = texto.trim().match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (!m) return null;
  const [d, mes, a] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const f = new Date(a, mes - 1, d);
  return f.getDate() === d && f.getMonth() === mes - 1 ? f : null;
}

function leerNumero(texto: string): number | null {
  const limpio = texto.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
  if (!limpio) return null;
  const n = Number(limpio);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * Calculadora del bote (dosier de creatina, 7 ter): solo aritmética con los datos del bote.
 * Sin peso, edad ni sexo, sin fase de carga. Nada sale del navegador.
 */
export function Calculadora() {
  const id = useId();
  const [gramos, setGramos] = useState("");
  const [precio, setPrecio] = useState("");
  const [inicio, setInicio] = useState("");
  const [dosis, setDosis] = useState<3 | 5>(3);
  const [anuncio, setAnuncio] = useState("");

  useEffect(() => setInicio(hoyTexto()), []);

  const r = useMemo(() => {
    const g = leerNumero(gramos);
    if (!g) return { estado: "vacio" as const };
    if (g < dosis) return { estado: "corto" as const };
    const dias = Math.floor(g / dosis);
    const p = leerNumero(precio);
    const porDosis = p ? p / (g / dosis) : null;
    let fin: Date | null = null;
    let empieza: Date | null = null;
    const f = leerFecha(inicio);
    if (f) {
      empieza = f;
      fin = new Date(f.getFullYear(), f.getMonth(), f.getDate() + dias);
    }
    return { estado: "ok" as const, g, dias, porDosis, empieza, fin };
  }, [gramos, precio, inicio, dosis]);

  const frase =
    r.estado === "ok"
      ? `Con tu bote de ${entero.format(r.g)} g y ${dosis} g al día, tienes para ${entero.format(r.dias)} días.` +
        (r.porDosis !== null ? ` Cada dosis te sale a ${euros.format(r.porDosis)}.` : "") +
        (r.empieza && r.fin ? ` Si empiezas el ${fechaLarga.format(r.empieza)}, se acabará hacia el ${fechaLarga.format(r.fin)}.` : "")
      : r.estado === "corto"
        ? "Con este bote no llega a una dosis."
        : "Escribe los gramos de tu bote para hacer la cuenta.";

  useEffect(() => {
    const t = setTimeout(() => setAnuncio(frase), 500);
    return () => clearTimeout(t);
  }, [frase]);

  return (
    <div className="calculadora">
      <form className="calc-campos" onSubmit={(e) => e.preventDefault()} aria-describedby={`${id}-sin-datos`}>
        <p id={`${id}-sin-datos`} className="t-secundario">
          No te pedimos el peso: no damos dosis personales.
        </p>
        <div className="campo mt-6">
          <label htmlFor={`${id}-g`}>Gramos de creatina del bote</label>
          <input
            id={`${id}-g`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={gramos}
            onChange={(e) => setGramos(e.target.value)}
          />
          <div className="atajos" role="group" aria-label="Tamaños habituales">
            {ATAJOS.map((a) => (
              <button
                key={a}
                type="button"
                className="atajo"
                aria-pressed={leerNumero(gramos) === a}
                onClick={() => setGramos(String(a))}
              >
                {entero.format(a)} g
              </button>
            ))}
          </div>
        </div>
        <div className="campo mt-6">
          <label htmlFor={`${id}-p`}>Lo que pagaste (opcional)</label>
          <input id={`${id}-p`} type="text" inputMode="decimal" autoComplete="off" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          <p className="ayuda">En euros, con el envío si lo pagaste.</p>
        </div>
        <div className="campo mt-6">
          <label htmlFor={`${id}-f`}>Empiezas el (opcional)</label>
          <input
            id={`${id}-f`}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            aria-describedby={`${id}-f-ayuda`}
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
          />
          <p id={`${id}-f-ayuda`} className="ayuda">
            Día/mes/año, por ejemplo {hoyFormato}.
          </p>
        </div>
        <fieldset className="campo mt-6">
          <legend>Dosis para la cuenta</legend>
          <label className="opcion">
            <input type="radio" name={`${id}-d`} checked={dosis === 3} onChange={() => setDosis(3)} />
            <span>3 g al día, la de la declaración autorizada</span>
          </label>
          <label className="opcion">
            <input type="radio" name={`${id}-d`} checked={dosis === 5} onChange={() => setDosis(5)} />
            <span>5 g al día, el máximo de lo que usan los consensos</span>
          </label>
        </fieldset>
      </form>

      <div className="calc-resultado">
        <p className="sr-only" aria-live="polite">
          {anuncio}
        </p>
        <p className="calc-frase" aria-hidden="true">
          {frase}
        </p>
        {r.estado === "ok" && dosis === 5 ? (
          <p className="mt-3">La declaración autorizada se basa en 3 g al día; 5 g es el máximo de lo que usan los consensos como dosis diaria.</p>
        ) : null}
        {r.estado === "ok" ? (
          <>
            <div className="cuadro mt-6" aria-hidden="true">
              <p className="cuadro-titulo">Tu bote</p>
              <p className="cuadro-base">Por dosis de {dosis} g</p>
              <div className="cuadro-cifra">
                <span>Te dura</span>
                <span className="valor">{entero.format(r.dias)} días</span>
              </div>
              <dl className="cuadro-filas">
                <div className="cuadro-fila">
                  <dt>Gramos del bote</dt>
                  <dd>{entero.format(r.g)} g</dd>
                </div>
                <div className="cuadro-fila">
                  <dt>Dosis al día</dt>
                  <dd>{dosis} g</dd>
                </div>
                <div className="cuadro-fila">
                  <dt>Cada dosis</dt>
                  <dd>{r.porDosis !== null ? euros.format(r.porDosis) : "sin precio"}</dd>
                </div>
                <div className="cuadro-fila">
                  <dt>Se acaba hacia el</dt>
                  <dd>{r.fin ? fechaLarga.format(r.fin) : "sin fecha"}</dd>
                </div>
              </dl>
              <div className="cuadro-pie">
                <p>Este cálculo solo usa los datos de tu bote; no es una recomendación para tu caso.</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/avisame-cuando-se-acabe/" className="enlace-grande">
                  <span>Avísame cuando se acabe mi bote</span>
                  <ArrowRight size={24} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/comparar/creatina/" className="enlace-texto">
                  Comparar creatinas por precio por dosis <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <p className="t-secundario mt-3">Este cálculo solo usa los datos de tu bote; no es una recomendación para tu caso.</p>
        )}
      </div>
    </div>
  );
}
