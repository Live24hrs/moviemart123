import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(iso?: string) {
  if (!iso) return ''
  try { return new Date(iso).toLocaleDateString() } catch { return iso }
}
