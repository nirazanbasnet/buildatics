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
  const [frame, config] = await Promise.all([
    getCompanyDesignsIFrame(),
    getShareConfig(),
  ]);
  const parsed = parseIframe(frame.iFrame);
  const designs = parsed?.token ? await getAllPublicDesigns(parsed.token) : [];

  return (
    <ShareToSite
      iframeCode={frame.iFrame ?? ""}
      embedSrc={parsed?.src ?? ""}
      initialDesigns={designs}
      initialConfig={config}
    />
  );
}
