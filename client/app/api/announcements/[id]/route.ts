import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Announcement from "@/lib/models/Announcement";

// DELETE: Remove or deactivate an announcement
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // Correct typing for route params
) {
  try {
    await dbConnect();
    const { id } = await params; // Await params in newer Next.js

    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return NextResponse.json(
        { success: false, message: "Announcement not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
