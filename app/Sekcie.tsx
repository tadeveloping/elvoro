import { NASTROJE_1, NASTROJE_2, OBLASTI, POSTUP, type Ukazka } from "./obsah";

// Sekcie 01 až 03 (inšpirácia rozložením moshn.co, texty a ukážky vlastné). Interakcie sú v efektyV4.js.

function Scena({ id }: { id: string }) {
  if (id === "faktura") {
    return (
      <div className="demo-scena">
        <div className="doc-stlpec">
          <div className="doc" data-od="1">
            <div className="zdroj"><svg className="i"><use href="#envelope-simple" /></svg><span>uctovnictvo@vasafirma.sk</span></div>
            <div className="papier">
              <span className="k">Faktúra od dodávateľa</span>
              <div className="papier-riadok"><strong>Javorník Stav</strong><span className="mono">FA-1842</span></div>
              <div className="suma">2 400 €<span>splatná 30. 11.</span></div>
              <div className="papier-riadok ciara"><span>Stavebný materiál</span><span>2 400 €</span></div>
              <div className="papier-riadok ciara"><span>Objednávka</span><strong>OBJ-204</strong></div>
              <span className="priloha">↳ faktura-1842.pdf</span>
            </div>
          </div>
        </div>
        <div className="proc">
          <div className="karta zaznam" data-od="2">
            <div className="kh"><span className="znak" aria-hidden="true">P</span><strong>Návrh dokladu</strong><span className="st ok">Vyčítané</span></div>
            <dl>
              <div><dt>Dodávateľ</dt><dd>Javorník Stav</dd></div>
              <div><dt>Faktúra</dt><dd>FA-1842</dd></div>
              <div><dt>Suma</dt><dd>2 400 €</dd></div>
            </dl>
          </div>
          <div className="karta kontrola" data-od="3">
            <span className="vykricnik">!</span>
            <div><strong>Suma nesedí s objednávkou</strong><p>OBJ-204: 2 200 € · faktúra: 2 400 €</p></div>
            <b>+200 €</b>
          </div>
          <div className="karta smer" data-od="4">
            <span className="znak" aria-hidden="true">#</span>
            <div><strong>#schvalovanie-faktur</strong><p>Pred schválením skontrolovať rozdiel.</p></div>
            <span className="pill">Pozastavené</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="demo-scena">
      <div className="doc-stlpec">
        <div className="doc" data-od="1">
          <div className="zdroj"><svg className="i"><use href="#envelope-simple" /></svg><span>Podpora / #1086</span><span className="pill jemna">Bežná</span></div>
          <div className="papier sprava">
            <span className="avatar" aria-hidden="true">JK</span>
            <div><strong>Jana K.</strong><p>„Dobrý deň, kde je objednávka č. 1042? Od pondelka nemám žiadnu správu.“</p></div>
          </div>
        </div>
        <div className="karta kontext" data-od="2">
          <span className="znak" aria-hidden="true">S</span>
          <div><strong>Objednávka č. 1042</strong><p>Odoslaná · sledovanie dostupné</p></div>
          <span className="pill ok">✓ Nájdená</span>
        </div>
      </div>
      <div className="proc">
        <div className="karta zaznam" data-od="3">
          <div className="kh"><span className="iskra" aria-hidden="true">✦</span><strong>Navrhnutá odpoveď</strong><span className="st ok">Na kontrolu</span></div>
          <p className="odpoved">Dobrý deň, pani Jana, vaša objednávka je už na ceste. Zásielku môžete sledovať cez odkaz nižšie.</p>
          <span className="odkaz">Sledovať zásielku ↗</span>
          <p className="zdroje">Zdroj: objednávka č. 1042 · pravidlá dopravy</p>
        </div>
        <div className="karta smer" data-od="4">
          <span className="sipka" aria-hidden="true">↗</span>
          <div><strong>Reklamácia č. 1087</strong><p>Odovzdaná človeku z podpory aj s celou konverzáciou.</p></div>
          <span className="pill teplo">Rieši človek</span>
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
