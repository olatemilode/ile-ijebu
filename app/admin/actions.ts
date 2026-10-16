"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthed } from "@/lib/admin-auth";
import { isSupabaseConfigured } from "@/lib/data/mock-data";
import type { ContentStatus } from "@/lib/types/database";

type Table = "businesses" | "events" | "stories";

async function requireAdmin() {
  const ok = await isAdminAuthed();
  if (!ok) throw new Error("Not authorized");
}

export async function updateContentStatus(
  table: Table,
  id: string,
  status: ContentStatus
) {
  await requireAdmin();
  if (!isSupabaseConfigured) {
    console.log(`[mock] Would set ${table}/${id} status to "${status}" (not saved — connect Supabase)`);
    return;
  }
  const supabase = createAdminClient();
  const { error } = await supabase.from(table).update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath(`/${table}`);
}

export async function deleteContent(table: Table, id: string) {
  await requireAdmin();
  if (!isSupabaseConfigured) {
    console.log(`[mock] Would delete ${table}/${id} (not saved — connect Supabase)`);
    return;
  }
  const supabase = createAdminClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath(`/${table}`);
}

export async function toggleVerified(id: string, verified: boolean) {
  await requireAdmin();
  if (!isSupabaseConfigured) {
    console.log(`[mock] Would set business/${id} verified=${verified} (not saved — connect Supabase)`);
    return;
  }
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("businesses")
    .update({ verified })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/businesses");
}

export async function updatePartnershipStatus(
  id: string,
  status: "new" | "reviewed" | "closed"
) {
  await requireAdmin();
  if (!isSupabaseConfigured) {
    console.log(`[mock] Would set partnership/${id} status to "${status}" (not saved — connect Supabase)`);
    return;
  }
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("partnerships")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}
