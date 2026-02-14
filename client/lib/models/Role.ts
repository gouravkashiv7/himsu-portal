import mongoose, { Schema } from "mongoose";

const RoleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    color: { type: String, default: "primary" }, // Tailwind color base (e.g., 'primary', 'blue', 'red')
    isStatic: { type: Boolean, default: false }, // If true, cannot be deleted
  },
  { timestamps: true },
);

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
