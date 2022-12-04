import { createClient, publicClientAuth } from '@wix/sdk';

export const createWixVisitorSession = () => {
  console.log('*** client id is ', process.env.BOOKINGS_CLIENT_ID);
  const wixClient = createClient(
    publicClientAuth({
      // this is a hack for now, using the site url as the client id
      // once there is a proper way to get the client id, we should use that
      clientId: process.env.BOOKINGS_CLIENT_ID!,
    })
  );

  return wixClient.newVisitorSession();
};
