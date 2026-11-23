"use client";

import { useId, useState } from "react";

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * «Guárdame la lista» y «Avísame cuando se me acabe el bote» (UX buscador v1, 3.7; textos 2.5).
 * Es una maqueta: los campos no tienen nombre, ningún botón envía el formulario y nada sale del navegador.
 * Sin JavaScript se ven las dos opciones, una debajo de otra.
 */
export function Llevate({ dos, objetivo }: { dos: boolean; objetivo: string }) {
  const id = useId();
  const [pestana, setPestana] = useState<"guardar" | "avisar">("guardar");

  return (
    <div className="llevate" data-activa={pestana}>
      {dos ? (
        <div role="tablist" aria-label="Llévate esta lista" className="pestanas solo-js">
          <button
            type="button"
            role="tab"
            id={`${id}-t1`}
            aria-controls={`${id}-p1`}
            aria-selected={pestana === "guardar"}
            tabIndex={pestana === "guardar" ? 0 : -1}
            onClick={() => setPestana("guardar")}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                setPestana("avisar");
                document.getElementById(`${id}-t2`)?.focus();
              }
            }}
          >
            Guárdame la lista
          </button>
          <button
            type="button"
            role="tab"
            id={`${id}-t2`}
            aria-controls={`${id}-p2`}
            aria-selected={pestana === "avisar"}
            tabIndex={pestana === "avisar" ? 0 : -1}
            onClick={() => setPestana("avisar")}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                setPestana("guardar");
                document.getElementById(`${id}-t1`)?.focus();
              }
            }}
          >
            Avísame cuando se me acabe el bote
          </button>
        </div>
      ) : null}
      <div id={`${id}-p1`} role={dos ? "tabpanel" : undefined} aria-labelledby={dos ? `${id}-t1` : undefined} className="panel panel-guardar">
        {dos ? <h3 className="t-h3 sin-js-solo">Guárdame la lista</h3> : null}
        <Guardar objetivo={objetivo} />
      </div>
      {dos ? (
        <div id={`${id}-p2`} role="tabpanel" aria-labelledby={`${id}-t2`} className="panel panel-avisar">
          <h3 className="t-h3 sin-js-solo">Avísame cuando se me acabe el bote</h3>
          <Avisar />
        </div>
      ) : null}
    </div>
  );
}

function Legal({ para, cuanto }: { para: string; cuanto: string }) {
  return (
    <p className="t-nota legal-corto">
      <strong>Responsable:</strong> <span className="pendiente">[DATO: titular del aviso legal]</span>. <strong>Para qué:</strong> {para}{" "}
      <strong>Base:</strong> tu consentimiento. <strong>Cuánto tiempo:</strong> {cuanto} <strong>Quién lo envía:</strong> Resend,
      desde EE. UU., con <span className="pendiente">[PENDIENTE: la garantía de la transferencia internacional de su contrato de tratamiento de datos, comprobada antes de publicar]</span>.
      Tus derechos y el resto, en la <a href="/privacidad/">política de privacidad</a>.
    </p>
  );
}

function Correo({ valor, poner, error }: { valor: string; poner: (v: string) => void; error: boolean }) {
  const id = useId();
  return (
    <div className="campo">
      <label htmlFor={id}>Correo electrónico</label>
      <input
        id={id}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="nombre@correo.es"
        value={valor}
        onChange={(e) => poner(e.target.value)}
        aria-invalid={error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="campo-error">
          Escribe un correo con @, por ejemplo nombre@correo.es
        </p>
      ) : null}
    </div>
  );
}

function Hecho({ texto }: { texto: string }) {
  return (
    <div className="hecho" role="status">
      <p className="t-h3">Mira tu correo para confirmar.</p>
      <p>{texto}</p>
      <p className="pendiente mt-2">[MAQUETA: en el concepto no se envía nada]</p>
    </div>
  );
}

function Guardar({ objetivo }: { objetivo: string }) {
  const [correo, setCorreo] = useState("");
  const [acepta, setAcepta] = useState(false);
  const [intento, setIntento] = useState(false);
  const [hecho, setHecho] = useState(false);
  const valido = CORREO.test(correo) && acepta;

  if (hecho) return <Hecho texto="Te hemos mandado un enlace. Sin confirmar, no te mandamos la lista." />;
  return (
    <div className="llevate-form">
      <p>Te mandamos esta lista por correo, una sola vez. No te apuntamos a nada.</p>
      <p className="t-secundario mt-2">Lo que hayas marcado (vegano, sin lactosa…) no va en el correo: se queda en tu navegador.</p>
      <Correo valor={correo} poner={setCorreo} error={intento && !CORREO.test(correo)} />
      <label className="opcion casilla-aparte">
        <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
        <span>Quiero recibir esta lista por correo. Solo este correo; no es un boletín.</span>
      </label>
      <Legal
        para={`mandarte la lista de ${objetivo} una vez, y nada más.`}
        cuanto="borramos tu correo después de enviarla [VERIFICAR: plazo real, incluido el registro de envíos de Resend]."
      />
      <p className="t-nota">Es para mayores de 18 años.</p>
      <button
        type="button"
        className="boton boton-ver"
        aria-disabled={!valido}
        aria-describedby={!valido ? "motivo-guardar" : undefined}
        onClick={() => (valido ? setHecho(true) : setIntento(true))}
      >
        Mandarme la lista
      </button>
      {!valido ? (
        <p id="motivo-guardar" className="t-nota t-secundario">
          Para mandártela, escribe tu correo y marca la casilla.
        </p>
      ) : null}
    </div>
  );
}

