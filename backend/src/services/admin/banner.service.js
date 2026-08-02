const fs = require("fs");
const path = require("path");

const repository = require("../../repositories/admin/banner.repository");
const optimizeImage = require("../../utils/imageOptimizer");

class BannerService {
  /*
  |--------------------------------------------------------------------------
  | Delete Image
  |--------------------------------------------------------------------------
  */

  async deleteImage(imageName) {
    if (!imageName) return;

    const imagePath = path.join(
      process.cwd(),
      "src",
      "uploads",
      "banners",
      imageName,
    );

    try {
      await fs.unlink(imagePath);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Create Banner
  |--------------------------------------------------------------------------
  */

  async create(data) {
    // Check duplicate display order
    const existingBanner = await repository.findByDisplayOrder(
      data.displayOrder,
    );

    if (existingBanner) {
      throw new Error("Display order already exists.");
    }

    // Desktop Banner
    if (data.desktopImageFile?.path) {
      data.desktopImage = await optimizeImage({
        inputPath: data.desktopImageFile.path,

        outputDir: path.join(process.cwd(), "src", "uploads", "banners"),

        width: 1920,

        quality: 80,
      });

      delete data.desktopImageFile;
    }

    // Mobile Banner
    if (data.mobileImageFile?.path) {
      data.mobileImage = await optimizeImage({
        inputPath: data.mobileImageFile.path,

        outputDir: path.join(process.cwd(), "src", "uploads", "banners"),

        width: 768,

        quality: 80,
      });

      delete data.mobileImageFile;
    }

    return await repository.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Admin Listing
  |--------------------------------------------------------------------------
  */

  async getAll(query) {
    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filters = repository.buildFilters(query);

    const result = await repository.findAll(filters, {
      skip,
      limit,
    });

    return {
      rows: result.rows,

      total: result.total,

      page,

      limit,

      totalPages: Math.ceil(result.total / limit),
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Banner Details
  |--------------------------------------------------------------------------
  */

  async getById(id) {
    const banner = await repository.findById(id);

    if (!banner) {
      throw new Error("Banner not found.");
    }

    return banner;
  }
  /*
  |--------------------------------------------------------------------------
  | Update Banner
  |--------------------------------------------------------------------------
  */

  async update(id, data) {
    const banner = await repository.findById(id);

    if (!banner) {
      throw new Error("Banner not found.");
    }

    // Check duplicate display order
    if (data.displayOrder) {
      const existingBanner = await repository.findByDisplayOrder(
        data.displayOrder,
        id,
      );

      if (existingBanner) {
        throw new Error("Display order already exists.");
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Desktop Banner
    |--------------------------------------------------------------------------
    */

    if (data.desktopImageFile?.path) {
      if (banner.desktopImage) {
        await this.deleteImage(banner.desktopImage);
      }

      data.desktopImage = await optimizeImage({
        inputPath: data.desktopImageFile.path,

        outputDir: path.join(process.cwd(), "src", "uploads", "banners"),

        width: 1920,

        quality: 80,
      });

      delete data.desktopImageFile;
    }

    /*
    |--------------------------------------------------------------------------
    | Mobile Banner
    |--------------------------------------------------------------------------
    */

    if (data.mobileImageFile?.path) {
      if (banner.mobileImage) {
        await this.deleteImage(banner.mobileImage);
      }

      data.mobileImage = await optimizeImage({
        inputPath: data.mobileImageFile.path,

        outputDir: path.join(process.cwd(), "src", "uploads", "banners"),

        width: 768,

        quality: 80,
      });

      delete data.mobileImageFile;
    }

    return await repository.update(id, data);
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Banner
  |--------------------------------------------------------------------------
  */

  async delete(id) {
    const banner = await repository.findById(id);

    if (!banner) {
      throw new Error("Banner not found.");
    }

    if (banner.desktopImage) {
      await this.deleteImage(banner.desktopImage);
    }

    if (banner.mobileImage) {
      await this.deleteImage(banner.mobileImage);
    }

    return await repository.delete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(id, status) {
    const banner = await repository.findById(id);

    if (!banner) {
      throw new Error("Banner not found.");
    }

    return await repository.updateStatus(id, status);
  }

  /*
  |--------------------------------------------------------------------------
  | Website Banner Listing
  |--------------------------------------------------------------------------
  */

  async getWebsiteBanners() {
    return await repository.websiteListing();
  }
}

module.exports = new BannerService();
