'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function FilterBar({
  placeholder,
  wait = 600,
  className,
}: {
  placeholder?: string;
  wait?: number;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params}`);
  }, wait);

  return (
    <div className="flex">
      <label htmlFor="filter-bar" className="sr-only">
        {placeholder ?? 'Search'}
      </label>
      <input
        type="text"
        id="filter-bar"
        onChange={(e) => handleFilter(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        placeholder={placeholder ?? 'Search...'}
        autoComplete="off"
        className={`border-2 border-neutral-500 rounded-md bg-white py-2 px-4 ${className}`}
      />
    </div>
  );
}
