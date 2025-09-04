export function PaginationSkeleton({ className }: { className?: string }) {
  return (
    <div className={`w-[20rem] text-center text-xl italic ${className}`}>
      Loading pages...
    </div>
  );
}
