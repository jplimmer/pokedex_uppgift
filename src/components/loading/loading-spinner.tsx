import { ASSET_PATHS } from '@/lib/constants';
import Image from 'next/image';

export function LoadingSpinner({ width = 200 }: { width?: number }) {
  return (
    <Image
      src={ASSET_PATHS.LOADING}
      alt=""
      width={width}
      height={width}
      className="animate-spin"
    />
  );
}
