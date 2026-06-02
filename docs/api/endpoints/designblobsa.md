# DesignBlobsA

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/DesignBlobsA/Create` |  (Auth roles: Admin,DesignAdmin) |
| DELETE | `/api/DesignBlobsA/Delete` | Note: Permanently deletes! (Auth roles: Admin,DesignAdmin) |
| GET | `/api/DesignBlobsA/Get` |  (Auth roles: Admin,DesignAdmin) |
| POST | `/api/DesignBlobsA/Page` |  (Auth roles: Admin,DesignAdmin) |
| POST | `/api/DesignBlobsA/Update` | Does not update the attachment itself, only metadata like Description. To update the attachment, delete and re-create. (Auth roles: Admin,DesignAdmin) |

## POST `/api/DesignBlobsA/Create`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignBlobsA_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignBlobMapARes`](../schemas.md#designblobmapares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/DesignBlobsA/Delete`

Note: Permanently deletes! (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignBlobsA_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designId` | string (uuid) | — |  |
| query | `blobModelId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/DesignBlobsA/Get`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignBlobsA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designId` | string (uuid) | — |  |
| query | `blobModelId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignBlobMapARes`](../schemas.md#designblobmapares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/DesignBlobsA/Page`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignBlobsA_Page_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designId` | string (uuid) | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignBlobMapAResPage`](../schemas.md#designblobmaparespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/DesignBlobsA/Update`

Does not update the attachment itself, only metadata like Description.
To update the attachment, delete and re-create. (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignBlobsA_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designId` | string (uuid) | — |  |
| query | `blobModelId` | string (uuid) | — |  |

**Request body:** [`UpdateDesignBlobMapAReq`](../schemas.md#updatedesignblobmapareq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignBlobMapARes`](../schemas.md#designblobmapares) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
