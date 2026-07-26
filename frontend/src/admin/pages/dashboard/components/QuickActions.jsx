import { useNavigate } from "react-router-dom";

import {
  FaUserMd,
  FaHospital,
  FaImages,
  FaVideo,
  FaQuestionCircle,
  FaQuoteLeft,
} from "react-icons/fa";

import "./QuickActions.scss";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Doctor",
      icon: FaUserMd,
      color: "#3B82F6",
      path: "/doctors/create",
    },

    {
      title: "Add Service",
      icon: FaHospital,
      color: "#10B981",
      path: "/services/create",
    },

    {
      title: "Add Gallery",
      icon: FaImages,
      color: "#8B5CF6",
      path: "/gallery/create",
    },

    {
      title: "Add Video",
      icon: FaVideo,
      color: "#EC4899",
      path: "/videos/create",
    },

    {
      title: "Add FAQ",
      icon: FaQuestionCircle,
      color: "#F59E0B",
      path: "/faqs/create",
    },

    {
      title: "Add Testimonial",
      icon: FaQuoteLeft,
      color: "#EF4444",
      path: "/testimonials/create",
    },
  ];

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h5>Quick Actions</h5>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="quick-action-btn"
              onClick={() => navigate(action.path)}
            >
              <div
                className="quick-icon"
                style={{
                  background: `${action.color}20`,

                  color: action.color,
                }}
              >
                <Icon />
              </div>

              <span>{action.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
