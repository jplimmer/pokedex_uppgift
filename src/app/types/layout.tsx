import { TypeFilterList } from '@/components/pokemon';
import { TypeFilterListSkeleton } from '@/components/skeletons';
import { Suspense } from 'react';

export default function TypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="content-grid full-width [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)] py-8">
      <div className="grid grid-rows-[auto_auto_1fr] space-y-8">
        <h2 className="text-4xl text-center">Types</h2>
        <Suspense fallback={<TypeFilterListSkeleton numButtons={18} />}>
          <TypeFilterList />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
