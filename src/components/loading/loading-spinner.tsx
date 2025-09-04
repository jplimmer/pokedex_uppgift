import { ASSET_PATHS } from '@/lib/constants';
import Image from 'next/image';

export function LoadingSpinner({ width = 200 }: { width?: number }) {
  return (
    <div className="relative" style={{ width, height: width }}>
      <Image
        src={ASSET_PATHS.LOADING}
        alt=""
        fill
        className="object-contain animate-spin"
      />
    </div>
  );
}
