import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { cart } from '@wix/ecom';
import { WixSession } from '../../src/auth';

export const useAddItemToCart = () => {
  const wixSession = useClientAuthSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item: cart.LineItem) => removeItemFromCart(wixSession, item),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['cart', wixSession] });
    },
  });
  return mutation.mutate;
};

function removeItemFromCart(wixSession: WixSession, item: cart.LineItem) {
  return fetch('/api/add-item-to-cart', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: wixSession.apiKey,
      'wix-site-id': wixSession.siteId,
    },
    method: 'POST',
    body: JSON.stringify({
      item,
    }),
  }).then((res) => res.json() as Promise<cart.Cart>);
}
