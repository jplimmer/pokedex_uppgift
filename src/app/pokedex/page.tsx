import PokemonCard from '@/components/PokemonCard';
import { fetchAllPokemon } from '@/lib/pokemon';
import { routes } from '@/lib/routes';
import Link from 'next/link';

export default async function PokedexPage() {
  const pokemonList = await fetchAllPokemon();

  if (!pokemonList) return;

  return (
    <div className="content-grid full-width [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)] p-8 space-y-8">
      <h2 className="text-4xl text-center">Pokédex</h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(25ch,1fr))] content-stretch gap-4">
        {pokemonList.map(
          (p, i) =>
            p.id && (
              <li key={i} className="w-full justify-items-center">
                <Link href={`${routes.pokedex.href}/${p.id}`}>
                  <PokemonCard id={p.id} className="bg-white" />
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
