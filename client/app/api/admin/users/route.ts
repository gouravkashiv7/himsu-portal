import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";

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

    const authUser = JSON.parse(authUserCookie.value);
    const authRole = authRoleCookie.value;

    let query: any = {
      role: {
        $in: ["member", "president", "unverified"],
      },
    };

    // If president, filter by their college
    if (authRole === "president") {
      if (!authUser.college) {
        return NextResponse.json({ success: true, data: [] });
      }
      query.college = authUser.college;
    }

    const users = await User.find(query)
      .populate("college", "name shortName")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
