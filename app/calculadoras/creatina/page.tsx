import type { Metadata } from "next";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { BandaBorrador, Fila, Migas } from "@/components/piezas";
import { Calculadora } from "@/components/Calculadora";
import { NotasMovil } from "@/components/NotasMovil";
import { EstilosLlamadas, NotaFrase, NotaFuentes, NotaUno, Numerador, TextoFrase, Llamada } from "@/components/notas";
import { MODO_CONCEPTO, notaUno, sitio } from "@/contenido/sitio";
import { datosEnBorrador, evidenciaCreatina, frase } from "@/lib/evidencia";

const H1 = "¿Cuánta creatina tomar? Calculadora de tu bote";

export const metadata: Metadata = {
  title: `${H1} | Verax`,
  description:
    "La cifra de la declaración autorizada, la de los consensos y la cuenta de tu bote: cuántos días te dura y cuánto te cuesta cada dosis. Sin pedirte el peso.",
  alternates: { canonical: "/calculadoras/creatina/" },
};

/** Lo que usan los estudios (7 ter, parte 1): frases 9, 7, 8, 12 y 11, con su certeza. */
const ESTUDIOS = [9, 7, 8, 12, 11];

export default function CalculadoraCreatina() {
  const num = new Numerador();
  const d = evidenciaCreatina.declaracion_autorizada;
  const nNorma = num.siguiente();
  const estudios = ESTUDIOS.map((n) => ({ n, nota: num.siguiente() }));
  const nAviso = num.siguiente();

  return (
    <>
      {MODO_CONCEPTO && datosEnBorrador ? <BandaBorrador /> : null}
      <Cabecera actual="/calculadoras/creatina/" />
      <main id="contenido" className="con-notas reticula">
        <div className="pt-6 md:pt-10">
          <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Calculadoras", href: "/#calculadoras" }, { texto: "Creatina" }]} />
          <Fila
            className="mt-6"
            texto={
              <>
                <h1 className="t-h1">{H1}</h1>
                <p className="t-entrada mt-5">
                  Te decimos la cifra de la norma y la de los estudios, y hacemos la cuenta de tu bote. No te pedimos el peso: no
                  damos dosis personales.
                </p>
                <div className="confianza mt-5">
                  <span>Revisado el {sitio.revisado}</span>
                  <span aria-hidden="true">·</span>
                  <span>Escribe {sitio.autora}</span>
                  <span aria-hidden="true">·</span>
                  <a href="#calcula">Ir a la calculadora ↓</a>
                </div>
              </>
            }
            notas={<NotaUno texto={notaUno.calculadora} />}
          />
        </div>

        <section aria-labelledby="norma" className="seccion-cerca">
          <h2 id="norma" className="t-h2 h-seccion">
            Lo que dice la norma
          </h2>
          <Fila
            texto={
              <div>
                <p className="pendiente mb-3">[Antes de publicar: comprobar en el registro de la UE y en el Excel de AESAN, con fecha]</p>
                <blockquote className="declaracion">
                  <p>
                    «{d.texto_exacto}» «{d.condicion}»
                    <Llamada n={nNorma} />
                  </p>
                </blockquote>
                <div className="informacion-obligatoria mt-4">
                  <p>
                    Esta información va dirigida a adultos que hacen ejercicio de alta intensidad. Es importante seguir una
                    alimentación variada y equilibrada y un estilo de vida sano.
                  </p>
                  <p>La creatina acompaña al entrenamiento y a una alimentación variada; no es la solución por sí sola.</p>
                </div>
              </div>
            }
            notas={<NotaFuentes n={nNorma} ids={["O1"]} />}
          />
        </section>

        <section aria-labelledby="estudios" className="seccion-cerca">
          <h2 id="estudios" className="t-h2 h-seccion">
            Lo que usan los estudios
          </h2>
          <div className="space-y-6">
            {estudios.map(({ n, nota }) => (
              <Fila
                key={n}
                texto={
                  <p>
                    <span className="certeza-linea block font-semibold">{frase(n).certeza}</span>
                    <TextoFrase n={nota} uso={{ n }} />
                  </p>
                }
                notas={<NotaFrase n={nota} uso={{ n }} />}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="calcula" className="seccion-cerca">
          <h2 id="calcula" className="t-h2 h-seccion">
            Calcula tu bote
          </h2>
          <Calculadora />
        </section>

        <section aria-labelledby="antes" className="seccion-cerca salud">
          <h2 id="antes" className="t-h2 h-seccion">
            Antes de empezar
          </h2>
          <Fila
            texto={
              <p>
                <TextoFrase n={nAviso} uso={{ n: 22 }} />
              </p>
            }
            notas={<NotaFrase n={nAviso} uso={{ n: 22 }} />}
          />
        </section>

        <section aria-labelledby="no-hace" className="seccion">
          <h2 id="no-hace" className="t-h2 h-seccion">
            Lo que no hace esta calculadora
          </h2>
          <Fila
            texto={
              <p>No te da una dosis para tu caso. Para tu caso concreto, lo mejor es que lo veas con un dietista-nutricionista.</p>
            }
          />
        </section>
        <EstilosLlamadas usados={num.usados} />
      </main>
      <NotasMovil />
      <Pie />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: H1,
            applicationCategory: "HealthApplication",
            operatingSystem: "Cualquiera (navegador)",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            publisher: { "@type": "Organization", name: sitio.nombre },
          }),
        }}
      />
    </>
  );
}
