/**
 * Las listas por objetivo (`/tu-lista/<objetivo>/`).
 * Estructura: estrategia/2026-11-23-ux-buscador-v1.md, con las decisiones P-1 a P-5 de Natalia y la revisión del
 * ciencia-nutricion (R1 a R5). Textos: estrategia/mensaje/2026-11-23-buscador-y-listas-v1.md.
 * Las frases de nutrición van tal cual, con su código: C-n sale de contenido/datos/creatina.json; P-n, G-n y F-n, del
 * texto que el ciencia-nutricion copió de sus dosieres aprobados. Lo que aún no tiene frase es un hueco «pendiente de ciencia».
 */
import { RUTA_CALCULADORA } from "@/contenido/sitio";

export type Circunstancia = "vegano" | "vegetariano" | "sin-lactosa" | "sin-gluten" | "estomago";

export const CIRCUNSTANCIAS: { id: Circunstancia; texto: string }[] = [
  { id: "vegano", texto: "Vegano" },
  { id: "vegetariano", texto: "Vegetariano" },
  { id: "sin-lactosa", texto: "Sin lactosa" },
  { id: "sin-gluten", texto: "Sin gluten" },
  { id: "estomago", texto: "Estómago sensible" },
];

export type Vinculo = "sin" | "con" | "organismo" | "en-dosier";
export type FuenteLibre = { cita: string; pmid?: string; vinculo: Vinculo; detalle?: string };

/** Una frase de la lista: de creatina.json, copiada de un dosier aprobado o un hueco que llena el ciencia-nutricion. */
export type FraseLista =
  | { tipo: "creatina"; n: number }
  | { tipo: "libre"; codigo: string; dosier: string; texto: string; certeza?: string; fuentes: FuenteLibre[] }
  | { tipo: "pendiente"; codigo?: string; que: string };

/** Lo que no es de un dosier aprobado: en producción no sale; en el concepto sale con su marca. */
export type Estado = "aprobado" | "borrador";

export type Tarjeta = {
  id: "creatina" | "whey";
  nombre: string;
  nivel: string;
  frase: FraseLista;
  avisoVisible: string;
  porque: FraseLista[];
  ficha?: string;
  fichaPendiente?: string;
};

export type LineaNoNecesitas = {
  nombre: string;
  etiqueta?: string;
  frase: FraseLista;
  ficha?: string;
  estado?: Estado;
};

export type Calculadora = { titulo: string; texto: string; href?: string; pendiente?: string };

export type EfectoCircunstancia =
  | { tipo: "sin-cambios"; texto: string }
  | { tipo: "whey"; texto?: string };

export type Objetivo = "ganar-musculo" | "perder-grasa" | "resistencia" | "salud";

export type Lista = {
  slug: Objetivo;
  boton: string;
  nombre: string;
  title: string;
  h1: string;
  estado: Estado;
  lineaPropia?: string;
  acab?: boolean;
  plato?: { entradilla: string; frases: (FraseLista & { estado?: Estado })[]; guia?: { texto: string; href: string; pendiente: string } };
  suplementos?: { titulo: string; entradilla: string; tarjetas: Tarjeta[] };
  noNecesitas?: { entradilla: string; lineas: LineaNoNecesitas[] };
  estudiado?: { pendiente: string };
  alternativa?: string;
  calculadoras?: Calculadora[];
  compara: boolean;
  llevate: "dos" | "guardar";
  paraTuCaso?: boolean;
  circunstancias: Record<Circunstancia, EfectoCircunstancia>;
};

const PRUEBAS_EN_DOSIER = (dosier: string): FuenteLibre[] => [
  { cita: `Sus fuentes, en el dosier de ${dosier}`, vinculo: "en-dosier" },
];

