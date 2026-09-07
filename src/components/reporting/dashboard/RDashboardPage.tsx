import React from "react";
import RDashboardHeader from "../reportingComponent/R-DashboardComponent/RDashboardHeader";
import RDashboardCard from "../reportingComponent/R-DashboardComponent/RDashboardCard";
import RDashboardCard2 from "../reportingComponent/R-DashboardComponent/RDashboardCard2";
import RDashboardCard3 from "../reportingComponent/R-DashboardComponent/RDashboardCard3";

const RDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <RDashboardHeader />
      <RDashboardCard />
      <RDashboardCard2 />
      <RDashboardCard3 />
    </div>
  );
};

export default RDashboardPage;
