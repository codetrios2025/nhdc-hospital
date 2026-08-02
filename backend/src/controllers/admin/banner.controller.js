const { validationResult } = require("express-validator");

const BannerService = require("../../services/admin/banner.service");

const ApiResponse = require("../../utils/ApiResponse");
const ApiError = require("../../utils/ApiError");
const asyncHandler = require("../../utils/asyncHandler");

class BannerController {
  /**
   * Create Banner
   */
  create = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(422, errors.array()[0].msg);
    }

    const body = {
      ...req.body,
    };

    body.createdBy = req.user._id;

    if (req.files?.desktopImage?.length) {
      body.desktopImageFile = req.files.desktopImage[0];
    }

    if (req.files?.mobileImage?.length) {
      body.mobileImageFile = req.files.mobileImage[0];
    }

    const banner = await BannerService.create(body);

    return res
      .status(201)
      .json(new ApiResponse(201, true, "Banner created successfully", banner));
  });

  /**
   * Banner Listing
   */
  list = asyncHandler(async (req, res) => {
    const banners = await BannerService.getAll(req.query);

    return res.json(
      new ApiResponse(200, true, "Banners fetched successfully", banners),
    );
  });

  /**
   * Banner Details
   */
  details = asyncHandler(async (req, res) => {
    const banner = await BannerService.getById(req.params.id);

    return res.json(
      new ApiResponse(200, true, "Banner details fetched successfully", banner),
    );
  });

  /**
   * Update Banner
   */
  update = asyncHandler(async (req, res) => {
    const body = {
      ...req.body,
    };

    body.updatedBy = req.user._id;

    if (req.files?.desktopImage?.length) {
      body.desktopImageFile = req.files.desktopImage[0];
    }

    if (req.files?.mobileImage?.length) {
      body.mobileImageFile = req.files.mobileImage[0];
    }

    const banner = await BannerService.update(req.params.id, body);

    return res.json(
      new ApiResponse(200, true, "Banner updated successfully", banner),
    );
  });

  /**
   * Delete Banner
   */
  delete = asyncHandler(async (req, res) => {
    await BannerService.delete(req.params.id);

    return res.json(new ApiResponse(200, true, "Banner deleted successfully"));
  });

  /**
   * Update Status
   */
  status = asyncHandler(async (req, res) => {
    const banner = await BannerService.updateStatus(
      req.params.id,
      req.body.status,
    );

    return res.json(
      new ApiResponse(200, true, "Banner status updated successfully", banner),
    );
  });

  /**
   * Website Banner Listing
   */
  getWebsiteBanners = asyncHandler(async (req, res) => {
    const banners = await BannerService.getWebsiteBanners();

    return res.json(
      new ApiResponse(
        200,
        true,
        "Website banners fetched successfully",
        banners,
      ),
    );
  });
}

module.exports = new BannerController();
