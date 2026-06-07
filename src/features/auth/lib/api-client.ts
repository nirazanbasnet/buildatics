// The single server-side gateway to the Buildatics Platform API (the BFF boundary).
// The browser must NEVER call the API directly — it calls a Server Action / Route Handler,
// which calls `apiFetch`. See agent/api.md for the full rules.
import { getAccessToken } from "./session";

export class ApiError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function getBaseUrl(): string {
  const base = process.env.BUILDATICS_API_BASE_URL;
  if (!base) {
    throw new ApiError(0, "BUILDATICS_API_BASE_URL is not configured.");
  }
  return base.replace(/\/$/, "");
}

type ApiFetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  // Plain object serialised as JSON, or a FormData for multipart uploads. Omit for GET.
  body?: unknown;
  // When true, attaches the caller's Bearer token from the session cookie.
  auth?: boolean;
  // Forwarded to fetch; defaults to no caching since these are dynamic, per-user calls.
  cache?: RequestCache;
};

// Extracts the friendliest message the API offers, falling back to a status-based default.
// The Platform API uses two shapes: { message } and a validation error { title, messages: [...] }.
function messageFromBody(body: unknown, status: number): string {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    const messages = record.messages;
    if (
      Array.isArray(messages) &&
      typeof messages[0] === "string" &&
      messages[0].trim()
    ) {
      return messages[0];
    }
    const candidate = record.message ?? record.error ?? record.title;
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }
  if (status === 401) return "Invalid credentials.";
  if (status === 403) return "You do not have access to this resource.";
  return `Request failed with status ${status}.`;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { method = "GET", body, auth = false, cache = "no-store" } = options;

  // FormData (multipart uploads) must NOT be JSON-serialised, and the browser/runtime sets the
  // Content-Type (with the multipart boundary) itself — so we leave it unset in that case.
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined && !isFormData)
    headers["Content-Type"] = "application/json";

  if (auth) {
    const token = await getAccessToken();
    if (!token) throw new ApiError(401, "Not authenticated.");
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? (body as FormData)
            : JSON.stringify(body),
      cache,
    });
  } catch {
    throw new ApiError(0, "Could not reach the server. Please try again.");
  }

  const text = await res.text();
  const parsed: unknown = text ? safeJsonParse(text) : null;

  if (!res.ok) {
    throw new ApiError(res.status, messageFromBody(parsed, res.status));
  }

  return parsed as T;
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
