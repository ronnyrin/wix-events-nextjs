import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { getEventBySlug } from '@model/event/event-api';
import { TicketsTable } from '@app/components/Table/Table.client';
import { getTicketsById } from '@model/availability/availability-api';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';

export default async function EventPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const event = await getEventBySlug(params.slug, wixSession);
  const tickets = event && (await getTicketsById(event.id!, wixSession));
  return (
    <div className="max-w-full-content mx-auto px-28">
      {event ? (
        <div className="full-w overflow-hidden max-w-7xl mx-auto">
          <span>
            {event.scheduling?.startDateFormatted} | {event.location?.name}
          </span>
          <h1 className="text-white text-4xl mb-2">{event.title}</h1>
          <h3 className="text-white">{event.description}</h3>
          <WixMediaImage media={event.mainImage} />
          <p>TIME & LOCATION</p>
          <p>{event.scheduling?.formatted}</p>
          <TicketsTable
            tickets={tickets!}
            event={event}
            wixSession={wixSession}
          />
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The event was not found
        </div>
      )}
    </div>
  );
}
