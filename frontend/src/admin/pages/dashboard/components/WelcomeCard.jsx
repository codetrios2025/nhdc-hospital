import { useSelector } from "react-redux";

import "./WelcomeCard.scss";

const WelcomeCard = () => {
  const { user } = useSelector((state) => state.auth);

  const today = new Date();

  const greeting = () => {
    const hour = today.getHours();

    if (hour < 12) return "Good Morning";

    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  return (
    <div className="welcome-card">
      <div>
        <h2>
          {greeting()}, {user?.fullName || "Administrator"}
        </h2>

        <p>Welcome back to NHDC Hospital CMS</p>
      </div>

      <div className="welcome-info">
        <div>
          <span>Date</span>

          <strong>{today.toLocaleDateString()}</strong>
        </div>

        <div>
          <span>Role</span>

          <strong>{user?.role || "SUPER_ADMIN"}</strong>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
