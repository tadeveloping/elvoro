// Obsah sekcií 01 až 03 (ukážky automatizácie, čo staviame, nástroje, postup).
// Firmy a údaje v ukážkach sú vymyslené, na webe je to napísané.

export type Krok = { nazov: string; titul: string; text: string };
export type Ukazka = {
  id: string;
  stitok: string;
  nadpis: [string, string];
  text: string;
  dnes: string;
  teraz: string;
  nastroje: string[];
  kroky: Krok[];
};

export const UKAZKA_FAKTURA: Ukazka = {
  id: "faktura",
  stitok: "Spracovanie faktúr",
  nadpis: ["Menej prepisovania.", "Jasnejšie schvaľovanie."],
  text: "Systém prečíta faktúru, pripraví návrh dokladu a porovná sumu s objednávkou. Na kontrolu ide len to, čo nesedí, a podklady sú hneď pri tom.",
  dnes: "Otvoriť PDF. Prepísať údaje. Nájsť objednávku. Naháňať schválenie.",
  teraz: "Pripravený doklad, hotová kontrola a jasný zoznam toho, čo potrebuje človeka.",
  nastroje: ["Gmail", "Pohoda", "Slack"],
  kroky: [
    { nazov: "Prijať", titul: "Do schránky príde faktúra.", text: "Príloha sa zachytí priamo z e-mailu od dodávateľa." },
    { nazov: "Vyčítať", titul: "Údaje sa prenesú do návrhu dokladu.", text: "Dodávateľ, číslo faktúry a suma bez ručného prepisovania." },
    { nazov: "Skontrolovať", titul: "Suma nesedí s objednávkou.", text: "Objednávka OBJ-204 je na 2 200 €, faktúra na 2 400 €. Rozdiel sa ukáže hneď." },
    { nazov: "Odovzdať", titul: "Rozdiel ide na schválenie.", text: "Faktúra počká, kým ju niekto zodpovedný neskontroluje a nepotvrdí." },
  ],
};

export const UKAZKA_PODPORA: Ukazka = {
  id: "podpora",
  stitok: "Zákaznícka podpora",
  nadpis: ["Tá istá otázka.", "Odpoveď pripravená na kontrolu."],
  text: "Systém roztriedi prichádzajúce otázky, dohľadá údaje o zákazníkovi a na opakované otázky pripraví odpoveď. Váš tím rieši len to, čo potrebuje úsudok, a celú históriu má pred sebou.",
  dnes: "Prečítať každú správu. Hľadať v ďalšom systéme. Písať stále tú istú odpoveď. Ťažšie prípady posúvať ďalej.",
  teraz: "Bežné odpovede pripravené na kontrolu. Výnimky pridelené správnemu človeku aj s celou históriou.",
  nastroje: ["E-mail", "Shoptet", "Slack"],
  kroky: [
    { nazov: "Prečítať", titul: "Príde otázka od zákazníčky.", text: "„Kde je moja objednávka?“ Správa sa zaradí medzi bežné otázky." },
    { nazov: "Dohľadať", titul: "Objednávka sa nájde v e-shope.", text: "Je odoslaná a sledovanie zásielky je dostupné." },
    { nazov: "Pripraviť", titul: "Odpoveď je pripravená.", text: "S odkazom na sledovanie a so zdrojom, odkiaľ sú údaje." },
    { nazov: "Roztriediť", titul: "Ľudia riešia, čo potrebuje úsudok.", text: "Bežná odpoveď čaká na kontrolu. Reklamácia ide priamo k človeku z podpory." },
  ],
};

export type Oblast = {
  id: string;
  zalozka: string;
  nadpis: string;
  podnadpis: string;
  zdrojeNadpis: string;
  zdroje: string[];
  jadro: string;
  vystupy: string[];
  text: string;
  pripravujeme?: boolean;
};

