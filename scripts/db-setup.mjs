// Vytvorí tabuľku prihlášok v databáze z DATABASE_URL, ak ešte neexistuje.
// Spúšťa sa pri každom builde na Verceli (vercel-build) aj ručne cez npm run db:setup.
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  // Bez databázy (napr. prvý build pred pripojením Neonu) sa tabuľka len preskočí.
  console.warn("DATABASE_URL nie je nastavená, tabuľka prihlášok sa nevytvára.");
  process.exit(0);
}

const schema = readFileSync(new URL("../db/001_prihlasky.sql", import.meta.url), "utf8");
const prikazy = schema
  .split(";")
  .map((p) => p.replace(/^\s*--.*$/gm, "").trim())
  .filter(Boolean);

// Chyba databázy nesmie zhodiť nasadenie webu: vypíše sa a build pokračuje.
// Prihlášky medzitým chodia aspoň e-mailom, ak je nastavený Resend.
try {
  if (!/^postgres(ql)?:\/\//.test(url)) {
    throw new Error("DATABASE_URL musí začínať postgresql:// (skopíruj len samotný reťazec, bez psql a úvodzoviek).");
  }
  const sql = neon(url);
  for (const prikaz of prikazy) await sql.query(prikaz);
  console.log(`Tabuľka prihlášok je pripravená (${prikazy.length} príkazy).`);
} catch (e) {
  console.error("POZOR: tabuľku prihlášok sa nepodarilo pripraviť:", e instanceof Error ? e.message : e);
}
