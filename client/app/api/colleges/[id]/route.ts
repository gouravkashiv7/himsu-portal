import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import College from "@/lib/models/College";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    const { id } = await params;
    const body = await req.json();

    // In a real app, middleware would check for authentication and roles.
    // For now, we assume anyone who can hit this can edit.

    const college = await College.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!college) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: college });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    const { id } = await params;
    const college = await College.findById(id).populate(
      "president",
      "name email",
    );

    if (!college) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: college });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}
