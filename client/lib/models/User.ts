import mongoose, { Schema } from "mongoose";

// Sub-schema for address/location details
const LocationSchema = new Schema({
  city: { type: String, required: true },
  sector: { type: String }, // Optional, primarily for Chandigarh
});

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    image: { type: String }, // Base64 or URL
    phone: { type: String },
    role: {
      type: String,
      enum: ["superadmin", "president", "member", "unverified"],
      default: "unverified",
    },
    rejectionReason: { type: String }, // For unverified users if rejected

    // College Affiliation
    college: { type: Schema.Types.ObjectId, ref: "College" },
    otherCollegeName: { type: String }, // If "Other" is selected

    // Blood Donation Info
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
    },
    isBloodDonor: { type: Boolean, default: false },
    isCampusVolunteer: { type: Boolean, default: false },

    // Location
    location: LocationSchema,
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

// Ensure College model is registered for populate
import "./College";
