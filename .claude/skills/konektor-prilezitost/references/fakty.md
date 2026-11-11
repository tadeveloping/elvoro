# Fakty a neoverené tvrdenia

Stav k 11. 11. 2026. Zdrojom tézy je video o paralele AI marketplacu s App Storom 2008
(https://youtu.be/4rmhciA42wc). Pred použitím v rozhodnutí alebo v obsahu pre
verejnosť over znova, tieto veci sa menia.

## App Store 2008 (overené, historické)

- Spustený v júli 2008 s približne 500 appkami, 10 miliónov stiahnutí za prvý víkend.
- SDK pre vývojárov vyšlo v marci 2008, predtým len webové appky.
- Apple do polovice 2010 vyplatil vývojárom 1 miliardu dolárov.
- iShoot (Ethan Nicholas): platená verzia sa nepredávala, po vydaní bezplatnej
  Lite verzie zarobil stovky tisíc dolárov za mesiac. Poučenie platí: najprv zadarmo
  vyskúšať, potom platiť.
- Provízia Apple je 30 %, pre malých vývojárov 15 %, v EÚ sú podmienky iné.

## OpenAI DevDay 29. 9. 2026

| Tvrdenie z videa | Stav |
|---|---|
| Prihlásenie cez ChatGPT do appiek tretích strán | Potvrdené viacerými zdrojmi, dostupné globálne. Používateľ môže v appke míňať limit svojho predplatného, vývojár neplatí prvé tokeny. |
| Vyskúšanie appky bez ďalšieho predplatného | Čiastočne. Podľa jedného zdroja je to otvorené pre open-source a lokálne appky, platený SaaS je na čakačke. |
| "Marketplace" ako nový App Store pre každého | Nepresné. OpenAI Marketplace je nákupná cesta pre veľké firmy (okolo 30 partnerov ako Adobe, Figma, Salesforce), nie spotrebiteľský obchod. Pre bežných vývojárov je relevantný adresár appiek (pluginov) a Apps SDK. |
| OpenAI neberie províziu | Neoverené. V dohľadaných zdrojoch o provízii nič nie je. |
| Poradie podľa používanosti a kvality | Neoverené, odporúčanie riadi platforma. |
| 1,2 miliardy používateľov týždenne | Neoverené z primárneho zdroja. |
| Spúšťa sa najprv v USA | Neoverené. Pri podaní appky sa nastavuje dostupnosť po krajinách, treba overiť pre SK a CZ. |

## Podanie appky do ChatGPT

- Appky sa stavajú cez Apps SDK nad MCP, podávajú sa na schválenie cez
  OpenAI Developer Platform (kvalita, pravidlá, kompatibilita).
- Adresár je spoločný pre ChatGPT a Codex, appky sa po novom vedú ako pluginy.
- Ten istý MCP server sa dá použiť aj ako konektor v Claude. Preto stavať
  prenosne a nezávisieť od jednej platformy.

## Zdroje

- https://developers.openai.com/apps-sdk/app-submission-guidelines
- https://openai.com/index/developers-can-now-submit-apps-to-chatgpt/
- https://alpic.ai/blog/openai-dev-day-2026-from-personal-agents-to-new-distribution-possibilities
- https://saascity.io/blog/sign-in-with-chatgpt-openai-marketplace-2026
- https://capitalandcompute.net/blog/openai-devday-2026-announcements-prices/
