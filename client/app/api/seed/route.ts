import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  await dbConnect();

  try {
    const existingAdmin = await User.findOne({ role: "superadmin" });
    const hashedPassword = await bcrypt.hash("admin123", 10);

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      return NextResponse.json(
        {
          message: "Superadmin password reset to 'admin123'",
          email: existingAdmin.email,
        },
        { status: 200 },
      );
    }

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@himsu.com".toLowerCase(),
      password: hashedPassword,
      role: "superadmin",
    });

    return NextResponse.json(
      {
        message: "Superadmin created successfully",
        email: admin.email,
        password: "admin123",
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
