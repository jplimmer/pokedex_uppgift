'use client';

import { PokemonType } from '@/lib/types/types';
import { capitaliseFirstLetter } from '@/utils/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function FilterButton({
  pokemonType,
}: {
  pokemonType: PokemonType;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const value = pokemonType.name;

  // Check if filter currently active
  const currentValues = searchParams.getAll('type');
  const isActive = currentValues.includes(value);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (isActive) {
      // Remove this filter and re-add any other filters for same param
      params.delete('type');
      currentValues
        .filter((v) => v !== value)
        .forEach((v) => params.append('type', v));
    } else {
      params.append('type', value);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      type="button"
      onClick={handleFilter}
      aria-pressed={isActive}
      className="cursor-pointer rounded-4xl hover:bg-neutral-300"
    >
      <div
        className="flex flex-col items-center gap-2 border border-neutral-500 rounded-4xl py-4 px-2 bg-transparent"
        style={{
          backgroundColor: `${pokemonType.colour}${isActive ? '' : '30'}`,
        }}
      >
        <span className="text-xl">
          {capitaliseFirstLetter(pokemonType.name)}
        </span>
        <Image
          src={pokemonType.sprite}
          alt=""
          width={65}
          height={65}
          style={{
            borderColor: `${pokemonType.colour}${isActive ? '30' : ''}`,
          }}
          className="border-4 rounded-full bg-indigo-50 order-first"
        />
      </div>
    </button>
  );
}
