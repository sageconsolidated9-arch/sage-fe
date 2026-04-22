import React from "react";
import { Select } from "../../../props/Select";
import { AiChatIcon, MarkIcon, MoreIcon } from "../../../../utils/icons";

const SelectSource = [
  {
    label:
      "Select Data Source… (Azure AD, Palo Alto, CrowdStrike, AWS CloudTrail…)",
    value: "SelectSource",
  },
];

const SampleLogsViewer = () => {
  return (
    <div className=" bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-10">
      <div className=" flex flex-col gap-8">
        <div className="max-w-[558px]">
          <Select
            label="Select Source"
            options={SelectSource}
            placeholder="Select Source"
            iconVariant="down1"
          />
        </div>

        {/* ======================= */}
        <div className="flex justify-between gap-8">
          {/* =======Raw Events============ */}
          <div className="flex flex-col gap-3 ">
            <div className="flex items-center justify-between">
              <p className="text-text-primary text-base font-bold">
                Raw Events
              </p>
              <div className="flex items-center gap-1">
                <MarkIcon className="text-success" />
                <p>Save Changes</p>
              </div>
            </div>

            <div className=" bg-default border border-border rounded-xl p-4  font-fira-code text-error h-[221px]">
              <div className="flex items-center gap-1 flex-wrap">
                <p>
                  <span>"src_ip"</span>
                  <span className="text-text-primary">:</span>
                  <span className="text-success">"10.1.22.4"</span>
                  <span className="text-text-primary">,</span>
                </p>
                <p>
                  <span> "dst_ip"</span>
                  <span className="text-text-primary">:</span>
                  <span className="text-success">"172.16.10.4"</span>
                  <span className="text-text-primary">,</span>
                </p>
                <p>
                  {" "}
                  <span>"action"</span>
                  <span className="text-text-primary">:</span>
                  <span className="text-success">"allow"</span>
                  <span className="text-text-primary">,</span>
                </p>
                <p>
                  <span>"bytes"</span>
                  <span className="text-text-primary">:</span>
                  <span>420</span>
                  <span className="text-text-primary">,</span>
                </p>
                <p>
                  {" "}
                  <span>"protocol"</span>
                  <span className="text-text-primary">:</span>
                  <span className="text-success">"tcp"</span>
                </p>
              </div>
            </div>
          </div>
          {/* =======Raw Events============ */}

          {/* =========Parsed Output======= */}
          <div className="flex flex-col gap-3 ">
            <div className="flex items-center justify-between">
              <p className="text-text-primary text-base font-bold">
                Parsed Output
              </p>
              <div className="flex items-center gap-1">
                <MarkIcon className="text-success" />
                <p>Save Changes</p>
              </div>
            </div>

            <div className=" bg-default border border-border rounded-xl p-4  font-fira-code text-error h-[221px] w-[700px]">
              <div className="flex flex-col gap-1">
                <p>
                  <span>"source"</span>
                  <span className="text-text-primary">:</span>
                  <span>"ip"</span>
                  <span className="text-text-primary">:</span>
                  <span className="text-success">"10.1.22.4"</span>
                  <span className="text-text-primary">,</span>
                </p>
                <p>
                  <span> "destination"</span>
                  <span className="text-text-primary">:</span>
                  <span> "ip"</span>
                  <span className="text-text-primary">:</span>
                  <span className="text-success">"172.16.10.4"</span>
                  <span className="text-text-primary">,</span>
                </p>

                <p>
                  {" "}
                  <span>"network"</span>
                  <span className="text-text-primary">:</span>
                  <span>"protocol"</span>
                  <span className="text-text-primary">:</span>
                  <span className="text-success">"tcp"</span>
                </p>
                <p>
                  {" "}
                  <span>"action"</span>
                  <span className="text-text-primary">:</span>
                  <span className="text-success">"allow"</span>
                  <span className="text-text-primary">,</span>
                </p>
              </div>
            </div>
          </div>
          {/* =========Parsed Output======= */}
        </div>
        {/* ======================= */}

        {/* ======================== */}
        <div className="flex flex-col gap-3 bg-default py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-50 h-[396px]">
          <div className="flex items-center justify-between">
            <p className="text-2xl text-text-secondary">AI Errors Highlight</p>
            <MoreIcon />
          </div>

          <div className="border border-border"></div>

          <div>
            <div className="flex items-center gap-3 pb-2">
              <AiChatIcon className="text-primary" />
              <p className="text-text-primary text-xl">Parsing failed</p>
            </div>
            <div className="flex items-center gap-2 pl-10">
              <li className="list-disc">
                “Line 41: Unexpected field
                <span className="text-primary">src </span>instead of{" "}
                <span className="text-primary">src_ip</span>”
              </li>
              <p className="bg-success text-default rounded-xl px-2 py-1 text-xs">
                {" "}
                Fix in Parser
              </p>
              <p className="bg-error text-default rounded-xl px-2 py-1 text-xs">
                {" "}
                Reject
              </p>
            </div>
          </div>
        </div>
        {/* ======================== */}
      </div>
    </div>
  );
};

export default SampleLogsViewer;
