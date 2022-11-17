import {ServiceInfoViewModel} from "@model/service/service.mapper";

export default function Image({media}: {media: ServiceInfoViewModel['info']['media']}) {
    const imageUrl = media?.url ? 'https://static.wixstatic.com/media/' + media?.url : '';
    return (<div className="w-full"><img className="w-full h-36 max-w-xs m-auto" src={imageUrl} alt={media?.altText ?? 'no image'}/></div>)
}
