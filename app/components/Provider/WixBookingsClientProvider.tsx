'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, createContext } from 'react';
import { WixSession } from '../../../src/auth';

const queryClient = new QueryClient();

export const WixSessionContext = createContext<WixSession>({
  apiKey: '',
  siteId: '',
});

export const WixBookingsClientProvider = ({
  children,
  wixSession,
}: PropsWithChildren<{ wixSession: WixSession }>) => (
  <WixSessionContext.Provider value={wixSession}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WixSessionContext.Provider>
);
