import type { StoredInquiry } from "@/lib/inquiries/service";

function escapeHtml(value: string | null) {
  return (value ?? "—").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] ?? char);
}

export function inquiryEmail(inquiry: StoredInquiry) {
  const fields = [
    ["Name", inquiry.name], ["Company", inquiry.company], ["Country", inquiry.country], ["Email", inquiry.email], ["Phone / WhatsApp", inquiry.phone], ["Product", inquiry.product], ["Project type", inquiry.project_type], ["Quantity", inquiry.quantity], ["Message", inquiry.message], ["Source page", inquiry.source_page], ["Submitted", inquiry.created_at], ["Inquiry ID", inquiry.id],
  ];
  return {
    subject: `New Website Inquiry — ${inquiry.product ?? "General"} — ${inquiry.country}`,
    html: `<div style="font-family:Arial,sans-serif;color:#171714;max-width:680px;margin:auto"><p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#91633c">NS Elevator / New inquiry</p><h1 style="font-family:Georgia,serif;font-weight:400;font-size:38px">A new project conversation.</h1><table style="width:100%;border-collapse:collapse">${fields.map(([label, value]) => `<tr><th style="width:32%;padding:12px 0;border-top:1px solid #ddd;text-align:left;vertical-align:top;font-size:12px;text-transform:uppercase;color:#777">${escapeHtml(label)}</th><td style="padding:12px 0;border-top:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("")}</table></div>`,
    text: fields.map(([label, value]) => `${label}: ${value ?? "—"}`).join("\n"),
  };
}
