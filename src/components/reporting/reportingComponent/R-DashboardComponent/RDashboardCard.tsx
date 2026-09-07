import React from "react";
import { MoreIcon, SquaredInfoIcon } from "../../../../utils/icons";
import CoverageCount from "../../../dashboard/dash-components/CoverageCount";

const RDashboardCard = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      {/* =============Summary Overview================ */}
      <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[500px] h-[650px] ">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-text-secondary">
            Summary Overview
          </p>
          <MoreIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}

        <div className="flex flex-col gap-10 py-6 ">
          <CoverageCount
            text="Overall Security Posture"
            borderColor="border-success"
            textColor="text-success"
          >
            <span className="text-2xl font-bold tracking-[-0.5%] leading-10">
              92% (Healthy)
            </span>
          </CoverageCount>

          <CoverageCount
            text=" Active Incidents"
            borderColor="border-primary"
            textColor="text-primary"
          >
            <span className="text-2xl font-bold tracking-[-0.5%] leading-10">
              4 Critical, 7 Medium
            </span>
          </CoverageCount>

          <CoverageCount
            text="Mean Time to Resolution (MTTR)"
            borderColor="border-warning"
            textColor="text-warning"
          >
            <span className="text-2xl font-bold tracking-[-0.5%] leading-10">
              1.6 hrs
            </span>
          </CoverageCount>

          <CoverageCount
            text="Estimated Risk Reduction Value"
            borderColor="border-success"
            textColor="text-success"
          >
            <span className="text-2xl font-bold tracking-[-0.5%] leading-10">
              $1.2M saved
            </span>
          </CoverageCount>
        </div>

        <div className="flex items-center gap-2 text-warning mt-1 ">
          <SquaredInfoIcon />
          <p className=" text-xs">
            This query runs against endpoint logs to detect encoded PowerShell
            commands.
          </p>
        </div>
      </div>
      {/* =============Summary Overview================ */}

      {/* =============Posture & Risk Visualization================ */}
      <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[500px] h-[650px]">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-text-secondary">
            Posture & Risk Visualization
          </p>
          <MoreIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}
      </div>
      {/* ============Posture & Risk Visualization================ */}

      {/* ============Security Performance Over Time================ */}
      <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[500px] h-[650px]">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-text-secondary">
            Security Performance Over Time
          </p>
          <MoreIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}
      </div>
      {/* ============Security Performance Over Time=============== */}
    </div>
  );
};

export default RDashboardCard;
