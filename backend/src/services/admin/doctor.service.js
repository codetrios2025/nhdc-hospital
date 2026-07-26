const slugify = require("slugify");

const ApiError = require("../../utils/ApiError");

const DoctorRepository = require("../../repositories/admin/doctor.repository");

const {
  getFileUrl,

  deleteFile,
} = require("../../helpers/file.helper");

class DoctorService {
  async create(data) {
    const slug = slugify(`${data.firstName}-${data.lastName}`, {
      lower: true,
      strict: true,
    });

    if (data.registrationNumber) {
      const existsresigtraionno =
        await DoctorRepository.findByRegistrationNumber(
          data.registrationNumber,
        );

      if (existsresigtraionno) {
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

  // async update(id, data) {
  //   const oldDoctor = await DoctorRepository.findById(id);
  //   if (data.profileImage && oldDoctor.profileImage) {
  //     deleteFile(`src/uploads/doctors/profile/${oldDoctor.profileImage}`);
  //   }
  //   return await DoctorRepository.update(id, data);
  // }

  async update(id, data) {
    delete data.deletedBy;
    delete data.deletedAt;
    delete data.createdBy;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.fullName;
    delete data.slug;
    delete data.__v;

    const oldDoctor = await DoctorRepository.findById(id);

    if (data.profileImage && oldDoctor?.profileImage) {
      deleteFile(`src/uploads/doctors/profile/${oldDoctor.profileImage}`);
    }

    return await DoctorRepository.update(id, data);
  }

  async delete(id, adminId) {
    return await DoctorRepository.softDelete(
      id,

      adminId,
    );
  }

  async details(id) {
    const doctor = await DoctorRepository.findById(id);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const doctorObject = doctor.toObject();

    doctorObject.profileImageUrl = getFileUrl(
      "doctors/profile",
      doctor.profileImage,
    );

    doctorObject.galleryUrls = doctor.gallery.map((image) =>
      getFileUrl("doctors/gallery", image),
    );

    return doctorObject;
  }

  async list(query) {
    const result = await DoctorRepository.getList(query);

    result.doctors = result.doctors.map((doctor) => {
      const item = doctor.toObject();

      item.profileImageUrl = getFileUrl("doctors/profile", item.profileImage);

      return item;
    });

    return result;
  }

  async status(id, status) {
    const doctor = await DoctorRepository.changeStatus(id, status);

    const item = doctor.toObject();

    item.profileImageUrl = getFileUrl("doctors/profile", item.profileImage);

    item.galleryUrls = item.gallery.map((image) =>
      getFileUrl("doctors/gallery", image),
    );

    return item;
  }

  async featured(id, featured) {
    const doctor = await DoctorRepository.toggleFeatured(id, featured);

    const item = doctor.toObject();

    item.profileImageUrl = getFileUrl("doctors/profile", item.profileImage);

    item.galleryUrls = item.gallery.map((image) =>
      getFileUrl("doctors/gallery", image),
    );

    return item;
  }

  formatDoctor(doctor) {
    const item = doctor.toObject();

    item.profileImageUrl = getFileUrl("doctors/profile", item.profileImage);

    item.galleryUrls = item.gallery.map((image) =>
      getFileUrl("doctors/gallery", image),
    );

    return item;
  }
}

module.exports = new DoctorService();
