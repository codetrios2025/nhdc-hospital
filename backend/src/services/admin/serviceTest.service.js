const fs = require("fs");
const path = require("path");

const repository = require("../../repositories/admin/serviceTest.repository");

class ServiceTestService {
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
      "service-tests",
      imageName,
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(data) {
    return await repository.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Admin Listing
  |--------------------------------------------------------------------------
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

  /*
  |--------------------------------------------------------------------------
  | Details
  |--------------------------------------------------------------------------
  */

  async getById(id) {
    const test = await repository.findById(id);

    if (!test) {
      throw new Error("Service test not found.");
    }

    return test;
  }

  /*
  |--------------------------------------------------------------------------
  | Get Tests By Service
  |--------------------------------------------------------------------------
  */

  async getByService(serviceId) {
    return await repository.findByService(serviceId);
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(id, data) {
    const test = await repository.findById(id);

    if (!test) {
      throw new Error("Service test not found.");
    }

    /*
    |--------------------------------------------------------------------------
    | Replace Image
    |--------------------------------------------------------------------------
    */

    if (data.image && test.image) {
      await this.deleteImage(test.image);
    }

    return await repository.update(id, data);
  }

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  async delete(id) {
    const test = await repository.findById(id);

    if (!test) {
      throw new Error("Service test not found.");
    }

    if (test.image) {
      await this.deleteImage(test.image);
    }

    return await repository.delete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(id, status) {
    return await repository.updateStatus(id, status);
  }

  /*
  |--------------------------------------------------------------------------
  | Display Order
  |--------------------------------------------------------------------------
  */

  async updateDisplayOrder(id, displayOrder) {
    return await repository.updateDisplayOrder(id, displayOrder);
  }

  /*
  |--------------------------------------------------------------------------
  | Website Listing
  |--------------------------------------------------------------------------
  */

  async getPublicTests(serviceId) {
    return await repository.getPublicTests(serviceId);
  }
}

module.exports = new ServiceTestService();
