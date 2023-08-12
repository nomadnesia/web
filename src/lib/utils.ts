import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getCompanyLogo(url: string): string {
  return `https://www.google.com/s2/favicons?domain=${url}&sz=256`;
}
