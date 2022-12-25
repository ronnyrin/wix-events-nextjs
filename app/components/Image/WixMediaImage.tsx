import { media as wixMedia } from '@wix/sdk';
import { Image as ImageDto } from '@model/event/types';
import Image from 'next/image';

function getImageUrlForMedia(
  media?: ImageDto,
  width: number = media?.width ?? 640,
  height: number = media?.height ?? 320
) {
  const imageUrl = media?.id
    ? wixMedia.getScaleToFillImageUrl(
        `wix:image://v1/${media.id}#originWidth=${width}&originHeight=${height}` +
          media?.url,
        width,
        height,
        {}
      )
    : `https://fakeimg.pl/${width}x${height}/?text=%20`;
  return imageUrl;
}

export function WixMediaImage({
  media,
  width = media?.width ?? 640,
  height = media?.height ?? 320,
}: {
  media?: ImageDto;
  width?: number;
  height?: number;
}) {
  const imageUrl = getImageUrlForMedia(media, width, height);
  return (
    <div className="flex items-center justify-center">
      <div className="overflow-hidden  cursor-pointer relative group">
        <Image
          className="object-cover w-full group-hover:scale-110 transition duration-300 ease-in-out"
          src={imageUrl}
          width={width}
          height={height}
          alt={media?.altText ?? 'no info available for image'}
        />
      </div>
    </div>
  );
}
