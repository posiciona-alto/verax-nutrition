import Link from "next/link";
import { notaUno, financiacion, pie, sitio } from "@/contenido/sitio";

/** Cierre «La nota 1, al pie»: quieto (movimiento-v1, apartado 4). */
export function Pie() {
  return (
    <footer className="pie campo-tinta sobre-tinta">
      <div className="reticula" style={{ paddingBlock: "72px 40px" }}>
        <p className="pie-nota md:col-span-9" id="nota-1-pie">
          <span className="llamada" aria-hidden="true" style={{ position: "relative" }}>
            1
          </span>{" "}
          {notaUno.pie}{" "}
          <Link href="/como-se-financia/" style={{ color: "var(--granate-claro)" }}>
            Cómo se financia
          </Link>
        </p>
        <div className="md:col-span-12 mt-14 grid gap-10 md:grid-cols-12" style={{ columnGap: "var(--medianil)" }}>
          <div className="md:col-span-4">
            <img src="/marca/verax-nutrition-negativo.svg" alt="Verax Nutrition" width={196} height={98} />
            <p className="t-nota mt-6" style={{ color: "rgb(244 238 227 / 0.78)" }}>
              Última revisión de la web: {sitio.revisado}
            </p>
          </div>
          <nav className="md:col-span-4" aria-label="Pie">
            <ul className="pie-enlaces">
              {pie.enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href}>
                    {e.texto}
                    {e.nota ? (
                      <span className="llamada" aria-hidden="true">
                        1
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4 t-nota space-y-3" style={{ color: "rgb(244 238 227 / 0.86)" }}>
            <p>{financiacion.pie}</p>
            <p>
              {pie.sanitaria} {pie.edad}
            </p>
            <p>{pie.firma}</p>
            <p>
              {pie.acab} <span className="pendiente">{pie.acabPendiente}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
