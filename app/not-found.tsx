import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";

export default function NoEncontrada() {
  return (
    <>
      <Cabecera />
      <main id="contenido" className="reticula seccion">
        <h1 className="t-h1">Esta página no tiene fuente.</h1>
        <p className="t-entrada mt-4">Ninguna nota lleva aquí.</p>
        <p className="mt-8">
          <Link href="/">Volver a la portada&nbsp;→</Link>
        </p>
      </main>
      <Pie />
    </>
  );
}
