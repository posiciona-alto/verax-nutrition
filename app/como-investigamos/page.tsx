import type { Metadata } from "next";
import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { Migas, BandaBorrador, Fila, Prosa, Pendiente } from "@/components/piezas";
import { NotasMovil } from "@/components/NotasMovil";
import { EstilosLlamadas, NumeroNota } from "@/components/notas";
import { MODO_CONCEPTO, notaUno, pie, sitio } from "@/contenido/sitio";

export const metadata: Metadata = {
  title: "Cómo investigamos: método y quién paga cada estudio | Verax",
  description:
    "Cómo buscamos y leemos los estudios, cómo miramos quién los pagó, qué quiere decir cada etiqueta de certeza y cómo corregimos un error. Con fecha.",
  alternates: { canonical: "/como-investigamos/" },
  robots: { index: true, follow: true },
};

const H1 = "Cómo investigamos: el método y quién paga cada estudio";

export default function ComoInvestigamos() {
  return (
    <>
      {MODO_CONCEPTO ? <BandaBorrador /> : null}
      <Cabecera actual="/como-investigamos/" />
      <main id="contenido" className="con-notas">
        <div className="reticula">
          <section aria-labelledby="h-metodo" className="seccion">
            <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Cómo investigamos" }]} />
            <Fila
              className="mt-6"
              texto={
                <>
                  <h1 id="h-metodo" className="t-h1">
                    {H1}
                  </h1>
                  <p className="t-entrada mt-4">
                    Antes de escribir una frase sobre nutrición, la buscamos en los estudios, miramos quién los pagó y decimos
                    con qué seguridad se sabe. Aquí está cómo, paso a paso.
                  </p>
                  <p className="confianza mt-4">
                    <span>Método publicado el 22-11-2026</span>
                    <span aria-hidden="true">·</span>
                    <span>Escribe {sitio.autora}</span>
                    <span aria-hidden="true">·</span>
                    <span>Qué ha cambiado ↓</span>
                  </p>
                </>
              }
            />
          </section>

          <section aria-labelledby="h-regla" className="seccion">
            <h2 id="h-regla" className="t-h2 h-seccion">
              La regla
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Todo lo que publicamos sobre nutrición sale de un dosier de evidencia: un documento por tema, con las
                    preguntas, los estudios, quién los pagó, la conclusión y las frases exactas que se pueden decir. Si una
                    frase no está en un dosier aprobado, no sale. Ni en la web, ni en los vídeos, ni en los correos.
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-pasos" className="seccion">
            <h2 id="h-pasos" className="t-h2 h-seccion">
              Cómo investigamos un tema
            </h2>

            <Fila
              texto={
                <>
                  <h3 id="paso-1" className="t-h3">
                    Paso 1 · La pregunta
                  </h3>
                  <Prosa>
                    <p>
                      Escribimos la pregunta antes de mirar ningún resultado: en quién, qué se toma, frente a qué y qué se
                      mide. Así no la cambiamos para que salga lo que nos gustaría.
                    </p>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 id="paso-2" className="t-h3">
                    Paso 2 · La búsqueda
                  </h3>
                  <Prosa>
                    <p>
                      Buscamos en las bases de datos de estudios científicos (PubMed, Europe PMC, OpenAlex, Semantic Scholar y
                      la Biblioteca Cochrane) y en lo que publican los organismos: la EFSA, la OMS, la AESAN, el Comité
                      Olímpico Internacional, el Instituto Australiano del Deporte y las sociedades de nutrición deportiva.
                      Buscamos a favor y en contra con los mismos términos.
                    </p>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 id="paso-3" className="t-h3">
                    Paso 3 · Qué pesa más
                  </h3>
                  <Prosa>
                    <p>
                      Pesan más los consensos y las revisiones que juntan muchos estudios, después los ensayos y después los
                      estudios de observación. Un estudio en animales o en el laboratorio nunca basta por sí solo. Un estudio
                      que aún no ha pasado la revisión de otros científicos no sostiene ninguna frase.
                    </p>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 id="paso-4" className="t-h3">
                    Paso 4 · Quién lo pagó
                  </h3>
                  <Prosa>
                    <p>Ver el apartado <q>Quién paga cada estudio</q>.</p>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 id="paso-5" className="t-h3">
                    Paso 5 · Cuando los estudios no coinciden
                  </h3>
                  <Prosa>
                    <p>
                      Los ponemos uno al lado del otro y buscamos por qué: otra población, otra dosis, otra forma de medir. Lo
                      contamos, no elegimos el que nos conviene.
                    </p>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 id="paso-6" className="t-h3">
                    Paso 6 · Con qué seguridad
                  </h3>
                  <Prosa>
                    <p>
                      Decimos la conclusión con cuatro grados de certeza (ver <q>Las etiquetas de certeza</q>) y nunca con más
                      seguridad de la que dan los estudios.
                    </p>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 id="paso-7" className="t-h3">
                    Paso 7 · El dosier
                  </h3>
                  <Prosa>
                    <p>
                      Lo escribimos todo en el dosier, también las frases que no se pueden publicar y por qué. Antes de darlo
                      por bueno, lo repasamos otra vez desde cero sin mirar la conclusión: volvemos a buscar estudios que
                      digan lo contrario y comprobamos al azar que las citas existen y dicen lo que decimos. Natalia lo lee y
                      lo aprueba antes de que salga nada.
                    </p>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 id="ideas" className="t-h3">
                    Ideas que nos llegan
                  </h3>
                  <Prosa>
                    <p>
                      Cuando nos llega una idea que se repite mucho, la investigamos como pregunta abierta, buscando a favor y
                      en contra. Si los estudios dicen lo contrario, lo contamos igual.
                    </p>
                  </Prosa>
                </>
              }
            />
          </section>

          <section aria-labelledby="h-que-miramos" className="seccion">
            <h2 id="h-que-miramos" className="t-h2 h-seccion">
              Qué miramos de cada estudio
            </h2>
            <Fila
              texto={
                <Prosa>
                  <ul className="lista-puntos space-y-2">
                    <li>Si se registró antes de empezar, y si lo publicado coincide con lo registrado.</li>
                    <li>Si mide algo que importa (fuerza, salud) o solo un marcador de unas horas en un análisis.</li>
                    <li>
                      En quién se hizo: cuántas personas, cuántas mujeres, qué edad, si entrenaban.
                    </li>
                    <li>Si la dosis es la que se usa de verdad.</li>
                    <li>Cuánto cambia, con su margen, y no solo el porcentaje que suena más.</li>
                    <li>Si otro grupo lo ha repetido.</li>
                    <li>
                      Si lo hemos leído entero o solo su resumen: lo apuntamos en el dosier.
                    </li>
                  </ul>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-quien-paga" className="seccion">
            <h2 id="h-quien-paga" className="t-h2 h-seccion">
              Quién paga cada estudio
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    De cada estudio miramos quién lo pagó y qué vínculos declaran sus autores: con la industria alimentaria, la
                    farmacéutica, la de los suplementos y también con quien vende la alternativa. Es la misma vara para todos,
                    también para las marcas a las que enlazamos.
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <>
                  <h3 className="t-h3">Las tres marcas</h3>
                  <Prosa>
                    <ul className="lista-puntos space-y-2 mt-2">
                      <li><strong>Sin vínculos conocidos</strong></li>
                      <li><strong>Con financiación o vínculos del sector</strong></li>
                      <li>
                        <strong>No consta</strong>. <q>No consta</q> no quiere decir que sea independiente: quiere decir que
                        no lo hemos encontrado.
                      </li>
                    </ul>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 id="se-sostiene" className="t-h3">
                    ¿Se sostiene sin ellas?
                  </h3>
                  <Prosa>
                    <p>
                      En cada tema quitamos los estudios pagados por quien gana con el resultado y miramos si la conclusión
                      aguanta. Si solo se sostiene con ellos, la damos con menos seguridad y lo decimos al lado:
                      <q>Se apoya sobre todo en estudios con vínculos del sector</q>.
                    </p>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 className="t-h3">Por qué lo hacemos</h3>
                  <Prosa>
                    <p>
                      <Pendiente>
                        [Pendiente del dosier <q>caso-azucar</q>: el bloque entero no sale hasta que el dosier esté aprobado con
                        su comprobación a ciegas, la fe de erratas leída y la segunda fuente independiente.]
                      </Pendiente>
                    </p>
                    <p>
                      <Pendiente>
                        Texto propuesto por ciencia-nutricion: <q>Que un estudio lo pague una empresa no lo hace falso, pero hay
                        casos documentados en los que la industria influyó en lo que se publicó. Por ejemplo, en 2016 se
                        publicaron documentos internos que muestran que, en los años sesenta, una fundación de la industria del
                        azúcar pagó una revisión científica que señalaba a la grasa como causa de las enfermedades del corazón y
                        quitaba importancia al azúcar, sin que se dijera quién la pagaba.</q> Con su cita en la nota de fuentes
                        de la página.
                      </Pendiente>
                    </p>
                  </Prosa>
                </>
              }
            />
          </section>

          <section aria-labelledby="h-certeza" className="seccion">
            <h2 id="h-certeza" className="t-h2 h-seccion">
              Las etiquetas de certeza
            </h2>
            <Fila
              texto={
                <Prosa>
                  <dl className="space-y-4">
                    <div>
                      <dt className="font-semibold">Está claro</dt>
                      <dd>Muchos estudios de grupos distintos dicen lo mismo</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Es bastante probable</dt>
                      <dd>Los estudios apuntan a lo mismo, pero puede cambiar con estudios nuevos</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Faltan estudios</dt>
                      <dd>Hay algo de prueba, pero poca o con dudas</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">No se sabe</dt>
                      <dd>Hay muy pocos estudios, o los que hay no coinciden o tienen muchas dudas</dd>
                    </div>
                  </dl>
                </Prosa>
              }
            />

            <Fila
              texto={
                <>
                  <h3 className="t-h3">Cómo suenan en una frase</h3>
                  <Prosa>
                    <ul className="lista-puntos space-y-2 mt-2">
                      <li><q>Está claro que…</q></li>
                      <li><q>Parece que…, y es bastante probable</q></li>
                      <li><q>Parece que…, pero faltan estudios</q></li>
                      <li><q>No hay pruebas de que…</q> o <q>No se sabe</q></li>
                    </ul>
                  </Prosa>
                </>
              }
            />
          </section>

          <section aria-labelledby="h-nivel" className="seccion">
            <h2 id="h-nivel" className="t-h2 h-seccion">
              El nivel de un suplemento y la declaración de la UE
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Son dos cosas distintas. <strong>El nivel</strong> lo damos en Verax con lo que dicen los estudios y la
                    clasificación del Instituto Australiano del Deporte, con fecha. Va siempre con su matiz
                    (<q>para qué y en qué contexto</q>). <strong>La declaración</strong> es el texto que la UE permite decir
                    de un producto, con sus condiciones. Por eso un suplemento puede tener nivel y no tener declaración, y al
                    revés.
                  </p>
                </Prosa>
              }
            />

            <Fila
              texto={
                <>
                  <h3 className="t-h3">La escala (cuatro niveles)</h3>
                  <Prosa>
                    <dl className="space-y-4 mt-2">
                      <div>
                        <dt className="font-semibold">Nivel 1 · Evidencia sólida</dt>
                        <dd>
                          Hay buenas pruebas de que sirve para algo concreto, con una cantidad y en un contexto concretos.
                          Siempre lo decimos con ese <q>para qué</q>, y el efecto puede ser pequeño.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Nivel 2 · En estudio</dt>
                        <dd>Hay estudios prometedores, pero no es concluyente.</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Nivel 3 · Sin pruebas suficientes</dt>
                        <dd>No hay pruebas de que sirva para lo que se vende, o hay muy pocos estudios.</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Nivel 4 · No recomendado</dt>
                        <dd>
                          Puede estar prohibido en el deporte o tener un riesgo alto de llevar sustancias prohibidas. Solo lo
                          nombramos para avisar, nunca con enlace de compra.
                        </dd>
                      </div>
                    </dl>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 className="t-h3">De dónde sale el nivel</h3>
                  <Prosa>
                    <p>
                      Partimos de la clasificación del Instituto Australiano del Deporte, consultada el{" "}
                      <Pendiente variante="linea">[fecha]</Pendiente>{" "}
                      y la ajustamos con lo que encontramos al mirar quién pagó los estudios: si una conclusión solo se
                      sostiene con estudios pagados por quien gana con ella, el nivel baja y lo decimos. Por eso, por ejemplo,
                      la beta-alanina está en el grupo A del Instituto y aquí tiene el nivel 2.
                    </p>
                  </Prosa>
                </>
              }
            />

            <Fila
              texto={
                <>
                  <h3 className="t-h3">Dónde no va</h3>
                  <Prosa>
                    <p>
                      El nivel no va nunca junto a un producto, un precio ni una calculadora: ahí solo va la declaración
                      autorizada, con su texto exacto. Si un suplemento no tiene declaración, lo decimos a la vista:
                      <q>No tiene declaración autorizada</q>.
                    </p>
                  </Prosa>
                </>
              }
            />
          </section>

          <section aria-labelledby="h-etiqueta" className="seccion">
            <h2 id="h-etiqueta" className="t-h2 h-seccion">
              «Según su etiqueta» y «comprobado»
            </h2>
            <Fila
              texto={
                <Prosa>
                  <dl className="space-y-3">
                    <div>
                      <dt className="font-semibold">Según su etiqueta:</dt>
                      <dd>lo declara la marca en la etiqueta; lo hemos leído en una foto nuestra o de Open Food Facts, con su
                        fecha.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Según la web de la marca:</dt>
                      <dd>solo está en su web; va con la fecha en que la leímos.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Comprobado en su registro:</dt>
                      <dd>solo para los sellos; lo hemos mirado en el registro público de quien da el sello, con la fecha. No
                        analizamos productos en un laboratorio.</dd>
                    </div>
                  </dl>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-revision" className="seccion">
            <h2 id="h-revision" className="t-h2 h-seccion">
              Cada cuánto revisamos
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Cada dosier se revisa como mucho a los 6 meses, o antes si sale algo que pueda cambiarlo (una opinión nueva
                    de la EFSA, una revisión grande). Cada página dice su fecha. Si algo cambia, lo contamos: <q>Actualizado el
                    [fecha]: antes decíamos [X]; ahora [Y], por [motivo]</q>. Si no cambia nada: <q>Revisado sin cambios el
                    [fecha]</q>.
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-correcciones" className="seccion">
            <h2 id="h-correcciones" className="t-h2 h-seccion">
              Si ves un error
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p>
                    Escríbenos a{" "}
                    <Pendiente variante="linea">[DATO: correo de correcciones, D7]</Pendiente>{" "}
                    con la página y lo que no cuadra. Lo revisamos contra los estudios. Si hay un error, lo corregimos con fecha
                    y diciendo qué había antes, en la propia página. Vale igual si nos escribe un lector o una marca.
                  </p>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-no-hacemos" className="seccion">
            <h2 id="h-no-hacemos" className="t-h2 h-seccion">
              Lo que no hacemos
            </h2>
            <Fila
              texto={
                <Prosa>
                  <ul className="lista-puntos space-y-2">
                    <li>No damos consejo para tu caso: para eso, un dietista-nutricionista.</li>
                    <li>No analizamos productos.</li>
                    <li>No publicamos nada que no esté en un dosier aprobado.</li>
                    <li>
                      No cobramos de ninguna marca por salir en una tabla ni por su posición (
                      <NumeroNota n={1} />{" "}
                      <Link href="/como-se-financia/">Cómo se financia&nbsp;→</Link>
                      ).
                    </li>
                  </ul>
                </Prosa>
              }
            />
          </section>

          <section aria-labelledby="h-firma" className="seccion">
            <h2 id="h-firma" className="t-h2 h-seccion">
              Firma
            </h2>
            <Fila
              texto={
                <>
                  <Prosa>
                    <p>
                      Escribe Natalia Peña, que entrena y tiene estudios de Química. No es nutricionista ni profesional
                      sanitaria.
                      {" "}
                      <Link href="/sobre-natalia/">Sobre la autora&nbsp;→</Link>
                    </p>
                  </Prosa>
                  <Prosa>
                    <p className="mt-4 t-secundario">
                      <Link href="/como-investigamos/#h-correcciones">Cómo corregimos&nbsp;→</Link>
                    </p>
                  </Prosa>
                </>
              }
            />
          </section>

          <section aria-labelledby="h-cambios" className="seccion">
            <h2 id="h-cambios" className="t-h2 h-seccion">
              Qué ha cambiado
            </h2>
            <Fila
              texto={
                <Prosa>
                  <p className="t-secundario">
                    22-11-2026 · Publicado. Método del 22-11-2026, v1.
                  </p>
                </Prosa>
              }
            />
          </section>
        </div>
        <EstilosLlamadas usados={[1]} />
      </main>
      <NotasMovil />
      <Pie />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: "Cómo investigamos: método y quién paga cada estudio",
                url: `${sitio.url}/como-investigamos/`,
                inLanguage: "es-ES",
                isPartOf: { "@type": "WebSite", name: sitio.nombre, url: sitio.url },
                publisher: { "@type": "Organization", name: sitio.nombre },
                author: { "@type": "Person", name: sitio.autora },
                datePublished: "2026-11-22",
                description:
                  "Cómo buscamos y leemos los estudios, cómo miramos quién los pagó, qué quiere decir cada etiqueta de certeza y cómo corregimos un error. Con fecha.",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Inicio", item: `${sitio.url}/` },
                  { "@type": "ListItem", position: 2, name: "Cómo investigamos", item: `${sitio.url}/como-investigamos/` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}