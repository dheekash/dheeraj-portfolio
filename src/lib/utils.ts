import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExpired(expiryDate?: string): boolean {
  if (!expiryDate) return false;
  const months: Record<string, number> = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  };
  const parts = expiryDate.split(" ");
  if (parts.length < 2) return false;
  const [month, year] = parts;
  const expiry = new Date(parseInt(year), months[month] ?? 0);
  return expiry < new Date();
}
