# CompanyFacadeBlobMaps

Manages blob (file) attachments for company facades.
Handles the association between facade design elements and their related images/files.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/CompanyFacadeBlobMaps/All` |  (Auth roles: 1.0.0,20.2.0) |
| POST | `/api/CompanyFacadeBlobMaps/Create` |  (Audited)  (Auth roles: 1.0.0,20.1.0) |
| DELETE | `/api/CompanyFacadeBlobMaps/Delete` | Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0,20.4.0) |
| GET | `/api/CompanyFacadeBlobMaps/Get` |  (Auth roles: 1.0.0,20.2.0) |
| POST | `/api/CompanyFacadeBlobMaps/Update` | Does not update the attachment itself, only metadata like Description. To update the attachment, delete and re-create. (Audited)  (Auth roles: 1.0.0,20.1.0) |

## POST `/api/CompanyFacadeBlobMaps/All`

 (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyFacadeBlobMaps_All_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyFacadeId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyFacadeBlobMapRes`](../schemas.md#companyfacadeblobmapres)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyFacadeBlobMaps/Create`

 (Audited)  (Auth roles: 1.0.0,20.1.0)

- **Operation ID:** `CompanyFacadeBlobMaps_Create_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyFacadeId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyFacadeBlobMapRes`](../schemas.md#companyfacadeblobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/CompanyFacadeBlobMaps/Delete`

Note: Permanently deletes! (Audited)  (Auth roles: 1.0.0,20.4.0)

- **Operation ID:** `CompanyFacadeBlobMaps_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyFacadeId` | string (uuid) | — |  |
| query | `blobModelId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/CompanyFacadeBlobMaps/Get`

 (Auth roles: 1.0.0,20.2.0)

- **Operation ID:** `CompanyFacadeBlobMaps_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyFacadeId` | string (uuid) | — |  |
| query | `blobModelId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyFacadeBlobMapRes`](../schemas.md#companyfacadeblobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/CompanyFacadeBlobMaps/Update`

Does not update the attachment itself, only metadata like Description.
To update the attachment, delete and re-create. (Audited)  (Auth roles: 1.0.0,20.1.0)

- **Operation ID:** `CompanyFacadeBlobMaps_Update_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyFacadeId` | string (uuid) | — |  |
| query | `blobModelId` | string (uuid) | — |  |

**Request body:** [`UpdateCompanyFacadeBlobMapReq`](../schemas.md#updatecompanyfacadeblobmapreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`CompanyFacadeBlobMapRes`](../schemas.md#companyfacadeblobmapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
