import { AuthShell, ForgotPasswordForm } from "@/features/auth";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Forgot password",
    description: "Request a password reset link for your Buildatics account.",
    canonical: "/forgot-password",
  });
}

export default function ForgotPasswordPage() {
  return (
    <AuthShell>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
