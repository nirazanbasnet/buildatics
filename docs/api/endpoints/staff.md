# Staff

Manages staff user accounts, roles, and designations within a company.
Staff users have assigned designations that grant them module-specific permissions for access control.
Only company owners can manage staff within their organization.

**Operations:** 10 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/Staff/All` | Returns all the Staff users (non deleted) belonging to the Company of the current user. (Auth roles: 1.0.0) |
| POST | `/api/Staff/AssignDesignation` | Assigment of desigantion. Hence indirect role assignment (Audited)  (Auth roles: 1.0.0) |
| POST | `/api/Staff/CreateModuleRole` | Direct assignment of a role to the staff (Audited)  (Auth roles: 1.0.0) |
| POST | `/api/Staff/DeleteModuleRole` |  (Audited)  (Auth roles: 1.0.0) |
| GET | `/api/Staff/Get` |  (Auth roles: 1.0.0) |
| POST | `/api/Staff/Invite` | Invite a new Staff. (Audited)  (Auth roles: 1.0.0) |
| POST | `/api/Staff/InviteReminder` | Resends the Email confirmation link to the Staff's Email  as a reminder for him to confirm his email. (Auth roles: 1.0.0) |
| DELETE | `/api/Staff/SoftDelete` | Soft-deletes a Staff (Audited)  (Auth roles: 1.0.0) |
| DELETE | `/api/Staff/UnassignDesignation` |  (Audited)  (Auth roles: 1.0.0) |
| POST | `/api/Staff/Update` | Update existing non-deleted staff. Note: For Staff with confirmed email address, Email and Role cannot be updated. (Audited)  (Auth roles: 1.0.0) |

## POST `/api/Staff/All`

Returns all the Staff users (non deleted) belonging to the Company of the current user. (Auth roles: 1.0.0)

- **Operation ID:** `Staff_All_POST`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`StaffRes`](../schemas.md#staffres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Staff/AssignDesignation`

Assigment of desigantion. Hence indirect role assignment (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Staff_AssignDesignation_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `staffId` | string (uuid) | — |  |
| query | `designationId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`StaffRes`](../schemas.md#staffres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Staff/CreateModuleRole`

Direct assignment of a role to the staff (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Staff_CreateModuleRole_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `staffId` | string (uuid) | — |  |

**Request body:** [`AppModuleRoleWrapper`](../schemas.md#appmodulerolewrapper)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`StaffRes`](../schemas.md#staffres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Staff/DeleteModuleRole`

 (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Staff_DeleteModuleRole_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `staffId` | string (uuid) | — |  |

**Request body:** [`AppModuleRoleWrapper`](../schemas.md#appmodulerolewrapper)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`StaffRes`](../schemas.md#staffres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/Staff/Get`

 (Auth roles: 1.0.0)

- **Operation ID:** `Staff_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `staffId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`StaffRes`](../schemas.md#staffres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Staff/Invite`

Invite a new Staff. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Staff_Invite_POST`
- **Auth:** Bearer token required

**Request body:** [`StaffReq`](../schemas.md#staffreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`InviteStaffRes`](../schemas.md#invitestaffres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Staff/InviteReminder`

Resends the Email confirmation link to the Staff's Email 
as a reminder for him to confirm his email. (Auth roles: 1.0.0)

- **Operation ID:** `Staff_InviteReminder_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `staffId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/Staff/SoftDelete`

Soft-deletes a Staff (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Staff_SoftDelete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `staffId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/Staff/UnassignDesignation`

 (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Staff_UnassignDesignation_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `staffId` | string (uuid) | — |  |
| query | `designationId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/Staff/Update`

Update existing non-deleted staff.
Note: For Staff with confirmed email address, Email and Role cannot be updated. (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `Staff_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `staffId` | string (uuid) | — |  |

**Request body:** [`StaffReq`](../schemas.md#staffreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`StaffRes`](../schemas.md#staffres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
