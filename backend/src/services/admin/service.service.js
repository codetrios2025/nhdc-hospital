const fs = require("fs");
const path = require("path");

const repository = require("../../repositories/admin/service.repository");
const serviceTestRepository = require("../../repositories/admin/serviceTest.repository");
const slugify = require("../../utils/slugify");

class ServiceService {
  /**
   * =====================================================
   * Upload Root
   * =====================================================
   *
   * Production:
   * /home/u394996505/public_html/uploads
   *
   * Local:
   * backend/src/uploads
   *
   * =====================================================
   */
  getUploadRoot() {
    return process.env.UPLOAD_ROOT
      ? path.resolve(process.env.UPLOAD_ROOT)
      : path.resolve(__dirname, "../../uploads");
  }

  /**
   * =====================================================
   * Generate Unique Slug
   * =====================================================
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
   * =====================================================
   * Delete Service Main Image
   * =====================================================
   */
  async deleteImage(imageName) {
    if (!imageName) return;

    const imagePath = path.join(this.getUploadRoot(), "services", imageName);

    try {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);

        console.log(`Service image deleted: ${imagePath}`);
      }
    } catch (error) {
      console.error("Failed to delete service image:", error);
    }
  }

  /**
   * =====================================================
   * Delete Service Gallery Image
   * =====================================================
   */
  async deleteGalleryImage(imageName) {
    if (!imageName) return;

    const imagePath = path.join(
      this.getUploadRoot(),
      "services",
      "gallery",
      imageName,
    );

    try {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);

        console.log(`Service gallery image deleted: ${imagePath}`);
      }
    } catch (error) {
      console.error("Failed to delete service gallery image:", error);
    }
  }

  /**
   * =====================================================
   * Build Gallery Array
   * =====================================================
   */
  buildGallery(files = []) {
    return files.map((file, index) => ({
      image: file.filename,
      alt: "",
      sortOrder: index,
    }));
  }

  /**
   * =====================================================
   * Create Service
   * =====================================================
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
   * =====================================================
   * Admin Listing
   * =====================================================
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
   * =====================================================
   * Details
   * =====================================================
   */
  async getById(id) {
    const service = await repository.findById(id);

    if (!service) {
      throw new Error("Service not found.");
    }

    return service;
  }

  /**
   * =====================================================
   * Update
   * =====================================================
   */
  async update(id, data) {
    const service = await repository.findById(id);

    if (!service) {
      throw new Error("Service not found.");
    }

    if (data.title) {
      data.slug = await this.generateSlug(data.title, id);
    }

    // -------------------------------------------------
    // Delete old main image when new image is uploaded
    // -------------------------------------------------

    if (data.image && service.image) {
      await this.deleteImage(service.image);
    }

    // -------------------------------------------------
    // Add new gallery images
    // -------------------------------------------------

    if (data.galleryFiles?.length) {
      const gallery = this.buildGallery(data.galleryFiles);

      await repository.addGalleryImages(id, gallery);

      delete data.galleryFiles;
    }

    return await repository.update(id, data);
  }

  /**
   * =====================================================
   * Remove Gallery Image
   * =====================================================
   */
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
   * =====================================================
   * Delete Service
   * =====================================================
   */
  async delete(id) {
    const service = await repository.findById(id);

    if (!service) {
      throw new Error("Service not found.");
    }

    // -------------------------------------------------
    // Delete main service image
    // -------------------------------------------------

    if (service.image) {
      await this.deleteImage(service.image);
    }

    // -------------------------------------------------
    // Delete service gallery images
    // -------------------------------------------------

    if (Array.isArray(service.gallery) && service.gallery.length) {
      for (const galleryImage of service.gallery) {
        if (galleryImage.image) {
          await this.deleteGalleryImage(galleryImage.image);
        }
      }
    }

    return await repository.delete(id);
  }

  /**
   * =====================================================
   * Status
   * =====================================================
   */
  async updateStatus(id, status) {
    return await repository.updateStatus(id, status);
  }

  /**
   * =====================================================
   * Home
   * =====================================================
   */
  async updateHome(id, showOnHome) {
    return await repository.updateHome(id, showOnHome);
  }

  /**
   * =====================================================
   * Featured
   * =====================================================
   */
  async updateFeatured(id, isFeatured) {
    return await repository.updateFeatured(id, isFeatured);
  }

  /**
   * =====================================================
   * Display Order
   * =====================================================
   */
  async updateDisplayOrder(id, displayOrder) {
    return await repository.updateDisplayOrder(id, displayOrder);
  }

  /**
   * =====================================================
   * Website Listing
   * =====================================================
   */
  async getPublicServicesold() {
    return await repository.getPublicServices();
  }

  /**
   * =====================================================
   * Website Listing
   * =====================================================
   */
  async getPublicServices() {
    const services = await repository.getPublicServices();

    const serviceIds = services.map((item) => item._id);

    const tests = await serviceTestRepository.getByServices(serviceIds);

    const servicesWithTests = services.map((service) => ({
      ...service.toObject(),

      tests: tests.filter(
        (test) => test.service.toString() === service._id.toString(),
      ),
    }));

    return servicesWithTests;
  }

  /**
   * =====================================================
   * Homepage Services
   * =====================================================
   */
  async getHomeServicesold() {
    return await repository.getHomeServices();
  }

  /**
   * =====================================================
   * Homepage Services
   * =====================================================
   */
  async getHomeServices() {
    const services = await repository.getHomeServices();

    const serviceIds = services.map((item) => item._id);

    const tests = await serviceTestRepository.getByServices(serviceIds);

    const servicesWithTests = services.map((service) => ({
      ...service.toObject(),

      tests: tests.filter(
        (test) => test.service.toString() === service._id.toString(),
      ),
    }));

    return servicesWithTests;
  }

  /**
   * =====================================================
   * Website Details
   * =====================================================
   */
  async getBySlug(slug) {
    const service = await repository.getBySlug(slug);

    if (!service) {
      throw new Error("Service not found.");
    }

    const tests = await serviceTestRepository.getByService(service._id);

    const result = service.toObject();

    result.tests = tests;

    return result;
  }
}

module.exports = new ServiceService();
