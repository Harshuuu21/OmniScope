// Indian-market number formatting helpers.

/** Format a number as Indian Rupees using the lakh/crore grouping. */
export function formatINR(
  value: number,
  opts: { decimals?: number; sign?: boolean } = {},
): string {
  const { decimals = 0, sign = false } = opts
  const abs = Math.abs(value)
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(abs)
  const prefix = value < 0 ? '-' : sign ? '+' : ''
  return `${prefix}\u20B9${formatted}`
}

/** Compact Indian currency: ₹1.2 Cr, ₹45.3 L, ₹8,400. */
export function formatINRCompact(value: number): string {
  const abs = Math.abs(value)
  const prefix = value < 0 ? '-' : ''
  if (abs >= 1_00_00_000) {
    return `${prefix}\u20B9${(abs / 1_00_00_000).toFixed(2)} Cr`
  }
  if (abs >= 1_00_000) {
    return `${prefix}\u20B9${(abs / 1_00_000).toFixed(2)} L`
  }
  if (abs >= 1_000) {
    return `${prefix}\u20B9${new Intl.NumberFormat('en-IN').format(Math.round(abs))}`
  }
  return `${prefix}\u20B9${abs.toFixed(0)}`
}

/** Format a percentage with an optional explicit sign. */
export function formatPct(value: number, opts: { sign?: boolean } = {}): string {
  const { sign = false } = opts
  const prefix = value > 0 && sign ? '+' : ''
  return `${prefix}${value.toFixed(2)}%`
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
