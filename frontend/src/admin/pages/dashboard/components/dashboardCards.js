import {
  FaUserMd,
  FaHospital,
  FaCalendarCheck,
  FaEnvelope,
  FaImages,
  FaVideo,
} from "react-icons/fa";

const dashboardCards = [
  {
    key: "doctors",
    title: "Doctors",
    color: "#3B82F6",
    icon: FaUserMd,
  },

  {
    key: "services",
    title: "Services",
    color: "#10B981",
    icon: FaHospital,
  },

  {
    key: "appointments",
    title: "Appointments",
    color: "#F59E0B",
    icon: FaCalendarCheck,
  },

  {
    key: "contacts",
    title: "Contact Inquiry",
    color: "#EF4444",
    icon: FaEnvelope,
  },

  {
    key: "gallery",
    title: "Gallery",
    color: "#8B5CF6",
    icon: FaImages,
  },

  {
    key: "videos",
    title: "Videos",
    color: "#EC4899",
    icon: FaVideo,
  },
];

export default dashboardCards;
