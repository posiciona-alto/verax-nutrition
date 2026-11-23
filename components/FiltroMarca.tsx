"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export type EnlaceComparar = { texto: string; href?: string; pendiente?: string };

/**
 * «Compara» con el filtro de marca (UX buscador v1, 3.5, con las 7 condiciones de la revisión R1 del ciencia-nutricion):
 * selector cerrado, sin marca elegida de antemano, todas las marcas del comparador en orden alfabético y, con una marca,
 * solo el recuento. El enlace lleva la marca y «Vegano» en el fragmento, nunca en la ruta ni en parámetros.
 */
export function FiltroMarca({ marcas, enlaces }: { marcas: { nombre: string; slug: string; n: number }[]; enlaces: EnlaceComparar[] }) {
  const [marca, setMarca] = useState("");
  const elegida = marcas.find((m) => m.slug === marca);

  const destino = (href: string) => {
    const fichas = [
      ...(marca ? [`marca-${marca}`] : []),
      ...((document.documentElement.dataset.c ?? "").split(" ").includes("vegano") ? ["vegano"] : []),
    ];
    return `${href}${fichas.length ? `#${fichas.join(",")}` : ""}`;
  };

  return (
    <div className="filtro-marca">
      <p className="t-nota fm-aviso">
        El nivel de evidencia es de la sustancia, no de ninguna marca. El comparador solo usa los datos que declara cada marca
        en su etiqueta.
      </p>
      <label className="selector fm-selector solo-js">
        <span>Marca (opcional)</span>
        <select value={marca} onChange={(e) => setMarca(e.target.value)}>
          <option value="">Todas las marcas</option>
          {marcas.map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.nombre}
            </option>
          ))}
        </select>
      </label>
      <p className="fm-recuento t-datos" aria-live="polite">
        {elegida ? `${elegida.n} ${elegida.n === 1 ? "producto" : "productos"} de ${elegida.nombre} en el comparador` : ""}
      </p>
      <ul className="fm-enlaces">
        {enlaces.map((e) => (
          <li key={e.texto}>
            {e.href ? (
              <a
                className="enlace-grande"
                href={e.href}
                onClick={(ev) => {
                  ev.currentTarget.href = destino(e.href as string);
                }}
              >
                <span>{e.texto}</span>
                <ArrowRight size={22} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ) : (
              <p className="enlace-grande enlace-pendiente">
                <span>{e.texto}</span>
                <span className="pendiente">[pendiente: {e.pendiente}]</span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
