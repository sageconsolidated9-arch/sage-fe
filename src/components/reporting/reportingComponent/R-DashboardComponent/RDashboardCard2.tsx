import React, { useState } from "react";
import { ChevronRight1Icon, MoreIcon } from "../../../../utils/icons";
import Button from "../../../props/Button";
import Dropdown from "../../../props/Dropdown";
import OrganizationalSummaryTable from "./OrganizationalSummaryTable";

const RDashboardCard2 = () => {
  const [filters, setFilters] = useState([
    "Last 24 Hours",
    "Endpoint",
    "Required",
    "Nework",
  ]);
  const filterOptions = [
    { label: "Workstations", value: "Workstations" },
    { label: "Role-based groups", value: "Role-based groups" },
    { label: "Cloud resources", value: "Cloud resources" },
    { label: "Network Logs", value: "Network Logs" },
    { label: "Last 24 Hours", value: "Last 24 Hours" },
  ];

  return (
    <div className="flex items-center gap-8">
      {/* ============Automation ROI & Playbook Efficiency================ */}
      <div className="flex flex-col gap-7 bg-surface py-[27px] px-[22px] rounded-[18px] relative shadow-shadow-card min-w-[500px] h-[450px] ">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-text-secondary">
            Automation ROI & Playbook Efficiency
          </p>
          <MoreIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}

        <p className="text-text-secondary text-xs">
          Automation continues to reduce human workload and improve MTTR
          efficiency.
        </p>

        <p className="text-text-primary text-2xl tracking-[-0.5%] font-bold">
          78% of incidents auto-resolved
        </p>

        {/* ========chart====== */}
        <div className="flex">
          <p className="bg-primary h-[20px] w-[300px] "></p>
          <p className="bg-selection h-[20px] w-[200px] "></p>
        </div>
        {/* ========chart====== */}

        <p className="text-text-secondary font-bold text-base flex items-center gap-1">
          <span className="bg-primary h-[20px] w-[17px] rounded-sm "></span>
          4,320 analyst hours saved
        </p>
        <p className="text-text-secondary font-bold text-base flex items-center gap-1">
          <span className="bg-selection h-[20px] w-[17px] rounded-sm "></span>
          12 playbooks triggered weekly
        </p>

        <div>
          <Button
            paddingX="px-4"
            paddingY="py-2"
            height="min-h-[0px]"
            variant="white"
          >
            <div className="flex items-center gap-2">
              <p> View Details</p>
              <ChevronRight1Icon />
            </div>
          </Button>
        </div>
      </div>
      {/* =============Automation ROI & Playbook Efficiency=============== */}

      {/* ============Organizational Summary=============== */}
      <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[1000px] h-[450px] ">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-text-secondary">
            Organizational Summary
          </p>
          <MoreIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}

        <div className="flex items-center justify-between">
          <p className="text-xs text-text-secondary">
            Executives can filter by department or region to assess localized
            security gaps.
          </p>

          <div>
            <Dropdown
              placeholder="Filter"
              options={filterOptions}
              selectedValues={filters}
              onSelect={(value) => {
                if (!filters.includes(value)) {
                  setFilters([...filters, value]);
                }
              }}
            />
          </div>
        </div>

        <OrganizationalSummaryTable />
      </div>
      {/* =============Organizational Summary================ */}
    </div>
  );
};

export default RDashboardCard2;
