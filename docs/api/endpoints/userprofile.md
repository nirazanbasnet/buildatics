# UserProfile

Provides authenticated-user APIs for reading and updating the current user's profile, roles, and API key settings.
These endpoints manage the caller's personal account data rather than company-wide configuration.

**Operations:** 3 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/UserProfile/Get` | Gets User Profile along with Role (Auth) |
| PATCH | `/api/UserProfile/Update` |  (Auth) |
| PATCH | `/api/UserProfile/UpdateUiTheme` | Separate API since UI shows this options separatly (Auth) |

## GET `/api/UserProfile/Get`

Gets User Profile along with Role (Auth)

- **Operation ID:** `UserProfile_Get_GET`
- **Auth:** Bearer token required

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`UserProfileRes`](../schemas.md#userprofileres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/UserProfile/Update`

 (Auth)

- **Operation ID:** `UserProfile_Update_PATCH`
- **Auth:** Bearer token required

**Request body:** [`UserProfileReq`](../schemas.md#userprofilereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`UserProfileRes`](../schemas.md#userprofileres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## PATCH `/api/UserProfile/UpdateUiTheme`

Separate API since UI shows this options separatly (Auth)

- **Operation ID:** `UserProfile_UpdateUiTheme_PATCH`
- **Auth:** Bearer token required

**Request body:** [`UiThemeUserProfileReq`](../schemas.md#uithemeuserprofilereq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`UserProfileRes`](../schemas.md#userprofileres) |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
