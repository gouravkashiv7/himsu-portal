import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import FAQ from "@/lib/models/FAQ";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const faqs = await FAQ.find({ isActive: true }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: faqs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
