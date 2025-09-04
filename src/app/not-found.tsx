import { ASSET_PATHS } from '@/lib/constants';
import Image from 'next/image';

export default function notFound() {
  return (
    <div className="content-grid full-width items-center justify-items-center gap-4 bg-neutral-100">
      <p className="text-6xl font-jersey">Page Not Found!</p>
      <Image
        src={ASSET_PATHS.NOT_FOUND}
        alt=""
        width={800}
        height={800}
        className="self-start"
      />
    </div>
  );
}
