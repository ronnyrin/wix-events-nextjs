import {
  ExtendedTicketDefinition,
  TicketDefinition,
} from '@model/availability/types';
import { WixSession } from '../../auth';
import { Event } from '@model/event/types';
import { ticketMapper } from '@model/availability/ticket.mapper';

// TODO: CORS WA till using SDK
const EVENT_TICKET_AVAILABILITY_API =
  typeof window === 'undefined'
    ? 'https://www.wixapis.com/events/v1/tickets/available'
    : '/api/v1/tickets/available';

export const getTicketsById = (
  event: Event,
  wixSession: WixSession
): Promise<ExtendedTicketDefinition[]> =>
  queryAvailability({
    input: { eventId: event.id, limit: 100 },
    wixSession,
  }).then(({ definitions }) =>
    definitions.map((ticket: TicketDefinition) => ticketMapper(event, ticket))
  );

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
