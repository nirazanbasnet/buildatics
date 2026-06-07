import { ShieldAlert } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

type AccessDeniedProps = {
  title?: string;
  description?: string;
};

// Friendly "you don't have permission" state, shown when a page's data load returns a 403.
export function AccessDenied({
  title = "No access",
  description = "Your account doesn't have permission to view this. Contact an administrator if you need access.",
}: AccessDeniedProps) {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShieldAlert />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
