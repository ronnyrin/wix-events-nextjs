'use client';
import { useCart } from '@app/hooks/useCart';
import { usePrice } from '@app/hooks/use-price';
import { Button } from 'flowbite-react';
import { CartItem } from '@app/components/CartItem/CartItem';

export default function Cart() {
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

  const goToCheckout = () => {
    // @ts-ignore
    window.open(data!.url, '_top');
  };

  return (
    <div className="max-w-full-content mx-auto px-14">
      <div className="lg:col-span-7">
        {isLoading || data?.lineItems!.length === 0 ? (
          <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
            <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
              {/*<Bag className="absolute" />*/}
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              Your cart is empty
            </h2>
            <p className="text-accent-6 px-10 text-center pt-2">
              Add products to your cart in <a href="/shop">here</a>
            </p>
          </div>
        ) : (
          <div className="lg:px-0 sm:px-6 flex-1">
            <h1>My Cart</h1>
            <span>Review your Order</span>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-accent-2 border-b">
              {data!.lineItems!.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data?.currency!}
                />
              ))}
            </ul>
            <div className="py-24">
              <div className="border-t">
                <ul className="py-3">
                  <li className="flex justify-between py-1">
                    <span>Subtotal</span>
                    <span>{subTotal}</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-row justify-end">
                <div className="w-full lg:w-72 grid">
                  {data?.lineItems!.length === 0 ? (
                    <Button href="/">Continue Shopping</Button>
                  ) : (
                    <>
                      <Button onClick={goToCheckout}>
                        Proceed to Checkout
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
