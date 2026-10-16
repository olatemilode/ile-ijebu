import { getAdminBusinesses, getAdminEvents, getAdminStories, getAdminPartnerships } from "@/lib/data/admin";
import { ContentRow } from "@/components/admin/content-row";
import { adminLogout } from "./logout-action";

export default async function AdminDashboard() {
  const [businesses, events, stories, partnerships] = await Promise.all([
    getAdminBusinesses(),
    getAdminEvents(),
    getAdminStories(),
    getAdminPartnerships(),
  ]);

  const pendingCount =
    businesses.filter((b) => b.status === "pending").length +
    events.filter((e) => e.status === "pending").length +
    stories.filter((s) => s.status === "pending").length;

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
      <div className="mb-10 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            Admin
          </p>
          <h1 className="mt-1 font-display text-3xl">Content Dashboard</h1>
          {pendingCount > 0 && (
            <p className="mt-1 text-sm text-cocoa/60 dark:text-ivory/60">
              {pendingCount} item{pendingCount === 1 ? "" : "s"} waiting for review
            </p>
          )}
        </div>
        <form action={adminLogout}>
          <button className="text-[12px] font-bold text-cocoa/50 hover:text-aro-red dark:text-ivory/50">
            Log out
          </button>
        </form>
      </div>

      <section className="mb-12">
        <h2 className="mb-3 font-display text-xl">
          Businesses <span className="text-cocoa/40 dark:text-ivory/40">({businesses.length})</span>
        </h2>
        {businesses.length === 0 ? (
          <p className="text-sm text-cocoa/50 dark:text-ivory/50">No businesses yet.</p>
        ) : (
          <div className="border border-cocoa/10 px-5 dark:border-ivory/10">
            {businesses.map((b) => (
              <ContentRow
                key={b.id}
                table="businesses"
                id={b.id}
                title={b.name}
                subtitle={b.category}
                status={b.status}
                verified={b.verified}
                showVerify
              />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-display text-xl">
          Events <span className="text-cocoa/40 dark:text-ivory/40">({events.length})</span>
        </h2>
        {events.length === 0 ? (
          <p className="text-sm text-cocoa/50 dark:text-ivory/50">No events yet.</p>
        ) : (
          <div className="border border-cocoa/10 px-5 dark:border-ivory/10">
            {events.map((e) => (
              <ContentRow
                key={e.id}
                table="events"
                id={e.id}
                title={e.title}
                subtitle={e.event_date}
                status={e.status}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-display text-xl">
          Stories <span className="text-cocoa/40 dark:text-ivory/40">({stories.length})</span>
        </h2>
        {stories.length === 0 ? (
          <p className="text-sm text-cocoa/50 dark:text-ivory/50">No stories yet.</p>
        ) : (
          <div className="border border-cocoa/10 px-5 dark:border-ivory/10">
            {stories.map((s) => (
              <ContentRow
                key={s.id}
                table="stories"
                id={s.id}
                title={s.title}
                subtitle={s.category}
                status={s.status}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl">
          Partnership Inquiries <span className="text-cocoa/40 dark:text-ivory/40">({partnerships.length})</span>
        </h2>
        {partnerships.length === 0 ? (
          <p className="text-sm text-cocoa/50 dark:text-ivory/50">No inquiries yet.</p>
        ) : (
          <div className="divide-y divide-cocoa/10 border border-cocoa/10 dark:divide-ivory/10 dark:border-ivory/10">
            {partnerships.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{p.org_name}</p>
                  <p className="text-[12px] text-cocoa/55 dark:text-ivory/55">
                    {p.contact_email} · {p.type}
                  </p>
                  {p.message && (
                    <p className="mt-1 text-[13px] text-cocoa/70 dark:text-ivory/70">{p.message}</p>
                  )}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-cocoa/50 dark:text-ivory/50">
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="mt-10 text-center text-xs text-cocoa/40 dark:text-ivory/40">
        New businesses, events, and stories are added directly in Supabase's
        table editor for now — a proper submission form comes when business
        self-signup launches.
      </p>
    </main>
  );
}
