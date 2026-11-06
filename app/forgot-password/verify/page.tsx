import AuthShell from "@/components/auth-shell";
import OtpEntryForm from "@/components/otp-entry-form";

export default function ForgotPasswordVerifyPage() {
  return (
    <AuthShell backHref="/forgot-password">
      <OtpEntryForm nextHref="/forgot-password/reset-password" showDestination />
    </AuthShell>
  );
}
