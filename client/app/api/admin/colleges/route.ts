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

    const authUser = JSON.parse(authUserCookie.value);
    const authRole = authRoleCookie.value;

    let query: any = {};
    if (authRole === "president") {
      if (!authUser.college) {
        return NextResponse.json({ success: true, data: [] });
      }
      query._id = authUser.college;
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
