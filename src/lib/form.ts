export function extractSelectedOptions(select: HTMLSelectElement): string[] {
  if (!select.multiple)
    return [select.value];

  const options = select.options[Symbol.iterator]();
  return options.filter(o => o.selected).map(o => o.value || o.text).toArray();
}
