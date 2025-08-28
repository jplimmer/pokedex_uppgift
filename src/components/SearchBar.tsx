import { fetchPokemonBySearchParam } from '@/lib/pokemonData';
import { routes } from '@/lib/routes';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function SearchBar({ className }: { className?: string }) {
  async function searchPokemon(formData: FormData) {
    'use server';

    const searchTerm = formData.get('search') as string;
    console.log(searchTerm);
    if (!searchTerm) return;

    const id = await fetchPokemonBySearchParam(searchTerm);
    redirect(`${routes.pokedex.href}/${id}`);
  }

  return (
    <div className={`rounded-sm shadow-md drop-shadow-2xl p-2 ${className}`}>
      <form action={searchPokemon} className="flex items-center gap-1 px-2">
        <label htmlFor="search-bar" className="sr-only"></label>
        <input
          id="search-bar"
          name="search"
          type="text"
          placeholder="Search for a Pokémon..."
          required
          className="flex-1 bg-transparent text-lg"
        />
        <button
          type="submit"
          className="flex-shrink-0 py-2 px-4 rounded-md bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
        >
          <Image src="/Search.svg" alt="" width={16} height={16} />
        </button>
      </form>
    </div>
  );
}
