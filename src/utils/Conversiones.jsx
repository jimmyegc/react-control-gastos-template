export function ConvertirCapitalize(input = "") {
  if (typeof input !== "string" || !input.trim()) return "";
  const str = input.trim();
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
