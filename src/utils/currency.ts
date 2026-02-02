// Currency formatting utilities
import { config } from '../config';

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: USD)
 * @param locale - The locale for formatting (default: en-US)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = config.defaultCurrency,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a number as a compact currency (e.g., $1.2K)
 * @param amount - The amount to format
 * @param currency - The currency code (default: USD)
 * @param locale - The locale for formatting (default: en-US)
 * @returns Formatted compact currency string
 */
export const formatCompactCurrency = (
  amount: number,
  currency: string = config.defaultCurrency,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
};

/**
 * Calculate discount amount
 * @param subtotal - The subtotal amount
 * @param discountPercent - The discount percentage (default from config)
 * @returns The discount amount
 */
export const calculateDiscount = (
  subtotal: number,
  discountPercent: number = config.discountPercent
): number => {
  return (subtotal * discountPercent) / 100;
};

/**
 * Calculate cart total
 * @param subtotal - The subtotal amount
 * @param discount - The discount amount
 * @param deliveryFee - The delivery fee (default from config)
 * @returns The total amount
 */
export const calculateTotal = (
  subtotal: number,
  discount: number,
  deliveryFee: number = config.deliveryFee
): number => {
  return subtotal - discount + deliveryFee;
};
