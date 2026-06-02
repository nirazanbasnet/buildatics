# ModuleAppRoles

Retrieves the module permission roles that a company can assign to staff designations.
These roles define feature-level access such as read, create, update, and delete permissions across application modules.

**Operations:** 2 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/ModuleAppRoles/Get` | Gets a single available module app role by ID. (Auth roles: 1.0.0) |
| POST | `/api/ModuleAppRoles/Page` | Gets a paged list of available module app roles that can be assigned within the company. (Auth roles: 1.0.0) |

## GET `/api/ModuleAppRoles/Get`

Gets a single available module app role by ID. (Auth roles: 1.0.0)

- **Operation ID:** `ModuleAppRoles_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ModuleAppRoleRes`](../schemas.md#moduleapproleres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/ModuleAppRoles/Page`

Gets a paged list of available module app roles that can be assigned within the company. (Auth roles: 1.0.0)

- **Operation ID:** `ModuleAppRoles_Page_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ModuleAppRoleResPage`](../schemas.md#moduleapprolerespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
