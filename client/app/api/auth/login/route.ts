import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 },
      );
    }

    // In a real app, use JWT and secure cookies.
    // For this demonstration, we'll return the role and rely on client-side state
    // But to make it slightly persistent, we can set a cookie.

    const response = NextResponse.json({
      success: true,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        college: user.college,
        rejectionReason: user.rejectionReason,
      },
    });

    response.cookies.set("auth_role", user.role, {
      httpOnly: false, // Allow client to read for simple routing
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    response.cookies.set(
      "auth_user",
      JSON.stringify({
        id: user._id,
        name: user.name,
        image: user.image,
        college: user.college,
        rejectionReason: user.rejectionReason,
      }),
      {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7,
      },
    );

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
