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
  currencyCode,
  ...rest
}: {
  item: cart.LineItem;
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

  useEffect(() => {
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity]);

  const slug = item.url?.split('/').pop() ?? '';

  return (
    <li className="flex flex-col py-4" {...rest}>
      <div className="flex flex-row gap-4 py-4">
        <div className="w-20 h-20 bg-violet relative overflow-hidden cursor-pointer z-0">
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
        <div className="flex-1">
          <div className="flex-1 flex flex-col text-base">
            <Link href={`/product-page/${slug}`}>
              <span className="cursor-pointer pb-1 text-gray-500">
                {item.productName?.translated}
              </span>
            </Link>
          </div>
          <span>{price}</span>
          <div className="mt-2">
            <Quantity
              size="sm"
              value={quantity}
              handleChange={handleChange}
              increase={() => increaseQuantity(1)}
              decrease={() => increaseQuantity(-1)}
            />
          </div>
        </div>
        <button className="flex" onClick={() => handleRemove()}>
          <svg
            fill="none"
            className="w-4 h-4"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </li>
  );
};
