import { createClient, publicClientAuth } from "@wix/sdk";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let wixSession = request.cookies.get("wixSession");
  if (wixSession) {
    return NextResponse.next();
  }
  const response = NextResponse.next();
  try {
    const wixClient = createClient(publicClientAuth({
      // this is a hack for now, using the site url as the client id
      // once there is a proper way to get the client id, we should use that
      clientId: "netanelg4.wixsite.com/my-fitness-site-2",
    }));

    console.log('*** dawdada');
    wixSession = await wixClient.newVisitorSession();

    response.cookies.set('wixSession', wixSession);

  } catch (e) {
    console.error(e);
  }
  return response;
}
