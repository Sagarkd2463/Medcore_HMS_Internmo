import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    dayOfWeek: {
      type: Number,
      required: true,
      min: 0,
      max: 6,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    slotDurationMinutes: {
      type: Number,
      default: 30,
      min: 5,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
      index: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: [String],
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      trim: true,
    },

    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 2000,
    },

    languages: {
      type: [String],
      default: [],
    },

    weeklySchedule: {
      type: [scheduleSchema],
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
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

// One doctor profile per user within a hospital
doctorSchema.index(
  {
    hospitalId: 1,
    userId: 1,
  },
  {
    unique: true,
  },
);

// License number must be unique within a hospital
doctorSchema.index(
  {
    hospitalId: 1,
    licenseNumber: 1,
  },
  {
    unique: true,
  },
);

doctorSchema.index({
  hospitalId: 1,
  departmentId: 1,
  specialization: 1,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
