# DesignationToModuleAppRoleMap

Allows to manage the permissions for Designations by mapping them to ModuleAppRoles.

**Operations:** 4 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/DesignationToModuleAppRoleMap/All` |  (Auth roles: 1.0.0) |
| POST | `/api/DesignationToModuleAppRoleMap/Create` |  (Audited)  (Auth roles: 1.0.0) |
| DELETE | `/api/DesignationToModuleAppRoleMap/Delete` |  (Audited)  (Auth roles: 1.0.0) |
| GET | `/api/DesignationToModuleAppRoleMap/Get` |  (Auth roles: 1.0.0) |

## GET `/api/DesignationToModuleAppRoleMap/All`

 (Auth roles: 1.0.0)

- **Operation ID:** `DesignationToModuleAppRoleMap_All_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designationId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignationToModuleAppRoleMapRes`](../schemas.md#designationtomoduleapprolemapres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/DesignationToModuleAppRoleMap/Create`

 (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `DesignationToModuleAppRoleMap_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`DesignationToModuleAppRoleMapReq`](../schemas.md#designationtomoduleapprolemapreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignationToModuleAppRoleMapRes`](../schemas.md#designationtomoduleapprolemapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/DesignationToModuleAppRoleMap/Delete`

 (Audited)  (Auth roles: 1.0.0)

- **Operation ID:** `DesignationToModuleAppRoleMap_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designationId` | string (uuid) | — |  |
| query | `moduleAppRoleId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/DesignationToModuleAppRoleMap/Get`

 (Auth roles: 1.0.0)

- **Operation ID:** `DesignationToModuleAppRoleMap_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designationId` | string (uuid) | — |  |
| query | `moduleAppRoleId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignationToModuleAppRoleMapRes`](../schemas.md#designationtomoduleapprolemapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
