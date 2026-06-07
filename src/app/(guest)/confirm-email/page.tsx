import { AuthShell, ConfirmEmailForm } from "@/features/auth";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Confirm email",
    description: "Confirm your Buildatics account email address.",
    canonical: "/confirm-email",
  });
}

// The confirmation link in the email carries ?email= and ?code= (the confirmation token).
export default async function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; code?: string }>;
}) {
  const { email, code } = await searchParams;

  return (
    <AuthShell>
      <ConfirmEmailForm defaultEmail={email ?? ""} code={code ?? ""} />
    </AuthShell>
  );
}
