import { createClient, OAuthStrategy } from '@wix/api-client';
import { collections, products } from '@wix/stores';
import { orders } from '@wix/ecom';
import {
  wixEvents,
  checkout,
  schedule,
  orders as eventOrders,
} from '@wix/events';

export const getWixClient = async () => {
  const wixClient = createClient({
    modules: {
      products,
      collections,
      wixEvents,
      checkout,
      schedule,
      orders,
      eventOrders,
    },
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });
  return wixClient;
};
