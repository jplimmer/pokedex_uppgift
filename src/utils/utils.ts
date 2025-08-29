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

export function getIdfromApiUrl(url: string) {
  const pathname = new URL(url).pathname;
  const route = pathname.split('api/v2/')[1];
  const id = route.split('/')[1]?.replace('/', '');
  return id;
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
  // Aims to return 7 slots if possible
  // Return all pages if 7 or fewer
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If current page in the first three, show ellipsis after 4
  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPages - 1, totalPages];
  }

  // If current page in the last four, show ellipsis before last 4
  if (currentPage >= totalPages - 2) {
    return [
      1,
      2,
      '...',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
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
