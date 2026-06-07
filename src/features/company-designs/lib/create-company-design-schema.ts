import { z } from "zod";

// Client form schema — all numeric inputs are kept as strings (text inputs); the server action
// coerces & validates them via `parseCompanyDesignForm` below. Mirrors the all-string Add Lead form.
export const createCompanyDesignFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  code: z.string().trim().optional(),
  description: z.string().trim().optional(),
  minimumLotWidthInMeters: z.string().trim().optional(),
  minimumLotDepthInMeters: z.string().trim().optional(),
  areaInSquares: z.string().trim().optional(),
  bedrooms: z.string().trim().optional(),
  bathrooms: z.string().trim().optional(),
  livingRooms: z.string().trim().optional(),
  maximumCarsInGarage: z.string().trim().optional(),
  storeys: z.string().trim().optional(),
  visibleOnWebsite: z.boolean(),
});

export type CreateCompanyDesignInput = z.infer<
  typeof createCompanyDesignFormSchema
>;

// Coerced output (what the API CompanyDesignReq expects). Empty strings → undefined.
const optionalNumber = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? Number(v) : undefined))
  .refine(
    (v) => v === undefined || (Number.isFinite(v) && v >= 0),
    "Must be 0 or more.",
  );

const optionalInt = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? Number(v) : undefined))
  .refine(
    (v) => v === undefined || (Number.isInteger(v) && v >= 0),
    "Must be a whole number, 0 or more.",
  );

// Server-side parse: validates the raw form values and coerces numerics for the API request.
export const parseCompanyDesignForm = z.object({
  name: z.string().trim().min(1, "Name is required."),
  code: z.string().trim().optional(),
  description: z.string().trim().optional(),
  minimumLotWidthInMeters: optionalNumber,
  minimumLotDepthInMeters: optionalNumber,
  areaInSquares: optionalNumber,
  bedrooms: optionalInt,
  bathrooms: optionalInt,
  livingRooms: optionalInt,
  maximumCarsInGarage: optionalInt,
  storeys: optionalInt,
  visibleOnWebsite: z.boolean(),
});
