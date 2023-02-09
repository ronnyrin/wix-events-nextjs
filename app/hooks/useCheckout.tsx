import { useQuery } from '@tanstack/react-query';
import { useWixClient } from '@app/hooks/useWixClient';
import { currentCart } from '@wix/ecom';

export const useCheckout = () => {
  const wixClient = useWixClient();
  return useQuery(['checkout'], () =>
    wixClient.currentCart.createCheckoutFromCurrentCart({
      channelType: currentCart.ChannelType.WEB,
    })
  );
};
