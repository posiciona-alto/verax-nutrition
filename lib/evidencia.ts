/**
 * Lectura de los datos de evidencia (contenido/datos/<tema>.json, copia de evidencia/datos/ hecha con
 * scripts/traer-evidencia.mjs). Solo se usa en el servidor: el navegador recibe el HTML ya compuesto.
 */
import creatina from "@/contenido/datos/creatina.json";
import type { Certeza } from "@/contenido/sitio";

export type EstadoSinEllas = "se sostiene igual" | "se sostiene con menos certeza" | "no se sostiene" | "sin evaluar";
export type Vinculos = "sin" | "con" | "no-consta";

export type FuenteDatos = {
  id: string;
  cita: string;
  tipo: string;
  revista?: string | null;
  pmid?: string | null;
  doi?: string | null;
  vinculos: string;
  vinculos_tipo?: string | null;
  vinculos_texto: string;
  apartar_en_sin_ellas: boolean;
};

export type FraseDatos = {
  numero: number;
  texto: string;
  certeza: Certeza;
  fuentes: string[];
  fuentes_apartadas: string[];
  sin_ellas: EstadoSinEllas;
  certeza_sin_ellas?: Certeza;
  pendiente_verificar: boolean;
  pendiente_motivo?: string;
};

type Datos = {
  _leeme: { estado: string };
  fuentes: FuenteDatos[];
  frases: FraseDatos[];
  paginas: { ruta: string; listo_para_boton: boolean; motivo?: string }[];
  linea_6bis: string;
  texto_junto_al_boton: { texto: string };
  declaracion_autorizada: { texto_exacto: string; condicion: string; dirigida_a: string; pendiente_verificar: boolean };
  nivel_web: { nivel: string; para: string };
  dosier: { proxima_revision: string; version: string };
};

const datos = creatina as unknown as Datos;

export const evidenciaCreatina = datos;

export function frase(numero: number): FraseDatos {
  const f = datos.frases.find((x) => x.numero === numero);
  if (!f) throw new Error(`Falta la frase ${numero} en creatina.json`);
  return f;
}

export function fuente(id: string): FuenteDatos {
  const f = datos.fuentes.find((x) => x.id === id);
  if (!f) throw new Error(`Falta la fuente ${id} en creatina.json`);
  return f;
}

export function vinculosDe(f: FuenteDatos): Vinculos {
  if (f.vinculos.startsWith("con")) return "con";
  if (f.vinculos.startsWith("sin")) return "sin";
  return "no-consta";
}

export function enlaceDe(f: FuenteDatos): { texto: string; href: string } | undefined {
  if (f.pmid) return { texto: `PMID ${f.pmid}`, href: `https://pubmed.ncbi.nlm.nih.gov/${f.pmid}/` };
  if (f.doi) return { texto: "DOI", href: `https://doi.org/${f.doi}` };
  return undefined;
}

export function plegadaDe(f: FuenteDatos): string {
  if (f.vinculos_tipo === "financiación") return "con financiación del sector";
  if (f.vinculos_tipo === "marca") return "es la propia marca";
  return "autores con vínculos del sector";
}

/** El borrador de datos se marca en la página mientras el archivo no esté aprobado. */
export const datosEnBorrador = datos._leeme.estado.toLowerCase().startsWith("borrador");

export function paginaLista(ruta: string): boolean {
  return datos.paginas.find((p) => p.ruta === ruta)?.listo_para_boton ?? false;
}
