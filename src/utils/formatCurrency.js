import isoCountryCurrency from "iso-country-currency";

export function formatCurrency(value, countryCode, language, withSymbol = true) {
  try {
    const info = isoCountryCurrency.getAllInfoByISO(countryCode);
    const currency = info?.currency || "USD";
    const locale = language || `${countryCode.toLowerCase()}-${countryCode}`;

    return new Intl.NumberFormat(locale, {
      style: withSymbol ? "currency" : "decimal",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return value.toLocaleString();
  }
}
