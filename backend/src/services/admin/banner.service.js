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

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Normalize Features
  |--------------------------------------------------------------------------
  */

  normalizeFeatures(features) {
    if (!features) return [];

    if (typeof features === "string") {
      try {
        features = JSON.parse(features);
      } catch (err) {
        return [];
      }
    }

    if (!Array.isArray(features)) {
      return [];
    }

    return features
      .filter((item) => item.title && item.title.trim())
      .map((item, index) => ({
        title: item.title.trim(),

        icon: item.icon || "bi bi-check-circle-fill",

        sortOrder: Number(item.sortOrder) || index + 1,
      }));
  }

  /*
  |--------------------------------------------------------------------------
  | Normalize Slides
  |--------------------------------------------------------------------------
  */

  normalizeSlides(slides) {
    if (!slides) return [];

    if (typeof slides === "string") {
      try {
        slides = JSON.parse(slides);
      } catch (err) {
        return [];
      }
    }

    if (!Array.isArray(slides)) {
      return [];
    }

    return slides.map((slide, index) => ({
      _id: slide._id || null,

      desktopImage: slide.desktopImage || "",

      mobileImage: slide.mobileImage || "",

      displayOrder: Number(slide.displayOrder) || index + 1,

      status: slide.status === false || slide.status === "false" ? false : true,
    }));
  }
  /*
  |--------------------------------------------------------------------------
  | Optimize Slides
  |--------------------------------------------------------------------------
  */

  async optimizeSlides(slides = [], files = []) {
    if (!Array.isArray(slides) || !slides.length) {
      return [];
    }

    const optimizedSlides = [];

    for (let index = 0; index < slides.length; index++) {
      const slide = { ...slides[index] };

      /*
      |--------------------------------------------------------------------------
      | Desktop Image
      |--------------------------------------------------------------------------
      */

      const desktopFile = files.find(
        (file) => file.fieldname === `slides[${index}][desktopImage]`,
      );

      if (desktopFile) {
        slide.desktopImage = await optimizeImage({
          inputPath: desktopFile.path,

          outputDir: path.join(process.cwd(), "src", "uploads", "banners"),

          width: 1920,

          quality: 80,
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Mobile Image
      |--------------------------------------------------------------------------
      */

      const mobileFile = files.find(
        (file) => file.fieldname === `slides[${index}][mobileImage]`,
      );

      if (mobileFile) {
        slide.mobileImage = await optimizeImage({
          inputPath: mobileFile.path,

          outputDir: path.join(process.cwd(), "src", "uploads", "banners"),

          width: 768,

          quality: 80,
        });
      }

      optimizedSlides.push({
        desktopImage: slide.desktopImage || "",

        mobileImage: slide.mobileImage || "",

        displayOrder: Number(slide.displayOrder) || index + 1,

        status:
          slide.status === false || slide.status === "false" ? false : true,
      });
    }

    return optimizedSlides;
  }

  /*
  |--------------------------------------------------------------------------
  | Build Banner Data
  |--------------------------------------------------------------------------
  */

  async buildBannerData(data, files = []) {
    const banner = {
      ...data,
    };

    banner.features = this.normalizeFeatures(data.features);

    banner.slides = await this.optimizeSlides(
      this.normalizeSlides(data.slides),
      files,
    );

    return banner;
  }
  /*
  |--------------------------------------------------------------------------
  | Build Create Data
  |--------------------------------------------------------------------------
  */

  async buildCreateData(data, files = []) {
    const banner = await this.buildBannerData(data, files);

    return banner;
  }

  /*
  |--------------------------------------------------------------------------
  | Build Update Data
  |--------------------------------------------------------------------------
  */

  async buildUpdateData(existingBanner, data, files = []) {
    const banner = {
      ...existingBanner.toObject(),
      ...data,
    };

    /*
    |--------------------------------------------------------------------------
    | Features
    |--------------------------------------------------------------------------
    */

    banner.features = this.normalizeFeatures(data.features);

    /*
    |--------------------------------------------------------------------------
    | Slides
    |--------------------------------------------------------------------------
    */

    const slides = this.normalizeSlides(data.slides);

    const optimizedSlides = [];

    for (let index = 0; index < slides.length; index++) {
      const slide = slides[index];

      const oldSlide = slide._id
        ? existingBanner.slides.find(
            (item) => item._id.toString() === slide._id.toString(),
          )
        : null;

      /*
      |--------------------------------------------------------------------------
      | Desktop Image
      |--------------------------------------------------------------------------
      */

      if (!slide.desktopImage && oldSlide?.desktopImage) {
        slide.desktopImage = oldSlide.desktopImage;
      }

      /*
      |--------------------------------------------------------------------------
      | Mobile Image
      |--------------------------------------------------------------------------
      */

      if (!slide.mobileImage && oldSlide?.mobileImage) {
        slide.mobileImage = oldSlide.mobileImage;
      }

      optimizedSlides.push(slide);
    }

    banner.slides = await this.optimizeSlides(optimizedSlides, files);

    return banner;
  }

  /*
  |--------------------------------------------------------------------------
  | Remove Deleted Images
  |--------------------------------------------------------------------------
  */

  async removeUnusedImagesold(oldSlides = [], newSlides = []) {
    for (let i = 0; i < oldSlides.length; i++) {
      const oldSlide = oldSlides[i];

      const newSlide = newSlides[i];

      /*
      |--------------------------------------------------------------------------
      | Desktop Image
      |--------------------------------------------------------------------------
      */

      if (
        oldSlide?.desktopImage &&
        oldSlide.desktopImage !== newSlide?.desktopImage
      ) {
        await this.deleteImage(oldSlide.desktopImage);
      }

      /*
      |--------------------------------------------------------------------------
      | Mobile Image
      |--------------------------------------------------------------------------
      */

      if (
        oldSlide?.mobileImage &&
        oldSlide.mobileImage !== newSlide?.mobileImage
      ) {
        await this.deleteImage(oldSlide.mobileImage);
      }
    }
  }

  async removeUnusedImages(oldSlides = [], newSlides = []) {
    for (const oldSlide of oldSlides) {
      const newSlide = newSlides.find(
        (item) =>
          item._id &&
          oldSlide._id &&
          item._id.toString() === oldSlide._id.toString(),
      );

      /*
    |--------------------------------------------------------------------------
    | Slide Deleted
    |--------------------------------------------------------------------------
    */

      if (!newSlide) {
        if (oldSlide.desktopImage) {
          await this.deleteImage(oldSlide.desktopImage);
        }

        if (oldSlide.mobileImage) {
          await this.deleteImage(oldSlide.mobileImage);
        }

        continue;
      }

      /*
    |--------------------------------------------------------------------------
    | Desktop Image Replaced
    |--------------------------------------------------------------------------
    */

      if (
        oldSlide.desktopImage &&
        oldSlide.desktopImage !== newSlide.desktopImage
      ) {
        await this.deleteImage(oldSlide.desktopImage);
      }

      /*
    |--------------------------------------------------------------------------
    | Mobile Image Replaced
    |--------------------------------------------------------------------------
    */

      if (
        oldSlide.mobileImage &&
        oldSlide.mobileImage !== newSlide.mobileImage
      ) {
        await this.deleteImage(oldSlide.mobileImage);
      }
    }
  }
  /*
  |--------------------------------------------------------------------------
  | Create Banner
  |--------------------------------------------------------------------------
  */

  async create(data, files = []) {
    const exists = await repository.findByDisplayOrder(data.displayOrder);

    if (exists) {
      throw new Error("Display order already exists.");
    }

    const banner = await this.buildCreateData(data, files);

    return await repository.create(banner);
  }

  /*
  |--------------------------------------------------------------------------
  | Banner Listing
  |--------------------------------------------------------------------------
  */

  async getAll(query = {}) {
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

    banner.features.sort((a, b) => a.sortOrder - b.sortOrder);

    banner.slides.sort((a, b) => a.displayOrder - b.displayOrder);

    return banner;
  }
  /*
  |--------------------------------------------------------------------------
  | Update Banner
  |--------------------------------------------------------------------------
  */

  async update(id, data, files = []) {
    const existingBanner = await repository.findById(id);

    if (!existingBanner) {
      throw new Error("Banner not found.");
    }

    /*
    |--------------------------------------------------------------------------
    | Duplicate Display Order
    |--------------------------------------------------------------------------
    */

    if (data.displayOrder) {
      const exists = await repository.findByDisplayOrder(data.displayOrder, id);

      if (exists) {
        throw new Error("Display order already exists.");
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Build Updated Banner
    |--------------------------------------------------------------------------
    */

    const banner = await this.buildUpdateData(existingBanner, data, files);

    /*
    |--------------------------------------------------------------------------
    | Remove Old Images
    |--------------------------------------------------------------------------
    */

    await this.removeUnusedImages(existingBanner.slides, banner.slides);

    return await repository.update(id, banner);
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

    /*
    |--------------------------------------------------------------------------
    | Delete Slide Images
    |--------------------------------------------------------------------------
    */

    if (Array.isArray(banner.slides)) {
      for (const slide of banner.slides) {
        if (slide.desktopImage) {
          await this.deleteImage(slide.desktopImage);
        }

        if (slide.mobileImage) {
          await this.deleteImage(slide.mobileImage);
        }
      }
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
