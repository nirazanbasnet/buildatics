import { z } from "zod";

import {
  createLeadSchema,
  normalizeLeadInput,
  type CreateLeadInput,
} from "@/features/leads/lib/lead-form-schema";

// Reuse the leads sentinels so the shared form selects behave identically.
export {
  STAGE_AUTO,
  ASSIGNEE_UNASSIGNED,
  DESIGN_NONE,
} from "@/features/leads/lib/lead-form-schema";

// A preconstruction project is a Lead + a Developer field (docs/api/schemas.md#leadreq).
export const createProjectSchema = createLeadSchema.extend({
  developer: z.string().trim().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

// Converts select sentinels → undefined (delegates to the leads normalizer) and keeps developer.
export function normalizeProjectInput(
  values: CreateProjectInput,
): CreateProjectInput {
  const base = normalizeLeadInput(values as CreateLeadInput);
  return { ...base, developer: values.developer };
}
