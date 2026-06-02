# HtmlToPdfA

**Operations:** 2 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| POST | `/api/HtmlToPdfA/HtmlFileToPdf` | Allows an html file to be converted to PDF |
| POST | `/api/HtmlToPdfA/HtmlStringToPdf` | Allows an html file to be converted to PDF |

## POST `/api/HtmlToPdfA/HtmlFileToPdf`

Allows an html file to be converted to PDF

- **Operation ID:** `HtmlToPdfA_HtmlFileToPdf_POST`
- **Auth:** Public

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | string (binary) |

## POST `/api/HtmlToPdfA/HtmlStringToPdf`

Allows an html file to be converted to PDF

- **Operation ID:** `HtmlToPdfA_HtmlStringToPdf_POST`
- **Auth:** Public

**Request body:** [`HtmlStringToPdfReq`](../schemas.md#htmlstringtopdfreq)

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | string (binary) |
