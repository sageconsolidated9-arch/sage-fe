import React from "react";
import Button from "../../../props/Button";
import {
  ChevronDown1Icon,
  ExportIcon,
  PlusIcon,
  ResetIcon,
  Schedule2Icon,
} from "../../../../utils/icons";

const ComplianceReportHeader = () => {
  return (
    <div className=" bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-10 flex flex-col gap-7 ">
      <div className="text-text-muted text-base leading-6 font-medium">
        Reporting /
        <span className="text-text-primary text-base"> Compliance Reports</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 max-w-[650px]">
          <p className="text-text-primary text-xl ">Compliance Reports</p>
          <p className="text-text-secondary text-xs">
            Generate and review security and compliance reports aligned with
            industry standards. Export evidence-ready documents for audits,
            regulatory reviews, and internal assessments.
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
              Generate Report
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
          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              variant="white"
              icon={<Schedule2Icon />}
            >
              Schedule Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReportHeader;
