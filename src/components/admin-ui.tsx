import Link from "next/link";
import { Logo } from "./logo";
import { logout } from "@/app/admin/login/actions";
import type { InquiryStatus } from "@/validation/inquiry";

export function AdminHeader({ email }: { email?: string }) {
  return <header className="border-b hairline bg-[#f2f0eb]"><div className="container-site flex min-h-[78px] items-center justify-between gap-5"><Logo /><div className="flex items-center gap-4"><span className="hidden text-xs text-[#706d66] sm:block">{email}</span><form action={logout}><button className="text-[0.65rem] font-bold tracking-[0.13em] uppercase">Sign out ↗</button></form></div></div></header>;
}
export function StatusBadge({ status }: { status: InquiryStatus | "pending" | "sent" | "failed" }) {
  const styles: Record<string, string> = { new: "bg-[#dbe7df] text-[#315a42]", contacted: "bg-[#e3e1cf] text-[#625d25]", quoted: "bg-[#e8dccf] text-[#784e2f]", won: "bg-[#c9dfcf] text-[#245b36]", closed: "bg-[#deddd9] text-[#5d5a55]", pending: "bg-[#e3e1cf] text-[#625d25]", sent: "bg-[#dbe7df] text-[#315a42]", failed: "bg-[#ead5d1] text-[#8b342b]" };
  return <span className={`inline-flex px-2.5 py-1 text-[0.59rem] font-bold tracking-[0.1em] uppercase ${styles[status] ?? styles.closed}`}>{status}</span>;
}
export function AdminBack() { return <Link href="/admin/inquiries" className="link-arrow">Back to inquiries <span aria-hidden="true">←</span></Link>; }
