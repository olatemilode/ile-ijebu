export function PurposeSplit() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="bg-cocoa px-6 py-20 text-ivory dark:bg-[#0a0a0a] lg:px-10">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
          Our Purpose
        </p>
        <h2 className="text-balance font-display text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.05]">
          Preserve where we come from. Build where we are going.
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-ivory/70">
          Ilé Ìjẹ̀bú brings culture, community, commerce and discovery into
          one trusted digital experience for Ijebuland and Ijebu people
          everywhere.
        </p>
      </div>

      <div className="divide-y divide-cocoa/10 bg-ivory/60 dark:divide-ivory/10 dark:bg-white/[0.02]">
        {[
          ["01", "Digital home for Ijebuland"],
          ["∞", "Stories worth preserving"],
          ["+", "Local businesses to discover"],
        ].map(([stat, label]) => (
          <div key={label} className="flex items-center gap-6 px-6 py-9 lg:px-10">
            <strong className="min-w-[64px] font-display text-4xl text-gold">
              {stat}
            </strong>
            <span className="text-cocoa/70 dark:text-ivory/70">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
