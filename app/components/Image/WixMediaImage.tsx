import { ServiceImage } from '@model/service/service.mapper';
import { media as wixMedia } from '@wix/sdk';

export function getImageUrlForMedia(
  media?: ServiceImage,
  width: number = media?.width ?? 640,
  height: number = media?.height ?? 320
) {
  const imageUrl = media?.url
    ? wixMedia.getScaleToFillImageUrl(
        `wix:image://v1/${media.url}#originWidth=${width}&originHeight=${height}` +
          media?.url,
        width,
        height,
        {}
      )
    : `https://fakeimg.pl/${width}x${height}/?text=No%20Image`;
  return imageUrl;
}

export default function WixMediaImage({
  media,
  width,
  height,
}: {
  media?: ServiceImage;
  width?: number;
  height?: number;
}) {
  const imageUrl = getImageUrlForMedia(media, width, height);
  return (
    <div className="flex items-center justify-center ">
      <div className="overflow-hidden aspect-video cursor-pointer relative group">
        <img
          className="object-cover w-full aspect-video group-hover:scale-110 transition duration-300 ease-in-out"
          src={imageUrl}
          alt={media?.altText ?? 'no info available for image'}
        />
      </div>
    </div>
  );
}
