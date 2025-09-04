import { capitaliseFirstLetter } from '@/utils/strings';
import Image from 'next/image';
import { Pokemon, Result } from '@/lib/types/types';
import { ASSET_PATHS } from '@/lib/constants';
import { PokemonErrorCard } from '../error';

interface PokemonCardProps {
  pokemonPromise: Promise<Result<Pokemon, string>>;
  inSubgrid?: boolean;
  className?: string;
}

// For use of parent if PokemonCard used in subgrid
export const pokemonCardStyle =
  'grid gap-2 border-4 border-indigo-400 rounded-xl bg-blue-50 p-6 pb-3 min-w-[15rem] aspect-[5/7]';

export async function PokemonCard({
  pokemonPromise,
  inSubgrid = false,
  className,
}: PokemonCardProps) {
  const pokemonResult = await pokemonPromise;

  if (!pokemonResult.success) {
    return <PokemonErrorCard />;
  }

  const pokemon = pokemonResult.data;

  const StatKeys = ['hp', 'attack', 'defense'] as const;
  const primaryColour = pokemon.primaryType.colour;
  const secondaryColour = `${primaryColour}40`;

  return (
    <div
      className={
        inSubgrid
          ? `grid grid-rows-subgrid row-span-4 ${pokemonCardStyle}`
          : `${pokemonCardStyle} ${className}`
      }
    >
      <h3 className="grid place-content-center h-[3rem] text-2xl text-center">
        {capitaliseFirstLetter(pokemon.name)}
      </h3>
      <div className="flex flex-col items-center order-first gap-2">
        <Image
          src={pokemon.sprites.primary ?? ASSET_PATHS.SPRITE_FALLBACK}
          alt=""
          width={100}
          height={100}
          style={{ borderColor: secondaryColour }}
          className="border-4 rounded-full bg-white"
        />
        <span
          className="rounded-2xl px-3 text-sm font-bold"
          style={{
            color: pokemon.primaryType.colour,
            backgroundColor: secondaryColour,
          }}
        >
          #{pokemon.id}
        </span>
      </div>
      <ul className="flex justify-center items-center gap-1">
        {pokemon.types.map((type, index) => (
          <li key={index}>
            <span
              className="rounded-2xl px-3 text-white text-sm"
              style={{ backgroundColor: type.colour }}
            >
              {capitaliseFirstLetter(type.name)}
            </span>
          </li>
        ))}
      </ul>
      <div className="pt-2">
        <table className="w-full font-bold text-sm">
          <tbody>
            {StatKeys.map((statName, index) => (
              <tr key={index}>
                <td>
                  {statName === 'hp'
                    ? statName.toUpperCase()
                    : capitaliseFirstLetter(statName)}
                </td>
                <td className="text-right">{pokemon.stats[statName]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
