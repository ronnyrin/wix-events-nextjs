import { createWixVisitorSession, WixSession } from '../../src/auth';

export const useServerAuthSession = (): WixSession => {
  return createWixVisitorSession();
};
