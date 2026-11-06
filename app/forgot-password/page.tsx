import AuthShell from "@/components/auth-shell";
import PhoneEntryForm from "@/components/phone-entry-form";

export default function ForgotPasswordPage() {
  return (
    <AuthShell backHref="/login/password">
      <PhoneEntryForm
        variant="forgot"
        title="Sign in to your Account"
        description="Please enter your phone number to Login to your account."
        nextHref="/forgot-password/verify"
      />
    </AuthShell>
  );
}
