import { capitaliseFirstLetter } from '@/utils/utils';
import { getPokemonById, getStatValue } from '../lib/pokemon';
import Image from 'next/image';

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

const StatNames = ['HP', 'Attack', 'Defense'];

export default async function PokemonCard({ id }: { id: string }) {
  const pokemon = await getPokemonById(id);

  if (!pokemon) return;

  return (
    <div className="flex flex-col items-center space-y-2 border-4 border-indigo-400 rounded-lg bg-indigo-50 p-4">
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
