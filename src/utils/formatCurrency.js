export function formatCurrency(value, moneda = "") {
  if (value === null || value === undefined || value === "") return "—";

  const numericValue = Number(value);
  if (isNaN(numericValue)) return "—";

  const symbol = moneda || "";
  const locale = navigator.language || "es-MX";

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);

  return `${symbol} ${formatted}`;
}
