/** Texto sin tildes, en minúsculas y con guiones: para los fragmentos de la URL y las búsquedas. */
export function normalizar(t: string) {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function slugMarca(m: string) {
  return normalizar(m)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
