import React from "react";
import AlertsChart from "./incident-components/AlertsChart";
import IncidentTableTabs from "./incident-components/IncidentTableTabs";

const IncidentPage = () => {
  return (
    <div>
      <AlertsChart />

      {/* incident table and tabs */}
      <IncidentTableTabs />
    </div>
  );
};

export default IncidentPage;
