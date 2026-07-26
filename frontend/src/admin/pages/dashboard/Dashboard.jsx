import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SectionTitle from "../../components/common/SectionTitle/SectionTitle";
import DashboardSkeleton from "./components/DashboardSkeleton";
import WelcomeCard from "./components/WelcomeCard";
import SummaryCards from "./components/SummaryCards";
import QuickActions from "./components/QuickActions";

import { fetchDashboardSummary } from "../../redux/thunks/dashboardThunk";

import "./Dashboard.scss";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    loading,

    summary,

    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="dashboard-page">
      <SectionTitle title="Dashboard" subtitle="Welcome to NHDC Hospital CMS" />

      {error && <div className="alert alert-danger">{error}</div>}

      <WelcomeCard />

      <SummaryCards summary={summary} />

      <QuickActions />
    </div>
  );
};

export default Dashboard;
