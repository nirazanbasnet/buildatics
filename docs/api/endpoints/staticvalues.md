# StaticValues

Provides APIs for get all Enums.

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/StaticValues/All` | Enumerates all the enum types, static values etc along with integer values and string names. (Auth) |
| GET | `/api/StaticValues/ErrorDtoSample` |  (Auth) |
| GET | `/api/StaticValues/StatesToTimeZoneIdsMapping` | Gets Timezone Ids mapped to each State (Auth) |
| GET | `/api/StaticValues/Timezones` | Returns latest Timezones (Auth) |
| GET | `/api/StaticValues/Version` | Returns API version (Auth) |

## GET `/api/StaticValues/All`

Enumerates all the enum types, static values etc along with integer values and string names. (Auth)

- **Operation ID:** `StaticValues_All_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`AllEnumsRes`](../schemas.md#allenumsres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/StaticValues/ErrorDtoSample`

 (Auth)

- **Operation ID:** `StaticValues_ErrorDtoSample_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ErrorDto`](../schemas.md#errordto) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/StaticValues/StatesToTimeZoneIdsMapping`

Gets Timezone Ids mapped to each State (Auth)

- **Operation ID:** `StaticValues_StatesToTimeZoneIdsMapping_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | object |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/StaticValues/Timezones`

Returns latest Timezones (Auth)

- **Operation ID:** `StaticValues_Timezones_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`TimeZoneInfo`](../schemas.md#timezoneinfo)[] |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/StaticValues/Version`

Returns API version (Auth)

- **Operation ID:** `StaticValues_Version_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | string |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
