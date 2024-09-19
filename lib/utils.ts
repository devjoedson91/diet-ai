import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const heightMask = (value: string) => {
  return value
    ?.replace(/\D/g, "")
    .replace(",", ".")
    .replace(/\B(?=(\d{2})+(?!\d))/g, ".");
};

export const weightMask = (value: string) => {
  return value
    ?.replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1.$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".");
};

export const ageMask = (value: string) => {
  return value?.toString().replace(/\D/g, "");
};
