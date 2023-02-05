import { createClient, OAuthStrategy } from '@wix/api-client';
import { collections, products } from '@wix/stores';
import { events, checkout, schedule } from '@wix/events';

export const getWixClient = async () => {
  const wixClient = createClient({
    modules: { products, collections, events, checkout, schedule },
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });
  await wixClient.auth.generateVisitorTokens();
  return wixClient;
};
