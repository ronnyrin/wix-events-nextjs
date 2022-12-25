export type WixSession = {
  apiKey: string;
  siteId: string;
};

export const createWixVisitorSession = (): WixSession => {
  return {
    apiKey: process.env.API_KEY!,
    siteId: process.env.SITE_ID!,
  };
};
