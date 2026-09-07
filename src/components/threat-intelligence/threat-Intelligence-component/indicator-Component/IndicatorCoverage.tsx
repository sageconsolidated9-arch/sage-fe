import React from "react";
import CoverageCount from "../../../dashboard/dash-components/CoverageCount";

const IndicatorCoverage = () => {
  return (
    <div className=" bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-10">
      <div className="flex items-center gap-12">
        <CoverageCount
          text="Total IoCs"
          borderColor="border-primary-hover"
          textColor="text-primary-hover"
        >
          185,420
        </CoverageCount>

        <CoverageCount
          text="Active IoCs"
          borderColor="border-error"
          textColor="text-error"
        >
          122,300
        </CoverageCount>

        <CoverageCount
          text="Linked Alerts"
          borderColor="border-success"
          textColor="text-success"
        >
          11,842
        </CoverageCount>

        <CoverageCount
          text="Linked Incidents"
          borderColor="border-selection"
          textColor="text-selection"
        >
          1,492
        </CoverageCount>
      </div>
    </div>
  );
};

export default IndicatorCoverage;
