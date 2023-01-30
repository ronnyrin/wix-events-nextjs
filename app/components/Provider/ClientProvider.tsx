'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, ReactNode } from 'react';
import { ManagedUIContext } from '@app/components/Provider/context';
import { createClient, OAuthStrategy } from '@wix/api-client';
import { collections, products } from '@wix/stores';
import { currentCart } from '@wix/ecom';
import { events, checkout } from '@wix/events';

const queryClient = new QueryClient();

const wixClient = createClient({
  modules: { products, collections, currentCart, events, checkout },
  auth: OAuthStrategy({ clientId: 'e345f72c-a4ef-46b6-8b0f-f6b2cd66b78b' }),
});

export type WixClient = typeof wixClient;

export const WixClientContext = createContext<typeof wixClient>(wixClient);

export const ClientProvider = ({ children }: { children: ReactNode }) => (
  <WixClientContext.Provider value={wixClient}>
    <ManagedUIContext>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ManagedUIContext>
  </WixClientContext.Provider>
);
