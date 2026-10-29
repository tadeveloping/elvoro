// Vytvorí tabuľku prihlášok v databáze z DATABASE_URL. Spustenie: npm run db:setup
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Chýba DATABASE_URL (vlož ju do .env.local alebo prostredia).");
  process.exit(1);
}

const sql = neon(url);
const schema = readFileSync(new URL("../db/001_prihlasky.sql", import.meta.url), "utf8");
const prikazy = schema
  .split(";")
  .map((p) => p.replace(/^\s*--.*$/gm, "").trim())
  .filter(Boolean);

for (const prikaz of prikazy) await sql.query(prikaz);
console.log(`Hotovo: ${prikazy.length} príkazy prebehli.`);
