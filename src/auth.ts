export type WixSession = {
  apiKey: string;
  apiKeyForStores: string;
  siteId: string;
};

export const createWixVisitorSession = (): WixSession => {
  return {
    apiKey: process.env.API_KEY!,
    apiKeyForStores:
      'pZojI2bTbLmXsI2Hd1Y0rB3d2HICmFRApTmZ8d-MGJE.eyJpbnN0YW5jZUlkIjoiMDVjMWNlMmMtZjBjZi00N2RkLWFkYmYtY2I4NmM0MjRjYzg0IiwiYXBwRGVmSWQiOiIxMzgwYjcwMy1jZTgxLWZmMDUtZjExNS0zOTU3MWQ5NGRmY2QiLCJtZXRhU2l0ZUlkIjoiZWQwZmMyOGYtOThhOC00M2EzLTk4YTQtYWNlMDQ0OTY2YWVlIiwic2lnbkRhdGUiOiIyMDIzLTAxLTAzVDExOjI2OjMzLjM2NloiLCJ2ZW5kb3JQcm9kdWN0SWQiOiJzdG9yZXNfZ29sZCIsImRlbW9Nb2RlIjpmYWxzZSwiYWlkIjoiYTZkOTc4MTktODgxYi00Mzc2LTlhY2YtOWNlMTA2MWU0ZGI2IiwiYmlUb2tlbiI6ImU4Y2UwY2EzLTY4NjctMDQ3ZS0zNTFiLTY3NjY4MGIyYTY2YSIsInNpdGVPd25lcklkIjoiZTc2ZDcxNDQtNDI5My00ZWFmLWE4ZDktMDBjMjg5ZjQ3YjViIn0',
    siteId: process.env.SITE_ID!,
  };
};
