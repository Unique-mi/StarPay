const PHONE_KEY = "starpay:phone";

export function savePhone(phone: string): void {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(PHONE_KEY, phone);
  }
}

export function readPhone(): string {
  if (typeof window === "undefined") return "";
  return window.sessionStorage.getItem(PHONE_KEY) ?? "";
}

export function clearPhone(): void {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(PHONE_KEY);
  }
}

export function formatEthiopianPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  if (!digits) return "";
  if (digits.length === 1) return digits;
  if (digits.length <= 5) return `${digits[0]} (${digits.slice(1)}`;
  return `${digits[0]} (${digits.slice(1, 5)}) (${digits.slice(5)}`;
}
