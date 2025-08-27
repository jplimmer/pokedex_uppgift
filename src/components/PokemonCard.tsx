import { capitaliseFirstLetter } from '@/utils/utils';
import { getStatValue } from '../lib/pokemonData';
import Image from 'next/image';
import { Pokemon } from '@/lib/types';

export default function PokemonCard({
  pokemon,
  className,
}: {
  pokemon: Pokemon;
  className?: string;
}) {
  const StatNames = ['HP', 'Attack', 'Defense'];

  return (
    <div
      className={`
        flex flex-col items-center justify-center
        border-4 border-indigo-400 rounded-lg 
        bg-indigo-50 p-4 space-y-2 aspect-3/4 ${className}`}
    >
      <h3 className="text-2xl">{capitaliseFirstLetter(pokemon.name)}</h3>
      <div className="flex flex-col items-center order-first gap-2">
        <Image
          src={pokemon.sprites.front_default}
          alt=""
          width={100}
          height={100}
          className="border-4 border-amber-600 rounded-full bg-white"
        />
        <span className="bg-indigo-400 rounded-2xl px-3 text-white text-sm">
          #{pokemon.id}
        </span>
      </div>
      <ul className="flex gap-1">
        {pokemon.types.map((type, index) => (
          <li key={index}>
            <span className="bg-indigo-400 rounded-2xl px-3 text-white text-sm">
              {capitaliseFirstLetter(type.type.name)}
            </span>
          </li>
        ))}
      </ul>
      <table className="w-full font-bold text-sm">
        <tbody>
          {StatNames.map((statName, index) => (
            <tr key={index}>
              <td>{statName}</td>
              <td className="text-right">{getStatValue(pokemon, statName)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
