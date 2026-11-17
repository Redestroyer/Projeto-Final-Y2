export function formatYMD(date: Date): string {
  return date.toISOString().split("T")[0];
}