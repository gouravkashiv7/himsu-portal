import mongoose, { Schema } from "mongoose";

const AnnouncementSchema = new Schema(
  {
    text: { type: String, required: true },
    link: { type: String }, // Optional URL to redirect to
    isActive: { type: Boolean, default: true },
    priority: { type: Number, default: 0 }, // Higher number = wider display or specific order if needed
    author: { type: Schema.Types.ObjectId, ref: "User" }, // Track who created it
  },
  { timestamps: true },
);

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);
