'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterButtonProps {
  children: React.ReactNode;
  param: string;
  value: string;
  className?: string;
  activeClassName?: string;
}

export default function FilterButton({
  children,
  param,
  value,
  className,
  activeClassName,
}: FilterButtonProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Check if filter currently active
  const currentValues = searchParams.getAll(param);
  const isActive = currentValues.includes(value);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (isActive) {
      // Remove this filter and re-add any other filters for same param
      params.delete(param);
      currentValues
        .filter((v) => v !== value)
        .forEach((v) => params.append(param, v));
    } else {
      params.append(param, value);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      type="button"
      onClick={handleFilter}
      aria-pressed={isActive}
      className={`${className} ${isActive ? activeClassName : ''}`}
    >
      {children}
    </button>
  );
}
