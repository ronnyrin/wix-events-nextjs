'use client';
import Cookies from 'js-cookie';
import { useWixClient } from '@app/hooks/useWixClient';
import { useEffect } from 'react';
import { OauthRedirectState } from '@wix/api-client';

const Callback = () => {
  const wixClient = useWixClient();

  useEffect(() => {
    const state = Cookies.get('oauthState');
    const oAuthState: OauthRedirectState = JSON.parse(state!);

    if (window.location.search.includes('error=')) {
      window.location.href = oAuthState.origin;
      return;
    }

    wixClient.auth.getMemberTokens(oAuthState).then((tokens) => {
      Cookies.set('wixMemberSession', JSON.stringify(tokens.refreshToken), {
        expires: 2,
      });
      Cookies.remove('oauthState');
      window.location.href = oAuthState.origin;
    });
  }, []);
};

export default Callback;
