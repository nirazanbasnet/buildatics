"use server";

import { getAllDesigns, type DesignProperty } from "@/features/designs";

// Server Action: the Import-from-library picker calls this on open to load the system design
// catalogue (the source for ImportDesign). Reuses the Design Library's fetch + mapper.
export async function listSystemDesigns(): Promise<DesignProperty[]> {
  return getAllDesigns();
}
