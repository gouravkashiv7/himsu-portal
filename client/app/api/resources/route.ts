import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Resource from "@/lib/models/Resource";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // allow filtering by type
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type");

    const query: any = { isActive: true };
    if (type) {
      query.type = type;
    }

    const resources = await Resource.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: resources,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
