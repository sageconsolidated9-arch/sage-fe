import React from "react";
import { DisableIcon, MarkIcon } from "../../../../utils/icons";

const IndicatorIocView = () => {
  return (
    <div className=" bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-10 flex flex-col gap-5">
      <div>
        <div>
          <p className="text-xl text-text-secondary">IoC View </p>
        </div>
      </div>

      <div className="border border-border"></div>

      <div>
        <div className="flex items-center gap-6 text-text-secondary text-xs">
          <div className="flex items-center gap-1">
            <MarkIcon className="text-success" />
            <p>Mark as Cleared</p>
          </div>
          <div className="flex items-center gap-1">
            <p>Mark as Under Review</p>
          </div>
          <div className="flex items-center gap-1">
            <DisableIcon className="text-error" />
            <p>Add to Blocklist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorIocView;