/** Frases de proteína (dosier v2 aprobado), tal cual. */
export const PROTEINA = {
  p2: {
    tipo: "libre",
    codigo: "P-2",
    dosier: "proteína",
    texto:
      "Parece que, junto con el entrenamiento de fuerza, comer más proteína que la cantidad de referencia ayuda a ganar algo más de músculo y de fuerza, y es bastante probable. El efecto es pequeño: la proteína acompaña al entrenamiento, no lo sustituye.",
    fuentes: PRUEBAS_EN_DOSIER("proteína"),
  },
  p7: {
    tipo: "libre",
    codigo: "P-7",
    dosier: "proteína",
    certeza: "Es bastante probable",
    texto:
      "Parece que el momento importa poco si se llega a la cantidad del día, y es bastante probable: tomarla justo antes o después de entrenar no cambia el resultado. La famosa “ventana anabólica” de 30 minutos no se ha confirmado en los estudios largos.",
    fuentes: [
      { cita: "Wirth 2020", pmid: "32232404", vinculo: "en-dosier" },
      { cita: "Schoenfeld 2013", pmid: "24299050", vinculo: "en-dosier" },
      { cita: "Casuso 2025", pmid: "40647175", vinculo: "en-dosier" },
    ],
  },
  p10: {
    tipo: "libre",
    codigo: "P-10",
    dosier: "proteína",
    texto:
      "La proteína antes de dormir aumenta la formación de proteína del músculo durante la noche, pero parece que no da más músculo que la misma cantidad tomada en otro momento del día, aunque faltan estudios.",
    fuentes: [
      { cita: "Reis 2021", pmid: "32811763", vinculo: "en-dosier" },
      { cita: "Joy 2018", pmid: "29764464", vinculo: "con", detalle: "pagado por marcas de proteína" },
      { cita: "Klemp 2025", pmid: "40539259", vinculo: "en-dosier", detalle: "en hombres mayores" },
      { cita: "Snijders 2015", pmid: "25926415", vinculo: "en-dosier" },
    ],
  },
  p11: {
    tipo: "libre",
    codigo: "P-11",
    dosier: "proteína",
    texto:
      "Las sociedades de nutrición deportiva dicen que la comida puede cubrir la proteína que hace falta y que los batidos son una forma práctica de llegar.",
    fuentes: [
      { cita: "Jäger 2017 (ISSN)", pmid: "28642676", vinculo: "con", detalle: "la ISSN tiene vínculos con fabricantes" },
      { cita: "Instituto Australiano del Deporte, grupo A, consulta 22-11-2026", vinculo: "organismo" },
    ],
  },
  p12: {
    tipo: "libre",
    codigo: "P-12",
    dosier: "proteína",
    texto:
      "No hay pruebas de que la proteína en polvo dé más músculo que la misma cantidad de proteína de la comida. La whey es proteína de la leche: es una forma práctica de llegar, no algo que funcione por sí solo.",
    fuentes: PRUEBAS_EN_DOSIER("proteína"),
  },
  p13: {
    tipo: "libre",
    codigo: "P-13",
    dosier: "proteína",
    texto:
      "Parece que la proteína de soja da resultados parecidos a la de la leche en músculo y fuerza, y es bastante probable. Los estudios son de pocas semanas y casi todos en hombres.",
    fuentes: PRUEBAS_EN_DOSIER("proteína"),
  },
  p14: {
    tipo: "libre",
    codigo: "P-14",
    dosier: "proteína",
    texto:
      "Con otras proteínas vegetales (guisante, arroz…) parece que se gana algo menos de músculo que con la animal en adultos jóvenes, pero faltan estudios. En fuerza no se han visto diferencias. Los pocos ensayos que ven el guisante igual que la whey los han pagado o firmado empresas que venden proteína vegetal.",
    fuentes: PRUEBAS_EN_DOSIER("proteína"),
  },
  p15: {
    tipo: "libre",
    codigo: "P-15",
    dosier: "proteína",
    texto:
      "La calidad de una proteína se mide con una puntuación llamada DIAAS, que tiene en cuenta los aminoácidos que lleva y cuánto se digieren. La caseína, el huevo, la leche y la soja puntúan alto; el guisante, el arroz y el trigo por separado, más bajo, y mezclarlos (por ejemplo, guisante con arroz) mejora la puntuación. Las cifras exactas cambian según el método.",
    fuentes: PRUEBAS_EN_DOSIER("proteína"),
  },
  p16: {
    tipo: "libre",
    codigo: "P-16",
    dosier: "proteína",
    texto:
      "El concentrado de whey lleva entre un 29 y un 80 % de proteína, y el aislado, más del 90 %; el resto es sobre todo lactosa y grasa. No hay ningún ensayo que compare su efecto en el músculo, así que no hay pruebas de que el aislado funcione mejor.",
    fuentes: [
      { cita: "Jäger 2017 (ISSN)", pmid: "28642676", vinculo: "con", detalle: "la ISSN tiene vínculos con fabricantes" },
      { cita: "Búsqueda propia, 22-11-2026", vinculo: "en-dosier" },
    ],
  },
  p17: {
    tipo: "libre",
    codigo: "P-17",
    dosier: "proteína",
    texto:
      "La mayoría de las personas con intolerancia a la lactosa toleran unos 12 a 15 g de lactosa de una vez, y es bastante probable. Quien no la tolera bien puede mirar la lactosa que declara la etiqueta de cada producto.",
    fuentes: PRUEBAS_EN_DOSIER("proteína"),
  },
  p20: {
    tipo: "libre",
    codigo: "P-20",
    dosier: "proteína",
    texto:
      "Con enfermedad renal crónica, la guía internacional KDIGO sugiere no pasar de 0,8 g de proteína por kilo al día en las fases avanzadas y evitar más de 1,3 g si hay riesgo de que la enfermedad avance. Si tienes una enfermedad del riñón, habla con tu médico antes de tomar suplementos de proteína.",
    fuentes: PRUEBAS_EN_DOSIER("proteína"),
  },
  p23: {
    tipo: "libre",
    codigo: "P-23",
    dosier: "proteína",
    texto:
      "Los suplementos de proteína no se han estudiado lo suficiente en el embarazo, la lactancia ni en menores. Si tienes alguna enfermedad, estás embarazada o das el pecho, o tomas medicación, consúltalo antes con tu médico.",
    fuentes: PRUEBAS_EN_DOSIER("proteína"),
  },
} satisfies Record<string, FraseLista>;

