import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function ArrowLeft() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5m0 0 6 6m-6-6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type AuthShellProps = {
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
};

export default function AuthShell({ children, backHref, backLabel = "Back" }: AuthShellProps) {
  return (
    <main className="page-shell">
      <section className="auth-frame" aria-label="StarPay account access">
        <aside className="brand-panel" aria-label="StarPay Payment Gateway">
          <div className="brand-content">
            <Image
              src="/logo-white.png"
              alt="StarPay"
              width={1422}
              height={790}
              priority
              className="brand-logo"
            />
            <div className="brand-name">STARPAY PAYMENT GATE WAY</div>
          </div>
        </aside>

        <section className="form-panel">
          {backHref && (
            <Link className="back-button" href={backHref}>
              <ArrowLeft />
              <span>{backLabel}</span>
            </Link>
          )}

          <div className="form-card">
            <Image
              src="/logo-color.png"
              alt="StarPay"
              width={2086}
              height={1160}
              priority
              className="card-logo"
            />
            {children}
          </div>

          <footer className="form-footer">
            <div>Copyright © 2024 StarPay Payment GatewayApp</div>
            <div>Version 1.0</div>
          </footer>
        </section>
      </section>
    </main>
  );
}
