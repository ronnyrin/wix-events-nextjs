'use client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {PropsWithChildren, createContext} from 'react';

const queryClient = new QueryClient();

export const WixSessionContext = createContext<{ wixSession: string }>({wixSession: ''});

export const WixBookingsClientProvider = ({children, wixSession}: PropsWithChildren<{ wixSession: string }>) =>
  <WixSessionContext.Provider value={{wixSession}}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WixSessionContext.Provider>;
