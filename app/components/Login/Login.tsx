'use client';
import { useWixClient } from '@app/hooks/useWixClient';
import Cookies from 'js-cookie';

export const Login = () => {
  const wixClient = useWixClient();
  const onLoginClick = async () => {
    const state = await wixClient.auth.generateOauthRedirectState(
      `${window.location.href}callback`
    );
    Cookies.set('oauthState', JSON.stringify(state), {
      expires: 1,
    });
    return wixClient.auth.signInWithRedirect(state);
  };
  return (
    <button onClick={onLoginClick} className="flex relative">
      Login
    </button>
  );
};
