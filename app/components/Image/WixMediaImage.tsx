import { media as wixMedia } from '@wix/api-client';
import Image from 'next/image';

function getImageUrlForMedia(media: string, width: number, height: number) {
  return wixMedia.getScaledToFillImageUrl(media, width, height, {});
}

export function WixMediaImage({ media }: { media?: string }) {
  const imageUrl = getImageUrlForMedia(media || '', 640, 320);
  return (
    <div className="flex items-center justify-center">
      <div className="overflow-hidden  cursor-pointer relative group">
        <Image
          className="object-cover w-full group-hover:scale-110 transition duration-300 ease-in-out"
          src={imageUrl}
          width={640}
          height={320}
          alt={'no info available for image'}
        />
      </div>
    </div>
  );
}
