const slugify = require("slugify");

const ApiError = require("../../utils/ApiError");

const DoctorRepository = require("../../repositories/admin/doctor.repository");

const { getFileUrl, deleteFile } = require("../../helpers/file.helper");

class DoctorService {
  /**
   * =====================================================
   * Create Doctor
   * =====================================================
   */
  async create(data) {
    const slug = slugify(`${data.firstName}-${data.lastName}`, {
      lower: true,
      strict: true,
    });

    if (data.registrationNumber) {
      const existsRegistrationNo =
        await DoctorRepository.findByRegistrationNumber(
          data.registrationNumber,
        );

      if (existsRegistrationNo) {
        throw new ApiError(409, "Registration number already exists.");
      }
    }

    const exists = await DoctorRepository.findBySlug(slug);

    if (exists) {
      throw new Error("Doctor already exists");
    }

    data.slug = slug;

    return await DoctorRepository.create(data);
  }

  /**
   * =====================================================
   * Update Doctor
   * =====================================================
   */
  async update(id, data) {
    // Remove fields that should not be changed manually
    delete data.deletedBy;
    delete data.deletedAt;
    delete data.createdBy;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.fullName;
    delete data.slug;
    delete data.__v;

    const oldDoctor = await DoctorRepository.findById(id);

    if (!oldDoctor) {
      throw new Error("Doctor not found");
    }

    // -------------------------------------------------
    // Delete old profile image when a new one is uploaded
    // -------------------------------------------------

    if (
      data.profileImage &&
      oldDoctor.profileImage &&
      data.profileImage !== oldDoctor.profileImage
    ) {
      await deleteFile(`doctors/profile/${oldDoctor.profileImage}`);
    }

    return await DoctorRepository.update(id, data);
  }

  /**
   * =====================================================
   * Delete Doctor
   * =====================================================
   */
  async delete(id, adminId) {
    return await DoctorRepository.softDelete(id, adminId);
  }

  /**
   * =====================================================
   * Doctor Details
   * =====================================================
   */
  async details(id) {
    const doctor = await DoctorRepository.findById(id);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return this.formatDoctor(doctor);
  }

  /**
   * =====================================================
   * Doctor Listing
   * =====================================================
   */
  async list(query) {
    const result = await DoctorRepository.getList(query);

    result.doctors = result.doctors.map((doctor) => this.formatDoctor(doctor));

    return result;
  }

  /**
   * =====================================================
   * Status
   * =====================================================
   */
  async status(id, status) {
    const doctor = await DoctorRepository.changeStatus(id, status);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return this.formatDoctor(doctor);
  }

  /**
   * =====================================================
   * Featured
   * =====================================================
   */
  async featured(id, featured) {
    const doctor = await DoctorRepository.toggleFeatured(id, featured);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return this.formatDoctor(doctor);
  }

  /**
   * =====================================================
   * Format Doctor Response
   * =====================================================
   */
  formatDoctor(doctor) {
    const item =
      typeof doctor.toObject === "function" ? doctor.toObject() : { ...doctor };

    item.profileImageUrl = getFileUrl("doctors/profile", item.profileImage);

    item.galleryUrls = (item.gallery || []).map((image) =>
      getFileUrl("doctors/gallery", image),
    );

    return item;
  }

  /**
   * =====================================================
   * Public Doctors
   * =====================================================
   */
  async getPublicDoctors() {
    const doctors = await DoctorRepository.getPublicDoctors();

    return doctors.map((doctor) => this.formatDoctor(doctor));
  }

  /**
   * =====================================================
   * Home Doctors
   * =====================================================
   */
  async getHomeDoctors() {
    const doctors = await DoctorRepository.getHomeDoctors();

    return doctors.map((doctor) => this.formatDoctor(doctor));
  }

  /**
   * =====================================================
   * Doctor By Slug
   * =====================================================
   */
  async getBySlug(slug) {
    const doctor = await DoctorRepository.findPublicBySlug(slug);

    if (!doctor) {
      throw new ApiError(404, "Doctor not found.");
    }

    return this.formatDoctor(doctor);
  }
}

module.exports = new DoctorService();
