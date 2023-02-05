import { media as wixMedia } from '@wix/api-client';
import Image from 'next/image';

function getImageUrlForMedia(media: string, width: number, height: number) {
  return wixMedia.getScaledToFillImageUrl(media, width, height, {});
}

export function WixMediaImage({
  media,
  height = 320,
  width = 640,
}: {
  media?: string;
  width?: number;
  height?: number;
}) {
  const imageUrl = getImageUrlForMedia(media || '', width, height);
  return (
    <div className={`flex items-center justify-center`}>
      <div className="overflow-hidden  cursor-pointer relative group w-full h-full">
        <Image
          className="object-cover w-full group-hover:scale-110 transition duration-300 ease-in-out"
          src={imageUrl}
          width={width}
          height={height}
          alt={'no info available for image'}
        />
      </div>
    </div>
  );
}
