/**
 * [EJEMPLO] Datos inventados para ver el comparador en el concepto. Ninguna marca, tienda ni precio es real.
 * Se sustituyen por los datos de las etiquetas y de las tiendas cuando existan; nunca se publican.
 */
export type Origen = "etiqueta" | "web" | "registro" | "sin-dato";
export type Dato<T> = { valor: T; origen: Origen; fecha?: string };

export type ProductoEjemplo = {
  id: string;
  nombre: string;
  marca: string;
  tienda: string;
  hora: string;
  gramos: number;
  precio: number;
  envio: number | null;
  formato: string;
  creapure: Dato<boolean>;
  sello: Dato<string | null>;
  edulcorante: Dato<string | null>;
  alergenos: Dato<string>;
  vegano: Dato<boolean>;
  url: string;
};

export const productosEjemplo: ProductoEjemplo[] = [
  {
    id: "a",
    nombre: "Monohidrato en polvo 500 g",
    marca: "Marca de ejemplo A",
    tienda: "Tienda de ejemplo 1",
    hora: "09:40",
    gramos: 500,
    precio: 24.9,
    envio: 3.99,
    formato: "Polvo, 500 g",
    creapure: { valor: true, origen: "etiqueta", fecha: "[fecha]" },
    sello: { valor: "Sello de ejemplo", origen: "registro", fecha: "[fecha]" },
    edulcorante: { valor: null, origen: "etiqueta" },
    alergenos: { valor: "Ninguno declarado", origen: "etiqueta" },
    vegano: { valor: true, origen: "web", fecha: "[fecha]" },
    url: "https://example.com/",
  },
  {
    id: "b",
    nombre: "Creatina monohidrato 300 g",
    marca: "Marca de ejemplo B",
    tienda: "Tienda de ejemplo 2",
    hora: "09:40",
    gramos: 300,
    precio: 12.5,
    envio: 2.95,
    formato: "Polvo, 300 g",
    creapure: { valor: false, origen: "etiqueta" },
    sello: { valor: null, origen: "sin-dato" },
    edulcorante: { valor: null, origen: "etiqueta" },
    alergenos: { valor: "Ninguno declarado", origen: "etiqueta" },
    vegano: { valor: true, origen: "etiqueta" },
    url: "https://example.com/",
  },
  {
    id: "c",
    nombre: "Monohidrato micronizado 1 kg",
    marca: "Marca de ejemplo C",
    tienda: "Tienda de ejemplo 1",
    hora: "09:40",
    gramos: 1000,
    precio: 34.0,
    envio: 0,
    formato: "Polvo, 1.000 g",
    creapure: { valor: false, origen: "etiqueta" },
    sello: { valor: null, origen: "sin-dato" },
    edulcorante: { valor: null, origen: "etiqueta" },
    alergenos: { valor: "Puede contener leche", origen: "etiqueta" },
    vegano: { valor: false, origen: "sin-dato" },
    url: "https://example.com/",
  },
  {
    id: "d",
    nombre: "Creatina con sabor 250 g",
    marca: "Marca de ejemplo D",
    tienda: "Tienda de ejemplo 3",
    hora: "09:40",
    gramos: 250,
    precio: 16.9,
    envio: 4.5,
    formato: "Polvo con sabor, 250 g",
    creapure: { valor: false, origen: "etiqueta" },
    sello: { valor: "Sello de ejemplo", origen: "registro", fecha: "[fecha]" },
    edulcorante: { valor: "Sucralosa", origen: "etiqueta" },
    alergenos: { valor: "Ninguno declarado", origen: "etiqueta" },
    vegano: { valor: true, origen: "etiqueta" },
    url: "https://example.com/",
  },
  {
    id: "e",
    nombre: "Monohidrato 500 g",
    marca: "Marca de ejemplo E",
    tienda: "Tienda de ejemplo 2",
    hora: "09:40",
    gramos: 500,
    precio: 19.9,
    envio: null,
    formato: "Polvo, 500 g",
    creapure: { valor: true, origen: "web", fecha: "[fecha]" },
    sello: { valor: null, origen: "sin-dato" },
    edulcorante: { valor: null, origen: "etiqueta" },
    alergenos: { valor: "Ninguno declarado", origen: "etiqueta" },
    vegano: { valor: true, origen: "etiqueta" },
    url: "https://example.com/",
  },
];
