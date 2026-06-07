import { AuthShell, ResetPasswordForm } from "@/features/auth";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Reset password",
    description: "Set a new password for your Buildatics account.",
    canonical: "/reset-password",
  });
}

// The reset link in the email carries ?email= and ?token= (the password reset token).
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) {
  const { email, token } = await searchParams;

  return (
    <AuthShell>
      <ResetPasswordForm defaultEmail={email ?? ""} token={token ?? ""} />
    </AuthShell>
  );
}
