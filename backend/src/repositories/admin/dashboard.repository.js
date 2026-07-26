const Doctor = require("../../models/Doctor");
const HospitalService = require("../../models/HospitalService");
const Appointment = require("../../models/Appointment");
const ContactInquiry = require("../../models/ContactInquiry");
const Gallery = require("../../models/Gallery");
const Video = require("../../models/Video");

class DashboardRepository {
  async getSummary() {
    const [doctors, services, appointments, contacts, gallery, videos] =
      await Promise.all([
        Doctor.countDocuments({ isDeleted: false }),

        HospitalService.countDocuments({ isDeleted: false }),

        Appointment.countDocuments({ isDeleted: false }),

        ContactInquiry.countDocuments({ isDeleted: false }),

        Gallery.countDocuments({ isDeleted: false }),

        Video.countDocuments({ isDeleted: false }),
      ]);

    return {
      doctors,
      services,
      appointments,
      contacts,
      gallery,
      videos,
    };
  }
}

module.exports = new DashboardRepository();
