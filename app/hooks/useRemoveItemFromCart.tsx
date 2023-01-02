import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { cart } from '@wix/ecom';
import { WixSession } from '../../src/auth';

export const useRemoveItemFromCart = () => {
  const wixSession = useClientAuthSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (itemId: string) => removeItemFromCart(wixSession, itemId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['cart', wixSession] });
    },
  });
  return mutation.mutate;
};

function removeItemFromCart(wixSession: WixSession, itemId: string) {
  return fetch('/api/remove-item-from-cart', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: wixSession.apiKey,
      'wix-site-id': wixSession.siteId,
    },
    method: 'POST',
    body: JSON.stringify({
      itemId,
    }),
  }).then((res) => res.json() as Promise<cart.Cart>);
}
