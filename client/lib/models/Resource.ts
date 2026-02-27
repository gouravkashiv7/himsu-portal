import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResource extends Document {
  title: string;
  type: "PYQ" | "Note" | "Video";
  subject: string;
  course: string;
  semester: string;
  year?: string;
  author?: string;
  link: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema<IResource> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["PYQ", "Note", "Video"],
      required: [true, "Please specify resource type"],
    },
    subject: {
      type: String,
      required: [true, "Please provide a subject"],
    },
    course: {
      type: String,
      required: [true, "Please provide a course"],
    },
    semester: {
      type: String,
      required: [true, "Please provide a semester"],
    },
    year: {
      type: String,
    },
    author: {
      type: String,
    },
    link: {
      type: String,
      required: [true, "Please provide a link to the resource"],
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Resource: Model<IResource> =
  mongoose.models.Resource ||
  mongoose.model<IResource>("Resource", ResourceSchema);

export default Resource;
