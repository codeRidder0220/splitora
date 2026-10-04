import mongoose, { Schema, model, models } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    members: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Group =
  models.Group || model("Group", groupSchema);

export default Group;