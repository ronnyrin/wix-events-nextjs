import { createClient, OAuthStrategy } from '@wix/api-client';
import { collections, products } from '@wix/stores';
import { events, checkout } from '@wix/events';
import { currentCart } from '@wix/ecom';

export const getWixClient = async () => {
  const wixClient = createClient({
    modules: { products, collections, currentCart, events, checkout },
    auth: OAuthStrategy({ clientId: 'e345f72c-a4ef-46b6-8b0f-f6b2cd66b78b' }),
  });
  await wixClient.auth.generateVisitorTokens();
  return wixClient;
};
