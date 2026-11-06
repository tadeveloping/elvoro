import { Effects } from "./Effects";
import { Sprite } from "./Sprite";
import { DEFINICIA, INSTAGRAM, PREVADZKOVATEL, REZERVACIA_URL, SITE_URL } from "./config";
import { FAQ } from "./faq";
import { UKAZKA_FAKTURA, UKAZKA_PODPORA } from "./obsah";
import { Nastroje, Oblasti, Postup, Ukazka } from "./Sekcie";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organizacia`,
      name: "Elvoro",
      url: SITE_URL,
      logo: `${SITE_URL}/elvoro-logo.png`,
      description: DEFINICIA,
      slogan: "AI po ľudsky",
      areaServed: { "@type": "Country", name: "Slovensko" },
      knowsLanguage: "sk",
      sameAs: [INSTAGRAM],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.filter((f) => f.hotova).map((f) => ({
        "@type": "Question",
        name: f.otazka,
        acceptedAnswer: { "@type": "Answer", text: f.odpoved },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Sprite />
      <header className="top">
        <div className="wrap">
          <a className="logo" href="#uvod"><svg className="logo-svg" viewBox="-380 -675 5142 700" role="img" aria-label="Elvoro"><g transform="scale(1 -1)"><rect className="logo-ciara" x="-370.0" y="312.5" width="4294.0" height="22.0"/><path transform="translate(0.0 0)" d="M210 270V111H709V0H77V647H708V536H210V375H618V270Z" fill="currentColor"/><path transform="translate(749.0 0)" d="M210 647V111H640V0H77V647Z" fill="currentColor"/><path transform="translate(1416.0 0)" d="M306 0 20 647H167L412 63H366L610 647H755L472 0Z" fill="currentColor"/><path transform="translate(2171.0 0)" d="M462 -13Q333 -13 241.5 27.5Q150 68 101.5 143.0Q53 218 53 323Q53 429 101.5 504.0Q150 579 241.5 619.5Q333 660 462 660Q592 660 683.0 619.5Q774 579 822.5 504.0Q871 429 871 323Q871 218 822.5 143.0Q774 68 683.0 27.5Q592 -13 462 -13ZM462 102Q542 102 602.5 126.0Q663 150 697.5 199.0Q732 248 732 323Q732 398 697.5 447.0Q663 496 602.5 520.5Q542 545 462 545Q383 545 321.0 520.5Q259 496 224.0 447.0Q189 398 189 323Q189 248 224.0 199.0Q259 150 321.0 126.0Q383 102 462 102Z" fill="currentColor"/><path transform="translate(3075.0 0)" d="M77 0V647H516Q591 647 646.5 626.5Q702 606 733.0 562.5Q764 519 764 451Q764 405 748.0 373.0Q732 341 703.5 321.0Q675 301 638.0 290.5Q601 280 559 277L545 285Q615 284 660.0 273.5Q705 263 727.5 235.5Q750 208 750 154V0H617V145Q617 182 604.0 202.5Q591 223 557.5 231.0Q524 239 461 239H210V0ZM210 343H516Q572 343 601.5 370.0Q631 397 631 443Q631 487 601.5 510.0Q572 533 516 533H210Z" fill="currentColor"/><path transform="translate(3881.0 0)" d="M462 -13Q333 -13 241.5 27.5Q150 68 101.5 143.0Q53 218 53 323Q53 429 101.5 504.0Q150 579 241.5 619.5Q333 660 462 660Q592 660 683.0 619.5Q774 579 822.5 504.0Q871 429 871 323Q871 218 822.5 143.0Q774 68 683.0 27.5Q592 -13 462 -13ZM462 102Q542 102 602.5 126.0Q663 150 697.5 199.0Q732 248 732 323Q732 398 697.5 447.0Q663 496 602.5 520.5Q542 545 462 545Q383 545 321.0 520.5Q259 496 224.0 447.0Q189 398 189 323Q189 248 224.0 199.0Q259 150 321.0 126.0Q383 102 462 102Z" fill="currentColor"/><circle cx="4248.9" cy="386.8" r="36.4" fill="currentColor"/><circle cx="4415.0" cy="386.8" r="36.4" fill="currentColor"/><path d="M4238.3 256.2 Q4334.8 179.5 4431.3 256.2" stroke="currentColor" strokeWidth="45.0" fill="none" strokeLinecap="round"/></g></svg></a>
          <nav className="links" aria-label="Hlavná navigácia">
            <a className="nl" href="#v-praxi">Ukážka</a>
            <a className="nl" href="#staviame">Čo staviame</a>
            <a className="nl" href="#postup">Ako to prebieha</a>
            <button className="tema" type="button" id="tema" aria-label="Prepnúť na tmavý režim" aria-pressed="false">
              <svg className="mesiac" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.6 6.6 0 0 0 10.7 10.7z" /></svg>
              <svg className="slnko" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" /></svg>
            </button>
            <a className="btn small" href="#prihlaska">Zistiť, či sme pre seba</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero ma-pole" id="uvod">
          <canvas className="pole" data-pole="uvod" aria-hidden="true"></canvas>
          <div className="wrap">
            <div className="hero-main">
              <p className="eyebrow" data-in>Chcete vo firme využiť AI, ale neviete ako?</p>
              <h1><span className="ln" data-in>Ukážeme vám kde.</span><span className="ln" data-in>A postavíme to.</span></h1>
              <p className="lead" data-in>Zmapujeme, kde vaša firma stráca čas, a postavíme riešenie na mieru, ktoré rutinu prevezme. Od jednoduchých automatizácií po vlastný firemný systém.</p>
              <div className="cta" data-in>
                <a className="btn" href="#prihlaska">Zistiť, či sme pre seba <svg className="i"><use href="#arrow-right"/></svg></a>
                {REZERVACIA_URL ? (
                  <a className="btn ghost" href={REZERVACIA_URL} target="_blank" rel="noopener">Rezervovať 30 min hovor</a>
                ) : (
                  <a className="btn ghost" href="#v-praxi">Pozrieť ukážku</a>
                )}
              </div>
              <p className="hero-def" data-in>{DEFINICIA}</p>
            </div>
            <div className="smiley-wrap" data-in>
              <canvas id="smiley" role="img" aria-label="Smajlík Elvora zo znakov"></canvas>
            </div>
          </div>
        </section>

        <section className="block answer" id="kde-zacat">
          <div className="wrap">
            <div className="answer-q">
              <span className="label">Najčastejšia otázka</span>
              <h2>Kde začať s AI vo firme?</h2>
            </div>
            <div className="answer-a">
              <p>Záleží na tom, čo vás brzdí najviac. Ak sa stráca čas na e-mailoch, ponukách a prepisovaní, začnite automatizáciou jedného procesu, napríklad od dopytu po faktúru. Ak máte dáta rozhádzané v piatich nástrojoch, najprv ich spojte do jedného firemného systému, až potom má AI z čoho čerpať. Kde presne začať u vás, zistíme na Mape firmy.</p>
              <ul className="answer-links">
                <li><a href="#staviame">Firemný systém</a></li>
                <li><a href="#v-praxi">Automatizácia</a></li>
                <li><a href="#postup">Mapa firmy</a></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="block" id="problemy">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Čo firmy trápi</span>
              <h2>Spoznávate sa v niečom z toho?</h2>
              <p>Toto počúvame od malých firiem aj od veľkých tímov. Ku každej situácii máme riešenie.</p>
            </div>
            <ul className="pains">
              <li className="pain"><q>Polovica dňa ide na e-maily, ponuky a prepisovanie do tabuliek.</q><p>Riešenie: <a href="#v-praxi">automatizácia</a></p></li>
              <li className="pain"><q>Každé oddelenie má vlastný systém a nič spolu nehovorí. Report pre vedenie skladáme ručne.</q><p>Riešenie: prepojenie systémov a reporty, ktoré sa pripravia samy.</p></li>
              <li className="pain"><q>Zákazník volal, nikto to nezdvihol a zákazku dostal niekto iný.</q><p>Riešenie: <a href="#staviame">AI hlasový agent</a> (pripravujeme)</p></li>
              <li className="pain"><q>Ľudia používajú AI na vlastnú päsť a nevieme, aké firemné dáta do nej posielajú.</q><p>Riešenie: jasné pravidlá a bezpečné AI nástroje pre celú firmu.</p></li>
              <li className="pain"><q>Úlohy máme v jednej appke, čísla v Exceli a dohody v e-mailoch. Prehľad nemá nikto.</q><p>Riešenie: <a href="#staviame">vlastný firemný systém</a></p></li>
              <li className="pain"><q>Know-how je v hlavách pár ľudí. Nový človek sa zaúča mesiace.</q><p>Riešenie: firemný AI asistent, ktorý pozná vaše dokumenty a postupy.</p></li>
            </ul>
          </div>
        </section>

        <section className="block" id="v-praxi">
          <div className="wrap">
            <div className="c-head">
              <span className="label">01 / Automatizácia v praxi</span>
              <h2>Z e-mailu rovno do systému. <em>Vy len potvrdíte.</em></h2>
              <p>Jeden príklad: príde faktúra, údaje sa pripravia samy a nezrovnalosť dostane správny človek.</p>
              <p className="pozn">Ukážky sú ilustračné, s vymyslenými údajmi. Vaše riešenie postavíme podľa vašich postupov a nástrojov.</p>
            </div>
            <Ukazka u={UKAZKA_FAKTURA} />
            <details className="viac">
              <summary><span><span className="label">Ďalší príklad</span><strong>A čo zákaznícka podpora?</strong></span></summary>
              <Ukazka u={UKAZKA_PODPORA} />
            </details>
          </div>
        </section>

        <section className="block" id="staviame">
          <div className="wrap">
            <div className="c-head">
              <span className="label">02 / Čo ešte staviame</span>
              <h2>Začnite tým, čo vás brzdí <em>každý týždeň.</em></h2>
              <p>Report, ktorý niekto skladá každý piatok. Dopyt, na ktorý sa zabudlo. Postup, ktorý vie len jeden človek. Vyberte oblasť a pozrite, čo vieme zobrať z plecí vášmu tímu.</p>
            </div>
            <Oblasti />
          </div>
        </section>

        <section className="block" id="nastroje">
          <div className="wrap">
            <div className="c-head">
              <span className="label">Nástroje, ktoré už máte</span>
              <h2>Postavené okolo toho, <em>čo už používate.</em></h2>
              <p>Nič neprerábame zbytočne. Najprv pozrieme, s čím vaši ľudia pracujú a čo sa dá prepojiť. Ak by sa oplatil nový nástroj, dozviete sa dôvod aj cenu skôr, než sa rozhodnete.</p>
            </div>
            <Nastroje />
            <div className="pas-vyzva">
              <p>Menej ručnej práce v celej firme.</p>
              <a className="btn" href={REZERVACIA_URL || "#prihlaska"} {...(REZERVACIA_URL ? { target: "_blank", rel: "noopener" } : {})}>Rezervovať úvodný hovor <svg className="i"><use href="#arrow-right"/></svg></a>
              <small>30 minút · zadarmo · nezáväzne</small>
            </div>
          </div>
        </section>

        <section className="block idea ma-pole" id="napad">
          <canvas className="pole" data-pole="vyzva" aria-hidden="true"></canvas>
          <div className="wrap">
            <div>
              <h2>Máte vlastný nápad? Postavíme ho.</h2>
              <p>Napíšte nám v prihláške, čo vaša firma robí a kde stráca čas. Na prvý hovor prídeme s konkrétnymi návrhmi.</p>
            </div>
            <a className="btn" href="#prihlaska">Zistiť, či sme pre seba <svg className="i"><use href="#arrow-right"/></svg></a>
          </div>
        </section>

        <section className="block" id="prax">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Z praxe</span>
              <h2>Čo sa zmenilo u našich klientov.</h2>
              <p>Len skutočné projekty a len so súhlasom klienta. Žiadne vymyslené čísla.</p>
            </div>
            <div className="cases">
              <article className="case">
                <span className="ph">Príbeh 1 · čaká na súhlas klienta</span>
                <dl>
                  <div><dt>Firma</dt><dd>Typ firmy, veľkosť</dd></div>
                  <div><dt>Predtým</dt><dd>Čo firmu trápilo a koľko času to bralo</dd></div>
                  <div><dt>Čo sme postavili</dt><dd>Riešenie jednou vetou</dd></div>
                  <div><dt>Teraz</dt><dd>Čo sa zmenilo, slovami klienta</dd></div>
                </dl>
              </article>
              <article className="case">
                <span className="ph">Príbeh 2 · čaká na súhlas klienta</span>
                <dl>
                  <div><dt>Firma</dt><dd>Typ firmy, veľkosť</dd></div>
                  <div><dt>Predtým</dt><dd>Čo firmu trápilo a koľko času to bralo</dd></div>
                  <div><dt>Čo sme postavili</dt><dd>Riešenie jednou vetou</dd></div>
                  <div><dt>Teraz</dt><dd>Čo sa zmenilo, slovami klienta</dd></div>
                </dl>
              </article>
            </div>
          </div>
        </section>

        <section className="block" id="postup">
          <div className="wrap">
            <div className="c-head">
              <span className="label">03 / Ako to prebieha</span>
              <h2>Začnite jedným procesom. <em>Uvidíte, čo sa zmení.</em></h2>
              <p>Mapovanie začína už v prihláške. Na prvý hovor preto neprichádzame s otázkami, ale s návrhmi.</p>
            </div>
            <Postup rezervacia={REZERVACIA_URL} />
            <details className="viac os-viac">
              <summary><span><strong>Čo treba od vás a koľko to stojí?</strong></span></summary>
              <dl>
                <div><dt>Od vás</dt><dd>Človek, ktorý proces pozná, prístup k dohodnutým nástrojom a pár skutočných príkladov (e-maily, ponuky, tabuľky).</dd></div>
                <div><dt>Od nás</dt><dd>Nastavenie, prepojenia, testy s vaším tímom, návod a zaučenie ľudí.</dd></div>
                <div><dt>Pred rozhodnutím</dt><dd>Cenu stavby, mesačné náklady na nástroje a AI aj správu poznáte vopred. Mapa firmy stojí 300 až 500 € a odpočíta sa zo zákazky.</dd></div>
                <div><dt>Systém a dáta</dt><dd>Patria vašej firme. Ak spoluprácu ukončíme, všetko ostáva u vás.</dd></div>
              </dl>
            </details>
          </div>
        </section>

        <section className="block" id="kto">
          <div className="wrap about">
            <figure className="portrait small">
              <span className="ph">Fotka zakladateľa · doplniť</span>
            </figure>
            <div className="about-text">
              <span className="label">Kto stojí za Elvorom</span>
              <h2>AI na rutinu. Hlava a kreativita zostávajú vaše.</h2>
              <p>Elvoro založil [meno, doplniť]. Pre firmy stavia systémy, automatizácie a weby a pri každom projekte videl to isté: firmy AI chcú, ale nemajú čas ani ľudí, aby sa ju naučili samy. Preto Elvoro neučí kurzy. Riešenie postavíme a zavedieme za vás.</p>
              <blockquote>
                <p>„Citát zakladateľa v prvej osobe: prečo to robím a na čom mi záleží. Doplniť.“</p>
                <footer>Meno Priezvisko, zakladateľ</footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="block apply" id="prihlaska">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Prihláška</span>
              <h2>Zistime, či sme pre seba.</h2>
              <p>Pár otázok o vašej firme. Čím presnejšie odpoviete, tým konkrétnejší návrh prinesieme na prvý hovor. Rozpracované odpovede sa uložia vo vašom prehliadači.</p>
            </div>

            <form className="wiz" id="wiz" noValidate>
              <div className="wiz-top">
                <span className="label" id="wizCount">Krok 1 z 8</span>
                <div className="wiz-prog" aria-hidden="true"><div id="wizBar"></div></div>
              </div>

              <fieldset className="q" data-step="1">
                <h3 className="qt">S čím vám môžeme pomôcť?</h3>
                <div className="opts col">
                  <label className="opt"><input type="radio" name="cesta" value="A" id="cA" /><span><b>Zjednodušiť prácu vo firme</b><small>Pomôžeme nájsť, kde vám AI ušetrí najviac času, a zavedieme ju</small></span></label>
                  <label className="opt"><input type="radio" name="cesta" value="B" id="cB" /><span><b>Systém na mieru</b><small>Nahradiť rozhádzané nástroje a Excely jedným systémom</small></span></label>
                  <label className="opt"><input type="radio" name="cesta" value="C" id="cC" /><span><b>Mám nápad na projekt</b><small>Viem, čo chcem postaviť, hľadám, kto to zrealizuje</small></span></label>
                </div>
              </fieldset>

              <fieldset className="q" data-step="2" hidden>
                <h3 className="qt">Povedzte nám o firme.</h3>
                <div className="fields">
                  <label className="fld"><span>Názov firmy</span><input type="text" id="firma" name="firma" autoComplete="organization" /></label>
                  <label className="fld"><span>Web (ak máte)</span><input type="text" id="web" name="web" inputMode="url" placeholder="www." /></label>
                </div>
                <p className="sub">Koľko ľudí vo firme pracuje?</p>
                <div className="opts row">
                  <label className="opt pill"><input type="radio" name="velkost" value="1-5" id="v1" /><span>1 až 5</span></label>
                  <label className="opt pill"><input type="radio" name="velkost" value="6-20" id="v2" /><span>6 až 20</span></label>
                  <label className="opt pill"><input type="radio" name="velkost" value="21-50" id="v3" /><span>21 až 50</span></label>
                  <label className="opt pill"><input type="radio" name="velkost" value="51-250" id="v4" /><span>51 až 250</span></label>
                  <label className="opt pill"><input type="radio" name="velkost" value="250+" id="v5" /><span>viac ako 250</span></label>
                </div>
              </fieldset>

              <fieldset className="q" data-step="3" hidden>
                <h3 className="qt">Čo vaša firma robí a kto sú vaši zákazníci?</h3>
                <label className="fld"><span>Stačia 2 až 3 vety</span><textarea id="coRobite" name="coRobite" rows={4} placeholder="Napríklad: Montujeme kúrenie pre rodinné domy a menšie firmy v okolí Nitry."></textarea></label>
              </fieldset>

              <fieldset className="q" data-step="4" hidden>
                <div data-path="A">
                  <h3 className="qt">Čo vám zaberá najviac času?</h3>
                  <p className="sub">Vyberte všetko, čo platí.</p>
                  <div className="opts grid">
                    <label className="opt pill"><input type="checkbox" name="cas" value="emaily" id="t1" /><span>E-maily a komunikácia</span></label>
                    <label className="opt pill"><input type="checkbox" name="cas" value="ponuky" id="t2" /><span>Ponuky a kalkulácie</span></label>
                    <label className="opt pill"><input type="checkbox" name="cas" value="faktury" id="t3" /><span>Faktúry a administratíva</span></label>
                    <label className="opt pill"><input type="checkbox" name="cas" value="objednavky" id="t4" /><span>Objednávky a sklad</span></label>
                    <label className="opt pill"><input type="checkbox" name="cas" value="planovanie" id="t5" /><span>Plánovanie a termíny</span></label>
                    <label className="opt pill"><input type="checkbox" name="cas" value="reporty" id="t6" /><span>Reporty a tabuľky</span></label>
                    <label className="opt pill"><input type="checkbox" name="cas" value="telefony" id="t7" /><span>Telefonáty zákazníkov</span></label>
                    <label className="opt pill"><input type="checkbox" name="cas" value="znalosti" id="t8" /><span>Zaúčanie a hľadanie informácií</span></label>
                    <label className="opt pill"><input type="checkbox" name="cas" value="obsah" id="t9" /><span>Obsah a sociálne siete</span></label>
                  </div>
                </div>
                <div data-path="B" hidden>
                  <h3 className="qt">Čo dnes používate?</h3>
                  <p className="sub">Vyberte všetko, čo platí.</p>
                  <div className="opts grid">
                    <label className="opt pill"><input type="checkbox" name="nastroje" value="Excel alebo Google Tabuľky" id="n1" /><span>Excel alebo Google Tabuľky</span></label>
                    <label className="opt pill"><input type="checkbox" name="nastroje" value="ClickUp, Asana alebo Trello" id="n2" /><span>ClickUp, Asana, Trello</span></label>
                    <label className="opt pill"><input type="checkbox" name="nastroje" value="e-maily" id="n3" /><span>E-maily</span></label>
                    <label className="opt pill"><input type="checkbox" name="nastroje" value="WhatsApp skupiny" id="n4" /><span>WhatsApp skupiny</span></label>
                    <label className="opt pill"><input type="checkbox" name="nastroje" value="CRM" id="n5" /><span>CRM</span></label>
                    <label className="opt pill"><input type="checkbox" name="nastroje" value="papier" id="n6" /><span>Papier a zošity</span></label>
                  </div>
                </div>
                <div data-path="C" hidden>
                  <h3 className="qt">Opíšte váš nápad.</h3>
                  <label className="fld"><span>Čo by to malo robiť a pre koho</span><textarea id="napadText" name="napadText" rows={4}></textarea></label>
                  <p className="sub">Čo už máte?</p>
                  <div className="opts row">
                    <label className="opt pill"><input type="radio" name="mame" value="nic" id="m1" /><span>Len nápad</span></label>
                    <label className="opt pill"><input type="radio" name="mame" value="nacrt" id="m2" /><span>Náčrt alebo zadanie</span></label>
                    <label className="opt pill"><input type="radio" name="mame" value="dizajn" id="m3" /><span>Dizajn</span></label>
                  </div>
                </div>
              </fieldset>

              <fieldset className="q" data-step="5" hidden>
                <h3 className="qt">Opíšte jednu úlohu, ktorá vás najviac zdržuje.</h3>
                <label className="fld"><span>Kto ju robí, ako často a ako dlho trvá</span><textarea id="uloha" name="uloha" rows={4} placeholder="Napríklad: Každý piatok Jana tri hodiny prepisuje objednávky z e-mailov do Excelu."></textarea></label>
              </fieldset>

              <fieldset className="q" data-step="6" hidden>
                <h3 className="qt">Ako je na tom vaša firma s AI?</h3>
                <div className="opts col">
                  <label className="opt"><input type="radio" name="ai" value="nie" id="a1" /><span><b>Zatiaľ nepoužívame</b></span></label>
                  <label className="opt"><input type="radio" name="ai" value="vlastna" id="a2" /><span><b>Ľudia si ju skúšajú na vlastnú päsť</b></span></label>
                  <label className="opt"><input type="radio" name="ai" value="nechytilo" id="a3" /><span><b>Skúsili sme, ale nechytilo sa to</b></span></label>
                  <label className="opt"><input type="radio" name="ai" value="aktivne" id="a4" /><span><b>Používame ju aktívne</b></span></label>
                </div>
              </fieldset>

              <fieldset className="q" data-step="7" hidden>
                <h3 className="qt">Kedy chcete začať?</h3>
                <div className="opts row">
                  <label className="opt pill"><input type="radio" name="kedy" value="hned" id="k1" /><span>Hneď</span></label>
                  <label className="opt pill"><input type="radio" name="kedy" value="mesiac" id="k2" /><span>Do mesiaca</span></label>
                  <label className="opt pill"><input type="radio" name="kedy" value="3mesiace" id="k3" /><span>Do 3 mesiacov</span></label>
                  <label className="opt pill"><input type="radio" name="kedy" value="zistujeme" id="k4" /><span>Zatiaľ zisťujeme</span></label>
                </div>
              </fieldset>

              <fieldset className="q" data-step="8" hidden>
                <h3 className="qt">Kam sa vám máme ozvať?</h3>
                <div className="fields">
                  <label className="fld"><span>Meno a priezvisko</span><input type="text" id="meno" name="meno" autoComplete="name" /></label>
                  <label className="fld"><span>E-mail</span><input type="email" id="email" name="email" autoComplete="email" /></label>
                  <label className="fld"><span>Telefón</span><input type="tel" id="telefon" name="telefon" autoComplete="tel" /></label>
                </div>
                <p className="sub fine">Údaje použijeme len na odpoveď na vašu prihlášku. Podrobnosti v časti <a href="/ochrana-osobnych-udajov">Ochrana osobných údajov</a>.</p>
              </fieldset>

              <div className="hp" aria-hidden="true"><label>Toto pole nevypĺňajte<input type="text" id="hp" name="hp" tabIndex={-1} autoComplete="off" /></label></div>

              <p className="err" id="wizErr" role="alert" hidden></p>

              <div className="wiz-nav">
                <button className="btn ghost" type="button" id="wizBack" hidden>Späť</button>
                <button className="btn" type="button" id="wizNext">Pokračovať <svg className="i"><use href="#arrow-right"/></svg></button>
                <button className="btn" type="submit" id="wizSend" hidden>Odoslať prihlášku</button>
              </div>

              <div className="done" id="wizDone" hidden>
                <span className="label">Prihláška prijatá</span>
                <h3 id="doneTitle">Ďakujeme.</h3>
                <p>Toto vidíme z vašich odpovedí už teraz. Na hovore to prejdeme podrobne:</p>
                <ul className="opps" id="opps"></ul>
                {REZERVACIA_URL ? (
                  <p className="fine">Termín úvodného hovoru si môžete <a href={REZERVACIA_URL} target="_blank" rel="noopener">rezervovať hneď tu</a>, alebo sa vám ozveme e-mailom.</p>
                ) : (
                  <p className="fine">Ozveme sa vám e-mailom s návrhom termínu hovoru.</p>
                )}
                <button className="btn ghost small" type="button" id="wizReset">Vyplniť znova</button>
              </div>
            </form>
          </div>
        </section>

        <section className="block" id="faq">
          <div className="wrap faq">
            <div className="sec-head">
              <span className="label">Časté otázky</span>
              <h2>Čo sa nás firmy pýtajú.</h2>
            </div>
            <div className="qa">
              {FAQ.map((f) => (
                <details key={f.otazka}><summary>{f.otazka}</summary><p>{f.odpoved}</p></details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap"><span>ELVORO · AI po ľudsky</span><span>{PREVADZKOVATEL}</span><a href="/ochrana-osobnych-udajov">Ochrana osobných údajov</a></div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Effects />
    </>
  );
}
