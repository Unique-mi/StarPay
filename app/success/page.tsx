import Link from "next/link";
import AuthShell from "@/components/auth-shell";

type SuccessPageProps = {
  searchParams: Promise<{ flow?: string }>;
};

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="25" height="25" viewBox="0 0 24 24" fill="none">
      <path d="m5 12.5 4.2 4.2L19.5 6.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { flow } = await searchParams;
  const message = flow === "login"
    ? "This is a frontend demo. Connect your authentication API to enable real account access."
    : flow === "forgot"
      ? "Your password reset flow is complete in this demo. Connect your backend to save the new password."
      : "Your StarPay account setup flow is complete in this demo. Connect your backend to create the account.";

  return (
    <AuthShell>
      <div className="success-content">
        <div className="success-mark"><CheckIcon /></div>
        <h1 className="form-title">You&apos;re all set</h1>
        <p className="form-description">Your StarPay account is ready for secure access.</p>
        <p className="form-description success-copy">{message}</p>
        <Link className="primary-button button-link" href="/login">Back to Sign in</Link>
      </div>
    </AuthShell>
  );
}
