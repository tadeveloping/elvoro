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

export const UKAZKA_DOPYT: Ukazka = {
  id: "dopyt",
  stitok: "Dopyt a cenová ponuka",
  nadpis: ["Menej prepisovania.", "Ponuka ešte v ten deň."],
  text: "Systém prečíta dopyt z e-mailu, pripraví ponuku podľa vášho cenníka a skontroluje, či niečo nechýba. Vy ponuku len skontrolujete a odošlete. Čo potrebuje človeka, príde konkrétnemu človeku aj s podkladmi.",
  dnes: "Prečítať e-mail. Nájsť cenník. Ručne zrátať položky. Spätne sa pýtať na chýbajúce údaje. Pripomenúť si, že treba zavolať.",
  teraz: "Ponuka pripravená na kontrolu, chýbajúce údaje označené a úloha s termínom pridelená správnemu človeku.",
  nastroje: ["Gmail", "Excel cenník", "Firemný systém"],
  kroky: [
    { nazov: "Prijať", titul: "Do schránky príde dopyt.", text: "Systém ho zachytí v e-maile a uloží k novému zákazníkovi." },
    { nazov: "Pripraviť", titul: "Ponuka sa zostaví z cenníka.", text: "Položky a ceny sa doplnia z vášho cenníka, nič sa neprepisuje ručne." },
    { nazov: "Skontrolovať", titul: "Chýbajúci údaj sa označí.", text: "Zákazník neuviedol objem bojlera. Ponuka čaká, kým to niekto overí." },
    { nazov: "Odovzdať", titul: "Úloha ide správnemu človeku.", text: "Technik dostane úlohu zavolať zákazníkovi a ponuka je pripravená na odoslanie." },
  ],
};

export const UKAZKA_OBJEDNAVKA: Ukazka = {
  id: "objednavka",
  stitok: "Objednávky a sklad",
  nadpis: ["Objednávka z e-mailu.", "Sklad overený za vás."],
  text: "Objednávky chodia e-mailom, telefonicky aj cez WhatsApp. Systém z nich vyčíta položky, porovná ich so skladom a pripraví potvrdenie. Keď niečo chýba, vznikne úloha na doobjednanie.",
  dnes: "Prepísať objednávku do Excelu. Ísť pozrieť do skladu. Napísať zákazníkovi. Nezabudnúť objednať, čo chýba.",
  teraz: "Položky zapísané, sklad skontrolovaný, potvrdenie pripravené na odoslanie a nákup vie, čo doobjednať.",
  nastroje: ["E-mail", "WhatsApp", "Firemný systém"],
  kroky: [
    { nazov: "Prečítať", titul: "Príde objednávka.", text: "Stavebniny Kováč (vymyslená firma) píšu, čo potrebujú a kedy." },
    { nazov: "Vyčítať", titul: "Položky sa zapíšu samy.", text: "Systém z voľného textu spraví riadky objednávky s množstvom." },
    { nazov: "Overiť sklad", titul: "Dlažby je menej, ako treba.", text: "Na sklade je 32 m², objednávka chce 40 m². Rozdiel sa ukáže hneď." },
    { nazov: "Odovzdať", titul: "Každý vie, čo má robiť.", text: "Potvrdenie čaká na kontrolu a nákup má úlohu doobjednať 8 m² dlažby." },
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