/** Pilotos aprobados (glucosa y frutos secos): las dos frases que el ciencia-nutricion copió enteras. */
const G16: FraseLista = {
  tipo: "libre",
  codigo: "G-16",
  dosier: "picos de glucosa",
  texto:
    "No hay pruebas de que un sensor de glucosa mejore la salud de una persona sana sin diabetes, y la Asociación Americana de Diabetes no lo considera útil para el cribado ni el diagnóstico (aunque entre sus patrocinadores están fabricantes de sensores).",
  fuentes: [
    { cita: "Liao 2026", pmid: "41588451", vinculo: "en-dosier" },
    { cita: "Asociación Americana de Diabetes 2026", pmid: "41358893", vinculo: "con", detalle: "entre sus patrocinadores hay fabricantes de sensores" },
  ],
};
const F5: FraseLista = {
  tipo: "libre",
  codigo: "F-5",
  dosier: "antinutrientes de los frutos secos",
  texto:
    "Remojar (“activar”) frutos secos apenas cambia su fitato: en un análisis de laboratorio con cuatro frutos secos, entre un 12 % menos y un 10 % más, y en el ensayo con almendras remojadas había incluso algo más. No hay pruebas de que mejore la absorción de minerales en personas.",
  fuentes: [
    { cita: "Análisis de laboratorio", pmid: "32199146", vinculo: "en-dosier" },
    { cita: "Ensayo con almendras remojadas", pmid: "28956139", vinculo: "en-dosier" },
  ],
};

