import React from "react";
import {
  AiChatIcon,
  ChevronDown1Icon,
  ExportIcon,
  MoreIcon,
  ResetIcon,
} from "../../../../utils/icons";
import Button from "../../../props/Button";

const RDashboardCard3 = () => {
  return (
    <div>
      {/* =============Summary Overview================ */}
      <div className="flex flex-col gap-6 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[1000px] ">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-text-secondary">
            AI-Generated Summary
          </p>
          <MoreIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}

        <div className="flex gap-3 border border-primary bg-default rounded-xl p-2">
          <AiChatIcon className="text-primary-hover" />
          <div className="font-fira-code text-xs tracking-[-0.5%] leading-4 text-text-secondary h-[175px]">
            <p>“Overall risk posture remains stable this quarter.</p>
            <p>
              Incident response time improved by 22%, primarily due to
              automation in endpoint detection.
            </p>
            <p>
              {" "}
              Network segmentation gaps in Sales and Cloud environments present
              moderate risk exposure.”
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              icon={<ExportIcon />}
            >
              Download Summary
            </Button>
          </div>
          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              variant="white"
              icon={<ResetIcon />}
            >
              Generate New Insight
            </Button>
          </div>
        </div>
      </div>
      {/* =============Summary Overview================ */}
    </div>
  );
};

export default RDashboardCard3;
