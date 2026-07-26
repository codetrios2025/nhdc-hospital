const { validationResult } = require("express-validator");

const AppointmentService = require("../../services/admin/appointment.service");

class AppointmentController {
  /*
  |--------------------------------------------------------------------------
  | Website Booking / Create Appointment
  |--------------------------------------------------------------------------
  */

  async create(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Validation failed.",
          errors: errors.array(),
        });
      }

      const payload = {
        ...req.body,
      };

      if (req.user) {
        payload.createdBy = req.user._id || req.user.id;
      }

      const result = await AppointmentService.create(payload);

      return res.status(201).json({
        success: true,
        message: "Appointment booked successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Admin Listing
  |--------------------------------------------------------------------------
  */

  async getAll(req, res, next) {
    try {
      const result = await AppointmentService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Appointment list fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Appointment Details
  |--------------------------------------------------------------------------
  */

  async getById(req, res, next) {
    try {
      const result = await AppointmentService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Appointment details fetched successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Update Appointment
  |--------------------------------------------------------------------------
  */

  async update(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Validation failed.",
          errors: errors.array(),
        });
      }

      const payload = {
        ...req.body,
      };

      if (req.user) {
        payload.updatedBy = req.user._id || req.user.id;
      }

      const result = await AppointmentService.update(req.params.id, payload);

      return res.status(200).json({
        success: true,
        message: "Appointment updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Appointment
  |--------------------------------------------------------------------------
  */

  async delete(req, res, next) {
    try {
      await AppointmentService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Appointment deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Update Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(req, res, next) {
    try {
      const result = await AppointmentService.updateStatus(
        req.params.id,
        req.body.status,
      );

      return res.status(200).json({
        success: true,
        message: "Appointment status updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Save Admin Reply
  |--------------------------------------------------------------------------
  */

  async saveReply(req, res, next) {
    try {
      const result = await AppointmentService.saveReply(
        req.params.id,
        req.body.remarks,
      );

      return res.status(200).json({
        success: true,
        message: "Reply saved successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Statistics
  |--------------------------------------------------------------------------
  */

  async statistics(req, res, next) {
    try {
      const result = await AppointmentService.getStatistics();

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Today's Appointments
  |--------------------------------------------------------------------------
  */

  async today(req, res, next) {
    try {
      const result = await AppointmentService.getTodayAppointments();

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AppointmentController();
