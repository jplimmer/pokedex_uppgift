'use client';

import { capitaliseFirstLetter, splitByQuery } from '@/utils/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({
  searchAction,
  allResults,
  wait = 600,
  className,
}: {
  searchAction: (formData: FormData) => void;
  allResults?: string[];
  wait?: number;
  className?: string;
}) {
  const [query, setQuery] = useState<string>('');
  const [matches, setMatches] = useState<string[]>([]);
  // const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (!allResults) return;

    if (query.trim() === '') {
      setMatches([]);
    } else {
      const filtered = allResults.filter((res) =>
        res.toLowerCase().includes(query.toLowerCase())
      );
      setMatches(filtered);
    }
  }, [query, allResults]);

  const handleListClick = (selectedValue: string) => {
    if (selectedValue === '...') return;

    formatMatch(selectedValue, query);

    setQuery(selectedValue);

    const formData = new FormData();
    formData.append('search', selectedValue);

    searchAction(formData);
  };

  const formatMatch = (result: string, query: string) => {
    const parts = splitByQuery(result, query);

    return (
      <span>
        {capitaliseFirstLetter(parts.before)}
        <b className="underline font-normal">
          {parts.before ? parts.query : capitaliseFirstLetter(parts.query)}
        </b>
        {parts.after}
      </span>
    );
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <form
        action={searchAction}
        className="flex items-center gap-2 rounded-sm shadow-md drop-shadow-2xl p-2 w-full"
      >
        <label htmlFor="search-bar" className="sr-only"></label>
        <input
          id="search-bar"
          name="search"
          type="text"
          defaultValue={query}
          onChange={useDebouncedCallback((e) => setQuery(e.target.value), wait)}
          placeholder="Search for a Pokémon..."
          required
          autoComplete="off"
          className="
            flex-1 bg-transparent text-lg px-2 rounded-lg
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 
            focus-visible:ring-offset-white focus-visible:ring-offset-2 transition"
        />
        <button
          type="submit"
          className="flex-shrink-0 py-2 px-4 rounded-md bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
        >
          <Image src="/Search.svg" alt="" width={16} height={16} />
        </button>
      </form>
      <ul
        className="
          absolute top-full left-0 right-0 w-full
          bg-white border-1 border-neutral-300 rounded-md
          shadow-lg max-h-60 overflow-y-auto"
      >
        {matches.map((pokemon, index) => (
          <li
            key={index}
            onClick={() => {
              handleListClick(pokemon);
            }}
            className={`px-4 rounded-sm border-b border-neutral-100 last:border-b-0 ${
              pokemon === '...'
                ? 'text-neutral-500 cursor-default'
                : 'hover:bg-neutral-700 hover:text-white cursor-pointer'
            }`}
          >
            {formatMatch(pokemon, query)}
          </li>
        ))}
      </ul>
    </div>
  );
}
