# BrochureTemplates

Provides read-only brochure template endpoints for users with brochure read permissions.
Returns only templates that are marked as available.

**Operations:** 1 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/BrochureTemplates/Page` | Paginates available brochure templates (IsAvailable = true) (Auth roles: 1.0.0,23.2.0) |

## POST `/api/BrochureTemplates/Page`

Paginates available brochure templates (IsAvailable = true) (Auth roles: 1.0.0,23.2.0)

- **Operation ID:** `BrochureTemplates_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BrochureTemplateResPage`](../schemas.md#brochuretemplaterespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