export const OBLASTI: Oblast[] = [
  {
    id: "system",
    zalozka: "Firemný systém",
    nadpis: "Vlastný firemný systém",
    podnadpis: "Celá firma na jednom mieste. S AI, ktorá ju pozná.",
    zdrojeNadpis: "Rozhádzané nástroje, tabuľky a skupiny",
    zdroje: ["Úlohy v ClickUpe alebo Trelle", "objednavky_FINAL_v3.xlsx", "Skupina „Sklad“ na WhatsAppe"],
    jadro: "Moduly podľa toho, ako funguje vaša firma",
    vystupy: ["Objednávky, úlohy a sklad v jednom systéme", "AI, ktorej sa opýtate ako kolegu", "Dáta ostávajú u vás, systém je váš"],
    text: "Staviame po kúskoch: najprv modul, ktorý vás najviac brzdí, potom ďalšie. Účtovníctvo ani e-mail neprerábame, prepojíme ich. Systém nie je prenajatý, patrí firme, aj keby sa spolupráca skončila.",
  },
  {
    id: "doklady",
    zalozka: "Doklady",
    nadpis: "Faktúry a doklady",
    podnadpis: "Menej ručného prepisovania.",
    zdrojeNadpis: "Doklady, ktoré dnes niekto prepisuje",
    zdroje: ["Faktúry od dodávateľov v e-maile", "Dodacie listy a objednávky v PDF", "Zdieľaný priečinok s dokladmi"],
    jadro: "Vaše polia a pravidlá kontroly",
    vystupy: ["Údaje vyčítané z dokladu", "Záznam pripravený na kontrolu", "Nezrovnalosti poslané správnemu človeku"],
    text: "Spolu prejdeme, aké doklady chodia, ktoré údaje z nich potrebujete a kam majú ísť. Systém ich vyčíta a porovná s vašimi pravidlami. Čo je nejasné, skontroluje človek skôr, než sa niečo zapíše.",
  },
  {
    id: "predaj",
    zalozka: "Predaj a ponuky",
    nadpis: "Predaj a ponuky",
    podnadpis: "Rýchlejšia odpoveď každému zákazníkovi.",
    zdrojeNadpis: "Dopyty a história zákazníkov",
    zdroje: ["Dopyty z webu a e-mailu", "Cenník v Exceli", "Poznámky z telefonátov"],
    jadro: "Váš cenník a schválené šablóny",
    vystupy: ["Všetko o zákazníkovi na jednom mieste", "Ponuka alebo odpoveď pripravená", "Pripomienka, keď zákazník neodpíše"],
    text: "Ponuky a odpovede sa pripravia z vašich údajov a šablón. Ceny, termíny a konečné znenie vždy potvrdí váš človek. Žiadny dopyt neostane zabudnutý v schránke.",
  },
  {
    id: "reporty",
    zalozka: "Reporty",
    nadpis: "Reporty pre vedenie",
    podnadpis: "Prestaňte skladať ten istý report každý piatok.",
    zdrojeNadpis: "Čísla, ktoré už vo firme máte",
    zdroje: ["Účtovný program", "Tabuľky oddelení", "E-shop alebo objednávky"],
    jadro: "Váš formát reportu a zdroje čísel",
    vystupy: ["Čísla zozbierané v pravidelný čas", "Report pripravený z dát", "Pri každom čísle, odkiaľ je"],
    text: "Dohodneme, ktoré čísla do reportu patria a ako sa rátajú, a ich zber a prípravu zautomatizujeme. Každé číslo sa dá dohľadať k zdroju. Chýbajúce alebo protichodné údaje sa označia, aby ste report pred odoslaním skontrolovali.",
  },
  {
    id: "znalosti",
    zalozka: "Firemné znalosti",
    nadpis: "Firemný AI asistent",
    podnadpis: "Odpoveď za pár sekúnd namiesto hľadania v priečinkoch.",
    zdrojeNadpis: "Postupy, dokumenty a know-how",
    zdroje: ["Smernice a postupy", "Zmluvy a šablóny", "Zdieľaný disk"],
    jadro: "Kto smie vidieť ktoré dokumenty",
    vystupy: ["Odpovede len z vašich dokumentov", "Pri odpovedi odkaz na zdroj", "Otázky bez odpovede sa zapíšu"],
    text: "Schválené dokumenty usporiadame tak, aby sa v nich dalo pýtať. Nový človek sa zaučí rýchlejšie a know-how nie je len v hlavách pár ľudí. Vopred dohodneme, kto materiály udržiava a čo sa stane, keď asistent spoľahlivú odpoveď nenájde.",
  },
  {
    id: "telefon",
    zalozka: "Telefonáty",
    nadpis: "AI hlasový agent",
    podnadpis: "Telefón zdvihne vždy, aj keď vy práve nemôžete.",
    zdrojeNadpis: "Hovory, ktoré dnes nikto nezdvihne",
    zdroje: ["Volania mimo pracovného času", "Hovory počas práce u zákazníka", "Otázky na ceny a termíny"],
    jadro: "Vaše služby, ceny a voľné termíny",
    vystupy: ["Na začiatku povie, že je AI", "Termín alebo dopyt zapísaný do systému", "Kto chce človeka, toho prepojí"],
    text: "Agent hovorí po slovensky, pozná vaše služby a voľné termíny a všetko zapíše. Na začiatku hovoru oznámi, že je AI a že sa hovor nahráva. Túto službu ešte len pripravujeme.",
    pripravujeme: true,
  },
];

