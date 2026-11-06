"use client";

import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import FormHeading from "@/components/form-heading";
import { formatEthiopianPhone, readPhone } from "@/lib/session";

type OtpEntryFormProps = {
  nextHref: string;
  showDestination?: boolean;
};

export default function OtpEntryForm({ nextHref, showDestination = false }: OtpEntryFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    setPhone(readPhone());
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  function handleOtpChange(index: number, rawValue: string) {
    const digit = rawValue.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError("");
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0) otpRefs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpPaste(event: ClipboardEvent<HTMLDivElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((digit, index) => { next[index] = digit; });
    setOtp(next);
    setError("");
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  function resendCode() {
    setOtp(["", "", "", "", "", ""]);
    setSecondsLeft(59);
    setError("");
    otpRefs.current[0]?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (otp.some((digit) => digit === "")) {
      setError("Enter the 6-digit verification code sent to your phone.");
      return;
    }
    router.push(nextHref);
  }

  return (
    <>
      <FormHeading
        title="Verification Code"
        description="We sent you a confirmation code to your phone number."
      />
      {showDestination && (
        <p className="otp-destination">+251 {formatEthiopianPhone(phone) || "9 (0000) (0000)"}</p>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="otp-timer" aria-live="polite">
          00:{String(secondsLeft).padStart(2, "0")} Sec
        </div>
        <div className="otp-row" onPaste={handleOtpPaste} aria-label="Six digit verification code">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => { otpRefs.current[index] = element; }}
              className="otp-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              aria-label={`Verification digit ${index + 1}`}
              placeholder="-"
              value={digit}
              onChange={(event) => handleOtpChange(index, event.target.value)}
              onKeyDown={(event) => handleOtpKeyDown(index, event)}
            />
          ))}
        </div>
        <div className="resend-row">
          <button className="text-action" type="button" onClick={resendCode} disabled={secondsLeft > 0}>
            Resend SMS Code
          </button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit">Continue</button>
      </form>
    </>
  );
}
