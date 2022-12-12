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
        <div className="my-3 container m-auto grid grid-cols-3 gap-4">
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
    <div className="max-w-sm rounded-none overflow-hidden mx-auto border-8 border-black relative h-full">
      <div className="px-6 pt-4 text-center h-full pb-20">
        <div className="font-bold text-xl mb-2 font-lulo">
          {service.info.name}
        </div>
        <p className="text-sm">{service.info.tagLine}</p>
        <p className="text-gray-700 text-base">
          {formattedPrice.userFormattedPrice}
        </p>
      </div>
      <div className="w-full mx-auto pb-8 absolute bottom-0 text-center">
        <a href={`/calendar/${service.slug}`} className="btn-main">
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
