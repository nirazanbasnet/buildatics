# AuditLogs

Provides APIs for retrieving audit logs that track all changes made within the company.
Audit logs record user actions including create, update, and delete operations for audit trail and compliance purposes.

**Operations:** 1 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/AuditLogs/PageDescending` | Gets a paginated list of audit logs for the company, ordered by newest first. Includes details about the action performed, user who performed it, and timestamp. (Auth roles: 1.0.0) |

## POST `/api/AuditLogs/PageDescending`

Gets a paginated list of audit logs for the company, ordered by newest first. Includes details about the action performed, user who performed it, and timestamp. (Auth roles: 1.0.0)

- **Operation ID:** `AuditLogs_PageDescending_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`AuditLogResPage`](../schemas.md#auditlogrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
