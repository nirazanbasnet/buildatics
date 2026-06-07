import { z } from "zod";

// Edit form (title/description/valid-until) — shared by the edit sheet and updateQuote action.
export const editQuoteSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  description: z.string().trim().optional(),
  // <input type="date"> value (yyyy-mm-dd) or empty.
  validUntil: z.string().trim().optional(),
});

export type EditQuoteInput = z.infer<typeof editQuoteSchema>;

// Add form additionally requires the lead the quote belongs to (the API creates quotes per-lead).
export const addQuoteSchema = editQuoteSchema.extend({
  leadId: z.string().min(1, "Select a lead."),
});

export type AddQuoteInput = z.infer<typeof addQuoteSchema>;

// Converts a yyyy-mm-dd date input into the UTC ISO string the API expects (null when empty).
export function toUtcIso(date: string | undefined): string | null {
  if (!date || !date.trim()) return null;
  const ms = Date.parse(date);
  return Number.isFinite(ms) ? new Date(ms).toISOString() : null;
}
