import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Fetch verified members who opted to be blood donors
    // We only show members and presidents (verified roles)
    const donors = await User.find({
      isBloodDonor: true,
      role: { $in: ["member", "president"] },
    })
      .select("name bloodGroup college location phone image")
      .populate("college", "name shortName")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: donors,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
