import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Undergraduate", "Postgraduate", "Diploma"],
    required: true,
  },
  duration: { type: String, required: true },
  eligibility: { type: String, required: true },
  seats: { type: Number, required: true },
  fees: { type: String, required: true },
});

const ContactSchema = new Schema({
  email: { type: String },
  phone: { type: String },
  website: { type: String },
  whatsapp: { type: String },
});

const DateSchema = new Schema({
  label: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String },
});

const VolunteerSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  designation: { type: String }, // e.g. "Student Coordinator", "Alumni"
});

const CollegeSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortName: { type: String },
    location: { type: String },
    description: { type: String },
    established: { type: String },
    accreditation: { type: String },
    bannerColor: { type: String },
    logo: { type: String },
    highlights: [{ type: String }],
    contact: ContactSchema,
    courses: [CourseSchema],
    importantDates: [DateSchema],
    volunteers: [VolunteerSchema],
    president: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export default mongoose.models.College ||
  mongoose.model("College", CollegeSchema);

// Ensure User model is registered for populate
import "./User";
