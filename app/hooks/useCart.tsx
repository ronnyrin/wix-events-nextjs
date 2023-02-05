import { useQuery } from '@tanstack/react-query';
import { useWixClient } from '@app/hooks/useWixClient';

export const useCart = () => {
  const wixClient = useWixClient();
  return useQuery(['cart'], () => wixClient.currentCart.getCurrentCart());
};