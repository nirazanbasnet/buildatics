import { apiFetch } from "@/features/auth/lib/api-client";
import { getSession } from "@/features/auth/lib/session";
import { getAllDesigns } from "@/features/designs/lib/get-designs-page";

import type { LeadStageRes, StaffRes } from "./dto";
import type { LeadOption, LeadOptions } from "../types";

// Stages ordered by sortOrder (LeadStages/GetAll already returns them ordered, but be defensive).
export async function getLeadStages(): Promise<LeadStageRes[]> {
  const stages = await apiFetch<LeadStageRes[]>("/api/LeadStages/GetAll", {
    auth: true,
  });
  return [...stages].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getStaff(): Promise<StaffRes[]> {
  return apiFetch<StaffRes[]>("/api/Staff/All", {
    method: "POST",
    auth: true,
    body: {},
  });
}

function staffName(s: StaffRes): string {
  return (
    [s.firstName, s.lastName].filter(Boolean).join(" ") || s.email || "Unknown"
  );
}

// Options that drive the Add Lead form selects and the filter sheet.
export async function getLeadOptions(): Promise<LeadOptions> {
  const [stages, staff, designs, session] = await Promise.all([
    getLeadStages(),
    getStaff(),
    getAllDesigns(),
    getSession(),
  ]);

  const stageOptions: LeadOption[] = stages.map((s) => ({
    id: s.id ?? "",
    name: s.name ?? "—",
  }));
  const staffOptions: LeadOption[] = staff.map((s) => ({
    id: s.id ?? "",
    name: staffName(s),
  }));
  const designOptions: LeadOption[] = designs.map((d) => ({
    id: d.id,
    name: d.title,
  }));

  return {
    stages: stageOptions,
    staff: staffOptions,
    designs: designOptions,
    currentUserId: session?.user.id ?? "",
  };
}
