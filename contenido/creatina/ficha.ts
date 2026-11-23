/**
 * Ficha de la creatina (/creatina/).
 * Textos fijos: mensaje y textos v2 (23-11-2026), bloques 1–5 y 13–18. El cuerpo (bloques 6–12 y 14) aún no lo ha
 * escrito el copywriter: lleva las frases del dosier de creatina v2 (contenido/datos/creatina.json), tal cual,
 * repartidas por H2 según la arquitectura.
 */
import type { Certeza } from "@/contenido/sitio";

/** Una frase del dosier por su número; «texto» solo cuando va partida (regla del ciencia-nutricion, M7). */
export type UsoFrase = { n: number; texto?: string; certeza?: Certeza; sensibilidad?: boolean };

export type Parrafo = { frases: UsoFrase[]; enlace?: { texto: string; href: string } };

export type Seccion = { id: string; titulo: string; parrafos: Parrafo[]; pendiente?: string };

/** v2, «Marca de sensibilidad»: junto a [C-5], [C-19] y [C-21]. */
const SENSIBLES = new Set([5, 19, 21]);
const u = (n: number, extra: Partial<UsoFrase> = {}): UsoFrase => ({ n, sensibilidad: SENSIBLES.has(n), ...extra });

export const resumen: { titulo: string; frases: UsoFrase[]; enlace?: { texto: string; href: string } }[] = [
  { titulo: "Para qué sirve", frases: [u(2, { certeza: "Está claro" })] },
  { titulo: "Para qué no", frases: [u(6, { certeza: "Es bastante probable" })] },
  { titulo: "Cuánto tarda en llenarse el músculo", frases: [u(7, { certeza: "Es bastante probable" })] },
  {
    titulo: "¿Hace falta la fase de carga?",
    frases: [u(8, { certeza: "Es bastante probable" }), u(12, { certeza: "Faltan estudios" })],
    enlace: { texto: "cuánta creatina tomar", href: "/calculadoras/dosis-creatina/" },
  },
  {
    titulo: "El mito: ¿hace caer el pelo?",
    frases: [
      u(19, {
        certeza: "No se sabe",
        texto: "No hay pruebas de que la creatina haga caer el pelo, aunque se ha estudiado poco.",
      }),
    ],
    enlace: { texto: "La frase entera, en «Efectos secundarios y seguridad» ↓", href: "#el-pelo" },
  },
];

export const secciones: Seccion[] = [
  {
    id: "que-es",
    titulo: "Qué es la creatina",
    parrafos: [{ frases: [u(1)] }],
    pendiente: "[PENDIENTE: texto del copywriter para «Qué es la creatina»; mientras, la frase 1 del dosier]",
  },
  { id: "fuerza", titulo: "Para qué sirve: fuerza en esfuerzos cortos e intensos", parrafos: [{ frases: [u(2), u(3)] }] },
  { id: "sprints", titulo: "Sprints repetidos", parrafos: [{ frases: [u(4)] }] },
  { id: "resistencia", titulo: "Para qué no sirve: la resistencia", parrafos: [{ frases: [u(6)] }] },
  { id: "musculo", titulo: "¿Hace ganar músculo?", parrafos: [{ frases: [u(5)] }] },
  {
    id: "cuanta",
    titulo: "Cuánta se toma",
    parrafos: [{ frases: [u(7), u(8), u(12)], enlace: { texto: "cuánta creatina tomar", href: "/calculadoras/dosis-creatina/" } }],
  },
  {
    id: "mujeres",
    titulo: "Creatina en mujeres",
    parrafos: [{ frases: [u(13)], enlace: { texto: "Creatina en mujeres: lo que se sabe y lo que no", href: "/creatina/mujeres/" } }],
  },
];

/** Efectos secundarios y seguridad: los H3 de la arquitectura, que son las preguntas del FAQPage. */
export const seguridad: { id: string; pregunta: string; frases: UsoFrase[]; abierta?: boolean }[] = [
  { id: "el-rinon", pregunta: "El riñón y tus análisis", frases: [u(17), u(18)] },
  { id: "el-pelo", pregunta: "El pelo", frases: [u(19)] },
  { id: "el-agua", pregunta: "El agua", frases: [u(20)] },
  { id: "estomago", pregunta: "Estómago y calambres", frases: [u(21)] },
  { id: "consultar", pregunta: "Quién debe consultarlo antes", frases: [u(22)], abierta: true },
];

export const formas: Seccion = {
  id: "formas",
  titulo: "Monohidrato, Creapure y otras formas",
  parrafos: [
    { frases: [u(23)] },
    { frases: [u(26)], enlace: { texto: "¿Creatina monohidrato o Creapure?", href: "/creatina/monohidrato-o-creapure/" } },
  ],
};

export const textos = {
  migas: [
    { texto: "Inicio", href: "/" },
    { texto: "Creatina" },
  ],
  h1: "Creatina: para qué sirve y qué no, según los estudios",
  ctaP: "Comparar creatinas con datos de la etiqueta",
  ctaS: "Calcula cuánto te dura tu bote",
  ctaFinalP: "¿Ya sabes que la quieres? Compara creatinas con datos de la etiqueta",
  marca: "Se apoya sobre todo en estudios con vínculos del sector",
  marcaExplica: "Sin esos estudios, lo que queda no basta para decirlo con la misma seguridad. Por eso la frase lo dice con menos.",
  seSostiene: "Sí, salvo donde lo decimos (en la creatina: lo del músculo, el pelo y los efectos secundarios)",
  nivel: {
    valor:
      "Nivel 1 · Evidencia sólida, para esfuerzos breves e intensos repetidos y para la fuerza con entrenamiento. Para resistencia, no hay pruebas de que sirva.",
    cantidad: "En los estudios, de 3 a 5 g al día después de la carga, o 3 g sin carga.",
  },
  explicaNivel:
    "El nivel lo damos en Verax con lo que dicen los estudios y la clasificación del Instituto Australiano del Deporte. La declaración es el texto que la UE permite decir de un producto, con sus condiciones. Por eso van separados.",
  proximaRevision: "Próxima revisión: mayo de 2027",
  sanitaria: "Esta página informa y no sustituye a un profesional sanitario.",
};

/** Los números de las frases del dosier que salen en la ficha, sin repetir. */
export function frasesDeLaFicha(): number[] {
  const usos = [
    ...resumen.flatMap((r) => r.frases),
    ...secciones.flatMap((s) => s.parrafos.flatMap((p) => p.frases)),
    ...seguridad.flatMap((s) => s.frases),
    ...formas.parrafos.flatMap((p) => p.frases),
  ];
  return [...new Set(usos.map((x) => x.n))];
}
