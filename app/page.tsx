import type { Metadata } from "next";
import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { BandaBorrador } from "@/components/piezas";
import { NotasMovil } from "@/components/NotasMovil";
import { NotaUno } from "@/components/notas";
import { PortadaObjetivos } from "@/components/PortadaObjetivos";
import { BuscadorTexto, type Sugerencia } from "@/components/BuscadorTexto";
import { CIRCUNSTANCIAS, LISTAS, temasRevisados } from "@/contenido/listas";
import { MODO_CONCEPTO, notaUno, PROGRAMAS_ACTIVOS, RUTA_CALCULADORA, sitio, VER_PERDER_GRASA } from "@/contenido/sitio";

/**
 * Portada como buscador por objetivo (decisión de Natalia del 23-11-2026; UX buscador v1 con P-1 a P-5;
 * textos en estrategia/mensaje/2026-11-23-buscador-y-listas-v1.md; H, title y Schema del arquitecto-seo).
 */
export const metadata: Metadata = {
  title: { absolute: "Verax Nutrition · Suplementos: estudios, quién paga y precio" },
  description:
    "Dime tu objetivo y te enseño qué dicen los estudios, quién los pagó y qué no necesitas. Primero, el plato. Precios por dosis con envío.",
  alternates: { canonical: "/" },
};

const TITULAR = "Dime tu objetivo y te enseño qué dicen los estudios (y qué no necesitas)";

const listas = LISTAS.filter((l) => l.slug !== "perder-grasa" || VER_PERDER_GRASA);

const objetivos = listas.map((l) => {
  const n = temasRevisados(l);
  return {
    slug: l.slug,
    texto: l.boton,
    cuenta: n ? `${n} ${n === 1 ? "tema revisado" : "temas revisados"}` : "Ningún tema revisado",
    sinDosier: l.estado === "borrador",
  };
});

/** Índice cerrado del buscador de texto: solo páginas que existen (UX buscador v1, 2.3). */
const CREATINA = ["creatina", "crea", "creapure", "monohidrato"];
const indice: Sugerencia[] = [
  { texto: "Creatina: para qué sirve y qué no", tipo: "Ficha", href: "/creatina/", claves: CREATINA },
  { texto: "Comparar creatinas · precio por 3 g", tipo: "Comparador", href: "/comparar/creatina/", claves: [...CREATINA, "comparar", "precio", "barata"] },
  { texto: "¿Cuánta creatina? Calcula tu bote", tipo: "Calculadora", href: RUTA_CALCULADORA, claves: [...CREATINA, "cuanta creatina", "dosis", "calculadora", "bote"] },
  { texto: "Ganar músculo", tipo: "Tu lista", href: "/tu-lista/ganar-musculo/", claves: ["musculo", "masa muscular", "ganar", "fuerza", "whey", "proteina", "batido", "suero"] },
  { texto: "Resistencia", tipo: "Tu lista", href: "/tu-lista/resistencia/", claves: ["resistencia", "correr", "corredor", "running", "ciclismo", "maraton"] },
  { texto: "Salud / empiezo de cero", tipo: "Tu lista", href: "/tu-lista/salud/", claves: ["salud", "empezar", "empiezo", "principiante", "de cero"] },
];

/** Búsquedas delicadas (UX 2.3 y revisión R5 del ciencia-nutricion): solo llevan a «Perder grasa», y si no está, a nada. */
const DELICADAS = [
  "quemagrasas", "quema grasa", "quemar grasa", "adelgazar", "adelgazante", "garcinia", "calorias", "perder grasa", "perder peso",
  "definir", "glucomanano", "sustitutivo", "saciante", "dieta", "deficit", "carnitina", "acido linoleico", "termogenico", "kilos",
];
const destinoDelicadas: Sugerencia | null = VER_PERDER_GRASA
  ? { texto: "Perder grasa: qué dicen los estudios (y qué no necesitas)", tipo: "Tu lista", href: "/tu-lista/perder-grasa/", claves: [] }
  : null;

const LLAMADA_UNO = (
  <a className="llamada" href="/como-se-financia/" aria-label="Nota 1: cómo se financia Verax" title="Nota 1: cómo se financia Verax">
    1
  </a>
);

const SELLOS = [
  {
    titulo: "Quién pagó el estudio",
    linea: "Junto a cada estudio, quién lo pagó y si la conclusión se sostiene sin los que tienen vínculos con el sector.",
    enlace: { texto: "Cómo investigamos", href: "/como-investigamos/" },
  },
  {
    titulo: "Precio por dosis con envío",
    linea: "Con la hora del precio y la cuenta publicada encima de cada tabla.",
    enlace: { texto: "Comparar creatinas · precio por 3 g", href: "/comparar/creatina/" },
  },
  {
    titulo: "Ordenado por precio, nunca por comisión",
    nota: true,
    linea: PROGRAMAS_ACTIVOS
      ? "Los enlaces de afiliado van marcados y no cambian el orden."
      : "Hoy no hay ningún enlace de afiliado. Cuando los haya, irán marcados y no cambiarán el orden.",
    enlace: { texto: "Cómo se financia", href: "/como-se-financia/", nota: true },
  },
];

