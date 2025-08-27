'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function FilterBar({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleOnChange = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params}`);
  }, 600);

  return (
    <div className="flex">
      <label htmlFor="filter-bar" className="sr-only">
        {placeholder ?? 'Search'}
      </label>
      <input
        type="text"
        id="filter-bar"
        onChange={(e) => handleOnChange(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        placeholder={placeholder ?? 'Search...'}
        className={`border-2 border-neutral-300 rounded-md bg-white py-2 px-4 ${className}`}
      />
    </div>
  );
}
