"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="mx-auto mt-10 max-w-sm rounded-2xl border border-line bg-white p-6 shadow-lg">
      <label htmlFor="pw" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-steel">Password</label>
      <input id="pw" name="password" type="password" autoFocus required className="w-full rounded-xl border border-line bg-mist/40 px-4 py-3 outline-none focus:border-azure" />
      {error && <p className="mt-2 text-sm font-medium text-red-600" role="alert">{error}</p>}
      <button disabled={pending} className="mt-4 w-full rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white disabled:opacity-60">
        {pending ? "Checking..." : "Sign in"}
      </button>
    </form>
  );
}
