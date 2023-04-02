'use client';
import Cookies from 'js-cookie';
import { useWixClient } from '@app/hooks/useWixClient';
import { useEffect } from 'react';

const Callback = () => {
  const wixClient = useWixClient();

  useEffect(() => {
    const state = Cookies.get('oauthState');
    const oAuthState = JSON.parse(state!);

    wixClient.auth
      .getMemberTokens(window.location.hash, oAuthState)
      .then((tokens) => {
        Cookies.set('wixMemberSession', JSON.stringify(tokens.refreshToken), {
          expires: 2,
        });
        // Cookies.remove('oauthState');
        window.location.href = 'https://wix-events-nextjs.vercel.app/';
      });
  }, []);
};

export default Callback;
