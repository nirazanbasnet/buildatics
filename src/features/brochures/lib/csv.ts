import type { BrochureRow } from "./types";

const COLUMNS: Array<{ header: string; value: (r: BrochureRow) => string }> = [
  { header: "Name", value: (r) => r.name },
  { header: "Template", value: (r) => r.templateName || "—" },
  { header: "Created", value: (r) => r.created },
];

function escapeCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function brochuresToCsv(rows: BrochureRow[]): string {
  const header = COLUMNS.map((c) => c.header).join(",");
  const body = rows
    .map((r) => COLUMNS.map((c) => escapeCell(c.value(r))).join(","))
    .join("\n");
  return `${header}\n${body}`;
}

export function downloadBrochuresCsv(
  rows: BrochureRow[],
  filename = "brochures.csv",
): void {
  const blob = new Blob([brochuresToCsv(rows)], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
