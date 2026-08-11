/**
 * Format appointment date
 *
 * Example:
 * 2026-08-12T00:00:00.000Z
 * =>
 * 12 August 2026
 */
const formatAppointmentDate = (date) => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(parsedDate);
};

/**
 * Format appointment time
 *
 * Examples:
 * 19:00 => 7 PM
 * 09:30 => 9:30 AM
 * 14:15 => 2:15 PM
 */
const formatAppointmentTime = (time) => {
  if (!time) {
    return "";
  }

  // Already a Date object / ISO datetime
  if (time instanceof Date) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(time);
  }

  const value = String(time).trim();

  // HH:mm format
  const match = value.match(/^(\d{1,2}):(\d{2})$/);

  if (match) {
    let hours = Number(match[1]);
    const minutes = Number(match[2]);

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return minutes === 0
      ? `${hours} ${period}`
      : `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
  }

  // ISO date/time string
  const parsedDate = new Date(value);

  if (!Number.isNaN(parsedDate.getTime())) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(parsedDate);
  }

  // If it is something unexpected, return as-is
  return value;
};

module.exports = {
  formatAppointmentDate,
  formatAppointmentTime,
};