// Pás nástrojov: len názvy, bez log. Či a ako sa nástroj dá prepojiť, overíme pred stavbou.
export const NASTROJE_1 = ["Gmail", "Outlook", "Excel", "Google Tabuľky", "Google Drive", "Google Kalendár", "WhatsApp", "Teams", "SharePoint"];
export const NASTROJE_2 = ["SuperFaktúra", "Pohoda", "Money S3", "Shoptet", "WooCommerce", "ClickUp", "Trello", "Asana", "Notion", "ChatGPT", "Claude"];

export type Etapa = { stitok: string; nadpis: string; text: string; dostanete: string; rezervacia?: boolean };

// Postup schválený 30. 10. 2026 (rozhodnutia/2026-10-30-rebrik-ponuky.md), len v novom tvare.
export const POSTUP: Etapa[] = [
  { stitok: "Prihláška", nadpis: "Opíšete svoju firmu", text: "Pár otázok o tom, čo robíte a kde strácate čas. Zaberie to pár minút.", dostanete: "prvé príležitosti hneď po odoslaní." },
  { stitok: "Úvodný hovor", nadpis: "Povieme, či a kde vieme pomôcť", text: "30 minút, zadarmo. Prejdeme vašu prihlášku a prídeme s konkrétnymi návrhmi, nie s otázkami.", dostanete: "jasnú odpoveď, či má zmysel pokračovať.", rezervacia: true },
  { stitok: "Mapa firmy", nadpis: "Zmapujeme, kde ide čas", text: "Pol dňa až deň u vás. 300 až 500 €, odpočíta sa zo zákazky.", dostanete: "prehľad, kde strácate čas, a 3 riešenia s cenou a poradím." },
  { stitok: "Prvý modul", nadpis: "Postavíme riešenie pre jeden proces", text: "Postavíme ho, otestujeme s vaším tímom na skutočných príkladoch, zavedieme a zaučíme ľudí.", dostanete: "fungujúce riešenie a zaučený tím." },
  { stitok: "Ostávame po ruke", nadpis: "Systém rastie s firmou", text: "Mesačná správa: systém udržiavame, upravujeme a pridávame ďalšie časti, keď firma rastie.", dostanete: "údržbu a úpravy podľa dohody, bez prekvapení v cene." },
];
