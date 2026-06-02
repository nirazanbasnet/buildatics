import { Archive, File, FileText, Film, ImageIcon, Music } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { DocumentType } from "../_data";

const iconMap: Record<DocumentType, LucideIcon> = {
  document: FileText,
  image: ImageIcon,
  video: Film,
  audio: Music,
  archive: Archive
};

export function getDocumentTypeIcon(type: DocumentType): LucideIcon {
  return iconMap[type] ?? File;
}
