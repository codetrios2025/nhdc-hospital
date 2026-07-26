const { validationResult } = require("express-validator");

const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

const VideoService = require("../../services/admin/video.service");
const path = require("path");
const createThumbnail = require("../../helpers/videoThumbnail.helper");

class VideoController {
  create = asyncHandler(async (req, res) => {
    console.log("========== VIDEO CREATE ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    console.log("Headers");
    console.log(req.headers["content-type"]);

    if (req.files?.thumbnail) {
      console.log("Thumbnail:", req.files.thumbnail[0]);
    }

    if (req.files?.videoFile) {
      console.log("Video:", req.files.videoFile[0]);
    }
    console.log("==================================");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(422, errors.array()[0].msg);
    }

    const body = {
      ...req.body,
    };

    body.createdBy = req.user._id;

    if (req.files?.thumbnail?.length) {
      body.thumbnail = req.files.thumbnail[0].filename;
    }

    if (req.files?.videoFile?.length) {
      body.videoFile = req.files.videoFile[0].filename;

      const videoPath = path.join(process.cwd(), req.files.videoFile[0].path);

      body.videoPath = videoPath;

      const thumbnailFolder = path.join(
        process.cwd(),
        "src/uploads/videos/thumbnails",
      );

      body.thumbnail = await createThumbnail(videoPath, thumbnailFolder);
    }

    const video = await VideoService.create(body);

    return res
      .status(201)
      .json(new ApiResponse(201, true, "Video created successfully", video));
  });

  list = asyncHandler(async (req, res) => {
    const videos = await VideoService.list(req.query);

    return res.json(
      new ApiResponse(200, true, "Videos fetched successfully", videos),
    );
  });

  details = asyncHandler(async (req, res) => {
    const video = await VideoService.details(req.params.id);

    return res.json(new ApiResponse(200, true, "Video details fetched", video));
  });

  update = asyncHandler(async (req, res) => {
    const body = {
      ...req.body,
    };

    body.updatedBy = req.user._id;

    if (req.files?.thumbnail?.length) {
      body.thumbnail = req.files.thumbnail[0].filename;
    }

    if (req.files?.videoFile?.length) {
      body.videoFile = req.files.videoFile[0].filename;

      const videoPath = path.join(process.cwd(), req.files.videoFile[0].path);

      body.videoPath = videoPath;

      const thumbnailFolder = path.join(
        process.cwd(),
        "src/uploads/videos/thumbnails",
      );

      body.thumbnail = await createThumbnail(videoPath, thumbnailFolder);
    }

    const video = await VideoService.update(req.params.id, body);

    return res.json(
      new ApiResponse(200, true, "Video updated successfully", video),
    );
  });

  delete = asyncHandler(async (req, res) => {
    await VideoService.delete(req.params.id, req.user._id);

    return res.json(new ApiResponse(200, true, "Video deleted successfully"));
  });

  status = asyncHandler(async (req, res) => {
    const video = await VideoService.status(req.params.id, req.body.isActive);

    return res.json(new ApiResponse(200, true, "Status updated", video));
  });

  featured = asyncHandler(async (req, res) => {
    const video = await VideoService.featured(req.params.id, req.body.featured);

    return res.json(new ApiResponse(200, true, "Featured updated", video));
  });
}

module.exports = new VideoController();
