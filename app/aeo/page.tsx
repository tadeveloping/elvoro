import type { Metadata } from "next";
import { REZERVACIA_URL, SITE_URL } from "../config";

const TITLE = "AEO kontrola webu: vie váš web prečítať ChatGPT? · Elvoro";
const DESCRIPTION =
  "Kontrolný zoznam v 9 bodoch, podľa ktorého zistíte, či váš web vedia prečítať a odporúčať AI asistenti ako ChatGPT, Perplexity alebo Google.";
const PUBLIKOVANE = "2026-11-05";
const AKTUALIZOVANE = "2026-11-05";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/aeo" },
  openGraph: { type: "article", locale: "sk_SK", siteName: "Elvoro", title: TITLE, description: DESCRIPTION, url: "/aeo" },
};

// Obsah vychádza z postupu aeo-web (company-os). Nič netvrdí o výsledkoch, len o dobrej praxi.
const BODY: { nadpis: string; preco: string; test: string }[] = [
  {
    nadpis: "Dôležitý obsah je priamo v HTML",
    preco: "Niektorí AI roboti nespúšťajú JavaScript. Ak sa služby, ceny alebo kontakt načítajú až dodatočne, nemusia ich vidieť.",
    test: "Na stránke kliknite pravým tlačidlom, zvoľte Zobraziť zdrojový kód stránky a vyhľadajte (Ctrl+F) názov služby alebo cenu. Ak tam nie je, robot ho pravdepodobne nevidí.",
  },
  {
    nadpis: "Na úvode je jedna veta: čo ste, pre koho, čo robíte",
    preco: "Namiesto sloganu napíšte vetu, ktorú vie AI zopakovať. Vzor: firma je (čo) pre (koho), ktorý (čo robí).",
    test: "Prečítajte si prvú obrazovku webu. Dozvie sa cudzí človek do 10 sekúnd, čo robíte a pre koho?",
  },
  {
    nadpis: "Otázka zákazníka ako nadpis a krátka odpoveď",
    preco: "Zákazníci sa AI pýtajú celými vetami. Dajte na stránku otázku, ktorú naozaj kladú, a odpoveď do 100 slov, ideálne so „záleží na tom“ a komu sa čo hodí.",
    test: "Pozrite sa na posledných päť dopytov od zákazníkov. Odpovedá na ich otázky niektorá stránka vášho webu?",
  },
  {
    nadpis: "robots.txt neblokuje AI vyhľadávanie",
    preco:
      "V súbore robots.txt nesmú byť zablokovaní roboti, ktorí hľadajú pre AI asistentov: OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Googlebot a Bingbot. Roboti na tréning modelov (GPTBot, ClaudeBot, Google-Extended) sú samostatné rozhodnutie.",
    test: "Otvorte vasa-domena.sk/robots.txt. Ak tam vidíte Disallow: / pre uvedených robotov, odblokujte ich. Ak web beží cez Cloudflare, skontrolujte aj jeho nastavenie blokovania AI robotov.",
  },
  {
    nadpis: "Sitemap s dátumom poslednej zmeny",
    preco: "Súbor sitemap.xml pomáha robotom nájsť stránky a vedieť, ktoré sú čerstvé.",
    test: "Otvorte vasa-domena.sk/sitemap.xml. Majú byť v ňom vaše hlavné stránky s dátumom zmeny (lastmod) a odkaz naň má byť v robots.txt.",
  },
  {
    nadpis: "Štruktúrované dáta (schema.org)",
    preco: "Strojovo čitateľný popis firmy, produktov a často kladených otázok. Podľa webu sa používajú typy Organization, LocalBusiness, Product alebo FAQPage.",
    test: "Vložte adresu do nástroja Google Rich Results Test (search.google.com/test/rich-results) a pozrite sa, čo nájde.",
  },
  {
    nadpis: "Fakty majú dátum, referencie sú text",
    preco: "Ceny, počty a hodnotenia uvádzajte s dátumom, napríklad „k novembru 2026“. Referencie píšte ako text, nie ako obrázok.",
    test: "Skúste myšou označiť text referencie. Ak sa to nedá, je to obrázok a robot ho neprečíta.",
  },
  {
    nadpis: "Web je prístupný a správne označený",
    preco: "Tlačidlá a polia formulára majú názov, obrázky popis (alt) a stránka jeden hlavný nadpis. Rovnakú štruktúru, ktorú používa čítačka obrazovky, vie využiť aj robot.",
    test: "Skúste web prejsť len klávesnicou (kláves Tab). Každé tlačidlo a pole musí byť dosiahnuteľné a pomenované.",
  },
  {
    nadpis: "Žiadne nefunkčné odkazy",
    preco: "Nefunkčné odkazy robia web menej dôveryhodným pre ľudí aj pre roboty.",
    test: "Raz za štvrťrok prejdite web nástrojom, napríklad Screaming Frog (zadarmo do 500 adries), a nefunkčné odkazy opravte alebo presmerujte.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AEO kontrola webu: vie váš web prečítať ChatGPT?",
  description: DESCRIPTION,
  inLanguage: "sk",
  datePublished: PUBLIKOVANE,
  dateModified: AKTUALIZOVANE,
  mainEntityOfPage: `${SITE_URL}/aeo`,
  author: { "@type": "Organization", name: "Elvoro", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Elvoro", url: SITE_URL },
};

export default function Aeo() {
  return (
    <main className="legal aeo">
      <div className="wrap">
        <a className="logo-back" href="/">← Späť na Elvoro</a>
        <h1>AEO kontrola webu</h1>
        <p className="aeo-meta">
          Publikované <time dateTime={PUBLIKOVANE}>5. 11. 2026</time> · Aktualizované <time dateTime={AKTUALIZOVANE}>5. 11. 2026</time>
        </p>

        <h2>Ako zistím, či môj web vedia prečítať AI asistenti?</h2>
        <p>
          Záleží na tom, ako je web postavený. Ak je dôležitý obsah (služby, ceny, kontakt) priamo v HTML, na začiatku stránky je jasná veta o tom,
          čo robíte, a súbor robots.txt neblokuje AI vyhľadávacích robotov, máte základ. Prejdite deväť bodov nižšie, každý trvá pár minút.
          Nikto nevie zaručiť, že vás AI asistent odporučí. Tieto kroky to robia pravdepodobnejším a pomáhajú aj bežnému vyhľadávaniu.
        </p>

        <ol className="aeo-list">
          {BODY.map((b) => (
            <li key={b.nadpis}>
              <h3>{b.nadpis}</h3>
              <p>{b.preco}</p>
              <p className="test"><span>Ako skontrolovať</span> {b.test}</p>
            </li>
          ))}
        </ol>

        <h2>Chcete sa na svoj web pozrieť spolu?</h2>
        <p>
          Úvodný hovor trvá 30 minút a je zadarmo. Povieme vám, čo na vašom webe chýba, a či vám vieme pomôcť. Ako to vyzerá v praxi, uvidíte aj
          na tomto webe: otvorte <a href="/robots.txt">robots.txt</a> a <a href="/sitemap.xml">sitemap.xml</a>.
        </p>
        <div className="aeo-cta">
          {REZERVACIA_URL ? (
            <a className="btn" href={REZERVACIA_URL} target="_blank" rel="noopener">Rezervovať 30 min hovor</a>
          ) : (
            <a className="btn" href="/#prihlaska">Zistiť, či sme pre seba</a>
          )}
          <a className="btn ghost" href="/#prihlaska">Vyplniť prihlášku</a>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
