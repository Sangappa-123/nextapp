import { sessionStatus } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

const protectedRouts = ["/help"];

export default function middleware(req:NextRequest) {
  if(!sessionStatus && protectedRouts.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString())
  }
}