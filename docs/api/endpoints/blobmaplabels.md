# BlobMapLabels

Manages Document/Blob labels that can be assigned to BlobMaps for categorisation and filtering.

**Operations:** 6 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/BlobMapLabels/All` |  (Auth roles: 1.0.0,9.2.0) |
| POST | `/api/BlobMapLabels/AllWithCounts` |  (Auth roles: 1.0.0,9.2.0) |
| POST | `/api/BlobMapLabels/Create` |  (Audited)  (Auth roles: 1.0.0,9.1.0) |
| DELETE | `/api/BlobMapLabels/Delete` |  (Audited)  (Auth roles: 1.0.0,9.4.0) |
| GET | `/api/BlobMapLabels/Get` |  (Auth roles: 1.0.0,9.2.0) |
| POST | `/api/BlobMapLabels/Update` |  (Audited)  (Auth roles: 1.0.0,9.3.0) |

## POST `/api/BlobMapLabels/All`

 (Auth roles: 1.0.0,9.2.0)

- **Operation ID:** `BlobMapLabels_All_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobMapLabelRes`](../schemas.md#blobmaplabelres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/BlobMapLabels/AllWithCounts`

 (Auth roles: 1.0.0,9.2.0)

- **Operation ID:** `BlobMapLabels_AllWithCounts_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobMapLabelCountRes`](../schemas.md#blobmaplabelcountres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/BlobMapLabels/Create`

 (Audited)  (Auth roles: 1.0.0,9.1.0)

- **Operation ID:** `BlobMapLabels_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`BlobMapLabelReq`](../schemas.md#blobmaplabelreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobMapLabelRes`](../schemas.md#blobmaplabelres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/BlobMapLabels/Delete`

 (Audited)  (Auth roles: 1.0.0,9.4.0)

- **Operation ID:** `BlobMapLabels_Delete_DELETE`
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

## GET `/api/BlobMapLabels/Get`

 (Auth roles: 1.0.0,9.2.0)

- **Operation ID:** `BlobMapLabels_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobMapLabelRes`](../schemas.md#blobmaplabelres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/BlobMapLabels/Update`

 (Audited)  (Auth roles: 1.0.0,9.3.0)

- **Operation ID:** `BlobMapLabels_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`BlobMapLabelReq`](../schemas.md#blobmaplabelreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobMapLabelRes`](../schemas.md#blobmaplabelres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
