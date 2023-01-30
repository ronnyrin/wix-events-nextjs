import { WixMediaImage } from '@app/components/Image/WixMediaImage';
import { formatDate } from '@app/utils/date-formatter';
import { TicketsTable } from '@app/components/Table/Table.client';
import { getWixClient } from '@app/hooks/useWixClientServer';
import { events as api } from '@wix/events';

export default async function EventPage({ params }: any) {
  const wixClient = await getWixClient();
  const { events } = await wixClient.events.queryEventsV2({
    fieldset: [
      api.EventFieldset.FULL,
      api.EventFieldset.DETAILS,
      api.EventFieldset.TEXTS,
      api.EventFieldset.REGISTRATION,
    ],
    query: { filter: { slug: params.slug }, paging: { limit: 1, offset: 0 } },
  });
  const event = events?.length ? events![0] : null;
  const tickets =
    event &&
    (
      await wixClient.checkout.queryAvailableTickets({
        filter: { eventId: event._id },
        offset: 0,
        limit: 100,
      })
    ).definitions;
  return (
    <div className="max-w-full-content mx-auto px-14">
      {event ? (
        <div className="full-w overflow-hidden max-w-7xl mx-auto">
          <div className="flex flex-row bg-zinc-900 text-white max-w-5xl items-center mx-auto">
            <div className="my-10 basis-1/2">
              <WixMediaImage media={event.mainImage} />
            </div>
            <div className="basis-1/2 text-left px-5">
              <span>
                {formatDate(new Date(event.scheduling?.config?.startDate!)) ||
                  event.scheduling?.formatted}{' '}
                | {event.location?.name}
              </span>
              <h1 className="text-5xl my-2">{event.title}</h1>
              <h3 className="my-6">{event.description}</h3>
              {event.registration?.status ===
                api.RegistrationStatus.OPEN_TICKETS && (
                <a className="btn-main inline-block" href="#tickets">
                  Buy Tickets
                </a>
              )}
              {event.registration?.status ===
                api.RegistrationStatus.OPEN_EXTERNAL && (
                <a
                  className="btn-main inline-block"
                  href={event.registration.external!.registration}
                >
                  Buy Tickets
                </a>
              )}
              {[
                api.RegistrationStatus.CLOSED_MANUALLY,
                api.RegistrationStatus.CLOSED,
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
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <h2 className="mt-7">TIME & LOCATION</h2>
            <p className="font-helvetica">{event.scheduling?.formatted}</p>
            {event.about ? (
              <>
                <h2 className=" mt-7">ABOUT THE EVENT</h2>
                <p
                  className="font-helvetica"
                  dangerouslySetInnerHTML={{ __html: event.about ?? '' }}
                />
              </>
            ) : null}
            {event.registration?.external && (
              <a
                className="btn-main my-10 inline-block"
                href={event.registration?.external.registration}
              >
                Buy Tickets
              </a>
            )}
            {[
              api.RegistrationStatus.CLOSED_MANUALLY,
              api.RegistrationStatus.OPEN_TICKETS,
            ].includes(event.registration?.status!) && (
              <div className="my-10">
                <h2 className="mt-7">TICKETS</h2>
                <TicketsTable tickets={tickets!} event={event} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The event was not found
        </div>
      )}
    </div>
  );
}
