import { WixSession } from '../../auth';
import { CreateReservationRequest } from '@model/reservation/types';

export const createReservation = ({
  input,
  eventId,
  wixSession,
}: {
  input: CreateReservationRequest;
  eventId: string;
  wixSession: WixSession;
}) =>
  fetch(`/v1/events/${eventId}/tickets/reservation`, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json',
      Authorization: wixSession.apiKey,
      'wix-site-id': wixSession.siteId,
    },
  })
    .then((res) => res.json())
    .then((res) => res.id);
