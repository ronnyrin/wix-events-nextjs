export type WixSession = {
  apiKey: string;
  siteId: string;
};

export const createWixVisitorSession = (): WixSession => {
  return {
    apiKey: process.env.BOOKINGS_API_KEY!,
    siteId: process.env.BOOKINGS_SITE_ID!,
  };
};
