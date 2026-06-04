"use server";

import { redirect } from "next/navigation";

import { clearSession } from "../lib/session";

const LOGIN_PATH = "/login";

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect(LOGIN_PATH);
}
