// The address `State` enum (docs/api/schemas.md#state) is an integer 0–7 with NO documented labels.
//
// Gap: the spec gives only the numeric values `0..7`; it never names them. Interim decision: the
// Buildatics platform is Australian (ABN, AU addressing), so we map 0–7 to the 8 AU states/territories
// in their conventional order. This is a guess — confirm the real value→label mapping with the API
// owners before relying on it for anything beyond display, and update here once known.
export type StateOption = { value: number; label: string };

export const STATE_OPTIONS: StateOption[] = [
  { value: 0, label: "ACT" },
  { value: 1, label: "NSW" },
  { value: 2, label: "NT" },
  { value: 3, label: "QLD" },
  { value: 4, label: "SA" },
  { value: 5, label: "TAS" },
  { value: 6, label: "VIC" },
  { value: 7, label: "WA" },
];

export const STATE_UNSET = "unset";
