import { LoadingSpinner } from '../loading';

export function TypeFilterListSkeleton({ numButtons }: { numButtons: number }) {
  const list = Array.from({ length: numButtons }, (_, i) => i + 1);

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] gap-4 justify-items-center">
      {list.map((i) => (
        <li key={i}>
          <TypeFilterButtonSkeleton />
        </li>
      ))}
    </ul>
  );
}

export function TypeFilterButtonSkeleton() {
  return (
    <div className="w-[81] h-[133] relative flex items-center rounded-4xl border border-neutral-500 bg-neutral-100 animate-pulse">
      <LoadingSpinner />
    </div>
  );
}
