"use client";

import { useActionState } from "react";
import { adminLogin, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="code" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-cocoa/70 dark:text-ivory/70">
          Access Code
        </label>
        <input
          id="code"
          name="code"
          type="password"
          required
          autoFocus
          className="w-full border border-cocoa/20 bg-white/50 px-4 py-3 text-sm outline-none transition focus:border-gold dark:border-ivory/20 dark:bg-white/5"
        />
      </div>

      {state.error && <p className="text-sm text-aro-red">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full border border-gold bg-gold px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-ink transition hover:bg-gold-deep disabled:opacity-60"
      >
        {pending ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}
