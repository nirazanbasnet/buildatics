# ClickupA

Provides admin-only proxy endpoints for querying ClickUp data from the Buildatics API.
These endpoints help validate ClickUp connectivity and inspect remote tasks without calling ClickUp directly from the client.

**Operations:** 2 · [← back to index](../README.md)

| Method | Path | Summary |
| --- | --- | --- |
| GET | `/api/ClickupA/Task` | Retrieves a single ClickUp task by its ClickUp task ID. (Auth roles: Admin) |
| GET | `/api/ClickupA/Tasks` | Retrieves all ClickUp tasks for a specific ClickUp list, with optional query parameters for filtering and paging. (Auth roles: Admin) |

## GET `/api/ClickupA/Task`

Retrieves a single ClickUp task by its ClickUp task ID. (Auth roles: Admin)

- **Operation ID:** `ClickupA_Task_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `clickUpTaskId` | string | — | Id of the Task to be fetched |
| query | `query` | string | — | The query string as defined in the documentation. This can be used to paginate, and filter the tasks returned by the API. |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |

## GET `/api/ClickupA/Tasks`

Retrieves all ClickUp tasks for a specific ClickUp list, with optional query parameters for filtering and paging. (Auth roles: Admin)

- **Operation ID:** `ClickupA_Tasks_GET`
- **Auth:** Bearer token required

**Parameters**

| In | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| query | `clickupListId` | string | — | Id of the List to whose Tasks are to be fetched |
| query | `query` | string | — | The query string as defined in the documentation. This can be used to paginate, and filter the tasks returned by the API. |

**Responses**

| Status | Body |
| --- | --- |
| 200 — Success | — |
| 401 — Unauthorized | — |
| 403 — Forbidden | — |
