import React from "react";
import {
  DeleteIcon,
  EditIcon,
  MoreIcon,
  PauseIcon,
  ResetIcon,
} from "../../../../utils/icons";
import Checkbox from "../../../props/Checkbox";
import ComplianceOverviewTable from "./ComplianceOverviewTable";

const ComplianceReportAndOverview = () => {
  return (
    <div className="flex items-center gap-5">
      <div>
        {/* =============Summary Overview================ */}
        <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[760px] h-[400px] ">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-text-secondary">
              Scheduled Reports
            </p>
            <MoreIcon />
          </div>

          {/* border */}
          <div className="border border-border"></div>
          {/* border */}

          <div className=" flex flex-col gap-8 my-6">
            <div className="flex gap-2 items-center font-bold text-base text-text-secondary">
              <Checkbox label="" />
              <div className="bg-selection rounded-sm h-[23px] w-[17px]"></div>
              <p>SOC 2 — Weekly, sent Mondays at 08:00</p>
            </div>
            <div className="flex gap-2 items-center font-bold text-base text-text-secondary">
              <Checkbox label="" />
              <div className="bg-selection rounded-sm h-[23px] w-[17px]"></div>
              <p>ISO 27001 Summary — Monthly at 09:30</p>
            </div>
            <div className="flex gap-2 items-center font-bold text-base text-text-muted">
              <Checkbox label="" />
              <div className="bg-border rounded-sm h-[23px] w-[17px]"></div>
              <p>GDPR Data Access Logs — Daily at 06:00</p>
            </div>
          </div>

          {/* border */}
          <div className="border border-border "></div>
          {/* border */}

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <EditIcon className="text-primary-hover" />
              <p className="text-text-secondary text-sm">Edit</p>
            </div>
            <div className="flex items-center gap-1">
              <PauseIcon />
              <p className="text-text-secondary text-sm">Pause</p>
            </div>
            <div className="flex items-center gap-1">
              <DeleteIcon className="text-primary-hover" />
              <p className="text-text-secondary text-sm">Delete</p>
            </div>
          </div>
        </div>
        {/* =============Summary Overview================ */}
      </div>

      <div>
        {/* =============Summary Overview================ */}
        <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[760px] h-[400px] ">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-text-secondary">
              Compliance Overview
            </p>
            <ResetIcon />
          </div>

          {/* border */}
          <div className="border border-border"></div>
          {/* border */}

          <p className="text-text-secondary text-xs">
            Compliance is automatically measured using available logs,
            configurations, and control mappings.
          </p>

          <ComplianceOverviewTable />
        </div>
        {/* =============Summary Overview================ */}
      </div>
    </div>
  );
};

export default ComplianceReportAndOverview;
