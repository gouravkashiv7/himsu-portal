import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import College from "@/lib/models/College";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const authUserCookie = req.cookies.get("auth_user");
    const authRoleCookie = req.cookies.get("auth_role");

    if (!authUserCookie || !authRoleCookie) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    let jsonString = authUserCookie.value;
    try {
      jsonString = decodeURIComponent(authUserCookie.value);
    } catch (e) {
      jsonString = authUserCookie.value;
    }
    const authUser = JSON.parse(jsonString);
    const authRole = authRoleCookie.value;

    if (authRole !== "superadmin" && authRole !== "president") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Access denied" },
        { status: 403 },
      );
    }

    let query: any = {};
    if (authRole === "president") {
      // Fetch fresh user data to get the college ID reliably
      const User = (await import("@/lib/models/User")).default;
      const freshUser = await User.findById(authUser.id);

      if (!freshUser || !freshUser.college) {
        return NextResponse.json({ success: true, data: [] });
      }
      query._id = freshUser.college;
    }

    const colleges = await College.find(query).populate(
      "president",
      "name email",
    );
    return NextResponse.json({ success: true, data: colleges });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const college = await College.create(body);
    return NextResponse.json({ success: true, data: college }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
