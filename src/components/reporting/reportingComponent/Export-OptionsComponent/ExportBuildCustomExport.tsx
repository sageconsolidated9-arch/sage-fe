import React from "react";
import {
  ChevronDown1Icon,
  ChevronLeft1Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MarkIcon,
  MoreIcon,
  ResetIcon,
} from "../../../../utils/icons";
import Checkbox from "../../../props/Checkbox";
import { Select } from "../../../props/Select";
import Button from "../../../props/Button";

const ExportBuildCustomExport = () => {
  const FileFormat = [{ label: "Standard (small)", value: "resourceTier" }];

  const ExportType = [{ label: "Private (only me)", value: "accessControl" }];

  const EndpointUrl = [{ label: "Endpoint URL", value: "Select Auth Method" }];

  return (
    <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[1000px] ">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-text-secondary">
          Build Custom Export
        </p>
        <MoreIcon />
      </div>

      {/* border */}
      <div className="border border-border"></div>
      {/* border */}

      <p className="text-xs text-text-secondary">
        Select the exact items, time range, and data sources you want to
        include.
      </p>

      <div className="border border-border rounded-[18px] p-[22px]">
        <div className="flex items-center gap-2 pb-6">
          <p>Time Range</p>
          <ChevronDown1Icon />
        </div>

        <div className="flex gap-8">
          {/* ===========Export Type========== */}
          <div className="border border-border rounded-[22px] p-[18px] w-[500px] flex flex-col gap-4">
            <Select
              label="Export Type"
              options={ExportType}
              placeholder="Private (only me)"
              iconVariant="down1"
            />

            <div className="flex flex-col gap-3.5">
              <p className="text-text-secondary font-bold">Data Sources</p>
              <Checkbox label="Azure AD" />
              <Checkbox label="EDR (Defender ATP, CrowdStrike)" />
              <Checkbox label="Firewalls" />
              <Checkbox label="Email Security" />
              <Checkbox label="Threat Intel Feeds" />
            </div>

            <p className="text-selection text-base">Load more Data Sources →</p>

            <Select
              label="File Format"
              options={FileFormat}
              placeholder="Standard (small)"
              iconVariant="down1"
            />
          </div>
          {/* ===========Export Type========== */}

          {/* ==========API Integration========== */}
          <div className="border border-border rounded-[18px] p-[22px] w-[600px] flex flex-col gap-4">
            <p className="font-bold text-sm"> API Integration</p>

            <Select
              label="Current Token"
              options={EndpointUrl}
              placeholder="Select Auth Method"
              iconVariant="down1"
            />

            <button className=" text-sm text-text-primary cursor-pointer flex items-center gap-1">
              <ResetIcon className="text-warning" />
              Regenerate Token
            </button>

            <Select
              label="Endpoint URL"
              options={EndpointUrl}
              placeholder="Select Auth Method"
              iconVariant="down1"
            />

            <div>
              <p className="pb-2">Api Key</p>
              <div className="bg-default border border-border font-fira-code text-error h-[128px] p-5 flex flex-col gap-5 justify-center rounded-lg leading-5 tracking-[0.5%]">
                <p>
                  curl -X GET "https://api.sageshield.io/reports?
                  type=exec_dashboard"
                </p>
                <p className="flex items-center">
                  -H ”Authorization: Bearer <ChevronLeftIcon />
                  /API_KEY
                  <ChevronRightIcon /> "
                </p>
                {/* <p></p> */}
              </div>
            </div>
          </div>
          {/* ==========API Integration========== */}
        </div>

        <div className="mt-6">
          <Button
            paddingX="px-4"
            paddingY="py-2"
            height="min-h-[0px]"
            icon={<MarkIcon className="text-white" />}
          >
            Generate Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportBuildCustomExport;
