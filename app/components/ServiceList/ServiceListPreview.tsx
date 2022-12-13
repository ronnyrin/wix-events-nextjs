'use client';
import { ServiceInfoViewModel } from '@model/service/service.mapper';
import { useServiceFormattedPrice } from '@app/hooks/useServiceFormattedPrice';
import { useServices } from '@app/hooks/useServices';
import { WixSession } from '../../../src/auth';
import { Spinner } from 'flowbite-react';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';

function ServiceListPreviewView() {
  const { data, isLoading } = useServices({ limit: 3 });
  const smClassName = (data?.services?.length ?? 0) > 1 ? 'sm:grid-cols-2' : '';
  const mdClassName = (data?.services?.length ?? 0) > 2 ? 'md:grid-cols-3' : '';

  return (
    <>
      {isLoading ? (
        <div className="w-full h-36 flex items-center justify-center">
          <Spinner color="gray" />
        </div>
      ) : (
        <div
          className={`mx-auto flex flex-wrap my-3 m-auto grid grid-cols-1 gap-4 ${smClassName} ${mdClassName}`}
        >
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
    <div className="w-full rounded-none overflow-hidden mx-auto border-8 border-black relative h-full min-h-[400px]">
      <div className="px-6 pt-4 text-center h-full pb-20">
        <div className="font-bold text-xl mb-2 font-lulo">
          {service.info.name}
        </div>
        <p className="text-sm">{service.info.tagLine}</p>
        <div className="border-top border border-black w-full my-6"></div>
        <p className="text-gray-700 text-base capitalize">
          {service.info.daysWithSessions.join(', ')}
        </p>
        <p className="text-gray-700 text-base">
          {formattedPrice.userFormattedPrice}
        </p>
        <p className="text-gray-700 text-base">{service.info.duration}</p>
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
