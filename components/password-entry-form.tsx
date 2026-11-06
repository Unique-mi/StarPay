"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import FormHeading from "@/components/form-heading";

type PasswordEntryFormProps = {
  mode: "login" | "create";
  title: string;
  description: string;
  nextHref: string;
};

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.9 5.2A10.8 10.8 0 0112 5c5.2 0 8.7 4.4 9.7 6-.4.7-1.3 1.9-2.7 3M6.2 6.3C4.2 7.5 2.8 9.4 2.3 11c.7 1.2 3.9 6 9.7 6 1.2 0 2.3-.2 3.3-.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function PasswordEntryForm({ mode, title, description, nextHref }: PasswordEntryFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }
    if (mode === "create" && password !== confirmPassword) {
      setError("Your passwords do not match. Please try again.");
      return;
    }
    setError("");
    router.push(nextHref);
  }

  return (
    <>
      <FormHeading title={title} description={description} />
      <form onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label className="field-label" htmlFor="account-password">
            {mode === "login" ? "Password" : "Create Password"}
          </label>
          <div className="password-field">
            <input
              id="account-password"
              className="password-input"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              placeholder={mode === "login" ? "Enter your password" : "Enter a strong password"}
              value={password}
              onChange={(event) => { setPassword(event.target.value); setError(""); }}
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon visible={showPassword} />
            </button>
          </div>
        </div>

        {mode === "create" && (
          <>
            <div className="field-group">
              <label className="field-label" htmlFor="confirm-password">Confirm Password</label>
              <div className="password-field">
                <input
                  id="confirm-password"
                  className="password-input"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) => { setConfirmPassword(event.target.value); setError(""); }}
                />
                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowConfirm((visible) => !visible)}
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                >
                  <EyeIcon visible={showConfirm} />
                </button>
              </div>
            </div>
            <p className="password-rules">Use at least 8 characters, including a mix of letters and numbers.</p>
          </>
        )}

        {error && <p className="form-error" role="alert">{error}</p>}
        {mode === "login" && (
          <div className="forgot-row">
            <Link className="text-action" href="/forgot-password">Forgot Password?</Link>
          </div>
        )}
        <button className="primary-button" type="submit">Continue</button>
      </form>
    </>
  );
}
