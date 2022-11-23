import {ServiceInfoViewModel} from "@model/service/service.mapper";
import {media as wixMedia} from '@wix/sdk';

export default function Image({media, width = media?.width ?? 640, height = media?.height ?? 320}: {media: ServiceInfoViewModel['info']['media']; width?: number; height?: number;}) {
    const imageUrl = media?.url ?
      wixMedia.getScaleToFillImageUrl(`wix:image://v1/${media.url}#originWidth=${width}&originHeight=${height}` + media?.url, width, height, {}) :
      `https://fakeimg.pl/${width}x${height}/?text=No%20Image`;
    return (<div
      className='flex items-center justify-center '>
        <div
          className="overflow-hidden aspect-video cursor-pointer relative group"
        >
            <img
              className="object-cover w-full aspect-video group-hover:scale-110 transition duration-300 ease-in-out"
              src={imageUrl}
              alt={media?.altText ?? 'no image'}
            />
        </div>
    </div>)
}
