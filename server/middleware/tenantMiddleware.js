import mongoose from "mongoose";
import Hospital from "../model/Hospital.js";

export const tenantContext = async (req, res, next) => {
  if (!req.user) {
    throw Error("Authentication required");
  }

  let hospitalId;

  // Super Admin selects a hospital.
  if (req.user.role === "SUPER_ADMIN") {
    hospitalId = req.params.hospitalId || req.headers["x-hospital-id"];
  } else {
    // Other users use their assigned hospital.
    hospitalId = req.user.hospitalId;
  }

  if (!hospitalId) {
    throw Error("Hospital ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
    throw Error("Invalid hospital ID");
  }

  // Prevent users from accessing another hospital.
  if (
    req.user.role !== "SUPER_ADMIN" &&
    req.params.hospitalId &&
    String(req.params.hospitalId) !== String(hospitalId)
  ) {
    throw Error("Access denied");
  }

  const hospital = await Hospital.findOne({
    _id: hospitalId,
    isDeleted: false,
  });

  if (!hospital) {
    throw Error("Hospital not found");
  }

  if (hospital.status === "SUSPENDED") {
    throw Error("Hospital is suspended");
  }

  req.hospitalId = hospital._id;
  req.hospital = hospital;

  next();
};
