"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ExternalLink, SlidersHorizontal } from "lucide-react";
import type { Dato, ProductoEjemplo } from "@/contenido/comparar/creatina-ejemplo";

const euros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 3 });
const euros2 = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const DOSIS = 3;

type Orden = "dosis" | "cien";
type Filtros = { creapure: boolean; sello: boolean; sinEdulcorante: boolean; vegano: boolean };
const SIN_FILTROS: Filtros = { creapure: false, sello: false, sinEdulcorante: false, vegano: false };

const porDosis = (p: ProductoEjemplo) => (p.precio + (p.envio ?? 0)) / (p.gramos / DOSIS);
const porCien = (p: ProductoEjemplo) => (p.precio / p.gramos) * 100;

function Origen({ d }: { d: Dato<unknown> }) {
  const t =
    d.origen === "etiqueta"
      ? "según su etiqueta"
      : d.origen === "web"
        ? `según la web de la marca, ${d.fecha}`
        : d.origen === "registro"
          ? `comprobado en su registro el ${d.fecha}`
          : "sin dato";
  return <span className="origen">{t}</span>;
}

/** Botón de tienda. Hoy (N2, 23-11-2026) es un enlace normal; con un programa activo pasa a «afiliado¹». */
function BotonTienda({ p, afiliado }: { p: ProductoEjemplo; afiliado: boolean }) {
  if (afiliado) {
    return (
      <div>
        <a
          className="boton"
          href={p.url}
          rel="sponsored nofollow"
          target="_blank"
          aria-label={`Ver ${p.nombre} en ${p.tienda}, enlace de afiliado, se abre en una pestaña nueva`}
        >
          Ver en {p.tienda} · afiliado<span className="llamada-boton" aria-hidden="true">1</span>
          <ExternalLink size={16} strokeWidth={1.75} aria-hidden="true" />
        </a>
        <p className="t-secundario mt-1">Se abre en la tienda</p>
      </div>
    );
  }
  return (
    <div>
      <a className="boton boton-claro" href={p.url} rel="noopener" target="_blank" aria-label={`Ver ${p.nombre} en ${p.tienda}, se abre en una pestaña nueva`}>
        Ver en la tienda
        <ExternalLink size={16} strokeWidth={1.75} aria-hidden="true" />
      </a>
      <p className="t-secundario mt-1">Se abre en la tienda</p>
    </div>
  );
}

