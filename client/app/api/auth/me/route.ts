import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authUser = req.cookies.get("auth_user");
  const authRole = req.cookies.get("auth_role");

  if (!authUser || !authRole) {
    return NextResponse.json({ success: false });
  }

  try {
    const user = JSON.parse(authUser.value);
    return NextResponse.json({
      success: true,
      user: { ...user, role: authRole.value },
    });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
