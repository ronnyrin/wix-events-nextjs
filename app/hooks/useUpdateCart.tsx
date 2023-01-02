import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { cart } from '@wix/ecom';
import { WixSession } from '../../src/auth';

export const useUpdateCart = () => {
  const wixSession = useClientAuthSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item: cart.LineItemQuantityUpdate) =>
      updateLineItemQuantity(wixSession, item),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['cart', wixSession] });
    },
  });
  return mutation.mutate;
};

function updateLineItemQuantity(
  wixSession: WixSession,
  item: cart.LineItemQuantityUpdate
) {
  return fetch('/api/update-cart', {
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
