import AuthShell from "@/components/auth-shell";
import PasswordEntryForm from "@/components/password-entry-form";

export default function ResetPasswordPage() {
  return (
    <AuthShell backHref="/forgot-password/verify">
      <PasswordEntryForm
        mode="create"
        title="Create Password"
        description="Please enter a strong password and confirm it to secure your account."
        nextHref="/success?flow=forgot"
      />
    </AuthShell>
  );
}
