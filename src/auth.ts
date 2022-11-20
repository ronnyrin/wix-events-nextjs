import {createClient, publicClientAuth} from "@wix/sdk";

export const createWixVisitorSession = () => {
  const wixClient = createClient(publicClientAuth({
    // this is a hack for now, using the site url as the client id
    // once there is a proper way to get the client id, we should use that
    clientId: "netanelg4.wixsite.com/my-fitness-site-2",
  }));

  return wixClient.newVisitorSession();
}
