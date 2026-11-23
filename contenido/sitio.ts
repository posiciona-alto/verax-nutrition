/**
 * Estado de la financiación (textos v2, decisiones N1 y N2 de Natalia, 23-11-2026).
 * Mientras no haya ningún programa de afiliación activo, toda la web usa los textos «Sin programas».
 * Al entrar el primer programa se cambia aquí, y cambian a la vez el pie, la portada, la nota 1 y el comparador.
 */
export const PROGRAMAS_ACTIVOS = false;

export const sitio = {
  nombre: "Verax Nutrition",
  url: "https://veraxnutrition.es",
  autora: "Natalia Peña",
  estudio: "Posiciona Alto",
  /** Hueco de formato: la fecha real sale de cada dosier al publicar. */
  revisado: "[fecha]",
};

/** Ruta de la calculadora de creatina (arquitectura y UX, 22-11-2026). */
export const RUTA_CALCULADORA = "/calculadoras/dosis-creatina/";

export const menu = [
  { texto: "Objetivos", href: "/#objetivos" },
  { texto: "Suplementos", href: "/#suplementos" },
  { texto: "Comparar", href: "/comparar/creatina/" },
  { texto: "Calculadoras", href: RUTA_CALCULADORA },
  { texto: "Quién pagó el estudio", href: "/#quien-pago" },
];

export const financiacion = PROGRAMAS_ACTIVOS
  ? {
      pie: "Verax se financia con enlaces de afiliado, siempre marcados. No cambian el orden de ninguna tabla.",
      portada:
        "Verax se financia solo con enlaces de afiliado, siempre marcados. Nadie paga por salir ni por el orden.",
      vinculos:
        "Hoy Posiciona Alto no vende suplementos ni trabaja para ninguna marca de suplementos: los únicos vínculos son los enlaces de afiliado, siempre marcados.",
      avisoComparador: "Si compras desde aquí, la tienda nos paga una comisión. No cambia el orden ni lo que pagas tú.",
    }
  : {
      pie: "Verax no tiene hoy ningún enlace de afiliado activo. Cuando los tenga, irán siempre marcados y no cambiarán el orden de ninguna tabla.",
      portada:
        "Verax quiere financiarse solo con enlaces de afiliado, siempre marcados. Hoy no tiene ninguno activo. Nadie paga por salir ni por el orden.",
      vinculos:
        "Hoy Posiciona Alto no vende suplementos ni trabaja para ninguna marca de suplementos, y Verax todavía no tiene ningún enlace de afiliado.",
      avisoComparador: "Esta tabla no tiene enlaces de afiliado: hoy ninguna tienda nos paga nada.",
    };

/**
 * La nota 1 de cada tipo de página (concepto A, 2.1). Son textos de trabajo del concepto, en su estado «Sin programas»;
 * los cierra el copywriter con el ciencia-nutricion.
 */
export const notaUno = {
  portada: financiacion.portada,
  ciencia: PROGRAMAS_ACTIVOS
    ? "Esta página no tiene enlaces de afiliado. Verax se financia con una comisión cuando alguien compra desde el comparador."
    : "Esta página no tiene enlaces de afiliado, y Verax todavía no tiene ninguno activo.",
  comparador: financiacion.avisoComparador,
  calculadora: PROGRAMAS_ACTIVOS
    ? "Esta página no tiene enlaces de afiliado. Verax se financia con una comisión cuando alguien compra desde el comparador."
    : "Esta página no tiene enlaces de afiliado, y Verax todavía no tiene ninguno activo.",
  pie: PROGRAMAS_ACTIVOS
    ? "Verax se financia solo con enlaces de afiliado. El orden de las tablas no lo decide ninguna comisión."
    : "Verax todavía no tiene ningún enlace de afiliado. Cuando los tenga, el orden de las tablas no lo decidirá ninguna comisión.",
};

export const pie = {
  enlaces: [
    { texto: "Cómo investigamos", href: "/como-investigamos/" },
    { texto: "Cómo se financia", href: "/como-se-financia/", nota: true },
    { texto: "Sobre la autora", href: "/sobre-natalia/" },
    { texto: "Avísame cuando se acabe", href: "/avisame-cuando-se-acabe/" },
    { texto: "Aviso legal", href: "/aviso-legal/" },
    { texto: "Privacidad", href: "/privacidad/" },
    { texto: "Cookies", href: "/cookies/" },
    { texto: "Licencias", href: "/licencias/" },
  ],
  sanitaria:
    "Verax informa y no sustituye a un profesional sanitario. Para tu caso concreto, lo mejor es que lo veas con un dietista-nutricionista.",
  edad: "Verax es para mayores de 18 años.",
  acab: "¿La comida o tu cuerpo te preocupan más de la cuenta? Puedes hablar con ACAB:",
  acabPendiente: "[PENDIENTE: teléfono y web, solo después de comprobarlos en acab.org]",
  firma: "Escribe Natalia Peña, que entrena y estudió Química. No es nutricionista ni profesional sanitaria.",
};

export const certezas = {
  "Está claro": "Muchos estudios de grupos distintos dicen lo mismo",
  "Es bastante probable": "Los estudios apuntan a lo mismo, pero puede cambiar con estudios nuevos",
  "Faltan estudios": "Hay algo de prueba, pero poca o con dudas",
  "No se sabe": "Hay muy pocos estudios, o los que hay no coinciden o tienen muchas dudas",
} as const;

export type Certeza = keyof typeof certezas;

/**
 * Rama de conceptos (encargo del 23-11-2026): «Sin ellas» funciona con el borrador de creatina.json para que Natalia vea
 * el momento estrella, con la banda «Datos en borrador · concepto». Para publicar se pone en false y entra la regla de la
 * fórmula de movimiento (2.6): sin todas las frases de la página evaluadas, el botón no aparece.
 */
export const MODO_CONCEPTO = true;
