import dashboardCards from "./dashboardCards";

import StatCard from "../../../components/common/StatCard/StatCard";

import "./SummaryCards.scss";

const SummaryCards = ({ summary = {} }) => {
  return (
    <div className="dashboard-summary-grid">
      {dashboardCards.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          value={summary[card.key] ?? 0}
          icon={<card.icon />}
          color={card.color}
        />
      ))}
    </div>
  );
};

export default SummaryCards;
