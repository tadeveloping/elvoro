// Časté otázky: z tohto zoznamu sa vykreslí sekcia FAQ aj štruktúrované dáta (FAQPage).
// Odpovede s „doplniť“ majú hotova: false, aby sa nedostali do dát pre vyhľadávače.
export const FAQ: { otazka: string; odpoved: string; hotova: boolean }[] = [
  {
    otazka: "Koľko to stojí?",
    odpoved: "Každé riešenie je na mieru, preto cenu navrhneme po prvom hovore, keď vieme, čo presne potrebujete. [Doplniť: od akej sumy alebo ako cenu počítame.]",
    hotova: false,
  },
  {
    otazka: "Ako dlho to trvá?",
    odpoved: "[Doplniť: typická dĺžka od hovoru po prvé fungujúce riešenie.]",
    hotova: false,
  },
  {
    otazka: "Potrebujeme vlastného technika alebo IT oddelenie?",
    odpoved: "Nie. Riešenie postavíme, zavedieme a tím zaučíme. Vy nám dáte prístup k tomu, čo treba prepojiť.",
    hotova: true,
  },
  {
    otazka: "Komu patria účty a dáta?",
    odpoved: "Vám. Všetky účty sú na meno a kartu vašej firmy, my sme iba správcovia s dvojfaktorovým prihlásením. Keď spoluprácu ukončíte, všetko ostáva u vás.",
    hotova: true,
  },
  {
    otazka: "Je to bezpečné? Čo GDPR?",
    odpoved: "Pri každom riešení určíme, aké údaje sa spracúvajú, kde a ako dlho. Ak niečo hovorí so zákazníkmi, napríklad hlasový agent, na začiatku povie, že je AI. Pri citlivých veciach odporúčame overenie vaším právnikom.",
    hotova: true,
  },
  {
    otazka: "Čo ak spoluprácu ukončíme?",
    odpoved: "Systém zostáva vám. Beží na vašich účtoch a kód aj dokumentácia patria vám, takže ho môže ďalej rozvíjať ktokoľvek.",
    hotova: true,
  },
  {
    otazka: "Pre aké firmy je Elvoro?",
    odpoved: "Najčastejšie pre firmy s 20 až 250 ľuďmi, ktoré chcú zmenu vo fungovaní firmy, nie ďalší nástroj. Kurzy a návody, ako si to spraviť sami, nerobíme.",
    hotova: true,
  },
];
