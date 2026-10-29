-- Prihlášky firiem z webu elvoro (databáza Neon). Zapisuje do nich len server webu.
-- Spustenie: npm run db:setup (potrebuje DATABASE_URL).
create table if not exists public.prihlasky (
  id uuid primary key default gen_random_uuid(),
  vytvorene timestamptz not null default now(),
  stav text not null default 'nova' check (stav in ('nova', 'kontaktovana', 'hovor', 'spolupraca', 'zamietnuta')),
  cesta text not null check (cesta in ('A', 'B', 'C')),
  firma text not null,
  web text,
  velkost text,
  co_robite text,
  cas text[] not null default '{}',
  nastroje text[] not null default '{}',
  napad text,
  mame text,
  uloha text,
  ai text,
  kedy text,
  meno text not null,
  email text not null,
  telefon text,
  prilezitosti text[] not null default '{}'
);

create index if not exists prihlasky_vytvorene_idx on public.prihlasky (vytvorene desc);
