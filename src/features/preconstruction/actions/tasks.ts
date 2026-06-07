"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadTaskReq } from "../lib/dto";

export type TaskActionResult = { ok: boolean; error?: string };

export type CreateTaskInput = {
  title: string;
  description?: string;
  dueDate?: string;
  status?: number;
};

function fail(error: unknown, fallback: string): TaskActionResult {
  return {
    ok: false,
    error: error instanceof ApiError ? error.message : fallback,
  };
}

// Server Action: creates a task on the lead (POST /api/LeadTasks/Create?leadId).
export async function createTask(
  leadId: string,
  input: CreateTaskInput,
): Promise<TaskActionResult> {
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

// Server Action: updates only a task's status (POST /api/LeadTasks/UpdateStatus?leadId&id).
export async function updateTaskStatus(
  leadId: string,
  taskId: string,
  status: number,
): Promise<TaskActionResult> {
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

// Server Action: deletes a task (DELETE /api/LeadTasks/Delete?leadId&id).
export async function deleteTask(
  leadId: string,
  taskId: string,
): Promise<TaskActionResult> {
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
