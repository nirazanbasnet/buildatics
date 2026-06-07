import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
import {
  ShareToSite,
  getAllPublicDesigns,
  getCompanyDesignsIFrame,
  getShareConfig,
  parseIframe,
} from "@/features/share-to-site";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Share to Site",
    description: "Embed your published company designs on your own website.",
    canonical: "/share-to-site",
  });
}

export default async function ShareToSitePage() {
  // The iframe embed code carries the public token + style; we parse it to drive the live preview.
  // SAS preview URLs expire ~15 min, so this fetches per request (no caching).
  const result = await loadGuarded(async () => {
    const [frame, config] = await Promise.all([
      getCompanyDesignsIFrame(),
      getShareConfig(),
    ]);
    const parsed = parseIframe(frame.iFrame);
    const designs = parsed?.token
      ? await getAllPublicDesigns(parsed.token)
      : [];
    return { frame, config, parsed, designs };
  });
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to Share to Site"
        description="Your account doesn't have permission to manage the public design embed. Contact an administrator if you need access."
      />
    );
  }
  const { frame, config, parsed, designs } = result.data;

  return (
    <ShareToSite
      iframeCode={frame.iFrame ?? ""}
      embedSrc={parsed?.src ?? ""}
      initialDesigns={designs}
      initialConfig={config}
    />
  );
}
