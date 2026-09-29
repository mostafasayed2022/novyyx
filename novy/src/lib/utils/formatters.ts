/**
 * Biotech & Commerce data formatters for NOVYX
 */

export function formatPurity(purity: number): string {
  return `${purity.toFixed(1)}% (HPLC)`;
}

export function formatMolecularWeight(mw: number): string {
  return `${mw.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 })} g/mol`;
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatSequence(sequence: string, groupSize = 5): string {
  if (!sequence) return "";
  const cleaned = sequence.replace(/\s+/g, "").toUpperCase();
  const chunks = [];
  for (let i = 0; i < cleaned.length; i += groupSize) {
    chunks.push(cleaned.slice(i, i + groupSize));
  }
  return chunks.join(" ");
}

export function formatDate(dateString: string | Date): string {
  const d = typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}
