/**
 * Soft mesh + glassy atmosphere for marketing pages.
 * Fixed behind content; pointer-events-none so clicks pass through.
 */
export function MarketingBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base: warm white → cool tint → white (avoid flat gray) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/90 to-white" />

      {/* Soft blue wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(59,130,246,0.12),transparent_55%)]" />

      {/* Indigo corner glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(99,102,241,0.10),transparent_50%)]" />

      {/* Cyan accent (subtle freshness) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(34,211,238,0.08),transparent_55%)]" />

      {/* Blurred orbs — layered depth (slow drift = alive, not static) */}
      <div className="absolute -right-40 -top-32 h-[min(520px,45vw)] w-[min(520px,45vw)] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.35),rgba(59,130,246,0.12)_45%,transparent_70%)] blur-3xl motion-safe:animate-mesh-drift-a" />
      <div className="absolute -right-24 top-1/3 h-[min(420px,38vw)] w-[min(420px,38vw)] rounded-full bg-[radial-gradient(circle_at_70%_50%,rgba(129,140,248,0.28),transparent_65%)] blur-[64px] motion-safe:animate-mesh-drift-b [animation-delay:-6s]" />
      <div className="absolute -left-32 bottom-0 h-[min(480px,42vw)] w-[min(480px,42vw)] rounded-full bg-[radial-gradient(circle_at_30%_70%,rgba(56,189,248,0.18),transparent_68%)] blur-3xl motion-safe:animate-mesh-drift-a [animation-delay:-11s]" />
      <div className="absolute left-1/2 top-1/2 h-[min(600px,50vw)] w-[min(600px,50vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85),transparent_60%)] blur-2xl" />

      {/* Fine grid (very subtle) */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 100%)",
        }}
      />

      {/* Bottom fade to white for footer readability */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  )
}
