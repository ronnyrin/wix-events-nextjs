import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { getEventBySlug } from '@model/event/event-api';
import { getTicketsById } from '@model/availability/availability-api';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';
import { formatDate } from '@app/utils/date-formatter';
import { RegistrationStatus } from '@model/event/types';
import { TicketsTable } from '@app/components/Table/Table.client';

export default async function EventPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const event = await getEventBySlug(params.slug, wixSession);
  const tickets = event && (await getTicketsById(event, wixSession));
  return (
    <div className="max-w-full-content mx-auto px-14">
      {event ? (
        <div className="full-w overflow-hidden max-w-7xl mx-auto text-center">
          <span>
            {formatDate(new Date(event.scheduling?.config?.startDate!)) ||
              event.scheduling?.formatted}{' '}
            | {event.location?.name}
          </span>
          <h1 className="text-4xl mb-2">{event.title}</h1>
          <h3 className="my-10">{event.description}</h3>
          {event.registration?.status === RegistrationStatus.OPEN_TICKETS && (
            <a className="btn-main inline-block" href="#tickets">
              Buy Tickets
            </a>
          )}
          {event.registration?.status === RegistrationStatus.OPEN_EXTERNAL && (
            <a
              className="btn-main inline-block"
              href={event.registration.external!.registration}
            >
              Buy Tickets
            </a>
          )}
          {[
            RegistrationStatus.CLOSED_MANUALLY,
            RegistrationStatus.CLOSED,
          ].includes(event.registration?.status!) && (
            <div>
              <p className="border-2 inline-block p-3">
                Registration is closed
                <br />
                <a href="/" className="underline">
                  See other events
                </a>
              </p>
            </div>
          )}
          <div className="my-10">
            <WixMediaImage media={event.mainImage} />
          </div>
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
          {event.registration?.external && (
            <a
              className="btn-main my-10 inline-block"
              href={event.registration?.external.registration}
            >
              Buy Tickets
            </a>
          )}
          {[
            RegistrationStatus.CLOSED_MANUALLY,
            RegistrationStatus.OPEN_TICKETS,
          ].includes(event.registration?.status!) && (
            <TicketsTable
              tickets={tickets!}
              event={event}
              wixSession={wixSession}
            />
          )}
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The event was not found
        </div>
      )}
    </div>
  );
}
