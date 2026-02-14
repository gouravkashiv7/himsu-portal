import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Normalize email for lookup
    const normalizedEmail = email.toLowerCase().trim();

    // Case-insensitive search to handle any legacy mixed-case emails
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") },
    });

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

    const response = NextResponse.json({
      success: true,
      role: user.role,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        college: user.college,
        rejectionReason: user.rejectionReason,
      },
    });

    response.cookies.set("auth_role", user.role, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    response.cookies.set(
      "auth_user",
      encodeURIComponent(
        JSON.stringify({
          id: user._id.toString(),
          name: user.name,
          role: user.role,
        }),
      ),
      {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
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
