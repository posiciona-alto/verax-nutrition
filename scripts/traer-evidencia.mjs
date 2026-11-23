// Copia los datos de evidencia aprobados por el agente de ciencia a la web.
// Uso: node scripts/traer-evidencia.mjs (desde la carpeta web/). La web solo lee su copia de contenido/datos/.
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const temas = ["creatina"];
for (const tema of temas) {
  const origen = resolve("..", "evidencia", "datos", `${tema}.json`);
  const destino = resolve("contenido", "datos", `${tema}.json`);
  if (!existsSync(origen)) {
    process.stderr.write(`No existe ${origen}\n`);
    process.exitCode = 1;
    continue;
  }
  copyFileSync(origen, destino);
  process.stdout.write(`Copiado ${tema}.json\n`);
}
