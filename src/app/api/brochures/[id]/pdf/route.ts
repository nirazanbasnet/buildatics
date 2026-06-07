import { getAccessToken } from "@/features/auth/lib/session";

// BFF route handler: proxies the authed binary PDF (GET /api/Brochures/DownloadPdf?id) so the browser
// can download it without ever holding the bearer token. This is the one place a route handler is the
// right tool (server actions can't stream binary cleanly). See agent/api.md.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const base = process.env.BUILDATICS_API_BASE_URL;
  if (!base) {
    return new Response("BUILDATICS_API_BASE_URL is not configured.", {
      status: 500,
    });
  }

  const token = await getAccessToken();
  if (!token) return new Response("Not authenticated.", { status: 401 });

  const url = `${base.replace(/\/$/, "")}/api/Brochures/DownloadPdf?id=${encodeURIComponent(id)}`;

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/pdf" },
      cache: "no-store",
    });
  } catch {
    return new Response("Could not reach the server.", { status: 502 });
  }

  if (!upstream.ok) {
    return new Response("Failed to generate the PDF.", {
      status: upstream.status,
    });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="brochure-${id}.pdf"`,
    },
  });
}
