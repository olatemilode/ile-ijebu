import { cookies } from "next/headers";

const COOKIE_NAME = "ij_admin";

// Deliberately simple for MVP: a shared access code, not per-user auth.
// Good enough while you're the only admin. Replace with Supabase auth +
// role check (profiles.role === 'admin') once business owners need real
// accounts and you want per-admin audit trails.
export async function isAdminAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === "true";
}

export async function setAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
