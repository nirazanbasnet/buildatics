# PublicCompanyDesigns

Allows anonymous access to company's deisgns.

**Operations:** 3 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/PublicCompanyDesigns/Get` |  |
| GET | `/api/PublicCompanyDesigns/GetStyle` |  |
| POST | `/api/PublicCompanyDesigns/PageDescending` |  |

## GET `/api/PublicCompanyDesigns/Get`

- **Operation ID:** `PublicCompanyDesigns_Get_GET`
- **Auth:** Public

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `token` | string (uuid) | — |  |
| query | `id` | string (uuid) | — | CompanyDesign Id |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`PublicCompanyDesignRes`](../schemas.md#publiccompanydesignres) |

## GET `/api/PublicCompanyDesigns/GetStyle`

- **Operation ID:** `PublicCompanyDesigns_GetStyle_GET`
- **Auth:** Public

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `token` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | string |

## POST `/api/PublicCompanyDesigns/PageDescending`

- **Operation ID:** `PublicCompanyDesigns_PageDescending_POST`
- **Auth:** Public

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `token` | string (uuid) | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`PublicCompanyDesignResPage`](../schemas.md#publiccompanydesignrespage) |
