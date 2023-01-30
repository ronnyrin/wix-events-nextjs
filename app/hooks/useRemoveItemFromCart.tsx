import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWixClient } from '@app/hooks/useWixClient';
import { WixClient } from '@app/components/Provider/ClientProvider';

export const useRemoveItemFromCart = () => {
  const wixClient = useWixClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (itemId: string) => removeItemFromCart(wixClient, itemId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  return mutation.mutate;
};

function removeItemFromCart(wixClient: WixClient, itemId: string) {
  return wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
}
