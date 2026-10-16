"use server";

import { redirect } from "next/navigation";
import { setAdminCookie } from "@/lib/admin-auth";

export interface LoginState {
  error?: string;
}

export async function adminLogin(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const code = String(formData.get("code") ?? "");

  const expected = process.env.ADMIN_ACCESS_CODE;
  if (!expected || code !==expected) {
    return { error: "Incorrect access code." };
  }

  await setAdminCookie();
  redirect("/admin");
}
