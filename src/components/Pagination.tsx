'use client';

import { generatePagination } from '@/utils/utils';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type Position = 'first' | 'last' | 'middle' | 'single';

export default function Pagination({
  totalPages,
  className,
}: {
  totalPages: number;
  className?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className={`flex items-center gap-4 ${className}`}>
        <PaginationArrow
          direction="left"
          href={createPageUrl(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
        <div className="flex gap-4">
          {allPages.map((page, index) => {
            let position: Position = 'first';

            if (index === allPages.length - 1) position = 'last';
            if (page === '...') position = 'middle';
            if (allPages.length === 1) position = 'single';

            return (
              <PaginationNumber
                key={`${page}- ${index}`}
                page={page}
                href={createPageUrl(page)}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>
        <PaginationArrow
          direction="right"
          href={createPageUrl(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
  position?: Position;
}) {
  const className = 'text-xl text-center';

  return isActive || position === 'middle' ? (
    <span className={className}>{page}</span>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const icon =
    direction === 'left' ? (
      <CircleArrowLeft size={24} />
    ) : (
      <CircleArrowRight size={24} />
    );

  return isDisabled ? <div>{icon}</div> : <Link href={href}>{icon}</Link>;
}
