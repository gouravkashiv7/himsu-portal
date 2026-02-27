import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Event from "@/lib/models/Event";
import User from "@/lib/models/User";

// Helper for admin verification
async function verifyAdmin(req: NextRequest) {
  const authUserCookie = req.cookies.get("auth_user");
  if (!authUserCookie) return null;
  try {
    const userData = JSON.parse(authUserCookie.value);
    const user = await User.findById(userData._id || userData.id);
    if (user && (user.role === "superadmin" || user.role === "president")) {
      return user._id;
    }
  } catch (e) {
    console.error("Auth verification error:", e);
  }
  return null;
}

// PUT: Update Event (Admin Only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    await dbConnect();
    const adminId = await verifyAdmin(req);

    if (!adminId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const event = await Event.findByIdAndUpdate(id, body, { new: true });

    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: event });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// DELETE: Remove Event (Admin Only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    await dbConnect();
    const adminId = await verifyAdmin(req);

    if (!adminId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 403 },
      );
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
