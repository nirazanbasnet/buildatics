import type { PreconstructionProject } from "../types";

const COLUMNS: Array<{
  header: string;
  value: (p: PreconstructionProject) => string;
}> = [
  { header: "Project No", value: (p) => p.projectNo },
  { header: "Address", value: (p) => p.address },
  { header: "Status", value: (p) => p.status },
  { header: "Stage", value: (p) => p.stage },
  { header: "Council", value: (p) => p.council },
  { header: "Developer", value: (p) => p.developer },
  { header: "Progress", value: (p) => `${p.progress}%` },
];

// RFC 4180: quote a cell when it contains a comma, quote or newline; double any inner quotes.
function escapeCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function preconstructionToCsv(rows: PreconstructionProject[]): string {
  const header = COLUMNS.map((c) => c.header).join(",");
  const body = rows
    .map((r) => COLUMNS.map((c) => escapeCell(c.value(r))).join(","))
    .join("\n");
  return `${header}\n${body}`;
}

export function downloadPreconstructionCsv(
  rows: PreconstructionProject[],
  filename = "preconstruction.csv",
): void {
  const blob = new Blob([preconstructionToCsv(rows)], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
