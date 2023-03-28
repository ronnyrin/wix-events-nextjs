'use client';
import { useWixClient } from '@app/hooks/useWixClient';

export const Login = () => {
  const wixClient = useWixClient();
  const onLoginClick = async () => {
    const state = await wixClient.auth.generateOauthRedirectState(
      `${window.location.href}`
    );
    return wixClient.auth.signInWithRedirect(state);
  };
  return (
    <button onClick={onLoginClick} className="flex relative">
      Login
    </button>
  );
};
