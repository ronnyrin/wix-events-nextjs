import { useQuery } from '@tanstack/react-query';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { currentCart } from '@wix/ecom';

export const useCart = () => {
  const wixSession = useClientAuthSession();
  return useQuery(['cart', wixSession], () =>
    fetch('/api/cart', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: wixSession.apiKeyForStores,
        'wix-site-id': wixSession.siteId,
      },
    }).then((res) => res.json() as Promise<currentCart.Cart>)
  );
};
