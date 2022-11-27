import {QueryAvailabilityResponse} from "@model/availability/types";

const BOOKINGS_AVAILABILITY_API = "/api/v1/availability/query";

export const getServiceAvailability = ({
                                         serviceId,
                                         from,
                                         to,
                                       }: {
  serviceId: string,
  from: string,
  to: string,
}, wixSession: string): Promise<QueryAvailabilityResponse> => queryAvailability({
  input: {
    query: {
      filter: {
        serviceId: [serviceId],
        startDate: from,
        endDate: to
      },
    }
  },
  wixSession
})

const queryAvailability = ({input, wixSession}: { input: any, wixSession: string }) => fetch(
    BOOKINGS_AVAILABILITY_API, {
      method: "POST",
      headers: {
        Cookie: "svSession=" + wixSession,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }).then((res) => res.json());

