


import mongoose from "mongoose"

const complaintSchema = new mongoose.Schema(
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

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    complaintDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

const Complaint = mongoose.model("Complaint", complaintSchema)

export default Complaint
