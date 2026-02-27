import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Event from "@/lib/models/Event";
import User from "@/lib/models/User";
import College from "@/lib/models/College";

// GET: Fetch All Events
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const events = await Event.find({ isActive: true })
      .sort({ eventDate: -1 })
      .populate({ path: "author", select: "name image" })
      .populate({ path: "collegesInvolved", select: "name logo shortName" })
      .populate({ path: "comments.user", select: "name image" });

    return NextResponse.json({ success: true, data: events });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// POST: Create Event (Admin Only)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Get current user from cookie (as seen in existing patterns)
    const authUserCookie = req.cookies.get("auth_user");
    let authorId = null;
    let isAdmin = false;

    if (authUserCookie) {
      try {
        const userData = JSON.parse(authUserCookie.value);
        const user = await User.findById(userData._id || userData.id);
        if (user && (user.role === "superadmin" || user.role === "president")) {
          authorId = user._id;
          isAdmin = true;
        }
      } catch (e) {
        console.error("Error verifying admin:", e);
      }
    }

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 403 },
      );
    }

    const {
      title,
      description,
      images,
      eventDate,
      eventTime,
      duration,
      location,
      collegesInvolved,
    } = body;

    if (!title || !eventDate) {
      return NextResponse.json(
        { success: false, message: "Title and Event Date are required." },
        { status: 400 },
      );
    }

    const event = await Event.create({
      title,
      description,
      images: images || [],
      eventDate,
      eventTime,
      duration,
      location,
      collegesInvolved: collegesInvolved || [],
      author: authorId,
    });

    return NextResponse.json({ success: true, data: event });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
