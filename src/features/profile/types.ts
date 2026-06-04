import type { ProfileDetailsInput } from "./lib/profile-form-schema";

// Result of the updateProfile / changePassword server actions, consumed by the forms.
export type ProfileActionResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof ProfileDetailsInput, string>>;
};

export type ChangePasswordResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"oldPassword" | "newPassword", string>>;
};
