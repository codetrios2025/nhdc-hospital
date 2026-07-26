const slugify = require("slugify");

const ApiError = require("../../utils/ApiError");

const VideoRepository = require("../../repositories/admin/video.repository");

const { getFileUrl, deleteFile } = require("../../helpers/file.helper");

class VideoService {
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

    return await VideoRepository.create(data);
  }

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

    return item;
  }

  async update(id, data) {
    const old = await VideoRepository.findById(id);

    if (!old) {
      throw new ApiError(404, "Video not found.");
    }

    if (data.thumbnail && old.thumbnail) {
      deleteFile(`src/uploads/videos/thumbnails/${old.thumbnail}`);
    }

    if (data.videoFile && old.videoFile) {
      deleteFile(`src/uploads/videos/files/${old.videoFile}`);
    }

    const updated = await VideoRepository.update(id, data);

    const item = updated.toObject();

    item.thumbnailUrl = getFileUrl("videos/thumbnails", item.thumbnail);

    if (item.videoFile) {
      item.videoFileUrl = getFileUrl("videos/files", item.videoFile);
    }

    return item;
  }

  async delete(id, adminId) {
    return VideoRepository.softDelete(id, adminId);
  }

  async status(id, status) {
    const video = await VideoRepository.changeStatus(id, status);

    const item = video.toObject();

    item.thumbnailUrl = getFileUrl("videos/thumbnails", item.thumbnail);

    if (item.videoFile) {
      item.videoFileUrl = getFileUrl("videos/files", item.videoFile);
    }

    return item;
  }

  async featured(id, featured) {
    const video = await VideoRepository.toggleFeatured(id, featured);

    const item = video.toObject();

    item.thumbnailUrl = getFileUrl("videos/thumbnails", item.thumbnail);

    if (item.videoFile) {
      item.videoFileUrl = getFileUrl("videos/files", item.videoFile);
    }

    return item;
  }
}

module.exports = new VideoService();
