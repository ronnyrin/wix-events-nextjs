import {
  QueryAvailabilityRequest,
  QueryAvailabilityResponse,
} from '@model/availability/types';
import { WixSession } from '../../auth';

// TODO: CORS WA till using SDK
const BOOKINGS_AVAILABILITY_API =
  typeof window === 'undefined'
    ? 'https://www.wixapis.com/availability-calendar/v1/availability/query'
    : '/api/v1/availability/query';

export const getServiceAvailability = (
  {
    serviceId,
    from,
    to,
    timezone,
    slotsPerDay,
  }: {
    serviceId: string;
    from: string;
    to: string;
    timezone?: string;
    slotsPerDay?: number;
  },
  wixSession: WixSession
): Promise<QueryAvailabilityResponse> =>
  queryAvailability({
    input: {
      slotsPerDay,
      timezone,
      query: {
        filter: {
          serviceId: [serviceId],
          startDate: from,
          endDate: to,
        },
      },
    },
    wixSession,
  });

const queryAvailability = ({
  input,
  wixSession,
}: {
  input: QueryAvailabilityRequest;
  wixSession: WixSession;
}) =>
  fetch(BOOKINGS_AVAILABILITY_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: wixSession.apiKey,
      'wix-site-id': wixSession.siteId,
    },
    body: JSON.stringify(input),
  }).then((res) => res.json());
