import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cart } from '@wix/ecom';
import { useWixClient } from '@app/hooks/useWixClient';
import { WixClient } from '@app/components/Provider/ClientProvider';

export const useUpdateCart = () => {
  const wixClient = useWixClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item: cart.LineItemQuantityUpdate) =>
      updateLineItemQuantity(wixClient, item),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  return mutation.mutate;
};

function updateLineItemQuantity(
  wixClient: WixClient,
  item: cart.LineItemQuantityUpdate
) {
  return wixClient.currentCart.updateCurrentCartLineItemQuantity([item]);
}
