import Link from "next/link";
import { Logotipo } from "@/components/Logotipo";
import { menu } from "@/contenido/sitio";

export function Cabecera({ actual }: { actual?: string }) {
  return (
    <header className="relative">
      <a className="saltar" href="#contenido">
        Ir al contenido
      </a>
      <div className="cabecera">
        <Logotipo />
        <nav className="menu-escritorio" aria-label="Principal">
          <ul>
            {menu.map((m) => (
              <li key={m.href}>
                <Link href={m.href} aria-current={actual === m.href ? "page" : undefined}>
                  {m.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <details className="menu-movil">
          <summary>
            <span className="abrir">Menú</span>
            <span className="cerrar">Cerrar menú</span>
          </summary>
          <nav aria-label="Principal">
            <ul>
              {menu.map((m) => (
                <li key={m.href}>
                  <Link href={m.href}>{m.texto}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
