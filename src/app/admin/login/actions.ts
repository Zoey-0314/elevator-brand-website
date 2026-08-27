"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { isAdminEmail } from "@/lib/admin-authorization";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type LoginState = { error: string };
const loginSchema = z.object({ email: z.email(), password: z.string().min(8).max(200) });

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: "Enter a valid email and password." };
  let supabase;
  try { supabase = await createServerSupabaseClient(); } catch { return { error: "Admin authentication is not configured yet." }; }
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: "The email or password is incorrect." };
  if (!isAdminEmail(data.user.email)) { await supabase.auth.signOut(); return { error: "This account is not authorized for inquiry administration." }; }
  redirect("/admin/inquiries");
}

export async function logout() { const supabase = await createServerSupabaseClient(); await supabase.auth.signOut(); redirect("/admin/login"); }
