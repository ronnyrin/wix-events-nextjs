'use client';
import { useWixClient } from '@app/hooks/useWixClient';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

const LoginComp = () => {
  const wixClient = useWixClient();
  const memberSession = Cookies.get('wixMemberSession');
  const isLoggedIn = JSON.parse(memberSession || '{}').value;
  const onLoginClick = async () => {
    if (isLoggedIn) {
      Cookies.remove('wixMemberSession');
      const { url } = await wixClient.auth.logout(window.location.href);
      window.location.href = url;
      return;
    }
    const state = wixClient.auth.generateOauthRedirectState(
      `${window.location.href}callback`,
      window.location.href
    );
    Cookies.set('oauthState', JSON.stringify(state), {
      expires: 0.1,
    });
    return wixClient.auth.signInWithRedirect(state);
  };
  return (
    <button onClick={onLoginClick} className="flex relative">
      {isLoggedIn ? 'Log Out' : 'Log In'}
    </button>
  );
};

export const Login = dynamic(() => Promise.resolve(LoginComp), {
  ssr: false,
});
