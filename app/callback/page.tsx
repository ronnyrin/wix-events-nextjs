'use client';
import Cookies from 'js-cookie';
import { useWixClient } from '@app/hooks/useWixClient';
import { useEffect } from 'react';
import { OauthRedirectState } from '@wix/api-client';
import { OAUTH_COOKIE_STATE, WIX_MEMBER_TOKEN } from '@app/constants';

const Callback = () => {
  const wixClient = useWixClient();

  useEffect(() => {
    const state = Cookies.get(OAUTH_COOKIE_STATE);
    const oAuthState: OauthRedirectState = JSON.parse(state!);

    if (window.location.search.includes('error=')) {
      window.location.href = oAuthState.origin;
      return;
    }

    wixClient.auth.getMemberTokens(oAuthState).then((tokens) => {
      Cookies.remove(OAUTH_COOKIE_STATE);
      Cookies.set(WIX_MEMBER_TOKEN, JSON.stringify(tokens.refreshToken), {
        expires: 2,
      });
      window.location.href = oAuthState.origin;
    });
  }, []);
};

export default Callback;
