import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }], // Array of image URLs
    eventDate: { type: Date, required: true },
    eventTime: { type: String }, // e.g. "10:00 AM - 2:00 PM"
    duration: { type: String }, // e.g. "4 hours"
    location: { type: String },
    collegesInvolved: [{ type: Schema.Types.ObjectId, ref: "College" }],
    comments: [CommentSchema],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);

// Ensure dependencies are loaded
import "./User";
import "./College";
