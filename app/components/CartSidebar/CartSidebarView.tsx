'use client';
import Link from 'next/link';
import { FC } from 'react';
import { usePrice } from '@app/hooks/use-price';
import { CartItem } from '@app/components/CartItem/CartItem';
import { Button } from 'flowbite-react';
import { SidebarLayout } from '@app/components/Sidebar/SidebarLayout';
import { useCart } from '@app/hooks/useCart';
import { useUI } from '../Provider/context';

export const CartSidebarView: FC = () => {
  const { closeSidebar } = useUI();
  const { data, isLoading } = useCart();
  const subTotal = usePrice(
    data && {
      // @ts-ignore
      amount: Number(data.subtotal!.amount!),
      currencyCode: data.currency!,
    }
  );
  const total = usePrice(
    data && {
      // @ts-ignore
      amount: Number(data.subtotal!.amount!),
      currencyCode: data.currency!,
    }
  );
  const handleClose = () => closeSidebar();
  const goToCheckout = () => {
    closeSidebar();
    window.open(
      `https://ronnyr34.wixsite.com/my-site-178/checkout?appSectionParams={"checkoutId":"${
        data!.checkoutId
      }", "successUrl": "https://localhost:3000/stores-success"}`,
      '_top'
    );
  };

  return (
    <SidebarLayout handleClose={handleClose}>
      {!isLoading && data?.lineItems!.length === 0 ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 text-secondary">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/cart">
              <span className="font-bold text-2xl">My Cart</span>
            </Link>
            <ul className="py-4 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-accent-2">
              {data!.lineItems!.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  currencyCode={data!.currency!}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-blue-800 border-t text-sm">
            <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
            </ul>
            <div>
              <Button onClick={goToCheckout}>Proceed to Checkout</Button>
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};
