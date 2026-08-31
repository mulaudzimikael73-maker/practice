import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import lizzyPhoto from "@/assets/lizzy.png.asset.json";
import attitudePhoto from "@/assets/little-miss-attitude.png.asset.json";
import agentPhoto from "@/assets/agent-yelizaveta.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LizzyOS Personality Lab" },
      {
        name: "description",
        content:
          "Switch the LizzyOS system personality between Lizzy, Little Miss Attitude and Agent Yelizaveta.",
      },
      { property: "og:title", content: "LizzyOS Personality Lab" },
      {
        property: "og:description",
        content: "Password-protected control room for the LizzyOS system personality.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PersonalityLabPage,
});

const PASSWORD = "LizzyOS";
const STORAGE_KEY = "lizzyPersona";

type Persona = {
  name: string;
  emoji: string;
  photo: string;
  tagline: string;
  sample: string;
  games: string;
  bin: string;
  activated: string;
};

const PERSONAS: Persona[] = [
  {
    name: "Little Miss Attitude",
    emoji: "😏",
    photo: attitudePhoto.url,
    tagline: "Sassy, cheeky and mildly judgemental of Agent Mikhail.",
    sample: "🙄 LizzyOS is online. Try not to break anything, Little Miss Attitude.",
    games: "Try not to become unbearable if you beat the high score. 😏",
    bin: "Little Miss Attitude personally requested these names be permanently deleted. Complaints will be ignored.",
    activated: "Little Miss Attitude Mode activated 😏 Mikael has been warned.",
  },
  {
    name: "Lizzy",
    emoji: "💗",
    photo: lizzyPhoto.url,
    tagline: "Sweet, warm, flower-powered and suspiciously adorable.",
    sample:
      "Hi Lizzy 💗 Everything is working perfectly. Also, system diagnostics say you're pretty today. Again.",
    games: "Okay Lizzy, be nice to the high score. 💗",
    bin: "These nicknames have been respectfully deleted for your peace and happiness. 💗",
    activated: "Lizzy Mode activated 💗 Everything just got softer.",
  },
  {
    name: "Agent Yelizaveta",
    emoji: "🕵️",
    photo: agentPhoto.url,
    tagline: "Classified, mission-focused and permanently suspicious.",
    sample:
      "CLEARANCE CONFIRMED. 🕵️ Agent Yelizaveta, all systems operational. Agent Mikael remains under surveillance.",
    games: "MISSION ACTIVE. High-score intelligence has been classified.",
    bin: "CLASSIFIED DISPOSAL UNIT: prohibited aliases have been contained.",
    activated: "AGENT YELIZAVETA MODE ACTIVE 🕵️ Secure systems engaged.",
  },
];

function PersonalityLabPage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <div
          className="overflow-hidden rounded-2xl border border-border shadow-[var(--glow)]"
          style={{ background: "var(--panel)" }}
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="size-3 rounded-full bg-destructive" />
            <span className="size-3 rounded-full bg-accent" />
            <span className="size-3 rounded-full bg-primary" />
            <h1 className="ml-2 text-sm font-semibold tracking-wide sm:text-base">
              🧠 LizzyOS Personality Lab
            </h1>
          </div>

          {unlocked ? <Lab /> : <PasswordGate onUnlock={() => setUnlocked(true)} />}
        </div>
      </div>
    </main>
  );
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  return (
    <form
      className="px-6 py-12 text-center sm:px-10"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim() === PASSWORD) onUnlock();
        else {
          setError(true);
          setValue("");
        }
      }}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Restricted System Area
      </p>
      <h2 className="mt-4 text-2xl font-bold sm:text-3xl">🔒 Password required</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        The Personality Lab controls how LizzyOS talks, reacts and behaves. Enter the system
        password to continue.
      </p>

      <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
        <input
          type="password"
          autoFocus
          autoComplete="off"
          placeholder="Enter password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          className="rounded-xl border border-input bg-secondary px-4 py-3 text-center text-base tracking-widest text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Unlock Personality Lab
        </button>
        {error && (
          <p className="text-sm font-medium text-destructive">
            ❌ Access denied. That is not the system password.
          </p>
        )}
      </div>
    </form>
  );
}

const DEFAULT_PERSONA: Persona = PERSONAS[0]!;

function Lab() {
  const [selected, setSelected] = useState<string>(DEFAULT_PERSONA.name);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && PERSONAS.some((p) => p.name === stored)) setSelected(stored);
  }, []);

  const active: Persona = PERSONAS.find((p) => p.name === selected) ?? DEFAULT_PERSONA;

  function choose(name: string) {
    setSelected(name);
    localStorage.setItem(STORAGE_KEY, name);
    const persona = PERSONAS.find((p) => p.name === name);
    setToast(persona ? persona.activated : null);
    window.setTimeout(() => setToast(null), 2400);
  }

  return (
    <div className="px-5 py-8 sm:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">System Personality</p>
      <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Who are we dealing with today? 😭</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        This changes how LizzyOS talks, reacts and comments — not just the wallpaper.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {PERSONAS.map((p) => {
          const isActive = p.name === active.name;
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => choose(p.name)}
              className={`group flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition ${
                isActive
                  ? "border-primary bg-secondary shadow-[var(--glow)]"
                  : "border-border bg-card/60 hover:border-primary/60"
              }`}
            >
              <img
                src={p.photo}
                alt={`${p.name} profile photo`}
                loading="lazy"
                className={`size-24 rounded-full object-cover ring-2 transition ${
                  isActive ? "ring-primary" : "ring-border group-hover:ring-primary/50"
                }`}
              />
              <span className="text-xl" aria-hidden>
                {p.emoji}
              </span>
              <strong className="text-sm font-semibold">{p.name}</strong>
              <small className="text-xs leading-relaxed text-muted-foreground">{p.tagline}</small>
              {isActive && (
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
          Live System Preview
        </span>
        <p className="mt-3 text-sm leading-relaxed text-foreground">{toast ?? active.sample}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/60 p-4">
          <p className="text-sm font-semibold">🎮 Games</p>
          <p className="mt-1 text-xs text-muted-foreground">{active.games}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/60 p-4">
          <p className="text-sm font-semibold">🗑️ Recycle Bin</p>
          <p className="mt-1 text-xs text-muted-foreground">{active.bin}</p>
        </div>
      </div>
    </div>
  );
}
