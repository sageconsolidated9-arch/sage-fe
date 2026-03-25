import React from "react";
import AlertsChart from "./incident-components/AlertsChart";
import IncidentTableTabs from "./incident-components/IncidentTableTabs";
import IncidentStats from "./incident-components/IncidentStats";

const IncidentPage = () => {
  const [activeTab, setActiveTab] = React.useState("inprogress");
  return (
    <div className="flex flex-col gap-6">
      <IncidentStats activeTab={activeTab} />
      <AlertsChart />
      <IncidentTableTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default IncidentPage;
