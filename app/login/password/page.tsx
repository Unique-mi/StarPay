import AuthShell from "@/components/auth-shell";
import PasswordEntryForm from "@/components/password-entry-form";

export default function LoginPasswordPage() {
  return (
    <AuthShell backHref="/login">
      <PasswordEntryForm
        mode="login"
        title="Sign in to your Account"
        description="Please enter your phone number and Password to Login to your account."
        nextHref="/portal"
      />
    </AuthShell>
  );
}
