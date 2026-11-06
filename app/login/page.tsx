import AuthShell from "@/components/auth-shell";
import PhoneEntryForm from "@/components/phone-entry-form";

export default function LoginPage() {
  return (
    <AuthShell>
      <PhoneEntryForm
        variant="login"
        title="Sign in to your Account"
        description="Please enter your phone number and Password to Login to your account."
        nextHref="/login/password"
      />
    </AuthShell>
  );
}
