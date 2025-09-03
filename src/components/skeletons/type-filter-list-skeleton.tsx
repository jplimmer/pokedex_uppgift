import { TypeFilterButton } from '../pokemon';

export function TypeFilterListSkeleton() {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(11ch,1fr))] gap-4 justify-items-center">
      {/* {types.map((type, index) => (
        <li key={index}>
          <TypeFilterButton pokemonType={type} />
        </li>
      ))} */}
    </ul>
  );
}
