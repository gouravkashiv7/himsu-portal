import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import College from "@/lib/models/College";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { collegeId, name, email, password } = await req.json();
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check if user exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 },
      );
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create President User
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "president",
      college: collegeId,
    });

    // 4. Update College with President ID
    if (collegeId) {
      await College.findByIdAndUpdate(collegeId, { president: user._id });
    }

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