/** «Las guías enteras» (arquitecto-seo, 23-11-2026, punto 4): anclas con su keyword hacia los hubs, solo los publicados. */
const GUIAS = [
  { texto: "Alimentos para ganar masa muscular", href: "/ganar-masa-muscular/", publicada: false, pendiente: "hub 1, dosier de alimentos en borrador" },
  { texto: "Suplementos para ganar masa muscular", href: "/ganar-masa-muscular/suplementos/", publicada: false, pendiente: "hub 2, sin construir" },
  { texto: "Qué comer antes de entrenar", href: "/que-comer-antes-de-entrenar/", publicada: false, pendiente: "guía 3, dosier en borrador" },
];

export default function Portada() {
  const guias = GUIAS.filter((g) => g.publicada || MODO_CONCEPTO);
  return (
    <>
      {MODO_CONCEPTO ? <BandaBorrador /> : null}
      <Cabecera actual="/" />
      <main id="contenido" className="reticula con-notas portada-v3">
        <div className="pv-arriba fila">
          <div className="texto">
            <h1 className="t-h1-portada pv-h1">{TITULAR}</h1>
            <p className="pv-sub solo-escritorio">Primero el plato, después el bote. Y en cada estudio, quién lo pagó.</p>
          </div>
          <div className="notas solo-escritorio">
            <NotaUno texto={notaUno.portada} />
          </div>
        </div>

        <PortadaObjetivos objetivos={objetivos} circunstancias={CIRCUNSTANCIAS}>
          <BuscadorTexto
            indice={indice}
            delicadas={DELICADAS}
            destinoDelicadas={destinoDelicadas}
            objetivos={listas.filter((l) => l.estado !== "borrador" || MODO_CONCEPTO).map((l) => ({ texto: l.boton, href: `/tu-lista/${l.slug}/` }))}
          />
        </PortadaObjetivos>

        <section className="franja-sello" aria-labelledby="h-sellos">
          <h2 id="h-sellos" className="franja-titulo">
            Ciencia sin humo: miramos quién paga cada estudio
          </h2>
          <ul className="sellos">
            {SELLOS.map((s) => (
              <li key={s.titulo} className="sello">
                <h3 className="sello-titulo">
                  {s.titulo}
                  {s.nota ? LLAMADA_UNO : null}
                </h3>
                <p className="sello-linea">{s.linea}</p>
                <p className="sello-enlace">
                  <Link href={s.enlace.href}>
                    {s.enlace.texto}
                    {s.enlace.nota ? <span className="llamada" aria-hidden="true">1</span> : null}
                    &nbsp;→
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {MODO_CONCEPTO ? (
        <section id="quien-pago" aria-labelledby="h-quien-pago" className="campo-tinta sobre-tinta seccion-puerta-tinta">
          <div className="reticula relleno-tinta">
            <h2 id="h-quien-pago" className="t-h2">
              Quién pagó el estudio
            </h2>
            <div className="caso-ejemplo">
              <div>
                <p className="marca-ejemplo">[EJEMPLO]</p>
                <p className="caso-titular">Aquí va el titular del caso: quién pagó, qué estudio y cuándo</p>
                <p className="caso-frase">Una frase con lo que dice el documento original, con su fecha.</p>
                <p className="mt-4">
                  <span className="pendiente">Leer el caso →</span>
                </p>
              </div>
              <div className="caso-notas">
                <p>Sin caso publicado, este bloque no sale en la web.</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <div className="reticula">
        {guias.length ? (
          <section id="guias" aria-labelledby="h-guias" className="seccion">
            <h2 id="h-guias" className="t-h2 h-seccion">
              Las guías enteras
            </h2>
            <ul className="guias-linea">
              {guias.map((g) => (
                <li key={g.href}>
                  {g.publicada ? (
                    <Link href={g.href}>{g.texto}</Link>
                  ) : (
                    <>
                      <span>{g.texto}</span> <span className="pendiente">[pendiente: {g.pendiente}]</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-label="Quién escribe y cómo se financia" className="firma-metodo">
          <p>Escribe Natalia Peña, que entrena y estudió Química. No es nutricionista ni profesional sanitaria.</p>
          <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/como-investigamos/">Cómo investigamos</Link>
            <Link href="/como-se-financia/">
              Cómo se financia
              <span className="llamada" aria-hidden="true">
                1
              </span>
            </Link>
          </p>
        </section>
      </div>
      <NotasMovil />
      <Pie />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebSite", name: sitio.nombre, url: sitio.url, inLanguage: "es-ES" },
              {
                "@type": "Organization",
                name: sitio.nombre,
                url: sitio.url,
                slogan: "Ciencia sin humo: miramos quién paga cada estudio",
              },
              { "@type": "Person", name: sitio.autora },
            ],
          }),
        }}
      />
    </>
  );
}
