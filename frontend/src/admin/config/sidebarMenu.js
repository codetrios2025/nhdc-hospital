import {
  FaHome,
  FaHospital,
  FaUserMd,
  FaStethoscope,
  FaBlog,
  FaVideo,
  FaImages,
  FaQuoteLeft,
  FaQuestionCircle,
  FaCalendarCheck,
  FaEnvelope,
  FaUsers,
  FaUserShield,
  FaPhotoVideo,
  FaSearch,
  FaChartBar,
  FaThLarge,
  FaUsersCog,
  FaCog,
} from "react-icons/fa";

const sidebarMenu = [
  {
    title: "Dashboard",
    icon: FaHome,
    path: "/admin/dashboard",
  },

  {
    title: "Website CMS",
    icon: FaHospital,
    children: [
      {
        title: "Homepage",
        path: "/cms/homepage",
      },
      {
        title: "About Us",
        path: "/cms/about",
      },
      {
        title: "Header",
        path: "/cms/header",
      },
      {
        title: "Footer",
        path: "/cms/footer",
      },
      {
        title: "Contact",
        path: "/cms/contact",
      },
    ],
  },
  {
    title: "Departments",
    icon: FaHospital,
    path: "/admin/departments",
  },
  {
    title: "Doctors",
    icon: FaUserMd,
    path: "/admin/doctors",
  },
  {
    title: "Home Features",
    icon: FaThLarge,
    path: "/admin/home-features",
  },
  {
    title: "Services",
    icon: FaStethoscope,
    path: "/admin/services",
  },

  {
    title: "Health Tips",
    icon: FaBlog,
    path: "/admin/health-tips",
  },

  {
    title: "Blogs",
    icon: FaBlog,
    path: "/admin/blogs",
  },

  {
    title: "Videos",
    icon: FaVideo,
    path: "/admin/videos",
  },

  {
    title: "Gallery",
    icon: FaImages,
    path: "/admin/gallery",
  },

  {
    title: "Testimonials",
    icon: FaQuoteLeft,
    path: "/admin/testimonials",
  },

  {
    title: "FAQs",
    icon: FaQuestionCircle,
    path: "/admin/faqs",
  },

  {
    title: "Appointments",
    icon: FaCalendarCheck,
    path: "/admin/appointments",
  },

  {
    title: "Contact Inquiry",
    icon: FaEnvelope,
    path: "/admin/contacts",
  },

  {
    title: "Users",
    icon: FaUsers,
    path: "/admin/users",
  },

  {
    title: "Roles & Permissions",
    icon: FaUserShield,
    path: "/admin/roles",
  },

  {
    title: "Media Library",
    icon: FaPhotoVideo,
    path: "/admin/media",
  },

  {
    title: "SEO",
    icon: FaSearch,
    path: "/admin/seo",
  },

  {
    title: "Reports",
    icon: FaChartBar,
    path: "/admin/reports",
  },

  {
    title: "Settings",
    icon: FaCog,
    path: "/admin/settings",
  },
];

export default sidebarMenu;
