import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import Announcement from "./lib/models/Announcement";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Fallback or exit if no URI
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
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

    const count = await Announcement.countDocuments();
    if (count === 0) {
      // Create new schema model instance if necessary
      // Note: Announcement is imported from the model file which returns mongoose.model(...)

      await Announcement.insertMany(seedData);
      console.log("Seeded announcements successfully");
    } else {
      console.log("Announcements already exist, skipping seed.");
    }

    await mongoose.disconnect();
    console.log("Disconnected");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
