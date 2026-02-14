import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Türk Lirası formatı: 20.500,10 ₺
export function formatPrice(price) {
  if (price === null || price === undefined) return '0,00';
  
  return Number(price).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Fiyat parse etme (Türk formatından sayıya)
export function parsePrice(priceString) {
  if (!priceString) return 0;
  
  // "20.500,10" -> "20500.10"
  const normalized = priceString
    .toString()
    .replace(/\./g, '')  // Binlik ayraçlarını kaldır
    .replace(',', '.');   // Virgülü noktaya çevir
  
  return parseFloat(normalized) || 0;
}
