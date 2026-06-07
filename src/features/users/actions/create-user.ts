"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { MessageResponseDto, RegisterUserReq } from "../lib/dto";
import {
  createUserSchema,
  type CreateUserInput,
} from "../lib/users-form-schema";
import type { CreateUserResult } from "../types";

// Creates a new Admin or DesignAdmin. POST /api/UsersA/CreateAdmin | /CreateDesignAdmin (Bearer, Admin).
// The new user's email must be confirmed separately (see confirmEmail) before they can log in.
export async function createUser(
  input: CreateUserInput,
): Promise<CreateUserResult> {
  const parsed = createUserSchema.safeParse(input);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      fieldErrors: { email: fe.email?.[0], password: fe.password?.[0] },
    };
  }
  const { email, password, role } = parsed.data;

  const path =
    role === "Admin"
      ? "/api/UsersA/CreateAdmin"
      : "/api/UsersA/CreateDesignAdmin";
  const body: RegisterUserReq = { email, password };

  try {
    const res = await apiFetch<MessageResponseDto>(path, {
      method: "POST",
      auth: true,
      body,
    });
    return { ok: true, message: res.message ?? "User created." };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to create the user.",
    };
  }
}
