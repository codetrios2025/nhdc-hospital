const repository = require("../../repositories/admin/hospitalHighlight.repository");

class HospitalHighlightService {
  /**
   * Create
   */
  async create(data) {
    return await repository.create(data);
  }

  /**
   * Admin Listing
   */
  async getAll(query = {}) {
    const filters = repository.buildFilters(query);

    return await repository.findAll(filters, {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sortBy: query.sortBy || "order",
      sortOrder: query.sortOrder || "asc",
    });
  }

  /**
   * Details
   */
  async getById(id) {
    const highlight = await repository.findById(id);

    if (!highlight) {
      throw new Error("Hospital Highlight not found.");
    }

    return highlight;
  }

  /**
   * Create / Update Duplicate Title Validation
   */
  async validateTitle(title, currentId = null) {
    const exists = await repository.existsByTitle(title, currentId);

    if (exists) {
      throw new Error("Hospital Highlight title already exists.");
    }
  }

  /**
   * Update
   */
  async update(id, data) {
    const highlight = await repository.findById(id);

    if (!highlight) {
      throw new Error("Hospital Highlight not found.");
    }

    if (data.title) {
      await this.validateTitle(data.title, id);
    }

    return await repository.update(id, data);
  }

  /**
   * Delete
   */
  async delete(id) {
    const highlight = await repository.findById(id);

    if (!highlight) {
      throw new Error("Hospital Highlight not found.");
    }

    return await repository.delete(id);
  }

  /**
   * Status Toggle
   */
  async updateStatus(id, isActive) {
    const highlight = await repository.findById(id);

    if (!highlight) {
      throw new Error("Hospital Highlight not found.");
    }

    return await repository.updateStatus(id, isActive);
  }

  /**
   * Update Order
   */
  async updateOrder(id, order) {
    const highlight = await repository.findById(id);

    if (!highlight) {
      throw new Error("Hospital Highlight not found.");
    }

    return await repository.updateOrder(id, order);
  }

  /**
   * Website Listing
   */
  async getWebsiteData() {
    return await repository.getWebsiteData();
  }
}

module.exports = new HospitalHighlightService();
