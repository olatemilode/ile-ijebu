import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
        Admin
      </p>
      <h1 className="mt-2 font-display text-3xl">Ilé Ìjẹ̀bú</h1>
      <p className="mt-2 text-sm text-cocoa/60 dark:text-ivory/60">
        Enter the admin access code to manage content.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </main>
  );
}
