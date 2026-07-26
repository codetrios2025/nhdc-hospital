const { validationResult } = require("express-validator");

const DoctorService = require("../../services/admin/doctor.service");

const ApiResponse = require("../../utils/ApiResponse");
const ApiError = require("../../utils/ApiError");
const asyncHandler = require("../../utils/asyncHandler");

class DoctorController {
  create = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(422, errors.array()[0].msg);
    }

    const body = {
      ...req.body,
    };

    body.createdBy = req.user._id;

    if (req.files?.profileImage?.length) {
      body.profileImage = req.files.profileImage[0].filename;
    }

    if (req.files?.gallery?.length) {
      body.gallery = req.files.gallery.map((file) => file.filename);
    }

    const doctor = await DoctorService.create(body);

    return res
      .status(201)
      .json(new ApiResponse(201, true, "Doctor created successfully", doctor));
  });

  list = asyncHandler(async (req, res) => {
    const doctors = await DoctorService.list(req.query);

    return res.json(
      new ApiResponse(200, true, "Doctors fetched successfully", doctors),
    );
  });

  details = asyncHandler(async (req, res) => {
    const doctor = await DoctorService.details(req.params.id);

    return res.json(
      new ApiResponse(200, true, "Doctor details fetched", doctor),
    );
  });

  update = asyncHandler(async (req, res) => {
    const body = {
      ...req.body,
    };

    body.updatedBy = req.user._id;

    if (req.files?.profileImage?.length) {
      body.profileImage = req.files.profileImage[0].filename;
    }

    if (req.files?.gallery?.length) {
      body.gallery = req.files.gallery.map((file) => file.filename);
    }

    const doctor = await DoctorService.update(req.params.id, body);

    return res.json(
      new ApiResponse(200, true, "Doctor updated successfully", doctor),
    );
  });

  delete = asyncHandler(async (req, res) => {
    await DoctorService.delete(req.params.id, req.user._id);

    return res.json(new ApiResponse(200, true, "Doctor deleted successfully"));
  });

  status = asyncHandler(async (req, res) => {
    const doctor = await DoctorService.status(
      req.params.id,

      req.body.isActive,
    );

    return res.json(
      new ApiResponse(200, true, "Doctor status updated", doctor),
    );
  });

  featured = asyncHandler(async (req, res) => {
    const doctor = await DoctorService.featured(
      req.params.id,

      req.body.featured,
    );

    return res.json(
      new ApiResponse(200, true, "Doctor featured updated", doctor),
    );
  });
}

module.exports = new DoctorController();
