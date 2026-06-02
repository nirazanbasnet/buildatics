import { businessDocuments } from "./_data";
import { PaginationNav } from "@src/components/pagination-nav";
import { DocumentsTable } from "./_components/documents-table";
import { DocumentsToolbar } from "./_components/documents-toolbar";

export default function BusinessDocumentsPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <DocumentsToolbar />
      <DocumentsTable documents={businessDocuments} />
      <PaginationNav />
    </div>
  );
}
