'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePrice } from '@app/hooks/use-price';
import { cart } from '@wix/ecom';
import { media } from '@wix/api-client';
import { useUI } from '@app/components/Provider/context';
import { Quantity } from '@app/components/Quantity/Quantity';
import { useUpdateCart } from '@app/hooks/useUpdateCart';
import { useRemoveItemFromCart } from '@app/hooks/useRemoveItemFromCart';

export const CartItem = ({
  item,
  variant = 'default',
  currencyCode,
  hideButtons = false,
  ...rest
}: {
  variant?: 'default' | 'display';
  item: cart.LineItem;
  hideButtons?: boolean;
  currencyCode: string;
}) => {
  const { closeSidebarIfPresent } = useUI();
  const [removing, setRemoving] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity ?? 1);
  const removeItem = useRemoveItemFromCart();
  const updateCartMutation = useUpdateCart();

  const price = usePrice({
    amount: Number.parseFloat(item.price?.amount!) * item.quantity!,
    baseAmount: Number.parseFloat(item.price?.amount!) * item.quantity!,
    currencyCode,
  });

  const handleChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value));
    await updateCartMutation({ quantity: Number(value), _id: item._id! });
  };

  const increaseQuantity = async (n = 1) => {
    const val = Number(quantity) + n;
    setQuantity(val);
    await updateCartMutation({ quantity: val, _id: item._id! });
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removeItem(item._id!);
    } catch (error) {
      setRemoving(false);
    }
  };

  const options = Object.entries(item.catalogReference?.options?.options).map(
    ([name, value]) => ({ name, value } as { name: string; value: string })
  );

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity]);

  const slug = item.url?.split('/').pop() ?? '';

  return (
    <li className="flex flex-col py-4" {...rest}>
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer z-0">
          <Link href={`/product-page/${slug}`}>
            <Image
              onClick={() => closeSidebarIfPresent()}
              className="absolute w-full h-full"
              width={150}
              height={150}
              src={media.getImageUrl(item.image!).url}
              alt="Product Image"
              unoptimized
            />
          </Link>
        </div>
        <div className="flex-1 flex flex-col text-base">
          <Link href={`/product-page/${slug}`}>
            <span
              className="font-medium cursor-pointer pb-1"
              onClick={() => closeSidebarIfPresent()}
            >
              {item.productName?.translated}
            </span>
          </Link>
          {options && options.length > 0 && (
            <div className="flex items-center pb-1">
              {options.map(
                (option: { name: string; value: string }, i: number) => (
                  <div
                    key={`${item._id}-${option.name}`}
                    className="text-sm font-semibold text-accent-7 inline-flex items-center justify-center"
                  >
                    {option.name}
                    {option.name === 'Color' ? (
                      <span
                        className="mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
                        style={{
                          backgroundColor: `${option.value}`,
                        }}
                      ></span>
                    ) : (
                      <span className="mx-2 rounded-full bg-transparent border h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden">
                        {option.value}
                      </span>
                    )}
                    {i === options.length - 1 ? '' : <span className="mr-3" />}
                  </div>
                )
              )}
            </div>
          )}
          {variant === 'display' && (
            <div className="text-sm tracking-wider">{quantity}x</div>
          )}
        </div>
        <div className="flex flex-col justify-between space-y-2 text-sm">
          <span>{price}</span>
        </div>
      </div>
      {variant === 'default' && !hideButtons && (
        <Quantity
          value={quantity}
          handleRemove={handleRemove}
          handleChange={handleChange}
          increase={() => increaseQuantity(1)}
          decrease={() => increaseQuantity(-1)}
        />
      )}
    </li>
  );
};