/** BCAA: el dosier está en borrador. En el concepto se ve con su marca; en producción, no. */
const B8: FraseLista = {
  tipo: "libre",
  codigo: "B-8",
  dosier: "BCAA (borrador)",
  texto:
    "Los estudios sobre agujetas compararon los BCAA con un placebo, no con la misma cantidad de proteína, y la mayoría no apuntó cuánta proteína comían los participantes. Por eso no se sabe si los BCAA aportan algo a quien ya come suficiente proteína.",
  fuentes: [
    { cita: "Martinho 2022", pmid: "36235655", vinculo: "en-dosier" },
    { cita: "Howatson 2012", pmid: "22569039", vinculo: "en-dosier" },
  ],
};

const AVISO_VISIBLE =
  "Si tienes alguna enfermedad, estás embarazada o das el pecho, o tomas medicación, consúltalo antes con tu médico.";

const CREATINA: Tarjeta = {
  id: "creatina",
  nombre: "Creatina",
  nivel: "Nivel 1 · Evidencia sólida, para la fuerza en esfuerzos cortos, con entrenamiento",
  frase: { tipo: "creatina", n: 2 },
  avisoVisible: AVISO_VISIBLE,
  porque: [
    { tipo: "creatina", n: 22 },
    { tipo: "creatina", n: 15 },
  ],
  ficha: "/creatina/",
};

const WHEY: Tarjeta = {
  id: "whey",
  nombre: "Proteína whey",
  nivel: "Nivel 1 · Evidencia sólida, como forma práctica de llegar a la proteína del día; no da músculo por sí sola",
  frase: PROTEINA.p12,
  avisoVisible: AVISO_VISIBLE,
  porque: [PROTEINA.p23, PROTEINA.p20],
  fichaPendiente: "ficha de la proteína whey, sin construir",
};

const pendiente = (codigo: string, que: string): FraseLista => ({ tipo: "pendiente", codigo, que });

const NO_CAMBIA = (texto: string): EfectoCircunstancia => ({ tipo: "sin-cambios", texto: `${texto}: hoy no cambia nada en esta lista.` });

const CIRC_CON_WHEY: Record<Circunstancia, EfectoCircunstancia> = {
  vegano: { tipo: "whey" },
  vegetariano: { tipo: "sin-cambios", texto: "Vegetariano: hoy no cambia nada en esta lista; la whey sigue, porque es de la leche." },
  "sin-lactosa": { tipo: "whey" },
  "sin-gluten": NO_CAMBIA("Sin gluten"),
  estomago: {
    tipo: "whey",
    texto:
      "Aquí no recomendamos nada: te contamos lo que dicen los estudios. Para tu caso concreto, lo mejor es que lo veas con un dietista-nutricionista.",
  },
};

const CIRC_SIN_CAMBIOS: Record<Circunstancia, EfectoCircunstancia> = {
  vegano: NO_CAMBIA("Vegano"),
  vegetariano: NO_CAMBIA("Vegetariano"),
  "sin-lactosa": NO_CAMBIA("Sin lactosa"),
  "sin-gluten": NO_CAMBIA("Sin gluten"),
  estomago: NO_CAMBIA("Estómago sensible"),
};

const CALC_CREATINA: Calculadora = {
  titulo: "¿Cuánta creatina? Calcula tu bote",
  texto: "La cifra de la declaración autorizada, la de los consensos y cuánto te dura tu bote.",
  href: RUTA_CALCULADORA,
};
const CALC_PROTEINA: Calculadora = {
  titulo: "Calculadora de proteína",
  texto: "Suma la proteína de lo que comes y calcula lo que te cuesta tu bote.",
  pendiente: "la parte «suma lo que comes» espera el dosier de alimentos; calculadora sin construir",
};

