'use client';

import { Result } from '@/lib/types/types';
import { splitByQuery, capitaliseFirstLetter } from '@/utils/strings';
import { useState, useEffect, use } from 'react';

interface AutocompleteProps {
  allResultsPromise: Promise<Result<string[], string>>;
  query: string;
  onSelectMatch: (value: string) => void;
  onSetMatches: (matches: string[]) => void;
  showList: boolean;
  onSetShowList: (show: boolean) => void;
  highlightedIndex: number;
  onSetHighlightedIndex: (index: number) => void;
}

export function AutocompleteDropdown({
  allResultsPromise,
  query,
  onSelectMatch,
  onSetMatches,
  showList,
  onSetShowList,
  highlightedIndex,
  onSetHighlightedIndex,
}: AutocompleteProps) {
  const [matches, setMatches] = useState<string[]>([]);

  // Load the results from the promise
  const allResults = use(allResultsPromise);

  // Display list of pokemon matching the query string
  useEffect(() => {
    if (!allResults.success || !allResults.data) return;
    const allNames = allResults.data;

    if (query.trim() === '') {
      setMatches([]);
      onSetMatches([]);
    } else {
      const filtered = allNames.filter((res) =>
        res.toLowerCase().includes(query.toLowerCase())
      );
      setMatches(filtered);
      onSetMatches(filtered);
      // Display list with no items highlighted
      onSetShowList(filtered.length > 0);
      onSetHighlightedIndex(-1);
    }
  }, [query, allResults, onSetMatches, onSetShowList, onSetHighlightedIndex]);

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

  if (!showList || matches.length === 0) return null;

  return (
    <ul
      className="
          absolute top-full left-0 right-0 w-full
          bg-white border-1 border-neutral-300 rounded-md
          shadow-lg max-h-60 overflow-y-auto"
    >
      {matches.map((item, index) => (
        <li
          key={index}
          onMouseEnter={() => onSetHighlightedIndex(index)}
          onClick={() => {
            onSelectMatch(item);
          }}
          className={`px-4 rounded-sm border-b border-neutral-100 last:border-b-0 cursor-pointer ${
            index === highlightedIndex ? 'bg-neutral-600 text-white' : ''
          }`}
        >
          {formatMatch(item, query)}
        </li>
      ))}
    </ul>
  );
}
