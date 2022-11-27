import {useQuery} from "@tanstack/react-query";
import {getServiceAvailability} from "@model/availability/availability-api";
import {useClientAuthSession} from "@app/hooks/useClientAuthSession";

export const useAvailability = ({
                                  serviceId,
                                  from,
                                  to,
                                }: {
  serviceId: string,
  from: string,
  to: string,
}) => {
  const wixSession = useClientAuthSession();
  return useQuery(['calendar-availability', serviceId, from, to, wixSession],
    () => getServiceAvailability({serviceId, from, to}, wixSession)
  );
}
