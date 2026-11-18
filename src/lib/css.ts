export function cls(template: TemplateStringsArray, ...data: any[]): string {
  const result: string[] = [];
  data.forEach((v, i) => {
    const tmp = template[i];
    if (tmp.endsWith(" ")) {
      result.push(tmp.trim());
      result.push(String(v).trim());
    }
    else {
      result.push(`${tmp.trim()}${String(v).trim()}`)
    }
  });
  return `${result.join(" ")} ${template.at(-1)}`;
}