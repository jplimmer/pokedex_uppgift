'use client';

import { capitaliseFirstLetter, splitByQuery } from '@/utils/text-utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface SearchBarProps {
  searchAction: (formData: FormData) => void;
  placeholder?: string;
  allResults?: string[];
  wait?: number;
  className?: string;
}

export default function SearchBar({
  searchAction,
  placeholder,
  allResults,
  wait = 600,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState<string>('');
  const [matches, setMatches] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Display list of pokemon matching the query string
  useEffect(() => {
    if (!allResults) return;

    if (query.trim() === '') {
      setMatches([]);
    } else {
      const filtered = allResults.filter((res) =>
        res.toLowerCase().includes(query.toLowerCase())
      );
      setMatches(filtered);
      // Display list with no items highlighted
      setShowList(filtered.length > 0);
      setHighlightedIndex(-1);
    }
  }, [query, allResults]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowList(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showList || matches.length === 0) return;

    if (e.key === 'Escape') {
      setShowList(false);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, matches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        selectMatch(matches[highlightedIndex]);
      } else {
        submitQuery(query);
      }
    }
  };

  const selectMatch = (value: string) => {
    setQuery(value);
    submitQuery(value);
  };

  const submitQuery = (value: string) => {
    setShowList(false);

    const formData = new FormData();
    formData.append('search', value);

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
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center ${className}`}
    >
      <form
        action={searchAction}
        className="flex items-center gap-2 rounded-sm shadow-md shadow-neutral-400 p-2 w-full"
      >
        <label htmlFor="search-bar" className="sr-only"></label>
        <input
          id="search-bar"
          name="search"
          type="text"
          defaultValue={query}
          onChange={useDebouncedCallback((e) => setQuery(e.target.value), wait)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
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
      {showList && (
        <ul
          className="
          absolute top-full left-0 right-0 w-full
          bg-white border-1 border-neutral-300 rounded-md
          shadow-lg max-h-60 overflow-y-auto"
        >
          {matches.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => {
                selectMatch(item);
              }}
              className={`px-4 rounded-sm border-b border-neutral-100 last:border-b-0 cursor-pointer ${
                index === highlightedIndex ? 'bg-neutral-600 text-white' : ''
              }`}
            >
              {formatMatch(item, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
