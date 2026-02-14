import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      role,
      college,
      otherCollegeName,
      phone,
      bloodGroup,
      isBloodDonor,
      location,
    } = await req.json();

    await dbConnect();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    // Note: 'role' comes from the frontend but should ideally be sanitized.
    // Here we trust 'member' or 'volunteer'. 'superadmin' creation should be protected.
    // For safety, force role to be 'member' or 'volunteer' if not explicitly allowed or check token.
    // Simplifying for now as per requirements.
    const userRole = "unverified";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      college,
      otherCollegeName,
      phone,
      bloodGroup,
      isBloodDonor,
      location,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: user.college,
      },
    });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
