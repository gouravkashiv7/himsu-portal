import mongoose from "mongoose";
import dotenv from "dotenv";
import Announcement from "../lib/models/Announcement";

dotenv.config({ path: ".env.local" }); // Load env vars

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable");
  process.exit(1);
}

const seedData = [
  {
    text: "PU Admission Forms for 2026-27 Session available from May 15th.",
    isActive: true,
    priority: 10,
  },
  {
    text: "Standard Deviation (SD) College Merit List released for B.Com.",
    isActive: true,
    priority: 8,
  },
  {
    text: "Blood Donation Camp at Student Center on Feb 10th.",
    isActive: true,
    priority: 6,
  },
  {
    text: "Hostel Allocations for DAV College started. Check your email.",
    isActive: true,
    priority: 4,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");

    // Clear existing announcements to avoid duplicates if running multiple times (optional, but good for seeding)
    // await Announcement.deleteMany({});
    // Actually, let's effectively upsert or just insert if empty.

    const count = await Announcement.countDocuments();
    if (count === 0) {
      await Announcement.insertMany(seedData);
      console.log("Seeded announcements successfully");
    } else {
      console.log("Announcements already exist, skipping seed.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
