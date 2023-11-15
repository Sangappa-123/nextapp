import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone();
  if (req.nextUrl.pathname == "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
