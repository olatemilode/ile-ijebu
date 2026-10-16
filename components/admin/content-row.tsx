"use client";

import { useTransition } from "react";
import { updateContentStatus, deleteContent, toggleVerified } from "@/app/admin/actions";
import { StatusBadge } from "./status-badge";
import type { ContentStatus } from "@/lib/types/database";

type Table = "businesses" | "events" | "stories";

export function ContentRow({
  table,
  id,
  title,
  subtitle,
  status,
  verified,
  showVerify = false,
}: {
  table: Table;
  id: string;
  title: string;
  subtitle: string;
  status: ContentStatus;
  verified?: boolean;
  showVerify?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  function setStatus(next: ContentStatus) {
    startTransition(() => updateContentStatus(table, id, next));
  }

  function handleDelete() {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    startTransition(() => deleteContent(table, id));
  }

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-cocoa/10 py-4 last:border-0 dark:border-ivory/10">
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{title}</p>
        <p className="truncate text-[12px] text-cocoa/55 dark:text-ivory/55">{subtitle}</p>
      </div>

      <StatusBadge status={status} />

      {showVerify && (
        <button
          onClick={() => startTransition(() => toggleVerified(id, !verified))}
          disabled={pending}
          className={`text-[11px] font-bold uppercase tracking-wide ${
            verified ? "text-aro-green" : "text-cocoa/40 dark:text-ivory/40"
          }`}
        >
          {verified ? "✓ Verified" : "Not verified"}
        </button>
      )}

      <div className="flex gap-2">
        {status !== "published" && (
          <button
            onClick={() => setStatus("published")}
            disabled={pending}
            className="border border-aro-green px-3 py-1.5 text-[11px] font-bold text-aro-green transition hover:bg-aro-green/10 disabled:opacity-50"
          >
            Publish
          </button>
        )}
        {status !== "rejected" && (
          <button
            onClick={() => setStatus("rejected")}
            disabled={pending}
            className="border border-aro-red px-3 py-1.5 text-[11px] font-bold text-aro-red transition hover:bg-aro-red/10 disabled:opacity-50"
          >
            Reject
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={pending}
          className="px-3 py-1.5 text-[11px] font-bold text-cocoa/40 transition hover:text-aro-red dark:text-ivory/40 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
