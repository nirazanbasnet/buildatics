# FacadesA

**Operations:** 6 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/FacadesA/Create` |  (Auth roles: Admin) |
| DELETE | `/api/FacadesA/Delete` | Note: Permanent delete! (Auth roles: Admin) |
| GET | `/api/FacadesA/Get` |  (Auth roles: Admin) |
| POST | `/api/FacadesA/PageDescending` |  (Auth roles: Admin) |
| DELETE | `/api/FacadesA/SoftDelete` |  (Auth roles: Admin) |
| POST | `/api/FacadesA/Update` |  (Auth roles: Admin) |

## POST `/api/FacadesA/Create`

 (Auth roles: Admin)

- **Operation ID:** `FacadesA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`FacadeReq`](../schemas.md#facadereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`FacadeRes`](../schemas.md#facaderes) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/FacadesA/Delete`

Note: Permanent delete! (Auth roles: Admin)

- **Operation ID:** `FacadesA_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `forceDelete` | boolean | — | When true, all the related child entities such as blobs, etc. will also be deleted |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/FacadesA/Get`

 (Auth roles: Admin)

- **Operation ID:** `FacadesA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`FacadeRes`](../schemas.md#facaderes) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/FacadesA/PageDescending`

 (Auth roles: Admin)

- **Operation ID:** `FacadesA_PageDescending_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`FacadeResPage`](../schemas.md#facaderespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/FacadesA/SoftDelete`

 (Auth roles: Admin)

- **Operation ID:** `FacadesA_SoftDelete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/FacadesA/Update`

 (Auth roles: Admin)

- **Operation ID:** `FacadesA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Request body:** [`FacadeReq`](../schemas.md#facadereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`FacadeRes`](../schemas.md#facaderes) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
