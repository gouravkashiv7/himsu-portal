import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth/next";
// Assuming you have an auth options file, adjust path as needed
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const { role, rejectionReason } = await req.json();

    console.log(
      `Updating user ${id} to role ${role}, reason: ${rejectionReason}`,
    );

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (role) userToUpdate.role = role;
    if (rejectionReason !== undefined)
      userToUpdate.rejectionReason = rejectionReason;

    await userToUpdate.save();

    return NextResponse.json({ success: true, data: userToUpdate });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;

    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Protection for critical roles
    if (userToDelete.role === "superadmin") {
      return NextResponse.json(
        { success: false, message: "Cannot delete superadmin accounts" },
        { status: 403 },
      );
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "User account deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
