import React from "react";
import Button from "../../../props/Button";
import {
  AngleDownIcon,
  ChevronDown1Icon,
  ExportIcon,
  PlusIcon,
  RefreshIcon,
  ReOrderIcon,
  ResetIcon,
} from "../../../../utils/icons";

const RDashboardHeader = () => {
  return (
    <div className=" bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-10 flex flex-col gap-7 ">
      <div className="text-text-muted text-base leading-6 font-medium">
        Reporting /
        <span className="text-text-primary text-base">
          {" "}
          Reporting Dashboards{" "}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 max-w-[650px]">
          <p className="text-text-primary text-xl ">Executive Dashboards</p>
          <p className="text-text-secondary text-xs">
            High-level security metrics for leadership visibility. Track
            organizational risk, incident trends, and response performance at a
            glance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              icon={<ResetIcon className="text-white" />}
            >
              Refresh
            </Button>
          </div>
          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              variant="white"
              icon={<ExportIcon />}
            >
              <div className="flex items-center gap-2">
                <p> Export</p>
                <ChevronDown1Icon />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RDashboardHeader;
