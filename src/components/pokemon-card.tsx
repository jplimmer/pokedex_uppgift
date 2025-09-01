import { capitaliseFirstLetter } from '@/utils/utils';
import Image from 'next/image';
import { Pokemon } from '@/lib/app/types';

export default function PokemonCard({
  pokemon,
  className,
}: {
  pokemon: Pokemon;
  className?: string;
}) {
  const StatKeys = ['hp', 'attack', 'defense'] as const;

  const primaryColour = pokemon.primaryType.colour;
  const secondaryColour = `${primaryColour}40`;

  return (
    <div
      className={`
        flex flex-col items-center justify-center
        border-4 border-indigo-400 rounded-lg 
        bg-blue-50 p-4 space-y-2 aspect-3/4 ${className}`}
    >
      <h3 className="text-2xl">{capitaliseFirstLetter(pokemon.name)}</h3>
      <div className="flex flex-col items-center order-first gap-2">
        <Image
          src={pokemon.sprites.primary ?? null}
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
      <ul className="flex gap-1">
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
  );
}
