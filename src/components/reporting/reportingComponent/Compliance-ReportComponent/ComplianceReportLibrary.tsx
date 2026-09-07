import React, { useState } from "react";
import { ResetIcon } from "../../../../utils/icons";
import ReportLibraryTableTabs from "./ReportLibraryTableTabs";

const ComplianceReportLibrary = () => {
  const [activeTab, setActiveTab] = useState("compliance");
  return (
    <div>
      {/* =============Summary Overview================ */}
      <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[1000px] h-[600px] ">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-text-secondary">
            Report Library
          </p>
          <ResetIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}

        <ReportLibraryTableTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      {/* =============Summary Overview================ */}
    </div>
  );
};

export default ComplianceReportLibrary;
