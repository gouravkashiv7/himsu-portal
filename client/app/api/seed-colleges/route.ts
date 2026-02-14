import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import College from "@/lib/models/College";
import { colleges } from "@/lib/data/colleges";

export async function GET() {
  await dbConnect();
  try {
    for (const college of colleges) {
      // transform courses to match schema (remove id, keep rest)
      const transformedCourses = college.courses.map(({ id, ...rest }) => rest);

      await College.updateOne(
        { slug: college.slug },
        {
          $set: {
            ...college,
            id: undefined, // remove id from root
            courses: transformedCourses,
          },
        },
        { upsert: true },
      );
    }
    return NextResponse.json({
      success: true,
      message: "Colleges seeded successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
