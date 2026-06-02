# Token

**Operations:** 5 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/Token/Login` | Authenticates a user with username and password. Returns JWT token and refresh token. Supports optional 2FA via email OTP. User must confirm email and terms before login. |
| POST | `/api/Token/LoginClientCredentials` | Authenticates a client application using OAuth 2.0 client credentials flow (API key auth). Returns a short-lived JWT token for service-to-service authentication. |
| POST | `/api/Token/LoginGoogle` | Authenticates a user with a Google identity token and returns Buildatics access and refresh tokens. |
| POST | `/api/Token/LoginMicrosoft` | Authenticates a user with a Microsoft Entra ID token and returns Buildatics access and refresh tokens. |
| POST | `/api/Token/Refresh` | Exchanges a valid refresh token and expired access token pair for a new access token set. |

## POST `/api/Token/Login`

Authenticates a user with username and password. Returns JWT token and refresh token.
Supports optional 2FA via email OTP. User must confirm email and terms before login.

- **Operation ID:** `Token_Login_POST`
- **Auth:** Public

**Request body:** [`ResourceOwnerTokenReq`](../schemas.md#resourceownertokenreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ResourceOwnerTokenRes`](../schemas.md#resourceownertokenres) |

## POST `/api/Token/LoginClientCredentials`

Authenticates a client application using OAuth 2.0 client credentials flow (API key auth).
Returns a short-lived JWT token for service-to-service authentication.

- **Operation ID:** `Token_LoginClientCredentials_POST`
- **Auth:** Public

**Request body:** [`ClientCredentialReq`](../schemas.md#clientcredentialreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ClientCredentialTokenRes`](../schemas.md#clientcredentialtokenres) |

## POST `/api/Token/LoginGoogle`

Authenticates a user with a Google identity token and returns Buildatics access and refresh tokens.

- **Operation ID:** `Token_LoginGoogle_POST`
- **Auth:** Public

**Request body:** [`LoginExternalReq`](../schemas.md#loginexternalreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ResourceOwnerTokenRes`](../schemas.md#resourceownertokenres) |

## POST `/api/Token/LoginMicrosoft`

Authenticates a user with a Microsoft Entra ID token and returns Buildatics access and refresh tokens.

- **Operation ID:** `Token_LoginMicrosoft_POST`
- **Auth:** Public

**Request body:** [`LoginExternalReq`](../schemas.md#loginexternalreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ResourceOwnerTokenRes`](../schemas.md#resourceownertokenres) |

## POST `/api/Token/Refresh`

Exchanges a valid refresh token and expired access token pair for a new access token set.

- **Operation ID:** `Token_Refresh_POST`
- **Auth:** Public

**Request body:** [`ResourceOwnerRefreshTokenReq`](../schemas.md#resourceownerrefreshtokenreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | [`ResourceOwnerTokenRes`](../schemas.md#resourceownertokenres) |
