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

    let query: any = {
      role: {
        $in: ["member", "president", "unverified"],
      },
    };

    // If president, filter by their college
    // If president, filter by their college
    if (authRole === "president") {
      const freshUser = await User.findById(authUser.id);
      if (!freshUser || !freshUser.college) {
        return NextResponse.json({ success: true, data: [] });
      }
      query.college = freshUser.college;
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
