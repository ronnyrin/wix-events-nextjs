import {
  TicketDefinition,
  ExtendedTicketDefinition,
} from '@model/availability/types';
import { Event } from '@model/event/types';

export const ticketMapper = (
  event: Event,
  ticket: TicketDefinition
): ExtendedTicketDefinition => {
  const tax =
    (Number.parseFloat(ticket.price?.value!) *
      Number.parseFloat(
        event.registration?.ticketing?.config?.taxConfig?.rate || '0'
      )) /
    100;
  return {
    ...ticket,
    wixFeeForTicket:
      ((Number.parseFloat(ticket.price?.value!) + tax) * 2.5) / 100,
    tax,
  };
};
