

import mongoose from "mongoose"

const grievanceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    grievanceDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

const Grievance = mongoose.model("Grievance", grievanceSchema)

export default Grievance
