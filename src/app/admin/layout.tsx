import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | NS Elevator Admin" }, robots: { index: false, follow: false, nocache: true } };
export const dynamic = "force-dynamic";
export default function AdminLayout({ children }: { children: ReactNode }) { return <main className="min-h-screen bg-[#e9e7e1]">{children}</main>; }
