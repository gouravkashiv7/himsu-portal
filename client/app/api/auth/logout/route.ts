import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.set("auth_user", "", { path: "/", maxAge: 0 });
  response.cookies.set("auth_role", "", { path: "/", maxAge: 0 });
  return response;
}
