import "server-only";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin-authorization";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/admin/login");
  if (!isAdminEmail(user.email)) redirect("/admin/login?error=unauthorized");
  return user;
}
