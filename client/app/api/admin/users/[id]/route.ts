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
    const authUserCookie = req.cookies.get("auth_user");
    const authRoleCookie = req.cookies.get("auth_role");

    if (!authUserCookie || !authRoleCookie) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    let jsonString = authUserCookie.value;
    try {
      jsonString = decodeURIComponent(authUserCookie.value);
    } catch (e) {
      jsonString = authUserCookie.value;
    }
    const authUser = JSON.parse(jsonString);
    const authRole = authRoleCookie.value;

    if (authRole !== "superadmin" && authRole !== "president") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const { role, rejectionReason } = body;

    const userToUpdate = await User.findById(id).populate("college");
    if (!userToUpdate) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Role-based scope protection
    if (authRole === "president") {
      const managingUser = await User.findById(authUser.id);
      if (
        !managingUser?.college ||
        userToUpdate.college?._id?.toString() !==
          managingUser.college.toString()
      ) {
        return NextResponse.json(
          { success: false, message: "Forbidden: Outside jurisdiction" },
          { status: 403 },
        );
      }
      if (
        userToUpdate.role === "superadmin" ||
        userToUpdate.role === "president"
      ) {
        return NextResponse.json(
          { success: false, message: "Cannot modify this user" },
          { status: 403 },
        );
      }
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
    const authUserCookie = req.cookies.get("auth_user");
    const authRoleCookie = req.cookies.get("auth_role");

    if (!authUserCookie || !authRoleCookie) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    let jsonString = authUserCookie.value;
    try {
      jsonString = decodeURIComponent(authUserCookie.value);
    } catch (e) {
      jsonString = authUserCookie.value;
    }
    const authUser = JSON.parse(jsonString);
    const authRole = authRoleCookie.value;

    if (authRole !== "superadmin" && authRole !== "president") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    await dbConnect();
    const { id } = await params;

    const userToDelete = await User.findById(id).populate("college");
    if (!userToDelete) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Role-based scope protection
    if (authRole === "president") {
      const managingUser = await User.findById(authUser.id);
      if (
        !managingUser?.college ||
        userToDelete.college?._id?.toString() !==
          managingUser.college.toString()
      ) {
        return NextResponse.json(
          { success: false, message: "Forbidden: Outside jurisdiction" },
          { status: 403 },
        );
      }
      if (
        userToDelete.role === "superadmin" ||
        userToDelete.role === "president"
      ) {
        return NextResponse.json(
          { success: false, message: "Cannot modify this user" },
          { status: 403 },
        );
      }
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
