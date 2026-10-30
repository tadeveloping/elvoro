import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// Prijme prihlášku z formulára, uloží ju do databázy Neon a pošle upozornenie e-mailom (Resend).
// Kľúče sú len v premenných prostredia (.env.example), nikdy v kóde.

type Prihlaska = {
  cesta: "A" | "B" | "C";
  firma: string;
  web: string;
  velkost: string;
  coRobite: string;
  cas: string[];
  nastroje: string[];
  napad: string;
  mame: string;
  uloha: string;
  ai: string;
  kedy: string;
  meno: string;
  email: string;
  telefon: string;
  prilezitosti: string[];
};

const CESTY: Record<Prihlaska["cesta"], string> = {
  A: "Zjednodušiť prácu vo firme",
  B: "Systém na mieru",
  C: "Vlastný nápad na projekt",
};

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function list(v: unknown, max: number): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").map((x) => x.trim().slice(0, 200)).slice(0, max) : [];
}

function chyba(sprava: string, status: number) {
  return NextResponse.json({ error: sprava }, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return chyba("Prihlášku sa nepodarilo prečítať. Skúste to znova.", 400);
  }

  // Robot vyplnil skryté pole alebo formulár odoslal nereálne rýchlo: tváriť sa ako úspech, nič neukladať.
  if (str(body.hp, 200) || Number(body.trvanieMs) < 4000) {
    return NextResponse.json({ ok: true });
  }

  const cesta = str(body.cesta, 1);
  const p: Prihlaska = {
    cesta: (cesta === "B" || cesta === "C" ? cesta : "A") as Prihlaska["cesta"],
    firma: str(body.firma, 200),
    web: str(body.web, 300),
    velkost: str(body.velkost, 20),
    coRobite: str(body.coRobite, 3000),
    cas: list(body.cas, 20),
    nastroje: list(body.nastroje, 20),
    napad: str(body.napad, 5000),
    mame: str(body.mame, 20),
    uloha: str(body.uloha, 5000),
    ai: str(body.ai, 20),
    kedy: str(body.kedy, 20),
    meno: str(body.meno, 200),
    email: str(body.email, 320),
    telefon: str(body.telefon, 50),
    prilezitosti: list(body.prilezitosti, 10),
  };

  if (!p.firma || !p.meno) return chyba("Vyplňte názov firmy a meno.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return chyba("Napíšte e-mail v tvare meno@firma.sk.", 400);

  const databaseUrl = process.env.DATABASE_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.PRIHLASKY_TO;
  const from = process.env.PRIHLASKY_FROM;

  if (!databaseUrl && !(resendKey && to && from)) {
    if (process.env.VERCEL_ENV === "production") {
      console.error("Prihlášky nie sú zapojené: chýbajú premenné prostredia.");
      return chyba("Prihlášku sa teraz nepodarilo odoslať. Skúste to prosím neskôr.", 503);
    }
    console.warn("Prihláška (nikam sa neuložila, chýbajú premenné prostredia):", p.firma, p.email);
    return NextResponse.json({ ok: true, ulozene: false });
  }

  let ulozene = false;
  let odoslane = false;

  if (databaseUrl) {
    try {
      const sql = neon(databaseUrl);
      await sql`
        insert into prihlasky (cesta, firma, web, velkost, co_robite, cas, nastroje, napad, mame, uloha, ai, kedy, meno, email, telefon, prilezitosti)
        values (${p.cesta}, ${p.firma}, ${p.web || null}, ${p.velkost || null}, ${p.coRobite || null}, ${p.cas}, ${p.nastroje},
                ${p.napad || null}, ${p.mame || null}, ${p.uloha || null}, ${p.ai || null}, ${p.kedy || null},
                ${p.meno}, ${p.email}, ${p.telefon || null}, ${p.prilezitosti})`;
      ulozene = true;
    } catch (e) {
      console.error("Prihlášku sa nepodarilo uložiť do databázy:", e);
    }
  }

  const chybaResend = [
    ["RESEND_API_KEY", resendKey],
    ["PRIHLASKY_TO", to],
    ["PRIHLASKY_FROM", from],
  ].filter(([, v]) => !v).map(([k]) => k);
  if (chybaResend.length > 0 && chybaResend.length < 3) {
    console.warn("E-mail o prihláške sa neposiela, chýba nastavenie:", chybaResend.join(", "));
  }

  if (resendKey && to && from) {
    const riadky = [
      `Nová prihláška: ${p.firma}`,
      "",
      `S čím pomôcť: ${CESTY[p.cesta]}`,
      `Firma: ${p.firma}${p.web ? ` (${p.web})` : ""}`,
      `Počet ľudí: ${p.velkost || "neuvedené"}`,
      `Čo robia: ${p.coRobite || "neuvedené"}`,
      p.cas.length ? `Kde strácajú čas: ${p.cas.join(", ")}` : null,
      p.nastroje.length ? `Nástroje dnes: ${p.nastroje.join(", ")}` : null,
      p.napad ? `Nápad: ${p.napad}` : null,
      p.mame ? `Čo už majú: ${p.mame}` : null,
      p.uloha ? `Úloha, ktorá zdržuje: ${p.uloha}` : null,
      `AI vo firme: ${p.ai || "neuvedené"}`,
      `Kedy začať: ${p.kedy || "neuvedené"}`,
      "",
      `Kontakt: ${p.meno}, ${p.email}${p.telefon ? `, ${p.telefon}` : ""}`,
      "",
      "Príležitosti, ktoré videl na webe:",
      ...p.prilezitosti.map((x) => `- ${x}`),
      "",
      ulozene ? "Uložené v databáze (tabuľka prihlasky)." : "POZOR: do databázy sa neuložila, údaje sú len v tomto e-maile.",
    ].filter((x): x is string => x !== null);

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: p.email,
        subject: `Nová prihláška: ${p.firma}`,
        text: riadky.join("\n"),
      }),
    }).catch((e) => {
      console.error("Resend nedostupný:", e);
      return null;
    });
    odoslane = !!r && r.ok;
    if (r && !r.ok) console.error("Resend odmietol e-mail:", r.status, await r.text());
  }

  if (!ulozene && !odoslane) {
    return chyba("Prihlášku sa teraz nepodarilo odoslať. Skúste to prosím o chvíľu znova.", 502);
  }
  return NextResponse.json({ ok: true });
}
