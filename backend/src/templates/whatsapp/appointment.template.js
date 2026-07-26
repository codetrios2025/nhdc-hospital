class AppointmentWhatsappTemplate {
  admin(data) {
    return `🏥 *New Appointment*

👤 Patient: ${data.patientName}

📱 Mobile: ${data.mobile}

📧 Email: ${data.email || "-"}

📅 Date: ${data.appointmentDate}

🏥 Department:
${data.department?.name || "-"}

📝 Reason:
${data.reason || "-"}

Please login to Admin Panel.`;
  }

  confirmed(data) {
    return `Dear ${data.patientName},

Your appointment has been confirmed.

📅 ${data.appointmentDate}

Thank you,
Namokar Hospital`;
  }

  cancelled(data) {
    return `Dear ${data.patientName},

Your appointment has been cancelled.

Please contact hospital.

Namokar Hospital`;
  }
}

module.exports = new AppointmentWhatsappTemplate();
