import type { QuotationRow } from "../types";

const COLUMNS: Array<{ header: string; value: (r: QuotationRow) => string }> = [
  { header: "Quote", value: (r) => r.ref },
  { header: "Version", value: (r) => `V${r.version}` },
  { header: "Client", value: (r) => r.client },
  { header: "Site Address", value: (r) => r.siteAddress },
  { header: "Quote Date", value: (r) => r.quoteDate },
  { header: "Expiry Date", value: (r) => r.expiryDate },
  { header: "Status", value: (r) => r.statusLabel },
];

function escapeCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function quotesToCsv(rows: QuotationRow[]): string {
  const header = COLUMNS.map((c) => c.header).join(",");
  const body = rows
    .map((r) => COLUMNS.map((c) => escapeCell(c.value(r))).join(","))
    .join("\n");
  return `${header}\n${body}`;
}

export function downloadQuotesCsv(
  rows: QuotationRow[],
  filename = "quotations.csv",
): void {
  const blob = new Blob([quotesToCsv(rows)], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
