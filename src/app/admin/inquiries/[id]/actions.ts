"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/service";
import { inquiryStatusSchema } from "@/validation/inquiry";

export async function updateInquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = inquiryStatusSchema.safeParse(formData.get("status"));
  if (!/^[0-9a-f-]{36}$/i.test(id) || !status.success) throw new Error("Invalid status update");
  const { error } = await createServiceClient().from("inquiries").update({ status: status.data, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) throw new Error("Status update failed");
  revalidatePath(`/admin/inquiries/${id}`); revalidatePath("/admin/inquiries");
}
