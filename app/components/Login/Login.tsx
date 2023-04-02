'use client';
import { useWixClient } from '@app/hooks/useWixClient';
import Cookies from 'js-cookie';

export const Login = () => {
  const wixClient = useWixClient();
  const memberSession = Cookies.get('wixMemberSession');
  const onLoginClick = async () => {
    if (memberSession) {
      Cookies.remove('wixMemberSession');
      const { url } = await wixClient.auth.logout(window.location.href);
      window.location.href = url;
      return;
    }
    const state = await wixClient.auth.generateOauthRedirectState(
      `${window.location.href}callback`
    );
    Cookies.set('oauthState', JSON.stringify(state), {
      expires: 0.1,
    });
    return wixClient.auth.signInWithRedirect(state);
  };
  return (
    <button onClick={onLoginClick} className="flex relative">
      {memberSession ? 'Log Out' : 'Log In'}
    </button>
  );
};
