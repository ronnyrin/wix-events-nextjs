import { createClient, publicClientAuth } from '@wix/sdk';

export const createWixVisitorSession = () => {
  const wixClient = createClient(
    publicClientAuth({
      // this is a hack for now, using the site url as the client id
      // once there is a proper way to get the client id, we should use that
      clientId: 'carmelc6.wixsite.com/mysite-11',
    })
  );

  return wixClient.newVisitorSession();
};
