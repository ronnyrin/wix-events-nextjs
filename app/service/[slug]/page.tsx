import WixMediaImage from '@app/components/Image/WixMediaImage';
import { getServiceBySlug } from '@model/service/service-api';
import ImageGallery from '@app/components/Image/ImageGallery/ImageGallery';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { useServiceFormattedPrice } from '@app/hooks/useServiceFormattedPrice';

export default async function ServicePage({ params }: any) {
  const wixSession = useServerAuthSession();
  const service = await getServiceBySlug(params.slug, wixSession);
  const formattedPrice = useServiceFormattedPrice(
    service!.payment!.paymentDetails
  );

  return (
    <>
      {service ? (
        <div
          key={service.id}
          className="full-w rounded overflow-hidden max-w-7xl mx-auto"
        >
          {service.info.media.coverMedia && (
            <section className="max-h-96 overflow-hidden">
              <WixMediaImage media={service.info.media.coverMedia} />
            </section>
          )}
          <div className="px-6 py-4">
            <a
              href={`/calendar/${service.slug}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Go To Calendar
            </a>
            <div className="font-bold text-xl mb-2">{service.info.name}</div>
            {service.info.media?.otherMediaItems?.length && (
              <section>
                <ImageGallery mediaItems={service.info.media.otherMediaItems} />
              </section>
            )}
            <p className="text-gray-700 text-sm">{service.info.description}</p>
            <p className="text-gray-700 text-base">
              {formattedPrice.userFormattedPrice}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <a
              href={`/calendar/${service.slug}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Go To Calendar
            </a>
          </div>
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The service was not found
        </div>
      )}
    </>
  );
}
