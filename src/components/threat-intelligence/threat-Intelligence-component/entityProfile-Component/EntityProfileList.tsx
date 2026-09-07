import React from "react";
import { RunIcon, ZapIcon } from "../../../../utils/icons";

const EntityProfileList = () => {
  return (
    <div className=" bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-10 flex flex-col gap-5">
      <div>
        <div>
          <p className="text-xl text-text-secondary">Profiles List</p>
        </div>
      </div>

      <div className="border border-border"></div>

      <div>
        <div className="flex items-center gap-6 text-text-secondary text-xs">
          <div className="flex items-center gap-1">
            <RunIcon className="text-primary-hover" />
            <p>Run Simulation</p>
          </div>
          <div className="flex items-center gap-1">
            <p>Archive Profile</p>
          </div>
          <div className="flex items-center gap-1">
            <p>Tag in Detection Rules</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityProfileList;
