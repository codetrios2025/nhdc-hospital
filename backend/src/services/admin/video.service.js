const slugify = require("slugify");

const ApiError = require("../../utils/ApiError");

const VideoRepository = require("../../repositories/admin/video.repository");

const { getFileUrl, deleteFile } = require("../../helpers/file.helper");

class VideoService {
  /**
   * =====================================================
   * Create Video
   * =====================================================
   */
  async create(data) {
    const slug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    const exists = await VideoRepository.findBySlug(slug);

    if (exists) {
      throw new ApiError(409, "Video already exists.");
    }

    data.slug = slug;

    if (data.seoKeywords && typeof data.seoKeywords === "string") {
      data.seoKeywords = data.seoKeywords
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    data.displayOrder = Number(data.displayOrder);

    return await VideoRepository.create(data);
  }

  /**
   * =====================================================
   * Video Listing
   * =====================================================
   */
  async list(query) {
    const result = await VideoRepository.getList(query);

    result.videos = result.videos.map((video) => {
      const item = video.toObject();

      item.thumbnailUrl = getFileUrl("videos/thumbnails", item.thumbnail);

      if (item.videoFile) {
        item.videoFileUrl = getFileUrl("videos/files", item.videoFile);
      }

      return item;
    });

    return result;
  }

  /**
   * =====================================================
   * Video Details
   * =====================================================
   */
  async details(id) {
    const video = await VideoRepository.findById(id);

    if (!video) {
      throw new ApiError(404, "Video not found.");
    }

    const item = video.toObject();

    item.thumbnailUrl = getFileUrl("videos/thumbnails", item.thumbnail);

    if (item.videoFile) {
      item.videoFileUrl = getFileUrl("videos/files", item.videoFile);
    }

    item.seoKeywords = Array.isArray(item.seoKeywords)
      ? item.seoKeywords.join(", ")
      : "";

    return item;
  }

  /**
   * =====================================================
   * Update Video
   * =====================================================
   */
  async update(id, data) {
    const old = await VideoRepository.findById(id);

    if (!old) {
      throw new ApiError(404, "Video not found.");
    }

    // ---------------------------------------------------
    // Delete old thumbnail
    // ---------------------------------------------------

    if (data.thumbnail && old.thumbnail && data.thumbnail !== old.thumbnail) {
      await deleteFile(`videos/thumbnails/${old.thumbnail}`);
    }

    // ---------------------------------------------------
    // Delete old video file
    // ---------------------------------------------------

    if (data.videoFile && old.videoFile && data.videoFile !== old.videoFile) {
      await deleteFile(`videos/files/${old.videoFile}`);
    }

    if (data.seoKeywords && typeof data.seoKeywords === "string") {
      data.seoKeywords = data.seoKeywords
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    data.displayOrder = Number(data.displayOrder);

    const updated = await VideoRepository.update(id, data);

    const item = updated.toObject();

    item.thumbnailUrl = getFileUrl("videos/thumbnails", item.thumbnail);

    if (item.videoFile) {
      item.videoFileUrl = getFileUrl("videos/files", item.videoFile);
    }

    return item;
  }

  /**
   * =====================================================
   * Delete Video
   * =====================================================
   */
  async delete(id, adminId) {
    return await VideoRepository.softDelete(id, adminId);
  }

  /**
   * =====================================================
   * Status
   * =====================================================
   */
  async status(id, status) {
    const video = await VideoRepository.changeStatus(id, status);

    const item = video.toObject();

    item.thumbnailUrl = getFileUrl("videos/thumbnails", item.thumbnail);

    if (item.videoFile) {
      item.videoFileUrl = getFileUrl("videos/files", item.videoFile);
    }

    return item;
  }

  /**
   * =====================================================
   * Featured
   * =====================================================
   */
  async featured(id, featured) {
    const video = await VideoRepository.toggleFeatured(id, featured);

    const item = video.toObject();

    item.thumbnailUrl = getFileUrl("videos/thumbnails", item.thumbnail);

    if (item.videoFile) {
      item.videoFileUrl = getFileUrl("videos/files", item.videoFile);
    }

    return item;
  }

  /**
   * =====================================================
   * Format Video
   * =====================================================
   */
  formatVideo(video) {
    const item = video.toObject();

    item.thumbnailUrl = getFileUrl("videos/thumbnails", item.thumbnail);

    if (item.videoFile) {
      item.videoFileUrl = getFileUrl("videos/files", item.videoFile);
    }

    item.seoKeywords = Array.isArray(item.seoKeywords) ? item.seoKeywords : [];

    return item;
  }

  /**
   * =====================================================
   * Public Videos
   * =====================================================
   */
  async getPublicVideos() {
    const videos = await VideoRepository.getPublicVideos();

    return videos.map((video) => this.formatVideo(video));
  }

  /**
   * =====================================================
   * Home Videos
   * =====================================================
   */
  async getHomeVideos() {
    const videos = await VideoRepository.getHomeVideos();

    return videos.map((video) => this.formatVideo(video));
  }

  /**
   * =====================================================
   * Video By Slug
   * =====================================================
   */
  async getBySlug(slug) {
    const video = await VideoRepository.findPublicBySlug(slug);

    if (!video) {
      throw new ApiError(404, "Video not found.");
    }

    return this.formatVideo(video);
  }
}

module.exports = new VideoService();
