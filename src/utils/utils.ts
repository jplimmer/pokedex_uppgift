export function capitaliseFirstLetter(string: string) {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export function getUniqueRandomInts(count: number, max: number): number[] {
  const numbers = new Set<number>();

  while (numbers.size < count) {
    const randomInt = Math.floor(Math.random() * max) + 1;
    numbers.add(randomInt);
  }

  console.log('Selected IDs:', numbers);
  return Array.from(numbers);
}

export function generatePagination(currentPage: number, totalPages: number) {
  // Return all pages if 5 or fewer
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If current page in the first3, show ellipsis after 3
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If current page in the last three, show ellipsis before last 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If current page in the middle, show neighbours, first and last
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}
