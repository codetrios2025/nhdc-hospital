const slugify = require("slugify");

const DepartmentRepository = require("../../repositories/admin/department.repository");

class DepartmentService {
  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(data) {
    // Check duplicate name
    const normalizedName = data.name.trim();
    const existingDepartment =
      await DepartmentRepository.findByName(normalizedName);

    if (existingDepartment) {
      throw new Error("Department already exists.");
    }

    data.name = normalizedName;

    // Generate slug
    data.slug = slugify(data.name, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Ensure slug is unique
    const existingSlug = await DepartmentRepository.findBySlug(data.slug);

    if (existingSlug) {
      data.slug = `${data.slug}-${Date.now()}`;
    }

    return await DepartmentRepository.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Get All
  |--------------------------------------------------------------------------
  */

  async getAll(filters) {
    return await DepartmentRepository.findAll(filters);
  }

  /*
  |--------------------------------------------------------------------------
  | Get By ID
  |--------------------------------------------------------------------------
  */

  async getById(id) {
    const department = await DepartmentRepository.findById(id);

    if (!department) {
      throw new Error("Department not found.");
    }

    return department;
  }

  /*
  |--------------------------------------------------------------------------
  | Get By Slug
  |--------------------------------------------------------------------------
  */

  async getBySlug(slug) {
    const department = await DepartmentRepository.findBySlug(slug);

    if (!department) {
      throw new Error("Department not found.");
    }

    return department;
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(id, data) {
    const department = await DepartmentRepository.findById(id);

    if (!department) {
      throw new Error("Department not found.");
    }

    // Check duplicate name
    if (
      data.name &&
      data.name.toLowerCase() !== department.name.toLowerCase()
    ) {
      const existingDepartment = await DepartmentRepository.findByName(
        data.name,
      );

      if (existingDepartment) {
        throw new Error("Department already exists.");
      }

      // Regenerate slug
      data.slug = slugify(data.name, {
        lower: true,
        strict: true,
        trim: true,
      });

      const existingSlug = await DepartmentRepository.findBySlug(data.slug);

      if (existingSlug && existingSlug._id.toString() !== id) {
        data.slug = `${data.slug}-${Date.now()}`;
      }
    }

    return await DepartmentRepository.update(id, data);
  }

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  async delete(id) {
    const department = await DepartmentRepository.findById(id);

    if (!department) {
      throw new Error("Department not found.");
    }

    return await DepartmentRepository.delete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Website Listing
  |--------------------------------------------------------------------------
  */

  async getActiveDepartments() {
    return await DepartmentRepository.findActive();
  }

  /*
  |--------------------------------------------------------------------------
  | Dropdown
  |--------------------------------------------------------------------------
  */

  async getDropdown() {
    return await DepartmentRepository.dropdown();
  }

  /*
  |--------------------------------------------------------------------------
  | Statistics
  |--------------------------------------------------------------------------
  */

  async getStatistics() {
    return await DepartmentRepository.statistics();
  }
}

module.exports = new DepartmentService();
