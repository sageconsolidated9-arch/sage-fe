import { useState } from "react";
import Tabs from "../props/Tabs";
import EndpointProtectionCard from "./dash-components/EndpointProtectionCard";
import IdentityCard from "./dash-components/IdentityCard";
import KnownVulnerability from "./dash-components/KnownVulnerability";
import OverallSecurity from "./dash-components/OverallSecurity";
import ThreatCard from "./dash-components/ThreatCard";
import ContactsTable from "../ContactsTable";
import { mockContacts } from "../../utils/testData";
import ExamplePage from "../../shared/ExamplePage";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "assets",
      label: "Assets",
    },
    {
      id: "health",
      label: "Health",
    },
    {
      id: "identity",
      label: "Identity",
    },
  ];
  return (
    <>
      <div className="flex gap-5">
        <div className="w-full">
          <OverallSecurity count={40} />
        </div>

        <div className="w-[724px]">
          <KnownVulnerability />
        </div>
      </div>

      {/* cards */}
      <div className="grid grid-cols-3 gap-[18px] mt-[18px]">
        <IdentityCard />
        <EndpointProtectionCard />
        <ThreatCard />
      </div>

      {/* tab */}
      <div className="my-[18px]">
        <div className="bg-white rounded-3xl p-4 tab-shadow w-full">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="underline"
            className="p-2"
          />
        </div>

        <ExamplePage />

        <ContactsTable contacts={mockContacts} />
      </div>
    </>
  );
};

export default DashboardPage;
