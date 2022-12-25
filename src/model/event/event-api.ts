import { Event } from '@model/event/types';
import { WixSession } from '../../auth';

const EVENTS_SERVICES_API = 'https://www.wixapis.com/events/v1/events/query';

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
      filter,
      offset: 0,
      limit: 1,
      fieldset: ['FULL', 'DETAILS', 'REGISTRATION'],
    },
    wixSession,
  }).then(({ events: [event] }) => event);

const fetchEvents = ({
  input,
  wixSession,
}: {
  input: any;
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
