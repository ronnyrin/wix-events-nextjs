import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { getEventBySlug } from '@model/event/event-api';
import { TicketsTable } from '@app/components/Table/Table.client';
import { getTicketsById } from '@model/availability/availability-api';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';
import { formatDate } from '@app/utils/date-formatter';

export default async function EventPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const event = await getEventBySlug(params.slug, wixSession);
  const tickets = event && (await getTicketsById(event, wixSession));
  return (
    <div className="max-w-full-content mx-auto px-14">
      {event ? (
        <div className="full-w overflow-hidden max-w-7xl mx-auto">
          <span>
            {formatDate(new Date(event.scheduling?.config?.startDate!)) ||
              event.scheduling?.formatted}{' '}
            | {event.location?.name}
          </span>
          <h1 className="text-4xl mb-2">{event.title}</h1>
          <h3>{event.description}</h3>
          <WixMediaImage media={event.mainImage} />
          <h2 className="text-center mt-7">TIME & LOCATION</h2>
          <p className="text-center">{event.scheduling?.formatted}</p>
          {event.about !== '<p></p>' ? (
            <>
              <h2 className="text-center mt-7">ABOUT THE EVENT</h2>
              <p
                className="text-center"
                dangerouslySetInnerHTML={{ __html: event.about ?? '' }}
              />
            </>
          ) : null}
          <p className="text-center">
            {event.location?.fullAddress?.formattedAddress}
          </p>
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
