import AuthShell from "@/components/auth-shell";
import OtpEntryForm from "@/components/otp-entry-form";

export default function OnboardingVerifyPage() {
  return (
    <AuthShell backHref="/onboarding">
      <OtpEntryForm nextHref="/onboarding/create-password" />
    </AuthShell>
  );
}
