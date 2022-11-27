import {cookies} from "next/headers";

export const useServerAuthSession = (): string => {
  return cookies().get("svSession")!;
};
