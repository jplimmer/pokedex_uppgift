import { LoadingSpinner } from '@/components/loading';

export default function Loading() {
  return (
    <div className="content-grid full-width items-center justify-items-center bg-neutral-100">
      <div className="flex flex-col items-center justify-center gap-4">
        <LoadingSpinner width={200} />
        <p className="text-3xl">Loading...</p>
      </div>
    </div>
  );
}
