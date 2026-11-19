import mongoose from "mongoose";
import addressSchema from "./Address.js";

const emergencyContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    relationship: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
      index: true,
    },

    patientCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Date of birth cannot be in the future",
      },
    },

    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"],
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "UNKNOWN"],
      default: "UNKNOWN",
    },

    address: {
      type: addressSchema,
      required: true,
    },

    emergencyContact: {
      type: emergencyContactSchema,
      default: null,
    },

    knownAllergies: {
      type: [String],
      default: [],
    },

    chronicConditions: {
      type: [String],
      default: [],
    },

    profileImage: {
      type: String,
      default: "",
    },

    registrationDate: {
      type: Date,
      default: Date.now,
    },

    isActive: {
      type: Boolean,
      default: true,
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

// Patient code is unique within a hospital
patientSchema.index(
  {
    hospitalId: 1,
    patientCode: 1,
  },
  {
    unique: true,
  },
);

patientSchema.index({
  hospitalId: 1,
  name: 1,
});

patientSchema.index({
  hospitalId: 1,
  phone: 1,
});

patientSchema.index({
  hospitalId: 1,
  createdAt: -1,
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
