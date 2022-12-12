'use client';
import WixMediaImage from '@app/components/Image/WixMediaImage';
import { ServiceInfoViewModel } from '@model/service/service.mapper';
import { useServiceFormattedPrice } from '@app/hooks/useServiceFormattedPrice';
import { useServices } from '@app/hooks/useServices';
import { WixSession } from '../../../src/auth';
import { Spinner } from 'flowbite-react';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';

function ServiceListPreviewView() {
  const { data, isLoading } = useServices({ limit: 3 });

  return (
    <>
      {isLoading ? (
        <div className="w-full h-36 flex items-center justify-center">
          <Spinner color="gray" />
        </div>
      ) : (
        <div className="my-3 container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.services?.map((service, index) => (
            <ServiceCardPreview service={service} key={service.id} />
          ))}
        </div>
      )}
    </>
  );
}

const ServiceCardPreview = ({ service }: { service: ServiceInfoViewModel }) => {
  const formattedPrice = useServiceFormattedPrice(
    service!.payment!.paymentDetails
  );

  return (
    <div className="max-w-sm rounded overflow-hidden mx-auto">
      <a href={`/service/${service.slug}`}>
        <WixMediaImage
          media={service.info.media.mainMedia}
          width={640}
          height={320}
        />
      </a>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{service.info.name}</div>
        <p className="text-gray-700 text-base">{service.info.tagLine}</p>
        <p className="text-gray-700 text-base">
          {formattedPrice.userFormattedPrice}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a
          href={`/calendar/${service.slug}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default function ServiceListPreview({
  wixSession,
}: {
  wixSession: WixSession;
}) {
  return (
    <WixBookingsClientProvider wixSession={wixSession}>
      <ServiceListPreviewView />
    </WixBookingsClientProvider>
  );
}
