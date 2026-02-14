import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import College from "@/lib/models/College";

/**
 * Endpoint for unverified users to request upgrade to member status
 * Verified by superadmin or college president
 */
export async function POST(req: NextRequest) {
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
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (user.role !== "unverified") {
      return NextResponse.json(
        {
          success: false,
          message: "Account already verified or status is not unverified",
        },
        { status: 400 },
      );
    }

    // Check if user belongs to a college
    if (!user.college) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please associate with a college before requesting verification",
        },
        { status: 400 },
      );
    }

    // This is essentially just a visual "request" right now that notifies admins
    // In a full implementation, we might send an email or create a notification object
    // For now, we'll clear any previous rejection reason to indicate a new attempt
    user.rejectionReason = "";
    await user.save();

    return NextResponse.json({
      success: true,
      message:
        "Verification request submitted successfully. Your college president or HIMSU admin will review it soon.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
