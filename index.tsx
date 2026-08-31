import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LizzyOS Desktop" },
      {
        name: "description",
        content: "LizzyOS home desktop — open the Personality Lab and other system apps.",
      },
      { property: "og:title", content: "LizzyOS Desktop" },
      {
        property: "og:description",
        content: "LizzyOS home desktop — open the Personality Lab and other system apps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DesktopPage,
});

function DesktopPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-2xl font-bold sm:text-3xl">💻 LizzyOS</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Double-tap an icon to open a system app.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Link
            to="/personality-lab"
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/60 p-5 text-center transition hover:border-primary hover:shadow-[var(--glow)]"
          >
            <span className="text-4xl" aria-hidden>
              🧠
            </span>
            <span className="text-sm font-semibold">Personality Lab</span>
            <span className="text-xs text-muted-foreground">Password protected</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
