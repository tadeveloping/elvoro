import type { Metadata } from "next";
import { KONTAKT_EMAIL, PREVADZKOVATEL } from "../config";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov · Elvoro",
};

// Návrh textu podľa čl. 13 GDPR. Pred spustením nechať skontrolovať (postupy/ai-hlasovy-agent.md, ceny/principy-ponuky.md).
export default function OchranaOsobnychUdajov() {
  return (
    <main className="legal">
      <div className="wrap">
        <a className="logo-back" href="/">← Späť na Elvoro</a>
        <h1>Ochrana osobných údajov</h1>
        <p>Tu vysvetľujeme, aké údaje zbierame cez prihlášku na tomto webe, na čo ich používame a aké máte práva.</p>

        <h2>Kto údaje spracúva</h2>
        <p>
          {PREVADZKOVATEL}. Kontakt: {KONTAKT_EMAIL}. <span className="todo">Po založení živnosti doplniť obchodné meno, IČO a sídlo.</span>
        </p>

        <h2>Aké údaje zbierame</h2>
        <ul>
          <li>kontaktné údaje: meno, e-mail a telefón (ak ho uvediete),</li>
          <li>údaje o firme: názov, web, počet ľudí, čím sa firma zaoberá,</li>
          <li>odpovede z prihlášky: kde firma stráca čas, aké nástroje používa, skúsenosti s AI, nápady a kedy chce začať.</li>
        </ul>

        <h2>Na čo ich používame</h2>
        <p>
          Aby sme mohli odpovedať na vašu prihlášku, pripraviť sa na prvý hovor a navrhnúť spoluprácu. Právnym základom je
          vykonanie opatrení pred uzavretím zmluvy na vašu žiadosť (čl. 6 ods. 1 písm. b GDPR) a náš oprávnený záujem
          odpovedať firmám, ktoré nás oslovili (čl. 6 ods. 1 písm. f GDPR). Údaje nepoužívame na hromadný marketing
          a nepredávame ich.
        </p>

        <h2>Ako dlho ich uchovávame</h2>
        <p>
          Ak spolupráca nevznikne, údaje vymažeme najneskôr <span className="todo">12 mesiacov</span> po odoslaní prihlášky.
          Ak spolupráca vznikne, uchovávame ich počas spolupráce a potom podľa zákonných lehôt (napríklad pre účtovníctvo).
        </p>

        <h2>Kto sa k údajom dostane</h2>
        <p>Používame overených poskytovateľov, ktorí údaje spracúvajú len podľa našich pokynov:</p>
        <ul>
          <li>Vercel (prevádzka webu),</li>
          <li>Neon (databáza prihlášok, <span className="todo">overiť región EÚ</span>),</li>
          <li>Resend (odoslanie upozornenia o novej prihláške e-mailom).</li>
        </ul>
        <p>
          Niektorí poskytovatelia sídlia v USA. Prenos je chránený štandardnými zmluvnými doložkami alebo rámcom
          EÚ a USA na ochranu údajov. <span className="todo">Overiť pri každom poskytovateľovi.</span>
        </p>

        <h2>Prehliadač a cookies</h2>
        <p>
          Web nepoužíva analytické ani reklamné cookies. Rozpracovanú prihlášku si pamätá len váš prehliadač (lokálne
          úložisko), aby ste o odpovede neprišli. Po odoslaní sa zmaže. Písma sa načítavajú priamo z nášho webu, nie
          z cudzích serverov.
        </p>

        <h2>Vaše práva</h2>
        <p>
          Máte právo na prístup k údajom, ich opravu, vymazanie, obmedzenie spracúvania, prenosnosť a právo namietať.
          Stačí napísať na {KONTAKT_EMAIL}. Ak si myslíte, že s údajmi zaobchádzame nesprávne, môžete podať sťažnosť
          na Úrad na ochranu osobných údajov Slovenskej republiky (dataprotection.gov.sk).
        </p>

        <p className="fine">Posledná zmena: 28. 10. 2026</p>
      </div>
    </main>
  );
}
