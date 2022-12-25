import { TicketDefinition } from '@model/availability/types';
import { WixSession } from '../../auth';

// TODO: CORS WA till using SDK
const EVENT_TICKET_AVAILABILITY_API =
  typeof window === 'undefined'
    ? 'https://www.wixapis.com/events/v1/tickets/available'
    : '/api/v1/tickets/available';

export const getTicketsById = (
  eventId: string,
  wixSession: WixSession
): Promise<TicketDefinition[]> =>
  queryAvailability({
    input: { eventId, limit: 100 },
    wixSession,
  }).then(({ definitions }) => definitions);

const queryAvailability = ({
  input,
  wixSession,
}: {
  input: any;
  wixSession: WixSession;
}) =>
  fetch(
    `${EVENT_TICKET_AVAILABILITY_API}?${new URLSearchParams(input).toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: wixSession.apiKey,
        'wix-site-id': wixSession.siteId,
      },
    }
  ).then((res) => res.json());