export function Comparador({ productos, afiliado, avisoCreapure, avisoSellos }: { productos: ProductoEjemplo[]; afiliado: boolean; avisoCreapure: string; avisoSellos: string }) {
  const [orden, setOrden] = useState<Orden>("dosis");
  const [filtros, setFiltros] = useState<Filtros>(SIN_FILTROS);
  const [borrador, setBorrador] = useState<Filtros>(SIN_FILTROS);
  const hoja = useRef<HTMLDialogElement>(null);

  const lista = useRef<HTMLOListElement>(null);
  const transicion = useRef<{ skipTransition: () => void } | null>(null);

  /** «Base»: solo los cuadros que están a la vista (6 como mucho) llevan nombre de transición. */
  useEffect(() => {
    const raiz = lista.current;
    if (!raiz || typeof IntersectionObserver === "undefined") return;
    const visibles = new Set<HTMLElement>();
    const nombrar = () => {
      raiz.querySelectorAll<HTMLElement>(":scope > li").forEach((li) => {
        li.style.viewTransitionName = "";
      });
      [...visibles].slice(0, 6).forEach((li) => {
        li.style.viewTransitionName = `producto-${li.dataset.id}`;
      });
    };
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        const li = e.target as HTMLElement;
        if (e.isIntersecting) visibles.add(li);
        else visibles.delete(li);
      });
      nombrar();
    });
    raiz.querySelectorAll<HTMLElement>(":scope > li").forEach((li) => obs.observe(li));
    return () => obs.disconnect();
  });

  const aplicar = (f: () => void) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { skipTransition: () => void } };
    const movil = window.matchMedia("(max-width: 899.98px)").matches;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    transicion.current?.skipTransition();
    transicion.current = null;
    if (movil && !quieto && doc.startViewTransition) transicion.current = doc.startViewTransition(() => flushSync(f));
    else f();
  };

  const filtra = (p: ProductoEjemplo, f: Filtros) =>
    (!f.creapure || p.creapure.valor) &&
    (!f.sello || (p.sello.valor && p.sello.origen === "registro")) &&
    (!f.sinEdulcorante || (p.edulcorante.origen !== "sin-dato" && !p.edulcorante.valor)) &&
    (!f.vegano || (p.vegano.valor && p.vegano.origen !== "sin-dato"));

  const { conEnvio, sinEnvio } = useMemo(() => {
    const lista = productos.filter((p) => filtra(p, filtros));
    const clave = orden === "dosis" ? porDosis : porCien;
    const ordenada = [...lista].sort((a, b) => clave(a) - clave(b));
    return { conEnvio: ordenada.filter((p) => p.envio !== null), sinEnvio: ordenada.filter((p) => p.envio === null) };
  }, [productos, filtros, orden]);

  const total = conEnvio.length + sinEnvio.length;
  const activos = Object.values(filtros).filter(Boolean).length;
  const enBorrador = productos.filter((p) => filtra(p, borrador)).length;

  const cuadro = (p: ProductoEjemplo) => (
    <li key={p.id} className="cuadro vista-transicion-cuadro" data-id={p.id}>
      <p className="cuadro-titulo">
        {p.nombre} <span className="marca-ejemplo">[EJEMPLO]</span>
      </p>
      <p className="cuadro-base">{p.marca} · {p.formato}</p>
      <div className="cuadro-cifra">
        <span>{p.envio === null ? "Por dosis, sin envío" : "Por dosis, con envío"}</span>
        <span className="valor">{euros.format(porDosis(p))}</span>
      </div>
      <dl className="cuadro-filas">
        <div className="cuadro-fila">
          <dt>Por 100 g</dt>
          <dd>{euros2.format(porCien(p))}</dd>
        </div>
        <div className="cuadro-fila">
          <dt>
            Creapure
            <Origen d={p.creapure} />
          </dt>
          <dd>{p.creapure.valor ? "Sí" : "No"}</dd>
        </div>
        <div className="cuadro-fila">
          <dt>
            Sello de terceros
            <Origen d={p.sello} />
          </dt>
          <dd>{p.sello.valor ?? "—"}</dd>
        </div>
        <div className="cuadro-fila">
          <dt>
            Edulcorante
            <Origen d={p.edulcorante} />
          </dt>
          <dd>{p.edulcorante.valor ?? "No lleva"}</dd>
        </div>
        <div className="cuadro-fila">
          <dt>
            Alérgenos
            <Origen d={p.alergenos} />
          </dt>
          <dd>{p.alergenos.valor}</dd>
        </div>
      </dl>
      <div className="cuadro-pie">
        <p>
          {p.tienda}, {p.hora}
        </p>
        <div className="mt-3">
          <BotonTienda p={p} afiliado={afiliado} />
        </div>
      </div>
    </li>
  );

  const fila = (p: ProductoEjemplo) => (
    <tr key={p.id}>
      <th scope="row">
        {p.nombre} <span className="marca-ejemplo">[EJEMPLO]</span>
        <span className="block t-secundario font-normal">{p.marca} · {p.tienda}, {p.hora}</span>
      </th>
      <td className="precio-dosis num">{euros.format(porDosis(p))}</td>
      <td className="num">{euros2.format(porCien(p))}</td>
      <td>
        {p.creapure.valor ? "Sí" : "No"}
        <Origen d={p.creapure} />
      </td>
      <td>
        {p.sello.valor ?? "—"}
        <Origen d={p.sello} />
      </td>
      <td>
        {p.edulcorante.valor ?? "No lleva"}
        <Origen d={p.edulcorante} />
      </td>
      <td>
        <BotonTienda p={p} afiliado={afiliado} />
      </td>
    </tr>
  );

  const cabeceraTabla = (sinEnvioGrupo: boolean) => (
    <thead>
      <tr>
        <th scope="col">Producto</th>
        <th scope="col">{sinEnvioGrupo ? "Por dosis, sin envío" : "Por dosis, con envío"}</th>
        <th scope="col">Por 100 g</th>
        <th scope="col">Creapure</th>
        <th scope="col">Sello</th>
        <th scope="col">Edulcorante</th>
        <th scope="col">
          <span className="sr-only">Tienda</span>
        </th>
      </tr>
    </thead>
  );

  return (
    <div>
      <div className="barra-tabla">
        <label className="selector">
          <span>Ordenar:</span>
          <select value={orden} onChange={(e) => aplicar(() => setOrden(e.target.value as Orden))}>
            <option value="dosis">Precio por dosis con envío</option>
            <option value="cien">Precio por 100 g</option>
          </select>
        </label>
        <button
          type="button"
          className="boton boton-claro"
          onClick={() => {
            setBorrador(filtros);
            hoja.current?.showModal();
          }}
        >
          <SlidersHorizontal size={16} strokeWidth={1.75} aria-hidden="true" />
          Filtrar{activos ? ` (${activos})` : ""}
        </button>
        <p className="t-datos recuento-productos" aria-live="polite">
          {total} productos
        </p>
      </div>

      <dialog ref={hoja} className="hoja-filtros" aria-labelledby="titulo-filtros">
        <form method="dialog">
          <h2 id="titulo-filtros" className="t-h3">
            Filtrar
          </h2>
          <fieldset className="grupo-filtro">
            <legend>Creapure (ingrediente de marca; no es un sello)</legend>
            <label className="opcion">
              <input type="checkbox" checked={borrador.creapure} onChange={(e) => setBorrador({ ...borrador, creapure: e.target.checked })} />
              <span>Con Creapure</span>
            </label>
            <p className="t-secundario">{avisoCreapure}</p>
          </fieldset>
          <fieldset className="grupo-filtro">
            <legend>Sello de terceros (comprobado en su registro)</legend>
            <label className="opcion">
              <input type="checkbox" checked={borrador.sello} onChange={(e) => setBorrador({ ...borrador, sello: e.target.checked })} />
              <span>Con sello comprobado</span>
            </label>
            <p className="t-secundario">{avisoSellos}</p>
          </fieldset>
          <fieldset className="grupo-filtro">
            <legend>Edulcorante</legend>
            <label className="opcion">
              <input
                type="checkbox"
                checked={borrador.sinEdulcorante}
                onChange={(e) => setBorrador({ ...borrador, sinEdulcorante: e.target.checked })}
              />
              <span>Sin edulcorante</span>
            </label>
          </fieldset>
          <fieldset className="grupo-filtro">
            <legend>Vegano</legend>
            <label className="opcion">
              <input type="checkbox" checked={borrador.vegano} onChange={(e) => setBorrador({ ...borrador, vegano: e.target.checked })} />
              <span>Vegano</span>
            </label>
          </fieldset>
          <div className="flex flex-wrap gap-3 mt-6">
            <button type="button" className="boton boton-claro" onClick={() => setBorrador(SIN_FILTROS)}>
              Borrar
            </button>
            <button type="submit" className="boton" onClick={() => aplicar(() => setFiltros(borrador))}>
              Ver {enBorrador} productos
            </button>
          </div>
        </form>
      </dialog>

      {total === 0 ? (
        <div className="mt-10">
          <p className="t-h3">Ningún producto tiene todos estos datos.</p>
          <p className="mt-1">Ni el de tu cuñado.</p>
          <button type="button" className="boton mt-4" onClick={() => aplicar(() => setFiltros(SIN_FILTROS))}>
            Quitar el último filtro
          </button>
        </div>
      ) : (
        <>
          <ol ref={lista} className="cuadros-productos mt-8">{conEnvio.map(cuadro)}</ol>
          <table className="tabla tabla-productos mt-8">
            <caption className="sr-only">Creatinas ordenadas por precio por dosis de 3 g con envío</caption>
            {cabeceraTabla(false)}
            <tbody>{conEnvio.map(fila)}</tbody>
          </table>
          {sinEnvio.length ? (
            <section className="mt-16" aria-labelledby="sin-envio">
              <h2 id="sin-envio" className="t-h3">
                Sin dato de envío
              </h2>
              <p className="mt-1">Estos precios no llevan el envío, así que van aparte y ordenados entre sí.</p>
              <ol className="cuadros-productos mt-6">{sinEnvio.map(cuadro)}</ol>
              <table className="tabla tabla-productos mt-6">
                <caption className="sr-only">Creatinas sin dato de envío</caption>
                {cabeceraTabla(true)}
                <tbody>{sinEnvio.map(fila)}</tbody>
              </table>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
