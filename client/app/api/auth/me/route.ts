import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import College from "@/lib/models/College";

export async function GET(req: NextRequest) {
  const authUser = req.cookies.get("auth_user");
  const authRole = req.cookies.get("auth_role");

  if (!authUser) {
    return NextResponse.json({ success: false });
  }

  try {
    await dbConnect();

    // Decode cookie to get user ID
    const rawValue = authUser.value;
    let jsonString = rawValue;
    try {
      jsonString = decodeURIComponent(rawValue);
    } catch (e) {
      jsonString = rawValue;
    }

    const cookieData = JSON.parse(jsonString);
    const userId = cookieData.id;

    if (!userId) {
      return NextResponse.json({ success: false });
    }

    // Fetch fresh user data from DB
    const user = await User.findById(userId).populate(
      "college",
      "name shortName",
    );

    if (!user) {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          college: user.college,
          rejectionReason: user.rejectionReason,
          isCampusVolunteer: user.isCampusVolunteer,
          location: user.location,
          isBloodDonor: user.isBloodDonor,
          bloodGroup: user.bloodGroup,
          phone: user.phone,
          createdAt: user.createdAt,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (e) {
    console.error("Auth Me Error:", e);
    return NextResponse.json(
      { success: false },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  }
}
