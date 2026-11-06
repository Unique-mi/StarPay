import AuthShell from "@/components/auth-shell";
import PasswordEntryForm from "@/components/password-entry-form";

export default function CreateAccountPasswordPage() {
  return (
    <AuthShell backHref="/onboarding/verify">
      <PasswordEntryForm
        mode="create"
        title="Create Password"
        description="Please enter a strong password and confirm it to secure your account."
        nextHref="/success?flow=onboarding"
      />
    </AuthShell>
  );
}
