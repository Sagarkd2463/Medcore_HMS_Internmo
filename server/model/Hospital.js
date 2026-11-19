import mongoose from "mongoose";
import addressSchema from "./Address.js";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    registrationNumber: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: addressSchema,
      required: true,
    },

    logo: {
      type: String,
      default: "",
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    subscriptionStatus: {
      type: String,
      enum: ["TRIAL", "ACTIVE", "EXPIRED", "CANCELLED"],
      default: "TRIAL",
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "SUSPENDED", "REJECTED"],
      default: "PENDING",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

hospitalSchema.index({
  status: 1,
  isDeleted: 1,
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;
