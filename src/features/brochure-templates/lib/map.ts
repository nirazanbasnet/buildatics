import type { BrochureTemplateARes } from "./dto";
import type { BrochureTemplateRow } from "./types";

const DASH = "—";

function formatDate(iso: string | null | undefined): string {
  if (!iso) return DASH;
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? DASH
    : d.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

export function mapTemplateRow(t: BrochureTemplateARes): BrochureTemplateRow {
  return {
    id: t.id ?? "",
    name: t.name?.trim() || "Untitled template",
    note: t.note?.trim() || "",
    isAvailable: Boolean(t.isAvailable),
    created: formatDate(t.createdOnUtc),
    fileName: t.blobModel?.fileName ?? "",
    fileUrl: t.blobModel?.inlineOpenSasUrl ?? t.blobModel?.sasUrl ?? "",
  };
}
