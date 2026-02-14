import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Announcement from "@/lib/models/Announcement";
import User from "@/lib/models/User"; // Ensure User model is registered for populate

// GET: Fetch Active Announcements
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    // Ensure User model is loaded
    if (!mongoose.models.User) {
      console.log("User model not loaded, forcing load...");
      // This strict dependency ensures it's registered
      const _u = User;
    }

    let announcements;
    try {
      announcements = await Announcement.find({ isActive: true })
        .sort({ createdAt: -1 })
        .populate({ path: "author", model: User, select: "name" });
    } catch (populateError) {
      console.error("Populate failed, fetching without author:", populateError);
      // Fallback: fetch without populate
      announcements = await Announcement.find({ isActive: true }).sort({
        createdAt: -1,
      });
    }

    return NextResponse.json({ success: true, data: announcements });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// POST: Create Announcement (Basic validation)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { text, link } = await req.json();

    // Get current user from cookie
    const authUserCookie = req.cookies.get("auth_user");
    let authorId = null;
    if (authUserCookie) {
      try {
        const userData = JSON.parse(authUserCookie.value);
        const userId = userData._id || userData.id;
        // Verify user exists
        const user = await User.findById(userId);
        if (user) {
          authorId = user._id;
        }
      } catch (e) {
        console.error("Error parsing auth cookie or finding user:", e);
      }
    }

    if (!text) {
      return NextResponse.json(
        { success: false, message: "Announcement text is required" },
        { status: 400 },
      );
    }

    const announcement = await Announcement.create({
      text,
      link,
      author: authorId,
    });

    return NextResponse.json({ success: true, data: announcement });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
