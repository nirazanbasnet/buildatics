# CompanyDesignBlobs

Manages blob (file/image) attachments for company designs.
Blobs store images and files that are referenced by design objects and contribute to company storage usage.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/CompanyDesignBlobs/All` |  (Auth roles: 1.0.0,20.2.0) |
| POST | `/api/CompanyDesignBlobs/Create` |  (Audited)  (Auth roles: 1.0.0,20.1.0) |
| DELETE | `/api/CompanyDesignBlobs/Delete` | Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0,20.4.0) |
| GET | `/api/CompanyDesignBlobs/Get` |  (Auth roles: 1.0.0,20.2.0) |
| POST | `/api/CompanyDesignBlobs/Update` | Does not update the attachment itself, only metadata like Description. To update the attachment, delete and re-create. (Audited)  (Auth roles: 1.0.0,20.1.0) |

## POST `/api/CompanyDesignBlobs/All`

 (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyDesignBlobs_All_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyDesignId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobModelRes`](../schemas.md#blobmodelres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyDesignBlobs/Create`

 (Audited)  (Auth roles: 1.0.0,20.1.0)

- **Operation ID:** `CompanyDesignBlobs_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyDesignId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobModelRes`](../schemas.md#blobmodelres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/CompanyDesignBlobs/Delete`

Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0,20.4.0)

- **Operation ID:** `CompanyDesignBlobs_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `companyDesignId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompanyDesignBlobs/Get`

 (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyDesignBlobs_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `companyDesignId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobModelRes`](../schemas.md#blobmodelres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyDesignBlobs/Update`

Does not update the attachment itself, only metadata like Description.
To update the attachment, delete and re-create. (Audited)  (Auth roles: 1.0.0,20.1.0)

- **Operation ID:** `CompanyDesignBlobs_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `companyDesignId` | string (uuid) | — |  |

**Request body:** [`BlobModelUpdateReq`](../schemas.md#blobmodelupdatereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobModelRes`](../schemas.md#blobmodelres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
