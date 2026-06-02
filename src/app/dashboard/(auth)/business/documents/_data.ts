export type DocumentStatus = "issued" | "received";

export const documentStatusConfig: Record<DocumentStatus, { label: string; badge: string }> = {
  issued: {
    label: "Issued",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
  },
  received: {
    label: "Received",
    badge: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300"
  }
};

export type DocumentType = "document" | "image" | "video" | "audio" | "archive";

export type BusinessDocument = {
  id: string;
  fileName: string;
  type: DocumentType;
  size: number;
  status: DocumentStatus;
  uploadedBy: string;
  uploadedOn: string;
};

const statusSequence: DocumentStatus[] = [
  "issued",
  "received",
  "issued",
  "received",
  "issued",
  "received",
  "issued",
  "received",
  "received"
];

const typeSequence: DocumentType[] = [
  "document",
  "image",
  "document",
  "archive",
  "document",
  "video",
  "document",
  "audio",
  "document"
];

const sizeSequence = [
  2_500_000, 1_200_000, 5_600_000, 980_000, 158_000_000, 3_400_000, 720_000, 12_400_000, 4_100_000
];

export const businessDocuments: BusinessDocument[] = statusSequence.map((status, i) => ({
  id: `doc-${String(i + 1).padStart(3, "0")}`,
  fileName: "file_name",
  type: typeSequence[i],
  size: sizeSequence[i],
  status,
  uploadedBy: "staff_name",
  uploadedOn: "uploaded_date"
}));

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
