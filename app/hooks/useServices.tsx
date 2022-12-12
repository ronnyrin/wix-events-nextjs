import { useQuery } from '@tanstack/react-query';
import { getServices } from '@model/service/service-api';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';

export const useServices = ({ limit }: { limit?: number }) => {
  const wixSession = useClientAuthSession();
  return useQuery(['services', limit, wixSession], () =>
    getServices({ limit }, wixSession)
  );
};
