import { z } from "zod";

// Shared by the Add Lead form (client validation) and the createLead server action.
export const createLeadSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address.").optional().or(z.literal("")),
  lotAddress: z.string().trim().optional(),
  leadStageId: z.string().optional(),
  assignedUserId: z.string().optional(),
  companyDesignId: z.string().optional()
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

// Sentinels for the selects (Radix Select can't use empty-string values); mapped to undefined on submit.
export const STAGE_AUTO = "auto";
export const DESIGN_NONE = "none";
export const ASSIGNEE_UNASSIGNED = "unassigned";

// Converts the form's sentinel select values into the undefined the API expects.
export function normalizeLeadInput(values: CreateLeadInput): CreateLeadInput {
  return {
    ...values,
    leadStageId: values.leadStageId === STAGE_AUTO ? undefined : values.leadStageId,
    assignedUserId:
      values.assignedUserId === ASSIGNEE_UNASSIGNED ? undefined : values.assignedUserId,
    companyDesignId: values.companyDesignId === DESIGN_NONE ? undefined : values.companyDesignId
  };
}
