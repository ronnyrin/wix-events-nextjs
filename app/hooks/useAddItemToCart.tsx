import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cart } from '@wix/ecom';
import { useWixClient } from '@app/hooks/useWixClient';
import { WixClient } from '@app/components/Provider/ClientProvider';

export const useAddItemToCart = () => {
  const wixClient = useWixClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item: cart.LineItem) => removeItemFromCart(wixClient, item),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  return mutation.mutate;
};

function removeItemFromCart(wixClient: WixClient, item: cart.LineItem) {
  return wixClient.currentCart.addToCurrentCart({ lineItems: [item] });
}
