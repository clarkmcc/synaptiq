export function refToId(name: string): string {
  return `ref:${atob(name)}`;
}

export function idToRef(id: string): string {
  return btoa(id.slice(4));
}
