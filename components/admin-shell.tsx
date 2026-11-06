import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type AdminShellProps = {
  children: ReactNode;
  className?: string;
  showFooter?: boolean;
  banner?: ReactNode;
  appearance?: "default" | "portal";
};

export function AdminHeader({ appearance = "default" }: { appearance?: "default" | "portal" }) {
  const onGradient = appearance === "portal";

  return (
    <header className={`admin-header${onGradient ? " admin-header-portal" : ""}`}>
      <Link href="/portal" className="admin-brand">
        <Image
          src={onGradient ? "/logo-white.png" : "/logo-color.png"}
          alt="StarPay"
          width={onGradient ? 1422 : 2086}
          height={onGradient ? 790 : 1160}
          priority
          className="admin-brand-logo"
        />
        <div className="admin-brand-copy">
          <span>STARPAY PAYMENT GATEWAY</span>
          <small>Receive All Your Service Payments Through Multiple Options And Manage Them In One Place.</small>
        </div>
      </Link>
      <div className="admin-user">
        <button className="header-icon-button" type="button" aria-label="Notifications">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
          <i />
        </button>
        <div className="admin-avatar" aria-hidden="true">MS</div>
        <div className="admin-user-copy">
          <strong>Mo Salah</strong>
          <span>ELST Super Admin</span>
        </div>
        <span className="admin-chevron" aria-hidden="true">⌄</span>
      </div>
    </header>
  );
}

export function AdminFooter() {
  return (
    <footer className="admin-footer">
      Copyright © 2024 StarPay Payment Gateway | Star System Technology. All rights reserved.
    </footer>
  );
}

export default function AdminShell({
  children,
  className = "",
  showFooter = true,
  banner,
  appearance = "default",
}: AdminShellProps) {
  const isPortal = appearance === "portal" || className.includes("welcome-frame");

  return (
    <main className={`admin-viewport${isPortal ? " portal-viewport" : ""}`}>
      <div className={`admin-frame ${className}`}>
        {isPortal ? (
          <div className="portal-top">
            <div className="portal-top-pattern" aria-hidden="true" />
            <AdminHeader appearance="portal" />
            {banner}
          </div>
        ) : (
          <AdminHeader />
        )}
        <div className="admin-content">{children}</div>
        {showFooter && <AdminFooter />}
      </div>
    </main>
  );
}

export function HomeIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg>;
}

export function ArrowUpRightIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>;
}

export function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
}

export function DownloadIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 18v3h16v-3" /></svg>;
}

export function FilterIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 12h10m-7 6h4" /></svg>;
}

export function StatsGridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.8" />
      <rect x="13" y="3" width="8" height="8" rx="1.8" />
      <rect x="3" y="13" width="8" height="8" rx="1.8" />
      <rect x="13" y="13" width="8" height="8" rx="1.8" />
    </svg>
  );
}

export function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v5h5M8.5 13h7M8.5 17h5" />
    </svg>
  );
}

export function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10h16v10H4z" />
      <path d="M4 10 6 5h12l2 5" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}
