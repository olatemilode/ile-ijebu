import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login lives at the sibling route /admin-login (not /admin/login) so it
  // isn't caught by this same layout's redirect — Next.js layouts nest by
  // path, and a route under /admin can't escape its own guard.
  const authed = await isAdminAuthed();
  if (!authed) redirect("/admin-login");

  return <>{children}</>;
}
