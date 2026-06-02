# DesignCustomFieldsA

Provides admin APIs for managing custom fields at the system design template level.
Admin users can extend design metadata with application-specific attributes used across system templates.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/DesignCustomFieldsA/All` |  (Auth) |
| POST | `/api/DesignCustomFieldsA/Create` |  (Auth) |
| DELETE | `/api/DesignCustomFieldsA/Delete` | Note: Permanently deletes! (Auth) |
| GET | `/api/DesignCustomFieldsA/Get` |  (Auth) |
| POST | `/api/DesignCustomFieldsA/Update` |  (Auth) |

## GET `/api/DesignCustomFieldsA/All`

 (Auth)

- **Operation ID:** `DesignCustomFieldsA_All_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignCustomFieldARes`](../schemas.md#designcustomfieldares)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/DesignCustomFieldsA/Create`

 (Auth)

- **Operation ID:** `DesignCustomFieldsA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`DesignCustomFieldAReq`](../schemas.md#designcustomfieldareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignCustomFieldARes`](../schemas.md#designcustomfieldares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/DesignCustomFieldsA/Delete`

Note: Permanently deletes! (Auth)

- **Operation ID:** `DesignCustomFieldsA_Delete_DELETE`
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

## GET `/api/DesignCustomFieldsA/Get`

 (Auth)

- **Operation ID:** `DesignCustomFieldsA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignCustomFieldARes`](../schemas.md#designcustomfieldares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/DesignCustomFieldsA/Update`

 (Auth)

- **Operation ID:** `DesignCustomFieldsA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`DesignCustomFieldAReq`](../schemas.md#designcustomfieldareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignCustomFieldARes`](../schemas.md#designcustomfieldares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
