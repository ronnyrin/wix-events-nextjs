'use client';
import { useContext } from 'react';
import { WixSessionContext } from '@app/components/Provider/WixBookingsClientProvider';
import { WixSession } from '../../src/auth';

export const useClientAuthSession = (): WixSession => {
  return useContext(WixSessionContext);
};
