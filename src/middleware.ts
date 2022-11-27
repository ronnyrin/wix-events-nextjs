import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {createWixVisitorSession} from "./auth";

export async function middleware(request: NextRequest) {
  let wixSession = request.cookies.get("svSession");
  if (wixSession) {
    return NextResponse.next();
  }
  const response = NextResponse.next();
  try {
    wixSession = await createWixVisitorSession();

    response.cookies.set('svSession', wixSession);

  } catch (e) {
    console.error(e);
  }
  return response;
}
