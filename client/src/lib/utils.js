import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0, // No decimal places
  }).format(price);
}
