const DiagnosticRepository = require("../../repositories/admin/diagnostic.repository");

class DiagnosticService {
  /**
   * Create Diagnostic Service
   */
  async create(data) {
    // Duplicate Title Check
    const exists = await DiagnosticRepository.findByTitle(data.title);

    if (exists) {
      throw new Error("Diagnostic Service title already exists.");
    }

    return await DiagnosticRepository.create({
      ...data,
      displayOrder: data.displayOrder || 0,
      status:
        data.status !== undefined
          ? data.status === true || data.status === "true"
          : true,
    });
  }

  /**
   * Admin Listing
   */
  async getAll(query = {}) {
    const filters = DiagnosticRepository.buildFilters(query);

    return await DiagnosticRepository.findAll(filters, {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sortBy: query.sortBy || "displayOrder",
      sortOrder: query.sortOrder || "asc",
    });
  }

  /**
   * Get By ID
   */
  async getById(id) {
    const diagnostic = await DiagnosticRepository.findById(id);

    if (!diagnostic) {
      throw new Error("Diagnostic Service not found.");
    }

    return diagnostic;
  }

  /**
   * Update
   */
  async update(id, data) {
    const diagnostic = await DiagnosticRepository.findById(id);

    if (!diagnostic) {
      throw new Error("Diagnostic Service not found.");
    }

    // Duplicate Title Check
    if (
      data.title &&
      data.title.toLowerCase() !== diagnostic.title.toLowerCase()
    ) {
      const exists = await DiagnosticRepository.findByTitle(data.title);

      if (exists) {
        throw new Error("Diagnostic Service title already exists.");
      }
    }

    return await DiagnosticRepository.update(id, {
      ...data,
      status:
        data.status !== undefined
          ? data.status === true || data.status === "true"
          : diagnostic.status,
    });
  }

  /**
   * Delete
   */
  async delete(id) {
    const diagnostic = await DiagnosticRepository.findById(id);

    if (!diagnostic) {
      throw new Error("Diagnostic Service not found.");
    }

    await DiagnosticRepository.delete(id);

    return true;
  }

  /**
   * Website Listing
   */
  async getPublicList() {
    return await DiagnosticRepository.getPublicList();
  }

  /**
   * Status Toggle
   */
  async updateStatus(id, status) {
    const diagnostic = await DiagnosticRepository.findById(id);

    if (!diagnostic) {
      throw new Error("Diagnostic Service not found.");
    }

    return await DiagnosticRepository.updateStatus(
      id,
      status === true || status === "true",
    );
  }

  /**
   * Display Order
   */
  async updateDisplayOrder(id, displayOrder) {
    const diagnostic = await DiagnosticRepository.findById(id);

    if (!diagnostic) {
      throw new Error("Diagnostic Service not found.");
    }

    return await DiagnosticRepository.updateDisplayOrder(
      id,
      Number(displayOrder),
    );
  }
}

module.exports = new DiagnosticService();
