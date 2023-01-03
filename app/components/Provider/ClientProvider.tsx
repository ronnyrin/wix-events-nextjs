'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, createContext } from 'react';
import { WixSession } from '../../../src/auth';
import { ManagedUIContext } from '@app/components/Provider/context';

const queryClient = new QueryClient();

export const WixSessionContext = createContext<WixSession>({
  apiKey: '',
  apiKeyForStores: '',
  siteId: '',
});

export const ClientProvider = ({
  children,
  wixSession,
}: PropsWithChildren<{ wixSession: WixSession }>) => (
  <WixSessionContext.Provider value={wixSession}>
    <ManagedUIContext>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ManagedUIContext>
  </WixSessionContext.Provider>
);
