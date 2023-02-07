import { CartItem } from '@app/components/CartItem/CartItem';
import { getWixClient } from '@app/hooks/useWixClientServer';

export default async function Success({ searchParams }: any) {
  return <div>test</div>;
  // const wixClient = await getWixClient();
  //
  // if (!searchParams.orderId) {
  //   return;
  // }
  //
  // const data = await wixClient.orders.getOrder(searchParams.orderId);
  // return (
  //   data && (
  //     <div className="max-w-full-content mx-auto px-14">
  //       <h2>
  //         Thank you for purchasing {data.billingInfo!.contactDetails!.firstName}{' '}
  //         {data.billingInfo!.contactDetails!.lastName}
  //       </h2>
  //       <div className="flex-1 p-24 flex flex-col justify-center items-center">
  //         You just bought:
  //         <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-b">
  //           {data.lineItems!.map((item: any) => (
  //             <CartItem
  //               hideButtons={true}
  //               key={item.id}
  //               item={item}
  //               currencyCode={data.currency!}
  //             />
  //           ))}
  //         </ul>
  //         <br />
  //         We will ship to{' '}
  //         {
  //           data.shippingInfo!.logistics!.shippingDestination!.address!
  //             .addressLine1
  //         }
  //         , {data.shippingInfo!.logistics!.shippingDestination!.address!.city},{' '}
  //         {
  //           data.shippingInfo!.logistics!.shippingDestination!.address!
  //             .subdivision
  //         }
  //         ,{' '}
  //         {data.shippingInfo!.logistics!.shippingDestination!.address!.country}
  //       </div>
  //     </div>
  //   )
  // );
}
