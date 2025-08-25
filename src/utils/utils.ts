export function getUniqueRandomInts(count: number, max: number): number[] {
  const numbers = new Set<number>();

  while (numbers.size < count) {
    const randomInt = Math.floor(Math.random() * max) + 1;
    numbers.add(randomInt);
  }

  console.log('Selected IDs:', numbers);
  return Array.from(numbers);
}

export function capitaliseFirstLetter(string: string) {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}
