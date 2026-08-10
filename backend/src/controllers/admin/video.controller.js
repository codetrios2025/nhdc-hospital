const { validationResult } = require("express-validator");

const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

const VideoService = require("../../services/admin/video.service");
const path = require("path");
const createThumbnail = require("../../helpers/videoThumbnail.helper");

const path = require("path");

const uploadRoot = process.env.UPLOAD_ROOT
  ? path.resolve(process.env.UPLOAD_ROOT)
  : path.resolve(__dirname, "../../../uploads");

const thumbnailFolder = path.join(uploadRoot, "videos", "thumbnails");

class VideoController {
  createold = asyncHandler(async (req, res) => {
    console.log(req.body.displayOrder);
    console.log(typeof req.body.displayOrder);

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

  create = asyncHandler(async (req, res) => {
    console.log(req.body.displayOrder);
    console.log(typeof req.body.displayOrder);

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

    // -----------------------------------------
    // Manual thumbnail upload
    // -----------------------------------------
    if (req.files?.thumbnail?.length) {
      body.thumbnail = req.files.thumbnail[0].filename;
    }

    // -----------------------------------------
    // Video upload
    // -----------------------------------------
    if (req.files?.videoFile?.length) {
      const uploadedVideo = req.files.videoFile[0];

      body.videoFile = uploadedVideo.filename;

      // IMPORTANT:
      // Multer already gives us the absolute path.
      // DO NOT use path.join(process.cwd(), ...)
      const videoPath = uploadedVideo.path;

      console.log("Video path:", videoPath);

      body.videoPath = videoPath;

      // Persistent upload directory
      const uploadRoot = process.env.UPLOAD_ROOT
        ? path.resolve(process.env.UPLOAD_ROOT)
        : path.resolve(__dirname, "../../../uploads");

      const thumbnailFolder = path.join(uploadRoot, "videos", "thumbnails");

      console.log("Thumbnail folder:", thumbnailFolder);

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

  updateold = asyncHandler(async (req, res) => {
    const body = {
      ...req.body,
    };
    console.log(req.body.displayOrder);
    console.log(typeof req.body.displayOrder);
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

  update = asyncHandler(async (req, res) => {
    const body = {
      ...req.body,
    };

    console.log(req.body.displayOrder);
    console.log(typeof req.body.displayOrder);

    body.updatedBy = req.user._id;

    // -----------------------------------------
    // Manual thumbnail upload
    // -----------------------------------------
    if (req.files?.thumbnail?.length) {
      body.thumbnail = req.files.thumbnail[0].filename;
    }

    // -----------------------------------------
    // Video upload
    // -----------------------------------------
    if (req.files?.videoFile?.length) {
      const uploadedVideo = req.files.videoFile[0];

      body.videoFile = uploadedVideo.filename;

      // IMPORTANT:
      // Do NOT prepend process.cwd()
      const videoPath = uploadedVideo.path;

      console.log("Video path:", videoPath);

      body.videoPath = videoPath;

      const uploadRoot = process.env.UPLOAD_ROOT
        ? path.resolve(process.env.UPLOAD_ROOT)
        : path.resolve(__dirname, "../../../uploads");

      const thumbnailFolder = path.join(uploadRoot, "videos", "thumbnails");

      console.log("Thumbnail folder:", thumbnailFolder);

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

  /**
   * Website Video Listing
   */
  getPublicVideos = asyncHandler(async (req, res) => {
    const videos = await VideoService.getPublicVideos();

    return res.json(
      new ApiResponse(200, true, "Videos fetched successfully", videos),
    );
  });

  /**
   * Homepage Videos
   */
  getHomeVideos = asyncHandler(async (req, res) => {
    const videos = await VideoService.getHomeVideos();

    return res.json(
      new ApiResponse(
        200,
        true,
        "Homepage videos fetched successfully",
        videos,
      ),
    );
  });

  /**
   * Website Video Details
   */
  getBySlug = asyncHandler(async (req, res) => {
    const video = await VideoService.getBySlug(req.params.slug);

    return res.json(
      new ApiResponse(200, true, "Video details fetched successfully", video),
    );
  });
}

module.exports = new VideoController();