function Avisar() {
  const [bote, setBote] = useState<"creatina" | "whey">("creatina");
  const [gramos, setGramos] = useState("");
  const [dosis, setDosis] = useState<3 | 5>(3);
  const [raciones, setRaciones] = useState<"0,5" | "1" | "2">("1");
  const [correo, setCorreo] = useState("");
  const [acepta, setAcepta] = useState(false);
  const [intento, setIntento] = useState(false);
  const [hecho, setHecho] = useState(false);
  const id = useId();
  const valido = CORREO.test(correo) && acepta;

  const g = Number(gramos.replace(",", "."));
  let fecha = "[fecha]";
  if (bote === "creatina" && g > 0) {
    const d = new Date();
    d.setDate(d.getDate() + Math.floor(g / dosis));
    fecha = d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  if (hecho) return <Hecho texto="Te hemos mandado un enlace. Sin confirmar, no te escribiremos." />;
  return (
    <div className="llevate-form">
      <p>
        Te escribimos unos 7 días antes de que se acabe tu bote. Lo primero que te preguntamos es si lo sigues usando: con «Ya no
        lo uso», no te escribimos más. Es gratis. El correo no lleva enlaces de afiliado: si quieres comparar, te lleva al
        comparador de la web.
      </p>
      <fieldset className="campo">
        <legend>¿Qué bote?</legend>
        <div className="atajos">
          {(
            [
              ["creatina", "Creatina"],
              ["whey", "Proteína whey"],
            ] as const
          ).map(([v, t]) => (
            <label key={v} className="pastilla" data-marcada={bote === v ? "" : undefined}>
              <input type="radio" checked={bote === v} onChange={() => setBote(v)} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="campo">
        <label htmlFor={`${id}-g`}>Gramos del bote</label>
        <input id={`${id}-g`} type="text" inputMode="decimal" value={gramos} onChange={(e) => setGramos(e.target.value)} />
      </div>
      {bote === "creatina" ? (
        <fieldset className="campo">
          <legend>Gramos al día para la cuenta</legend>
          <label className="opcion">
            <input type="radio" checked={dosis === 3} onChange={() => setDosis(3)} />
            <span>3 g, la de la declaración autorizada</span>
          </label>
          <label className="opcion">
            <input type="radio" checked={dosis === 5} onChange={() => setDosis(5)} />
            <span>5 g, el máximo de lo que usan los consensos como dosis diaria</span>
          </label>
          {dosis === 5 ? (
            <p className="ayuda">
              La declaración autorizada se basa en 3 g al día; 5 g es el máximo de lo que usan los consensos como dosis diaria.
            </p>
          ) : null}
        </fieldset>
      ) : (
        <fieldset className="campo">
          <legend>Raciones de la etiqueta que tomas al día</legend>
          <div className="atajos">
            {(["0,5", "1", "2"] as const).map((r) => (
              <label key={r} className="pastilla" data-marcada={raciones === r ? "" : undefined}>
                <input type="radio" checked={raciones === r} onChange={() => setRaciones(r)} />
                <span>{r === "0,5" ? "½" : r}</span>
              </label>
            ))}
          </div>
          <p className="ayuda">Es lo que tú tomas, no una recomendación. Según la cantidad diaria que indica tu etiqueta.</p>
          <p className="ayuda">Hasta el máximo diario que indica tu etiqueta.</p>
        </fieldset>
      )}
      <p className="t-datos">Se acaba hacia el {fecha}</p>
      <Correo valor={correo} poner={setCorreo} error={intento && !CORREO.test(correo)} />
      <label className="opcion casilla-aparte">
        <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
        <span>Quiero recibir el aviso de que se acaba mi bote, con un enlace al comparador de la web. Solo para esto; no es un boletín.</span>
      </label>
      <Legal
        para="enviarte un correo hacia la fecha en que se acaba tu bote."
        cuanto="hasta que te des de baja, con un clic en cada correo."
      />
      <p className="t-nota">No te pedimos el peso ni la edad, y tu objetivo no va en el aviso. Es para mayores de 18 años.</p>
      <button
        type="button"
        className="boton boton-ver"
        aria-disabled={!valido}
        aria-describedby={!valido ? "motivo-avisar" : undefined}
        onClick={() => (valido ? setHecho(true) : setIntento(true))}
      >
        Apuntarme
      </button>
      {!valido ? (
        <p id="motivo-avisar" className="t-nota t-secundario">
          Para apuntarte, escribe tu correo y marca la casilla.
        </p>
      ) : null}
    </div>
  );
}
