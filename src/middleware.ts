import { NextRequest, NextResponse } from 'next/server';
import { createClient, OAuthStrategy } from '@wix/api-client';
import { collections, products } from '@wix/stores';
import { checkout, events, schedule } from '@wix/events';
import { orders } from '@wix/ecom';
import { WIX_REFRESH_TOKEN } from './constants';

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  if (cookies.get(WIX_REFRESH_TOKEN)) {
    return NextResponse.next();
  }
  const res = NextResponse.next();
  const wixClient = createClient({
    modules: { products, collections, events, checkout, schedule, orders },
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });
  const tokens = await wixClient.auth.generateVisitorTokens();
  res.cookies.set(WIX_REFRESH_TOKEN, tokens.refreshToken, {
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export const config = {};