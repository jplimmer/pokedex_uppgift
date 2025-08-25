import Image from 'next/image';

export default function SearchBar({ className }: { className?: string }) {
  return (
    <div className={`rounded-sm shadow-md drop-shadow-2xl p-2 ${className}`}>
      <form action="/" className="flex items-center justify-between">
        <label className="visually-hidden">
          <input type="text" placeholder="Search for a Pokémon..." required />
        </label>
        <button
          type="submit"
          className="py-2 px-4 rounded-md bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
        >
          <Image src="/Search.svg" alt="" width={16} height={16} />
        </button>
      </form>
    </div>
  );
}
