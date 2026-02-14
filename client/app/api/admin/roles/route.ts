import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Role from "@/lib/models/Role";

// Initial roles to seed if none exist
const INITIAL_ROLES = [
  {
    name: "superadmin",
    description: "Full system access",
    color: "red",
    isStatic: true,
  },
  {
    name: "president",
    description: "College-level administrator",
    color: "orange",
    isStatic: true,
  },
  {
    name: "member",
    description: "Verified student member",
    color: "blue",
    isStatic: true,
  },
  {
    name: "unverified",
    description: "Pending account verification",
    color: "slate",
    isStatic: true,
  },
];

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    let roles = await Role.find();

    // Seed if empty
    if (roles.length === 0) {
      roles = await Role.insertMany(INITIAL_ROLES);
    }

    return NextResponse.json({ success: true, data: roles });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const role = await Role.create(body);
    return NextResponse.json({ success: true, data: role });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const role = await Role.findById(id);
    if (!role) {
      return NextResponse.json(
        { success: false, message: "Role not found" },
        { status: 404 },
      );
    }

    if (role.isStatic) {
      return NextResponse.json(
        { success: false, message: "Static roles cannot be deleted" },
        { status: 400 },
      );
    }

    await Role.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Role deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
