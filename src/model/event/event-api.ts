import {
  Event,
  EventFieldset,
  QueryEventsV2Request,
  QueryEventsV2Response,
} from '@model/event/types';
import { WixSession } from '../../auth';

const EVENTS_SERVICES_API = 'https://www.wixapis.com/events/v2/events/query';

export const getEventBySlug = (
  eventSlug: string,
  wixSession: WixSession
): Promise<Event | null> =>
  getEventByFilter(
    {
      slug: eventSlug,
    },
    wixSession
  );

const getEventByFilter = (
  filter: any,
  wixSession: WixSession
): Promise<Event | null> =>
  fetchEvents({
    input: {
      query: {
        filter,
        paging: {
          offset: 0,
          limit: 1,
        },
      },
      fieldset: [
        EventFieldset.FULL,
        EventFieldset.DETAILS,
        EventFieldset.TEXTS,
        EventFieldset.REGISTRATION,
      ],
    },
    wixSession,
  }).then(({ events }: QueryEventsV2Response) => events![0]);

const fetchEvents = ({
  input,
  wixSession,
}: {
  input: QueryEventsV2Request;
  wixSession: WixSession;
}) => {
  return fetch(EVENTS_SERVICES_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: wixSession.apiKey,
      'wix-site-id': wixSession.siteId,
    },
    body: JSON.stringify(input),
  })
    .then((res) => res.json())
    .catch((e) => console.error(e));
};
