import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Event from "@/lib/models/Event";
import User from "@/lib/models/User";

// POST: Add Comment (Authenticated Users Only)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await dbConnect();

    // Get current user from cookie
    const authUserCookie = req.cookies.get("auth_user");
    if (!authUserCookie) {
      return NextResponse.json(
        { success: false, message: "Login required to comment." },
        { status: 401 },
      );
    }

    let userId = null;
    try {
      const userData = JSON.parse(authUserCookie.value);
      userId = userData._id || userData.id;
    } catch (e) {
      return NextResponse.json(
        { success: false, message: "Invalid session." },
        { status: 401 },
      );
    }

    const { text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json(
        { success: false, message: "Comment text cannot be empty." },
        { status: 400 },
      );
    }

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 },
      );
    }

    // Add comment sub-document
    event.comments.push({
      user: userId,
      text: text.trim(),
    });

    await event.save();

    // Populate the newly added comment for immediate UI update if needed
    const updatedEvent = await Event.findById(id).populate({
      path: "comments.user",
      select: "name image",
    });

    return NextResponse.json({
      success: true,
      data: updatedEvent.comments[updatedEvent.comments.length - 1],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
