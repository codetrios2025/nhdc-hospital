const HomeFeatureRepository = require("../../repositories/admin/homeFeature.repository");

class HomeFeatureService {
  /**
   * Create
   */
  async create(data) {
    const exists = await HomeFeatureRepository.findByTitle(data.title);

    if (exists) {
      throw new Error("Home Feature already exists.");
    }

    return await HomeFeatureRepository.create(data);
  }

  /**
   * Admin Listing
   */
  async getAll(query) {
    const filters = HomeFeatureRepository.buildFilters(query);

    return await HomeFeatureRepository.findAll(filters, {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sortBy: query.sortBy || "displayOrder",
      sortOrder: query.sortOrder || "asc",
    });
  }

  /**
   * Get By Id
   */
  async getById(id) {
    const feature = await HomeFeatureRepository.findById(id);

    if (!feature) {
      throw new Error("Home Feature not found.");
    }

    return feature;
  }

  /**
   * Update
   */
  async update(id, data) {
    const feature = await this.getById(id);

    if (
      data.title &&
      data.title.toLowerCase() !== feature.title.toLowerCase()
    ) {
      const exists = await HomeFeatureRepository.findByTitle(data.title);

      if (exists) {
        throw new Error("Home Feature already exists.");
      }
    }

    return await HomeFeatureRepository.update(id, data);
  }

  /**
   * Delete
   */
  async delete(id) {
    await this.getById(id);

    return await HomeFeatureRepository.delete(id);
  }

  /**
   * Website Listing
   */
  async getPublicHomeFeatures() {
    return await HomeFeatureRepository.getPublicHomeFeatures();
  }

  /**
   * Update Status
   */
  async updateStatus(id, status) {
    await this.getById(id);

    return await HomeFeatureRepository.updateStatus(id, status);
  }

  /**
   * Update Display Order
   */
  async updateDisplayOrder(id, displayOrder) {
    await this.getById(id);

    return await HomeFeatureRepository.updateDisplayOrder(id, displayOrder);
  }
}

module.exports = new HomeFeatureService();
