# HttpQueriesA

Provides admin-only management of saved HTTP query definitions used for external integrations.
Queries can be created, updated, copied between companies, and associated with integration-specific permissions.

**Operations:** 8 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| PATCH | `/api/HttpQueriesA/Copy` | Copies query and mappings. Existing query with same actionId and its mappings, if any, will get overwritten. (Auth roles: Admin) |
| POST | `/api/HttpQueriesA/Create` | Creates a new HTTP query definition for an external integration. (Auth roles: Admin) |
| DELETE | `/api/HttpQueriesA/Delete` | Note: This is a permanent operation (Auth roles: Admin) |
| GET | `/api/HttpQueriesA/Get` | Gets a single HTTP query definition by ID for the specified company. (Auth roles: Admin) |
| PATCH | `/api/HttpQueriesA/MapRole` |  (Auth roles: Admin) |
| POST | `/api/HttpQueriesA/Page` | Gets a paged list of HTTP query definitions for a company. (Auth roles: Admin) |
| PATCH | `/api/HttpQueriesA/UnmapRole` |  (Auth roles: Admin) |
| PATCH | `/api/HttpQueriesA/Update` | Updates an existing HTTP query definition. (Auth roles: Admin) |

## PATCH `/api/HttpQueriesA/Copy`

Copies query and mappings.
Existing query with same actionId and its mappings, if any, will get overwritten. (Auth roles: Admin)

- **Operation ID:** `HttpQueriesA_Copy_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `sourceCompanyId` | string (uuid) | — |  |
| query | `targetCompanyId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`HttpQueryRes`](../schemas.md#httpqueryres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/HttpQueriesA/Create`

Creates a new HTTP query definition for an external integration. (Auth roles: Admin)

- **Operation ID:** `HttpQueriesA_Create_POST`
- **Auth:** Bearer token required

**Request body:** [`HttpQueryReq`](../schemas.md#httpqueryreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`HttpQueryRes`](../schemas.md#httpqueryres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## DELETE `/api/HttpQueriesA/Delete`

Note: This is a permanent operation (Auth roles: Admin)

- **Operation ID:** `HttpQueriesA_Delete_DELETE`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `companyId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`MessageResponseDto`](../schemas.md#messageresponsedto) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/HttpQueriesA/Get`

Gets a single HTTP query definition by ID for the specified company. (Auth roles: Admin)

- **Operation ID:** `HttpQueriesA_Get_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `companyId` | string (uuid) | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`HttpQueryRes`](../schemas.md#httpqueryres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/HttpQueriesA/MapRole`

 (Auth roles: Admin)

- **Operation ID:** `HttpQueriesA_MapRole_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `appRole` | string | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## POST `/api/HttpQueriesA/Page`

Gets a paged list of HTTP query definitions for a company. (Auth roles: Admin)

- **Operation ID:** `HttpQueriesA_Page_POST`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `companyId` | string (uuid) | — |  |

**Request body:** [`PagedReq`](../schemas.md#pagedreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`HttpQueryResPage`](../schemas.md#httpqueryrespage) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/HttpQueriesA/UnmapRole`

 (Auth roles: Admin)

- **Operation ID:** `HttpQueriesA_UnmapRole_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |
| query | `appRole` | string | — |  |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/HttpQueriesA/Update`

Updates an existing HTTP query definition. (Auth roles: Admin)

- **Operation ID:** `HttpQueriesA_Update_PATCH`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `id` | string (uuid) | — |  |

**Request body:** [`HttpQueryReq`](../schemas.md#httpqueryreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`HttpQueryRes`](../schemas.md#httpqueryres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
