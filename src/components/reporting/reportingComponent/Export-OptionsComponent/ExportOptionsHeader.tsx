import React from "react";
import Button from "../../../props/Button";
import {
  CreateExportIcon,
  ExportIcon,
  Refresh2Icon,
  RefreshIcon,
  ResetIcon,
  SettingsIcon,
} from "../../../../utils/icons";

const ExportOptionsHeader = () => {
  return (
    <div className=" bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-10 flex flex-col gap-7 ">
      <div className="text-text-muted text-base leading-6 font-medium">
        Reporting /
        <span className="text-text-primary text-base"> Export Options</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 max-w-[650px]">
          <p className="text-text-primary text-xl ">Export Options</p>
          <p className="text-text-secondary text-xs">
            Export dashboards, reports, and raw data in multiple formats for
            sharing, auditing, or external analysis. Choose from preset exports
            or build a custom export package.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              icon={<CreateExportIcon className="text-white" />}
            >
              Create Export Package
            </Button>
          </div>

          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              variant="white"
              icon={<Refresh2Icon />}
            >
              Download History
            </Button>
          </div>
          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              variant="white"
              icon={<SettingsIcon />}
            >
              <p></p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptionsHeader;
