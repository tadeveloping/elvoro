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

const sql = neon(url);
const schema = readFileSync(new URL("../db/001_prihlasky.sql", import.meta.url), "utf8");
const prikazy = schema
  .split(";")
  .map((p) => p.replace(/^\s*--.*$/gm, "").trim())
  .filter(Boolean);

for (const prikaz of prikazy) await sql.query(prikaz);
console.log(`Hotovo: ${prikazy.length} príkazy prebehli.`);
