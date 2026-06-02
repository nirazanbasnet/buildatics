# BlobMaps

Manages Documents/BlobMaps — metadata records that associate uploaded blobs/documents with owner entities and labels.

**Operations:** 7 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/BlobMaps/AssignLabels` |  (Auth roles: 1.0.0,9.3.0) |
| POST | `/api/BlobMaps/Create` |  (Audited)  (Auth roles: 1.0.0,9.1.0) |
| DELETE | `/api/BlobMaps/Delete` |  (Audited)  (Auth roles: 1.0.0,9.4.0) |
| GET | `/api/BlobMaps/Get` |  (Auth roles: 1.0.0,9.2.0) |
| POST | `/api/BlobMaps/Page` |  (Auth roles: 1.0.0,9.2.0) |
| POST | `/api/BlobMaps/SoftDelete` |  (Audited)  (Auth roles: 1.0.0,9.4.0) |
| POST | `/api/BlobMaps/Update` |  (Audited)  (Auth roles: 1.0.0,9.3.0) |

## POST `/api/BlobMaps/AssignLabels`

 (Auth roles: 1.0.0,9.3.0)

- **Operation ID:** `BlobMaps_AssignLabels_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobMapRes`](../schemas.md#blobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/BlobMaps/Create`

 (Audited)  (Auth roles: 1.0.0,9.1.0)

- **Operation ID:** `BlobMaps_Create_POST`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobMapRes`](../schemas.md#blobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/BlobMaps/Delete`

 (Audited)  (Auth roles: 1.0.0,9.4.0)

- **Operation ID:** `BlobMaps_Delete_DELETE`
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

## GET `/api/BlobMaps/Get`

 (Auth roles: 1.0.0,9.2.0)

- **Operation ID:** `BlobMaps_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `includeDeleted` | boolean | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobMapRes`](../schemas.md#blobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/BlobMaps/Page`

 (Auth roles: 1.0.0,9.2.0)

- **Operation ID:** `BlobMaps_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`BlobMapFilterReq`](../schemas.md#blobmapfilterreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobMapResPage`](../schemas.md#blobmaprespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/BlobMaps/SoftDelete`

 (Audited)  (Auth roles: 1.0.0,9.4.0)

- **Operation ID:** `BlobMaps_SoftDelete_POST`
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

## POST `/api/BlobMaps/Update`

 (Audited)  (Auth roles: 1.0.0,9.3.0)

- **Operation ID:** `BlobMaps_Update_POST`
- **Auth:** Bearer token required

**Request body:** [`BlobMapUpdateReq`](../schemas.md#blobmapupdatereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobMapRes`](../schemas.md#blobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
