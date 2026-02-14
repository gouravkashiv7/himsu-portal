import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import College from "@/lib/models/College";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { collegeId, name, email, password, isUpdate, previousPresidentId } =
      body;
    const normalizedEmail = email.toLowerCase().trim();

    if (isUpdate && previousPresidentId) {
      // Update existing president
      const userToUpdate = await User.findById(previousPresidentId);
      if (!userToUpdate) {
        return NextResponse.json(
          { success: false, message: "President not found" },
          { status: 404 },
        );
      }

      // Check for email conflict
      if (userToUpdate.email !== normalizedEmail) {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
          return NextResponse.json(
            { success: false, message: "Email already in use" },
            { status: 400 },
          );
        }
      }

      userToUpdate.name = name;
      userToUpdate.email = normalizedEmail;
      if (password) {
        userToUpdate.password = await bcrypt.hash(password, 10);
      }
      await userToUpdate.save();

      return NextResponse.json({ success: true, data: userToUpdate });
    } else {
      // Create new president
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: "User with this email already exists" },
          { status: 400 },
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: "president",
        college: collegeId,
      });

      if (collegeId) {
        await College.findByIdAndUpdate(collegeId, { president: user._id });
      }

      return NextResponse.json({ success: true, data: user }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
