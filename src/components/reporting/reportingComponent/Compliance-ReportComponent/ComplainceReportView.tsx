import React from "react";
import { MoreIcon } from "../../../../utils/icons";

const ComplainceReportView = () => {
  return (
    <div>
      {/* =============Summary Overview================ */}
      <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[1000px] h-[600px] ">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-text-secondary">Reports View</p>
          <MoreIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}
      </div>
      {/* =============Summary Overview================ */}
    </div>
  );
};

export default ComplainceReportView;