export const LISTAS: Lista[] = [
  {
    slug: "ganar-musculo",
    boton: "Ganar músculo",
    nombre: "ganar músculo",
    title: "Tu lista: ganar músculo · Verax Nutrition",
    h1: "Ganar músculo: qué dicen los estudios",
    estado: "aprobado",
    plato: {
      entradilla: "Antes del bote, el entreno y la comida.",
      frases: [
        PROTEINA.p11,
        PROTEINA.p2,
        { ...pendiente("A-n", "grupos de alimentos con la proteína por ración de casa, del dosier «Alimentos para ganar músculo» (en borrador)"), estado: "borrador" },
      ],
      guia: { texto: "Alimentos para ganar músculo: la guía entera", href: "/ganar-masa-muscular/", pendiente: "hub sin publicar (dosier de alimentos en borrador)" },
    },
    suplementos: {
      titulo: "Suplementos, por nivel de evidencia",
      entradilla: "Ordenados por lo que dicen los estudios. Aquí no hay precios ni marcas: eso está en el comparador, más abajo.",
      tarjetas: [CREATINA, WHEY],
    },
    noNecesitas: {
      entradilla: "Lo que se vende para este objetivo y, según los estudios, no aporta o no tiene pruebas suficientes.",
      lineas: [
        { nombre: "Fase de carga de la creatina", frase: { tipo: "creatina", n: 8 }, ficha: "/creatina/" },
        { nombre: "Más creatina de la cuenta", frase: { tipo: "creatina", n: 12 }, ficha: "/creatina/" },
        { nombre: "Otras formas de creatina (clorhidrato, etiléster, «tamponada»…)", frase: { tipo: "creatina", n: 23 }, ficha: "/creatina/" },
        { nombre: "El batido justo al acabar («ventana anabólica»)", frase: PROTEINA.p7 },
        { nombre: "Proteína antes de dormir", etiqueta: "Nivel 3 · Sin pruebas suficientes", frase: PROTEINA.p10 },
        { nombre: "Aislado en lugar de concentrado", frase: PROTEINA.p16 },
        { nombre: "BCAA", etiqueta: "Nivel 3 · Sin pruebas suficientes", frase: B8, estado: "borrador" },
      ],
    },
    calculadoras: [CALC_CREATINA, CALC_PROTEINA],
    compara: true,
    llevate: "dos",
    circunstancias: CIRC_CON_WHEY,
  },
  {
    slug: "perder-grasa",
    boton: "Perder grasa / definir",
    nombre: "perder grasa",
    title: "Tu lista: perder grasa · Verax Nutrition",
    h1: "Perder grasa: qué dicen los estudios (y qué no necesitas)",
    estado: "borrador",
    acab: true,
    noNecesitas: {
      entradilla: "Lo que se vende para perder grasa, con lo que dicen los estudios y los avisos de seguridad que hay. Sin marcas ni productos.",
      lineas: [
        { nombre: "[pendiente de ciencia: nombre de la categoría]", frase: pendiente("dosier 1", "frase y aviso de seguridad"), estado: "borrador" },
        { nombre: "Garcinia", frase: pendiente("dosier 1", "frase y aviso de seguridad"), estado: "borrador" },
        { nombre: "L-carnitina", frase: pendiente("dosier 1", "frase y aviso de seguridad"), estado: "borrador" },
        { nombre: "CLA", frase: pendiente("dosier 1", "frase y aviso de seguridad"), estado: "borrador" },
        { nombre: "Extracto de té verde", frase: pendiente("dosier 1", "frase y lo que haya dicho la EFSA sobre el hígado"), estado: "borrador" },
      ],
    },
    estudiado: { pendiente: "dosier 2, «Perder grasa sin perder músculo»: solo sale si se puede contar sin cifras de comida, de energía ni de cuerpo" },
    alternativa: "Si lo que buscas es ganar fuerza o cuidar tu salud, tienes estas listas:",
    compara: false,
    llevate: "guardar",
    paraTuCaso: true,
    circunstancias: CIRC_SIN_CAMBIOS,
  },
  {
    slug: "resistencia",
    boton: "Resistencia",
    nombre: "resistencia",
    title: "Tu lista: resistencia · Verax Nutrition",
    h1: "Resistencia: qué dicen los estudios",
    estado: "aprobado",
    lineaPropia: "Esto es lo que tenemos revisado para este objetivo.",
    plato: {
      entradilla: "Antes del bote, el entreno y la comida.",
      frases: [
        pendiente("A-13", "frase del piloto del agua, tal cual"),
        pendiente("A-15", "frase del piloto del agua, tal cual"),
        pendiente("A-18", "frase del piloto del agua, tal cual"),
        pendiente("G-14", "hidratos por hora en esfuerzos largos; sale si Natalia lo aprueba"),
      ],
    },
    noNecesitas: {
      entradilla: "Lo que se vende para la resistencia y no tiene pruebas para esto, dicho igual de claro que lo demás.",
      lineas: [{ nombre: "Creatina", frase: { tipo: "creatina", n: 6 }, ficha: "/creatina/" }],
    },
    compara: false,
    llevate: "guardar",
    circunstancias: CIRC_SIN_CAMBIOS,
  },
  {
    slug: "salud",
    boton: "Salud / empiezo de cero",
    nombre: "salud y empezar de cero",
    title: "Tu lista: salud y empezar de cero · Verax Nutrition",
    h1: "Salud y empezar de cero: qué dicen los estudios",
    estado: "aprobado",
    plato: {
      entradilla: "Lo primero es moverse y comer variado. Esto es lo que dicen los estudios de lo que hay en el plato.",
      frases: [
        PROTEINA.p11,
        pendiente("F-1", "frase del piloto de los frutos secos (AESAN), tal cual"),
        pendiente("G-9", "frase del piloto de la glucosa (fibra y grano entero), tal cual"),
        pendiente("A-7", "frase del piloto del agua (los minerales vienen de la comida), tal cual"),
      ],
    },
    suplementos: {
      titulo: "Si además entrenas fuerza",
      entradilla:
        "Primero el entreno y el plato. Si después quieres un suplemento, estos son los más estudiados, con su nivel. Aquí no hay precios ni marcas.",
      tarjetas: [CREATINA, WHEY],
    },
    noNecesitas: {
      entradilla: "Lo que se vende a quien empieza y, según los estudios, no aporta o no tiene pruebas suficientes.",
      lineas: [
        { nombre: "El batido justo al acabar («ventana anabólica»)", frase: PROTEINA.p7 },
        { nombre: "Aislado en lugar de concentrado", frase: PROTEINA.p16 },
        { nombre: "Sensor de glucosa para una persona sana", frase: G16 },
        { nombre: "«Activar» (remojar) los frutos secos", frase: F5 },
        { nombre: "BCAA", etiqueta: "Nivel 3 · Sin pruebas suficientes", frase: B8, estado: "borrador" },
      ],
    },
    calculadoras: [CALC_PROTEINA],
    compara: true,
    llevate: "dos",
    circunstancias: CIRC_CON_WHEY,
  },
];

export function listaDe(slug: string): Lista | undefined {
  return LISTAS.find((l) => l.slug === slug);
}

/** Cuántos temas revisados hay detrás de cada lista: los dosieres aprobados que ya tienen una frase en ella. */
export function temasRevisados(l: Lista): number {
  const dosieres = new Set<string>();
  const mirar = (f: FraseLista, estado?: Estado) => {
    if (estado === "borrador") return;
    if (f.tipo === "creatina") dosieres.add("creatina");
    if (f.tipo === "libre") dosieres.add(f.dosier);
  };
  l.plato?.frases.forEach((f) => mirar(f, f.estado));
  l.suplementos?.tarjetas.forEach((t) => mirar(t.frase));
  l.noNecesitas?.lineas.forEach((x) => mirar(x.frase, x.estado));
  return dosieres.size;
}
