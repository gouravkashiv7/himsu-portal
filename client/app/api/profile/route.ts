import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const authUser = req.cookies.get("auth_user");
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    const { id } = JSON.parse(authUser.value);
    const user = await User.findById(id).populate("college", "name shortName");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const authUser = req.cookies.get("auth_user");
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    const { id } = JSON.parse(authUser.value);
    const body = await req.json();

    // Only allow specific fields to be updated by the user themselves
    const allowedUpdates = [
      "name",
      "phone",
      "image",
      "bloodGroup",
      "isBloodDonor",
      "isCampusVolunteer",
      "location",
      "college",
      "otherCollegeName",
    ];
    const updates: any = {};

    allowedUpdates.forEach((field) => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("college", "name shortName");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
