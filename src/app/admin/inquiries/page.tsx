import type { Metadata } from "next";
import Link from "next/link";
import { AdminHeader, StatusBadge } from "@/components/admin-ui";
import { requireAdmin } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/service";
import type { InquiryStatus } from "@/validation/inquiry";

export const metadata: Metadata = { title: "Inquiries" };
type Row = { id: string; created_at: string; name: string; company: string | null; country: string; product: string | null; email: string; email_notification_status: "pending" | "sent" | "failed"; status: InquiryStatus };

export default async function InquiriesPage() {
  const user = await requireAdmin();
  const supabase = createServiceClient();
  const { data, error } = await supabase.from("inquiries").select("id, created_at, name, company, country, product, email, email_notification_status, status").order("created_at", { ascending: false }).limit(200);
  const rows = (data ?? []) as Row[];
  return <><AdminHeader email={user.email} /><div className="container-site py-12 md:py-20"><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow">Sales intake</p><h1 className="display mt-7 text-6xl md:text-8xl">Inquiries.</h1></div><p className="text-sm text-[#706d66]">Newest first / Up to 200 records</p></div>{error ? <div role="alert" className="mt-12 border-l-2 border-[#a63c2f] bg-[#eee5df] p-5 text-sm">Inquiry records could not be loaded. Check provider configuration and server logs.</div> : rows.length === 0 ? <div className="mt-12 border-y hairline py-16 text-center"><p className="display text-4xl">No inquiries yet.</p><p className="mt-4 text-sm text-[#706d66]">Valid public submissions will appear here after database persistence.</p></div> : <div className="mt-12 overflow-x-auto bg-[#f2f0eb]"><table className="w-full min-w-[1050px] border-collapse text-left text-sm"><thead><tr className="border-b hairline text-[0.59rem] uppercase tracking-[0.12em] text-[#77746d]">{["Date", "Name", "Company", "Country", "Product", "Email", "Email status", "Inquiry status"].map((head) => <th key={head} className="px-4 py-4 font-bold">{head}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id} className="border-b hairline hover:bg-white/60"><td className="px-4 py-5 whitespace-nowrap"><Link href={`/admin/inquiries/${row.id}`} className="font-medium underline-offset-4 hover:underline">{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(row.created_at))}</Link></td><td className="px-4 py-5 font-medium">{row.name}</td><td className="px-4 py-5">{row.company ?? "—"}</td><td className="px-4 py-5">{row.country}</td><td className="px-4 py-5">{row.product ?? "General"}</td><td className="px-4 py-5"><a className="underline-offset-4 hover:underline" href={`mailto:${row.email}`}>{row.email}</a></td><td className="px-4 py-5"><StatusBadge status={row.email_notification_status} /></td><td className="px-4 py-5"><StatusBadge status={row.status} /></td></tr>)}</tbody></table></div>}</div></>;
}
