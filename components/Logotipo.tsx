import Link from "next/link";
import { trazoNota, trazoPalabra } from "@/marca/trazos";

/**
 * El logotipo en dos piezas: «verax» lleva a la portada y el ¹ a «Cómo se financia Verax»,
 * cada uno con su propia zona de toque. Comparten la misma caja vertical, así que encajan igual que en el SVG aprobado.
 */
export function Logotipo({ alto = 40 }: { alto?: number }) {
  return (
    <div className="logo logo-cabecera" style={{ height: alto }}>
      <Link href="/" className="logo-palabra" aria-label="Verax Nutrition, portada" style={{ height: alto }}>
        <svg viewBox="-101.2 -1522.2 4311.2 1636.5" style={{ height: alto }} aria-hidden="true" focusable="false">
          <path fill="#1C1A17" d={trazoPalabra} />
        </svg>
      </Link>
      <Link
        href="/como-se-financia/"
        className="logo-nota"
        aria-label="Nota 1: cómo se financia Verax"
        title="Nota 1: cómo se financia Verax"
        style={{ height: alto }}
      >
        <svg viewBox="4210 -1522.2 589.2 1636.5" style={{ height: alto }} aria-hidden="true" focusable="false">
          <path fill="#8A2E1C" d={trazoNota} />
        </svg>
      </Link>
    </div>
  );
}
