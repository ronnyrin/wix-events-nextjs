'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, ReactNode, useEffect } from 'react';
import { ManagedUIContext } from '@app/components/Provider/context';
import { createClient, OAuthStrategy } from '@wix/api-client';
import { collections, products } from '@wix/stores';
import { currentCart } from '@wix/ecom';
import { events, checkout } from '@wix/events';
// @ts-ignore
import Cookies from 'js-cookie';
import { WIX_REFRESH_TOKEN } from '../../../src/constants';
const queryClient = new QueryClient();

const wixClient = createClient({
  modules: { products, collections, currentCart, events, checkout },
  auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
});

const refreshToken = Cookies.get(WIX_REFRESH_TOKEN);
wixClient.auth.setTokens({ refreshToken, accessToken: '' });

export type WixClient = typeof wixClient;

export const WixClientContext = createContext<WixClient>(wixClient);

export const ClientProvider = ({ children }: { children: ReactNode }) => (
  <WixClientContext.Provider value={wixClient}>
    <ManagedUIContext>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ManagedUIContext>
  </WixClientContext.Provider>
);
