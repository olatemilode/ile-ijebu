"use server";

import { redirect } from "next/navigation";
import { clearAdminCookie } from "@/lib/admin-auth";

export async function adminLogout() {
  await clearAdminCookie();
  redirect("/admin-login");
}
