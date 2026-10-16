import type { ContentStatus } from "@/lib/types/database";

const STYLES: Record<ContentStatus, string> = {
  draft: "bg-cocoa/10 text-cocoa/60 dark:bg-ivory/10 dark:text-ivory/60",
  pending: "bg-gold/15 text-gold-deep dark:text-gold",
  published: "bg-aro-green/15 text-aro-green",
  rejected: "bg-aro-red/15 text-aro-red",
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
