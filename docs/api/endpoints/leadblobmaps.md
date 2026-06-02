# LeadBlobMaps

Manages file and image attachments associated with sales leads.
These endpoints support storing proposal documents, reference files, and other lead-specific assets in blob storage.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/LeadBlobMaps/All` | Gets all blob files associated with a lead. (Auth roles: 1.0.0,22.2.0,22.2.1) |
| POST | `/api/LeadBlobMaps/Create` | Uploads and associates a new file (blob) with a lead. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1) |
| DELETE | `/api/LeadBlobMaps/Delete` | Permanently deletes a blob file and its association with the lead. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1) |
| GET | `/api/LeadBlobMaps/Get` | Gets a single blob file associated with a lead. (Auth roles: 1.0.0,22.2.0,22.2.1) |
| POST | `/api/LeadBlobMaps/Update` | Updates blob metadata (description). To update the actual file, delete and re-create. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1) |

## POST `/api/LeadBlobMaps/All`

Gets all blob files associated with a lead. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `LeadBlobMaps_All_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadBlobMapRes`](../schemas.md#leadblobmapres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadBlobMaps/Create`

Uploads and associates a new file (blob) with a lead. (Audited)  (Auth roles: 1.0.0,22.1.0,22.1.1)

- **Operation ID:** `LeadBlobMaps_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadBlobMapRes`](../schemas.md#leadblobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/LeadBlobMaps/Delete`

Permanently deletes a blob file and its association with the lead. (Audited)  (Auth roles: 1.0.0,22.4.0,22.4.1)

- **Operation ID:** `LeadBlobMaps_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `blobId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/LeadBlobMaps/Get`

Gets a single blob file associated with a lead. (Auth roles: 1.0.0,22.2.0,22.2.1)

- **Operation ID:** `LeadBlobMaps_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `blobId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`BlobModelRes`](../schemas.md#blobmodelres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/LeadBlobMaps/Update`

Updates blob metadata (description).
To update the actual file, delete and re-create. (Audited)  (Auth roles: 1.0.0,22.3.0,22.3.1)

- **Operation ID:** `LeadBlobMaps_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `leadId` | string (uuid) | — |  |
| query | `blobId` | string (uuid) | — |  |

**Request body:** [`BlobModelUpdateReq`](../schemas.md#blobmodelupdatereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`LeadBlobMapRes`](../schemas.md#leadblobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
