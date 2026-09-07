import React from "react";
import CoverageCount from "../../../dashboard/dash-components/CoverageCount";

const EntityCoverageCount = () => {
  return (
    <div className=" bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-10">
      {/*====== coverage count========== */}

      <div className="flex items-center gap-12">
        <CoverageCount
          text="Total Profiles"
          borderColor="border-primary-hover"
          textColor="text-primary-hover"
        >
          152
        </CoverageCount>

        <CoverageCount
          text="Active APT Groups"
          borderColor="border-error"
          textColor="text-error"
        >
          47
        </CoverageCount>

        <CoverageCount
          text="Linked Incidents"
          borderColor="border-success"
          textColor="text-success"
        >
          1208
        </CoverageCount>

        <CoverageCount
          text="Simulations Run"
          borderColor="border-selection"
          textColor="text-selection"
        >
          342
        </CoverageCount>
      </div>

      {/*====== coverage count========== */}
    </div>
  );
};

export default EntityCoverageCount;
