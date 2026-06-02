# Designs

Provides read-only access to system-provided design templates that users can view and import into their company libraries.
Design templates serve as starting points for companies to create their own customized designs.

**Operations:** 1 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/Designs/Page` |  (Auth roles: 1.0.0,18.2.0) |

## POST `/api/Designs/Page`

 (Auth roles: 1.0.0,18.2.0)

- **Operation ID:** `Designs_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignResPage`](../schemas.md#designrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
