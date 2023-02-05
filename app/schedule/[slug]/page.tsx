import { Schedule } from '@app/components/Schedule/Schedule';
import { getWixClient } from '@app/hooks/useWixClientServer';
import { formatDate } from '@app/utils/date-formatter';

export default async function SchedulePage({ params }: any) {
  const wixClient = await getWixClient();
  const { events } = await wixClient.events.queryEventsV2({
    query: { filter: { slug: params.slug }, paging: { limit: 1, offset: 0 } },
  });
  const event = events?.length ? events![0] : null;
  const { items } = await wixClient.schedule.listScheduleItems({
    eventId: [event!._id!],
    limit: 100,
  });

  return (
    <div className="max-w-3xl mx-auto px-14 pt-16">
      <p className="font-helvetica">
        {event!.title} | {event!.scheduling?.formatted},{' '}
        {event!.location!.address}
      </p>
      <h1 className="text-5xl mb-12 mt-4">Schedule</h1>
      <a
        className="text-purple-500 border py-2 px-4 mb-8 border-purple-500 inline-block"
        href={`/events/${params.slug}`}
      >
        Buy Tickets
      </a>
      <h2 className="mt-4 border-b border-black pb-4">
        {formatDate(
          new Date(event!.scheduling?.config?.startDate!),
          event!.scheduling!.config!.timeZoneId!
        )}
      </h2>
      <Schedule items={items!} slug={params.slug} isFull={true} />
    </div>
  );
}
