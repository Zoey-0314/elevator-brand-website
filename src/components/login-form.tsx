"use client";
import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/login/actions";
const initialState: LoginState = { error: "" };
export function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);
  return <form action={action} className="mt-10"><label className="block"><span className="text-[0.65rem] font-bold tracking-[0.13em] uppercase">Admin email</span><input name="email" type="email" autoComplete="username" required className="field" /></label><label className="mt-7 block"><span className="text-[0.65rem] font-bold tracking-[0.13em] uppercase">Password</span><input name="password" type="password" autoComplete="current-password" required minLength={8} className="field" /></label>{state.error ? <p role="alert" className="mt-6 border-l-2 border-[#a63c2f] bg-[#eee5df] p-4 text-sm">{state.error}</p> : null}<button disabled={pending} className="button-dark mt-8 w-full disabled:opacity-50">{pending ? "Signing in…" : "Sign in"} <span aria-hidden="true">↗</span></button></form>;
}
