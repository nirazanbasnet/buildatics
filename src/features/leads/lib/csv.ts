import type { LeadRow } from "../types";

const COLUMNS: Array<{ header: string; value: (r: LeadRow) => string }> = [
  { header: "Lead No", value: (r) => r.leadNo },
  { header: "Client", value: (r) => r.client },
  { header: "Phone", value: (r) => r.phone },
  { header: "Address", value: (r) => r.address },
  { header: "Stage", value: (r) => r.stage },
  { header: "Status", value: (r) => r.status },
  { header: "Assigned", value: (r) => r.assignee },
  { header: "Budget", value: (r) => r.budget }
];

function escapeCell(value: string): string {
  // Wrap in quotes and double any embedded quotes if the value contains a comma, quote, or newline.
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function leadsToCsv(rows: LeadRow[]): string {
  const header = COLUMNS.map((c) => c.header).join(",");
  const body = rows.map((r) => COLUMNS.map((c) => escapeCell(c.value(r))).join(",")).join("\n");
  return `${header}\n${body}`;
}

// Triggers a client-side download of the rows as a CSV file.
export function downloadLeadsCsv(rows: LeadRow[], filename = "leads.csv"): void {
  const blob = new Blob([leadsToCsv(rows)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
