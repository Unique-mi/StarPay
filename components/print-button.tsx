"use client";

import type { ReactNode } from "react";

export default function PrintButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button className={className} type="button" onClick={() => window.print()}>
      {children}
    </button>
  );
}
