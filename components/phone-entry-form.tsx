"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import FormHeading from "@/components/form-heading";
import { formatEthiopianPhone, readPhone, savePhone } from "@/lib/session";

type PhoneEntryFormProps = {
  title: string;
  description: string;
  nextHref: string;
  variant: "login" | "onboarding" | "forgot";
};

export default function PhoneEntryForm({ title, description, nextHref, variant }: PhoneEntryFormProps) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setPhone(readPhone());
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 9) {
      setError("Please enter a valid 9-digit Ethiopian phone number.");
      return;
    }
    savePhone(digits);
    setError("");
    router.push(nextHref);
  }

  return (
    <>
      <FormHeading title={title} description={description} />
      <form onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label className="field-label" htmlFor="phone-number">Phone Number</label>
          <div className="phone-field">
            <span className="flag" aria-hidden="true">🇪🇹</span>
            <span className="country-code">+251</span>
            <input
              id="phone-number"
              className="phone-input"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="9 (0000)(0000)"
              value={formatEthiopianPhone(phone)}
              onChange={(event) => {
                setPhone(event.target.value.replace(/\D/g, "").slice(0, 9));
                setError("");
              }}
              aria-describedby={error ? "phone-error" : undefined}
            />
          </div>
          {error && <p className="form-error" id="phone-error" role="alert">{error}</p>}
        </div>
        <button className="primary-button" type="submit">Continue</button>
      </form>

      {variant === "login" && (
        <p className="first-time-row">
          New to StarPay? <Link className="text-action" href="/onboarding">Create an account</Link>
        </p>
      )}
      {variant === "onboarding" && (
        <p className="first-time-row">
          Already have an account? <Link className="text-action" href="/login">Sign in</Link>
        </p>
      )}
      {variant === "forgot" && (
        <p className="first-time-row">
          Remember your password? <Link className="text-action" href="/login">Back to sign in</Link>
        </p>
      )}
    </>
  );
}
