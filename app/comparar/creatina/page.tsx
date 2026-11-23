import type { Metadata } from "next";
import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { BandaBorrador, Fila, Migas } from "@/components/piezas";
import { Comparador } from "@/components/Comparador";
import { NotasMovil } from "@/components/NotasMovil";
import { EstilosLlamadas, Llamada, NotaFrase, NotaFuentes, NotaUno, Numerador, TextoFrase } from "@/components/notas";
import { productosEjemplo } from "@/contenido/comparar/creatina-ejemplo";
import { MODO_CONCEPTO, notaUno, PROGRAMAS_ACTIVOS, sitio } from "@/contenido/sitio";
import { datosEnBorrador, evidenciaCreatina, frase } from "@/lib/evidencia";

const H1 = "Comparador de creatina: precio por dosis, Creapure y sellos";

export const metadata: Metadata = {
  title: { absolute: "¿Cuál es la mejor creatina? Comparador por precio por dosis" },
  description:
    "Creatinas a la venta en España comparadas por precio por 3 g con envío, Creapure, sellos, edulcorantes y alérgenos. Precios con su hora.",
  alternates: { canonical: "/comparar/creatina/" },
};

export default function CompararCreatina() {
  const num = new Numerador();
  const n29 = num.deFrase(29).n;
  const n31 = num.deFrase(31).n;
  const nDecl = num.deFuentes(["O1"]).n;
  const d = evidenciaCreatina.declaracion_autorizada;
  const segundaDe22 = "Si tienes alguna enfermedad, estás embarazada o das el pecho, o tomas medicación, consúltalo antes con tu médico.";

  return (
    <>
      {MODO_CONCEPTO && datosEnBorrador ? <BandaBorrador /> : null}
      <Cabecera actual="/comparar/creatina/" />
      <main id="contenido" className="con-notas con-barra reticula">
        <div className="pt-6 md:pt-10">
          <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Comparador de creatina" }]} />
          <Fila
            className="mt-6"
            texto={
              <>
                <h1 className="t-h1">{H1}</h1>
                <p className="mt-4">
                  <Link href="/creatina/">¿Aún no sabes si te sirve? Para qué sirve la creatina&nbsp;→</Link>
                </p>
              </>
            }
            notas={
              <div className="solo-escritorio">
                <NotaUno texto={notaUno.comparador} />
              </div>
            }
          />
        </div>

        <Fila
          className="mt-8"
          texto={
            <div className="space-y-3">
              <p className="aviso-afiliacion solo-movil">
                {notaUno.comparador} <Link href="/como-se-financia/">Cómo se financia<span className="llamada-texto">1</span>&nbsp;→</Link>
              </p>
              <p>{segundaDe22}</p>
              <p className="t-datos">
                Precios de las tiendas a las [HH:MM] del [fecha] · Datos de etiqueta, con su fecha en cada producto
              </p>
              <p className="marca-ejemplo-linea">
                <span className="marca-ejemplo">[EJEMPLO]</span> Productos, marcas, tiendas y precios inventados para ver el
                comparador. Ninguno es real.
              </p>
            </div>
          }
        />

        <Fila
          className="mt-8"
          texto={
            <details className="capa2">
              <summary>Cómo leer esta tabla</summary>
              <div className="space-y-3 mt-2">
                <p>
                  <strong>Según su etiqueta:</strong> lo declara la marca en la etiqueta. Lo hemos leído en una foto nuestra de la
                  etiqueta o en una foto de Open Food Facts, con la fecha. <strong>Según la web de la marca:</strong> solo está en
                  su web, no en la etiqueta; va con la fecha en que la leímos. <strong>Comprobado en su registro:</strong> lo
                  hemos mirado en el registro público de quien da el sello, con la fecha.
                </p>
                <p>
                  <strong>Precio por dosis con envío</strong> = (precio del bote + envío de un bote a la península) ÷ (gramos del
                  bote ÷ 3 g). El envío a tu zona puede cambiar.
                </p>
                <p>
                  No analizamos los productos en un laboratorio: lo que va marcado «según su etiqueta» es lo que declara la marca.
                </p>
                <p>
                  <TextoFrase n={n29} uso={{ n: 29 }} />
                  <TextoFrase n={n31} uso={{ n: 31 }} />
                </p>
              </div>
            </details>
          }
          notas={
            <>
              <NotaFrase n={n29} uso={{ n: 29 }} />
              <NotaFrase n={n31} uso={{ n: 31 }} />
            </>
          }
        />

        <section aria-label="Productos" className="mt-10">
          <Comparador
            productos={productosEjemplo}
            afiliado={PROGRAMAS_ACTIVOS}
            avisoCreapure={frase(26).texto}
            avisoSellos={frase(31).texto}
          />
        </section>

        <section aria-labelledby="se-puede-decir" className="seccion">
          <h2 id="se-puede-decir" className="t-h2 h-seccion">
            Lo que se puede decir de un producto
          </h2>
          <Fila
            texto={
              <div>
                <p className="pendiente mb-3">[Antes de publicar: comprobar en el registro de la UE y en el Excel de AESAN, con fecha]</p>
                <blockquote className="declaracion">
                  <p>
                    «{d.texto_exacto}» «{d.condicion}»
                    <Llamada n={nDecl} />
                  </p>
                </blockquote>
                <div className="informacion-obligatoria mt-4">
                  <p>
                    Esta información va dirigida a adultos que hacen ejercicio de alta intensidad. Es importante seguir una
                    alimentación variada y equilibrada y un estilo de vida sano.
                  </p>
                  <p>La creatina acompaña al entrenamiento y a una alimentación variada; no es la solución por sí sola.</p>
                  <p>{segundaDe22}</p>
                </div>
              </div>
            }
            notas={<NotaFuentes n={nDecl} ids={["O1"]} />}
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
            "@type": "CollectionPage",
            name: H1,
            publisher: { "@type": "Organization", name: sitio.nombre },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: productosEjemplo.length,
              itemListElement: productosEjemplo.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.nombre })),
            },
          }),
        }}
      />
    </>
  );
}
