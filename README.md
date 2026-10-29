# Elvoro web

Web Elvora: úvod so živým smajlíkom, príklady riešení a prihláška pre firmy.
Next.js (App Router), bez Tailwindu, animácie GSAP, ikony Phosphor.

## Spustenie
```bash
npm install
npm run dev
```

## Prihlášky
- Formulár posiela na `/api/prihlaska` (`app/api/prihlaska/route.ts`).
- Ukladá do databázy Neon (tabuľka `prihlasky`, schéma v `db/`, vytvorenie `npm run db:setup`) a posiela upozornenie cez Resend.
- Premenné prostredia sú v `.env.example`. Bez nich sa prihláška mimo produkcie len vypíše do logu.

## Kde čo je
- `app/page.tsx`: obsah stránky
- `app/effects.js`: animácie a logika prihlášky
- `app/config.ts`: údaje prevádzkovateľa (doplniť po založení živnosti)
- `brand/logo/`: oficiálne logá Elvora (SVG)
- `nahlad/`: pôvodný náhľad, `archiv/`: starý web
