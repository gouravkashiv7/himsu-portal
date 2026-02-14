import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import College from "@/lib/models/College";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const colleges = await College.find({})
      .select("name _id")
      .sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: colleges,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
