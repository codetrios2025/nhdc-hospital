const fs = require("fs");
const path = require("path");

const repository = require("../../repositories/admin/service.repository");
const slugify = require("../../utils/slugify");

class ServiceService {
  /**
   * Generate Unique Slug
   */
  async generateSlug(title, currentId = null) {
    const baseSlug = slugify(title);

    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await repository.findBySlug(slug);

      if (!existing) {
        return slug;
      }

      if (currentId && existing._id.toString() === currentId.toString()) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  /**
   * Delete Image
   */
  async deleteImage(imageName) {
    if (!imageName) return;

    const imagePath = path.join(
      process.cwd(),
      "src",
      "uploads",
      "services",
      imageName,
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  /**
   * Delete Gallery Image
   */
  async deleteGalleryImage(imageName) {
    if (!imageName) return;

    const imagePath = path.join(
      process.cwd(),
      "src",
      "uploads",
      "services/gallery",
      imageName,
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  /**
   * Build Gallery Array
   */
  buildGallery(files = []) {
    return files.map((file, index) => ({
      image: file.filename,
      alt: "",
      sortOrder: index,
    }));
  }

  /**
   * Create Service
   */
  async create(data) {
    data.slug = await this.generateSlug(data.title);

    if (data.galleryFiles?.length) {
      data.gallery = this.buildGallery(data.galleryFiles);
      delete data.galleryFiles;
    }

    return await repository.create(data);
  }

  /**
   * Admin Listing
   */
  async getAll(query) {
    const filters = repository.buildFilters(query);

    return await repository.findAll(filters, {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sortBy: query.sortBy || "displayOrder",
      sortOrder: query.sortOrder || "asc",
    });
  }

  /**
   * Details
   */
  async getById(id) {
    const service = await repository.findById(id);

    if (!service) {
      throw new Error("Service not found.");
    }

    return service;
  }

  /**
   * Update
   */
  async update(id, data) {
    const service = await repository.findById(id);

    if (!service) {
      throw new Error("Service not found.");
    }

    if (data.title) {
      data.slug = await this.generateSlug(data.title, id);
    }

    if (data.image && service.image) {
      await this.deleteImage(service.image);
    }

    if (data.galleryFiles?.length) {
      const gallery = this.buildGallery(data.galleryFiles);

      await repository.addGalleryImages(id, gallery);

      delete data.galleryFiles;
    }

    return await repository.update(id, data);
  }

  async removeGalleryImage(serviceId, imageId) {
    const service = await repository.findById(serviceId);

    if (!service) {
      throw new Error("Service not found.");
    }

    const image = service.gallery.find(
      (item) => item._id.toString() === imageId,
    );

    if (!image) {
      throw new Error("Gallery image not found.");
    }

    await this.deleteGalleryImage(image.image);

    return await repository.removeGalleryImage(serviceId, imageId);
  }

  /**
   * Delete
   */
  async delete(id) {
    const service = await repository.findById(id);

    if (!service) {
      throw new Error("Service not found.");
    }

    if (service.image) {
      await this.deleteImage(service.image);
    }

    return await repository.delete(id);
  }

  /**
   * Status
   */
  async updateStatus(id, status) {
    return await repository.updateStatus(id, status);
  }

  /**
   * Home
   */
  async updateHome(id, showOnHome) {
    return await repository.updateHome(id, showOnHome);
  }

  /**
   * Featured
   */
  async updateFeatured(id, isFeatured) {
    return await repository.updateFeatured(id, isFeatured);
  }

  /**
   * Display Order
   */
  async updateDisplayOrder(id, displayOrder) {
    return await repository.updateDisplayOrder(id, displayOrder);
  }

  /**
   * Website Listing
   */
  async getPublicServices() {
    return await repository.getPublicServices();
  }

  /**
   * Homepage Services
   */
  async getHomeServices() {
    return await repository.getHomeServices();
  }

  /**
   * Website Details
   */
  async getBySlug(slug) {
    const service = await repository.getBySlug(slug);

    if (!service) {
      throw new Error("Service not found.");
    }

    return service;
  }
}

module.exports = new ServiceService();
