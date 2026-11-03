import { NASTROJE_1, NASTROJE_2, OBLASTI, POSTUP, type Ukazka } from "./obsah";

// Sekcie 01 až 03 (inšpirácia rozložením moshn.co, texty a ukážky vlastné). Interakcie sú v effects.js.

function Scena({ id }: { id: string }) {
  if (id === "dopyt") {
    return (
      <div className="demo-scena">
        <div className="doc" data-od="1">
          <div className="zdroj"><svg className="i"><use href="#envelope-simple" /></svg><span>dopyty@vasafirma.sk</span></div>
          <div className="papier">
            <span className="k">Nový dopyt · Po 08:12</span>
            <strong>Peter Horváth</strong>
            <p>„Dobrý deň, potrebujem vymeniť bojler v rodinnom dome v Nitre. Kedy by ste mohli prísť?“</p>
          </div>
        </div>
        <div className="proc">
          <div className="karta zaznam" data-od="2">
            <div className="kh"><svg className="i"><use href="#file-text" /></svg><strong>Ponuka č. 2026-0418</strong><span className="st">Návrh</span></div>
            <dl>
              <div><dt>Bojler 120 l s montážou</dt><dd>690 €</dd></div>
              <div><dt>Demontáž a odvoz starého</dt><dd>60 €</dd></div>
              <div><dt>Spolu</dt><dd>750 €</dd></div>
            </dl>
          </div>
          <div className="karta kontrola" data-od="3">
            <span className="vykricnik">!</span>
            <div><strong>Chýba objem bojlera</strong><p>Cena ráta so 120 l. Treba overiť u zákazníka.</p></div>
            <b>?</b>
          </div>
          <div className="karta smer" data-od="4">
            <svg className="i"><use href="#bell-ringing" /></svg>
            <div><strong>Úloha: zavolať zákazníkovi</strong><p>Technik Marek · do utorka 12:00</p></div>
            <span className="pill">Pridelené</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="demo-scena">
      <div className="doc" data-od="1">
        <div className="zdroj"><svg className="i"><use href="#envelope-simple" /></svg><span>objednavky@vasafirma.sk</span></div>
        <div className="papier">
          <span className="k">Objednávka · Ut 14:05</span>
          <strong>Stavebniny Kováč</strong>
          <p>„Prosím 40 m² dlažby 60×60 a 10 vriec lepidla C2, dovoz v piatok.“</p>
        </div>
      </div>
      <div className="proc">
        <div className="karta zaznam" data-od="2">
          <div className="kh"><svg className="i"><use href="#table" /></svg><strong>Objednávka č. 1187</strong><span className="st">Zapísaná</span></div>
          <dl>
            <div><dt>Dlažba 60×60</dt><dd>40 m²</dd></div>
            <div><dt>Lepidlo C2</dt><dd>10 ks</dd></div>
            <div><dt>Dovoz</dt><dd>piatok</dd></div>
          </dl>
        </div>
        <div className="karta kontrola" data-od="3">
          <span className="vykricnik">!</span>
          <div><strong>Dlažba: na sklade 32 m²</strong><p>Objednávka chce 40 m², chýba 8 m².</p></div>
          <b>−8 m²</b>
        </div>
        <div className="karta smer" data-od="4">
          <svg className="i"><use href="#kanban" /></svg>
          <div><strong>Nákup: doobjednať 8 m²</strong><p>Potvrdenie zákazníkovi čaká na kontrolu.</p></div>
          <span className="pill">Na kontrolu</span>
        </div>
      </div>
    </div>
  );
}

export function Ukazka({ u }: { u: Ukazka }) {
  return (
    <div className="uc">
      <div className="uc-text">
        <p className="label">{u.stitok}</p>
        <h3>{u.nadpis[0]}<br /><em>{u.nadpis[1]}</em></h3>
        <p className="uc-telo">{u.text}</p>
        <dl className="uc-zmena">
          <div><dt>Dnes</dt><dd>{u.dnes}</dd></div>
          <div><dt>S automatizáciou</dt><dd>{u.teraz}</dd></div>
        </dl>
        <ul className="uc-nastroje" aria-label="Nástroje v ukážke">
          {u.nastroje.map((n) => <li key={n}><span className="znak" aria-hidden="true">{n.charAt(0)}</span>{n}</li>)}
        </ul>
      </div>
      <div className="demo" data-demo={u.id} data-step="1">
        <div className="demo-top">
          <span className="live"><i />Interaktívna ukážka</span>
          <button type="button" className="demo-play" aria-pressed="false">Pozastaviť</button>
        </div>
        <Scena id={u.id} />
        <ol className="demo-popis" aria-live="polite">
          {u.kroky.map((k, i) => (
            <li key={k.nazov} data-k={i + 1} hidden={i > 0}><strong>{k.titul}</strong><p>{k.text}</p></li>
          ))}
        </ol>
        <div className="demo-kroky" aria-label="Kroky ukážky">
          {u.kroky.map((k, i) => (
            <button key={k.nazov} type="button" data-k={i + 1} aria-current={i === 0 ? "step" : undefined}>
              <span>{String(i + 1).padStart(2, "0")}</span>{k.nazov}<i />
            </button>
          ))}
        </div>
        <p className="demo-pozn">Ilustračná ukážka · vymyslené údaje</p>
      </div>
    </div>
  );
}

const DROTY_DNU = ["M0 22 C50 22 50 50 100 50", "M0 50 L100 50", "M0 78 C50 78 50 50 100 50"];
const DROTY_VON = ["M0 50 C50 50 50 22 100 22", "M0 50 L100 50", "M0 50 C50 50 50 78 100 78"];

function Droty({ cesty }: { cesty: string[] }) {
  return (
    <svg className="ex-droty" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {cesty.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

export function Oblasti() {
  return (
    <div className="ex">
      <div className="ex-zalozky" role="tablist" aria-label="Čo staviame">
        {OBLASTI.map((o, i) => (
          <button key={o.id} id={`zalozka-${o.id}`} type="button" role="tab" aria-selected={i === 0} aria-controls={`panel-${o.id}`} tabIndex={i === 0 ? 0 : -1}>
            {o.zalozka}
          </button>
        ))}
      </div>
      {OBLASTI.map((o, i) => (
        <div key={o.id} id={`panel-${o.id}`} className="ex-panel" role="tabpanel" aria-labelledby={`zalozka-${o.id}`} hidden={i > 0}>
          <div className="ex-titul">
            <h3>{o.nadpis}{o.pripravujeme && <span className="soon">Pripravujeme</span>}</h3>
            <p>{o.podnadpis}</p>
          </div>
          <div className="ex-tok">
            <div className="ex-stlpec">
              <p className="label">{o.zdrojeNadpis}</p>
              {o.zdroje.map((z) => <div key={z} className="ex-uzol">{z}</div>)}
            </div>
            <Droty cesty={DROTY_DNU} />
            <div className="ex-jadro">
              <span className="ex-bod" aria-hidden="true" />
              <h4>Váš firemný proces</h4>
              <p>{o.jadro}</p>
            </div>
            <Droty cesty={DROTY_VON} />
            <ul className="ex-stlpec ex-von">
              {o.vystupy.map((v) => (
                <li key={v} className="ex-uzol"><svg className="i"><use href="#check-circle" /></svg>{v}</li>
              ))}
            </ul>
          </div>
          <p className="ex-text">{o.text}</p>
        </div>
      ))}
    </div>
  );
}

function Rad({ nazvy, opacne }: { nazvy: string[]; opacne?: boolean }) {
  const polozky = (skryte: boolean) => (
    <div className="pas-sada" aria-hidden={skryte || undefined}>
      {[...nazvy, ...nazvy].map((n, i) => <span key={`${n}-${i}`} className="pas-nastroj"><span className="znak" aria-hidden="true">{n.charAt(0)}</span>{n}</span>)}
    </div>
  );
  return (
    <div className={`pas-rad${opacne ? " opacne" : ""}`}>
      <div className="pas-kolaj">{polozky(false)}{polozky(true)}</div>
    </div>
  );
}

export function Nastroje() {
  return (
    <div className="pas" role="group" aria-label="Nástroje, s ktorými firmy pracujú">
      <Rad nazvy={NASTROJE_1} />
      <Rad nazvy={NASTROJE_2} opacne />
    </div>
  );
}

export function Postup({ rezervacia }: { rezervacia: string }) {
  return (
    <ol className="os">
      {POSTUP.map((e, i) => (
        <li key={e.stitok}>
          <span className="os-bod">{String(i + 1).padStart(2, "0")}</span>
          <p className="label">{e.stitok}</p>
          <h3>{e.nadpis}</h3>
          <p>{e.text}</p>
          <p className="os-dost"><b>Dostanete:</b> {e.dostanete}</p>
          {e.rezervacia && rezervacia && <p><a className="step-link" href={rezervacia} target="_blank" rel="noopener">Rezervovať termín →</a></p>}
        </li>
      ))}
    </ol>
  );
}
