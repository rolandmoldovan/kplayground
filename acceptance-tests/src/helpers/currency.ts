export function parseCurrency(displayValue: string): number {
  const digitsOnly = displayValue.replace(/[^0-9.-]/g, '');
  const value = Number(digitsOnly);

  if (Number.isNaN(value)) {
    throw new Error(`Unable to parse "${displayValue}" as a numeric currency value.`);
  }

  return value;
}
