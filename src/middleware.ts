import { createClient, publicClientAuth } from "@wix/sdk";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let wixSession = request.cookies.get("wixSession");
  if (wixSession) {
    return NextResponse.next();
  }

  const wixClient = createClient(publicClientAuth({
    // this is a hack for now, using the site url as the client id
    // once there is a proper way to get the client id, we should use that
    clientId: "netanelg4.wixsite.com/my-fitness-site",
  }));

  wixSession = await wixClient.newVisitorSession();

  const response = NextResponse.next();
  response.cookies.set('wixSession', wixSession);

  return response;
}
