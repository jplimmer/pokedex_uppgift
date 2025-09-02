export function capitaliseFirstLetter(string: string) {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export function splitByQuery(result: string, query: string) {
  const parts = result.split(query);
  return {
    before: parts[0],
    query: query,
    after: parts.slice(1).join(query),
  };
}
