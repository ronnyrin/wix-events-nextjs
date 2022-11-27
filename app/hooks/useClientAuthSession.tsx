'use client'
import {useContext} from "react";
import {WixSessionContext} from "@app/components/Provider/WixBookingsClientProvider";

export const useClientAuthSession = (): string => {
  const {wixSession} = useContext(WixSessionContext);
  return wixSession;
};
