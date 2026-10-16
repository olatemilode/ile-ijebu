"use client";

import { useActionState } from "react";
import { submitPartnershipInquiry, type PartnerFormState } from "./actions";

const initialState: PartnerFormState = { success: false };

const inputClasses =
  "w-full border border-cocoa/20 bg-white/50 px-4 py-3 text-sm outline-none transition focus:border-gold dark:border-ivory/20 dark:bg-white/5";

export function PartnerForm() {
  const [state, formAction, pending] = useActionState(submitPartnershipInquiry, initialState);

  if (state.success) {
    return (
      <div className="border border-gold/40 bg-gold/5 p-8 text-center">
        <p className="font-display text-2xl">Thank you.</p>
        <p className="mt-2 text-cocoa/70 dark:text-ivory/70">
          We&apos;ve received your inquiry and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="org_name" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-cocoa/70 dark:text-ivory/70">
            Business / Organization *
          </label>
          <input id="org_name" name="org_name" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="contact_name" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-cocoa/70 dark:text-ivory/70">
            Your Name
          </label>
          <input id="contact_name" name="contact_name" className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact_email" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-cocoa/70 dark:text-ivory/70">
            Email *
          </label>
          <input id="contact_email" name="contact_email" type="email" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="contact_phone" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-cocoa/70 dark:text-ivory/70">
            Phone
          </label>
          <input id="contact_phone" name="contact_phone" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="type" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-cocoa/70 dark:text-ivory/70">
          Inquiry Type
        </label>
        <select id="type" name="type" className={inputClasses} defaultValue="business">
          <option value="business">Business Listing</option>
          <option value="sponsor">Sponsorship</option>
          <option value="organization">Organization Partnership</option>
          <option value="community">Community Project</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-cocoa/70 dark:text-ivory/70">
          Message
        </label>
        <textarea id="message" name="message" rows={4} className={inputClasses} />
      </div>

      {state.error && (
        <p className="text-sm text-aro-red">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="border border-gold bg-gold px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-ink transition hover:bg-gold-deep disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
