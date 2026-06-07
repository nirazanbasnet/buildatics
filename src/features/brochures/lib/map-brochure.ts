import type { BrochureRes } from "./dto";
import type { BrochureDetailModel, BrochureRow } from "./types";

// API → UI mappers for brochures (see agent/api.md: document the map + gaps).
// GAPS — BrochureRes has NO client/siteAddress/status/owners/property/designs/history fields; those
// reference-UI sections render a "No data in API" label. Real: name, template, created, HTML blob.

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

function htmlUrl(b: BrochureRes): string {
  return (
    b.blobMap?.blobModel?.inlineOpenSasUrl ?? b.blobMap?.blobModel?.sasUrl ?? ""
  );
}

export function mapBrochureRow(
  b: BrochureRes,
  templateNames: Map<string, string>,
): BrochureRow {
  return {
    id: b.id ?? "",
    name: b.name?.trim() || "Untitled brochure",
    templateName: b.brochureTemplateId
      ? (templateNames.get(b.brochureTemplateId) ?? "")
      : "",
    created: formatDate(b.createdOnUtc),
    htmlUrl: htmlUrl(b),
  };
}

export function mapBrochureDetail(
  b: BrochureRes,
  templateNames: Map<string, string>,
): BrochureDetailModel {
  const templateId = b.brochureTemplateId ?? "";
  return {
    id: b.id ?? "",
    name: b.name?.trim() || "Untitled brochure",
    note: b.note?.trim() || "",
    templateId,
    templateName: templateId ? (templateNames.get(templateId) ?? "") : "",
    created: formatDate(b.createdOnUtc),
    htmlUrl: htmlUrl(b),
  };
}
