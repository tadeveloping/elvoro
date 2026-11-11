---
name: konektor-prilezitost
description: Posúdi nápad, klienta alebo službu Elvora ako príležitosť na konektor (appku) do AI asistentov ako ChatGPT a Claude. Použi, keď padne "konektor", "MCP", "appka do ChatGPT", "ChatGPT marketplace", "AI app store", "plugin", "kam sa hýbať s Elvorom", "čo postaviť", "dá sa na tom zarobiť", alebo keď treba rozhodnúť, či má riešenie pre klienta dostať aj konektor.
---

# Konektor ako príležitosť

Východisko: AI asistenti sa stávajú miestom, kde ľudia hľadajú riešenia, a asistent
im vie rovno odporučiť a otvoriť appku. Kto má v úzkom segmente najlepší konektor,
dostane sa k zákazníkom bez vlastnej reklamy. Podobá sa to na štart App Storu v roku
2008, ale s dôležitými rozdielmi (pozri `references/fakty.md`).

Tento skill nerobí nadšenie, robí rozhodnutie: stavať, lacno otestovať, alebo nechať.

## Postup

### 1. Najprv over stav platformy

Pravidlá sa menia po mesiacoch. Pred odporúčaním over na oficiálnych stránkach
(developers.openai.com/apps-sdk, dokumentácia konektorov Claude):

- kto môže appku podať a či je to otvorené pre platený SaaS, alebo len čakačka,
- v ktorých krajinách je adresár dostupný (Slovensko, Česko, EÚ),
- či a akú províziu platforma berie a ako sa smie platiť,
- ako sa appky odporúčajú v konverzácii (hodnotenia, používanosť, partnerstvá).

Čo sa nedá overiť, označ vo výstupe ako neoverené. Nikdy neopakuj číslo z videa
alebo článku ako fakt. Známe overené a neoverené tvrdenia sú v `references/fakty.md`.

### 2. Ohodnoť nápad (0 až 2 body za každé)

| # | Otázka | 0 | 2 |
|---|--------|---|---|
| 1 | Pýtajú sa na to ľudia asistenta? | problém riešia inde | píšu to do chatu každý týždeň |
| 2 | Robí konektor niečo, čo model sám nevie? | len odpovedá textom | má dáta, stav alebo vykoná akciu |
| 3 | Je segment úzky a lokálny? | globálny, anglický, plný hráčov | slovenská či česká legislatíva, jazyk, miestne systémy |
| 4 | Príde "aha" zadarmo v jednej konverzácii? | hodnota až po dlhom nastavení | prvý výsledok do pár minút |
| 5 | Je platený krok prirodzený? | nie je čo spoplatniť | jasný limit (3 faktúry zadarmo, potom predplatné) |
| 6 | Dá sa to postaviť do 4 týždňov na tom, čo už máme? | nový produkt od nuly | nadstavba nad hotovým systémom |
| 7 | Prežije to bez jednej platformy? | funguje len v ChatGPT | MCP server použiteľný v ChatGPT, Claude aj na webe |

Súčet: 10 a viac = stavať. 7 až 9 = lacný test (bod 4). Menej ako 7 = nechať.
Ku každému bodu napíš jednu vetu prečo, nie len číslo.

### 3. Zaraď to do jednej z ciest Elvora

- **A. Konektor ako súčasť firemného systému.** Každý systém, ktorý Elvoro stavia,
  dostane MCP rozhranie, aby sa naň ľudia vo firme pýtali z asistenta, ktorý už
  používajú. Nízke riziko, hneď použiteľné, nezávisí od žiadneho marketplacu.
- **B. Konektor na zákazku.** Slovenský e-shop, rezervačný systém alebo SaaS chce byť
  odporúčaný v asistentoch. Elvoro mu konektor postaví a podá na schválenie.
  Platí klient, riziko platformy nesie on.
- **C. Vlastný produkt Elvora.** Úzky slovenský či český konektor s freemium modelom.
  Najväčší potenciál aj najväčšie riziko a rozptýlenie. Len ak nápad má 10 a viac
  bodov a rovnaká potreba sa zopakovala aspoň u dvoch klientov.
- **D. Migrácia z drahého nástroja.** AI vie preklikať nastavenia zo starej appky
  do novej za hodiny. Dá sa predávať ako služba. Zároveň to znamená, že ani náš
  produkt zákazníka neudrží zotrvačnosťou, len kvalitou.

### 4. Navrhni najlacnejší test

Pred stavaním povedz, čo sa dá overiť do týždňa: 5 rozhovorov so segmentom,
MCP prototyp s jedným nástrojom, alebo ručne odvedená služba pre jedného klienta.
Uveď, aký výsledok znamená pokračovať a aký stop.

### 5. Pomenuj riziká

Vždy prejdi tieto a napíš, ktoré platia:

- platforma zmení pravidlá, províziu alebo odporúčanie (plugins 2023 a GPT Store 2024
  veľké príjmy tvorcom nepriniesli),
- platforma si funkciu postaví sama,
- v App Store zarobila menšina, príbehy ako iShoot sú výber tých, čo prežili,
- adresár alebo platby nemusia byť v EÚ dostupné,
- GDPR a AI Act: konektor posiela dáta klienta do asistenta tretej strany,
- odvádza to pozornosť od hlavnej práce Elvora (Mapa firmy, riešenia na mieru).

## Výstup

Krátko, po slovensky, bez žargónu, v tomto poradí:

1. **Verdikt** jednou vetou: stavať, otestovať, alebo nechať.
2. **Body** z tabuľky so súčtom a vetou ku každému.
3. **Cesta** (A, B, C alebo D) a prečo.
4. **Test na tento týždeň** s podmienkou pokračovať a stop.
5. **Riziká**, ktoré naozaj platia.
6. **Neoverené** predpoklady, na ktorých verdikt stojí.
