# DesignFacadeMapsA

**Operations:** 4 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/DesignFacadeMapsA/Create` |  (Auth roles: Admin,DesignAdmin) |
| DELETE | `/api/DesignFacadeMapsA/Delete` | Note: permanent delete! (Auth roles: Admin,DesignAdmin) |
| GET | `/api/DesignFacadeMapsA/Get` |  (Auth roles: Admin,DesignAdmin) |
| POST | `/api/DesignFacadeMapsA/Page` |  (Auth roles: Admin,DesignAdmin) |

## POST `/api/DesignFacadeMapsA/Create`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignFacadeMapsA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`DesignFacadeMapReq`](../schemas.md#designfacademapreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignFacadeMapRes`](../schemas.md#designfacademapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/DesignFacadeMapsA/Delete`

Note: permanent delete! (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignFacadeMapsA_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designId` | string (uuid) | — |  |
| query | `facadeId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/DesignFacadeMapsA/Get`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignFacadeMapsA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `designId` | string (uuid) | — |  |
| query | `facadeId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignFacadeMapRes`](../schemas.md#designfacademapres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/DesignFacadeMapsA/Page`

 (Auth roles: Admin,DesignAdmin)

- **Operation ID:** `DesignFacadeMapsA_Page_POST`
- **Auth:** Bearer token required

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`DesignFacadeMapResPage`](../schemas.md#designfacademaprespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
