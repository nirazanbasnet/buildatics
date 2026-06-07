"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadTaskReq } from "../lib/lead-detail-dto";

export type LeadActionResult = { ok: boolean; error?: string };

export type CreateLeadTaskInput = {
  title: string;
  description?: string;
  dueDate?: string;
  status?: number;
};

function fail(error: unknown, fallback: string): LeadActionResult {
  return {
    ok: false,
    error: error instanceof ApiError ? error.message : fallback,
  };
}

export async function createTask(
  leadId: string,
  input: CreateLeadTaskInput,
): Promise<LeadActionResult> {
  const title = input.title.trim();
  if (!title) return { ok: false, error: "Title is required." };

  const body: LeadTaskReq = {
    title,
    description: input.description?.trim() || undefined,
    dueDate: input.dueDate || undefined,
    status: input.status ?? 0,
  };
  try {
    await apiFetch(
      `/api/LeadTasks/Create?leadId=${encodeURIComponent(leadId)}`,
      {
        method: "POST",
        auth: true,
        body,
      },
    );
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to create the task.");
  }
}

export async function updateTaskStatus(
  leadId: string,
  taskId: string,
  status: number,
): Promise<LeadActionResult> {
  try {
    await apiFetch(
      `/api/LeadTasks/UpdateStatus?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(taskId)}`,
      { method: "POST", auth: true, body: { status } },
    );
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to update the task.");
  }
}

export async function deleteTask(
  leadId: string,
  taskId: string,
): Promise<LeadActionResult> {
  try {
    await apiFetch(
      `/api/LeadTasks/Delete?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(taskId)}`,
      { method: "DELETE", auth: true },
    );
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to delete the task.");
  }
}
