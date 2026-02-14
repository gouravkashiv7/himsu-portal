import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Announcement from "@/lib/models/Announcement";

// GET: Fetch Active Announcements
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const announcements = await Announcement.find({ isActive: true }).sort({
      priority: -1,
      createdAt: -1,
    });
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

    if (!text) {
      return NextResponse.json(
        { success: false, message: "Announcement text is required" },
        { status: 400 },
      );
    }

    const announcement = await Announcement.create({ text, link });

    return NextResponse.json({ success: true, data: announcement });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
