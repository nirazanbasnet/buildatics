# FacadeBlobMapsA

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/FacadeBlobMapsA/Create` |  (Auth roles: Admin) |
| DELETE | `/api/FacadeBlobMapsA/Delete` | Note: Permanently deletes! (Auth roles: Admin) |
| GET | `/api/FacadeBlobMapsA/Get` |  (Auth roles: Admin) |
| POST | `/api/FacadeBlobMapsA/Page` |  (Auth roles: Admin) |
| POST | `/api/FacadeBlobMapsA/Update` | Does not update the attachment itself, only metadata like Description. To update the attachment, delete and re-create. (Auth roles: Admin) |

## POST `/api/FacadeBlobMapsA/Create`

 (Auth roles: Admin)

- **Operation ID:** `FacadeBlobMapsA_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `facadeId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`FacadeBlobMapRes`](../schemas.md#facadeblobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/FacadeBlobMapsA/Delete`

Note: Permanently deletes! (Auth roles: Admin)

- **Operation ID:** `FacadeBlobMapsA_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `facadeId` | string (uuid) | — |  |
| query | `blobModelId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/FacadeBlobMapsA/Get`

 (Auth roles: Admin)

- **Operation ID:** `FacadeBlobMapsA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `facadeId` | string (uuid) | — |  |
| query | `blobModelId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`FacadeBlobMapRes`](../schemas.md#facadeblobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/FacadeBlobMapsA/Page`

 (Auth roles: Admin)

- **Operation ID:** `FacadeBlobMapsA_Page_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `facadeId` | string (uuid) | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`FacadeBlobMapResPage`](../schemas.md#facadeblobmaprespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/FacadeBlobMapsA/Update`

Does not update the attachment itself, only metadata like Description.
To update the attachment, delete and re-create. (Auth roles: Admin)

- **Operation ID:** `FacadeBlobMapsA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `facadeId` | string (uuid) | — |  |
| query | `blobModelId` | string (uuid) | — |  |

**Request body:** [`BlobModelUpdateReq`](../schemas.md#blobmodelupdatereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`FacadeBlobMapRes`](../schemas.md#facadeblobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
