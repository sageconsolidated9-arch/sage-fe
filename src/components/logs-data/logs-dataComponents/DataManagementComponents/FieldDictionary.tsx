import React, { useState } from "react";
import Button from "../../../props/Button";
import {
  AiChatIcon,
  ExportIcon,
  MarkIcon,
  RunIcon,
  XIcon,
} from "../../../../utils/icons";
import FieldDictionaryTable from "./FieldDictionaryTable";

const FieldDictionary = () => {
  const [activeModal, setActiveModal] = useState<
    "EXPORT_SCHEMA" | "COMPARE_VERSIONS" | "RUN" | null
  >(null);
  return (
    <div className="border border-border rounded-[18px] p-6 flex flex-col gap-8 bg-surface">
      {/* =====field list table===== */}
      <FieldDictionaryTable />

      {/* ===========Field Detail ========*/}
      <div className="border border-primary rounded-[18px] p-6 flex flex-col gap-4 bg-white">
        <div className="flex justify-between ">
          <p className="text-text-primary text-2xl">Field Detail</p>
          <button className="ml-4 flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer font-bold">
            <XIcon className="w-5 h-5" />
            <span>Close</span>
          </button>
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}
        <p className="text-text-primary text-xl tracking-[2%]">
          Header: <span className="font-bold">source.ip</span>
        </p>

        <p className="tracking-[2%] text-text-primary text-base">
          Definition:{" "}
          <span className="text-text-secondary text-xs">
            Source IP address associated with the event.
          </span>
        </p>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}

        <div className="flex gap-8">
          {/* ====1====== */}
          <div className="flex flex-col gap-3 w-[286px]">
            <p className="text-text-primary text-base tracking-[2%] font-bold">
              Values
            </p>
            <ul className="pl-8 list-disc flex flex-col gap-3">
              <li className="tracking-[2%] text-text-primary text-base">
                IP{" "}
                <span className="text-text-secondary font-bold text-xs bg-hover-light rounded-lg py-0.5 px-1.5">
                  10.0.5.22
                </span>
              </li>
              <li className="tracking-[2%] text-text-primary text-base">
                IP{" "}
                <span className="text-text-secondary font-bold text-xs bg-hover-light rounded-lg py-0.5 px-1.5">
                  185.92.11.3
                </span>
              </li>
            </ul>
          </div>
          {/* ====1====== */}

          {/* ====2====== */}
          <div className="flex flex-col gap-3 w-[371px]">
            <p className="text-text-primary text-base tracking-[2%] font-bold">
              Related Logs
            </p>
            <ul className="pl-8 list-disc flex flex-col gap-3">
              <li className="tracking-[2%] text-primary text-base underline">
                Palo Alto
              </li>
              <li className="tracking-[2%] text-primary text-base underline">
                AWS VPC Flow Logs
              </li>
              <li className="tracking-[2%] text-primary text-base underline">
                Defender ATP
              </li>
            </ul>
          </div>
          {/* ====2====== */}

          {/* ====3====== */}
          <div className="flex flex-col gap-3">
            <p className="text-text-primary text-base tracking-[2%] font-bold">
              Used In
            </p>
            <ul className="pl-8 list-disc flex flex-col gap-3">
              <li className="tracking-[2%] text-text-primary text-base">
                42 detection rules
              </li>
              <li className="tracking-[2%] text-text-primary text-base">
                12 playbooks
              </li>
              <li className="tracking-[2%] text-text-primary text-base">
                3 models
              </li>
            </ul>
          </div>
          {/* ====3====== */}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between ">
            <p className="text-base font-bold">AI Note</p>
            <p className="flex items-center gap-1.5 text-sm">
              <MarkIcon className="text-success" />
              AI Generated
            </p>
          </div>
          <div className="bg-default border border-border rounded-xl py-3 px-4 font-fira-code leading-6 h-[99px]">
            <p className="pb-2 ">
              This field is heavily used in lateral movement detections.
            </p>
          </div>
        </div>
      </div>
      {/* ===========Field Detail ========*/}

      {/* ==========Footer Actions======= */}
      <section className="mt-10">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl text-text-primary">Recommended Actions</h1>
        </div>
        <div className="flex items-center gap-4 pt-4">
          <div>
            <Button
              onClick={() => setActiveModal("EXPORT_SCHEMA")}
              paddingX="py-3"
              paddingY="px-6"
              icon={<ExportIcon className="text-white" />}
            >
              Export Schema
            </Button>
          </div>
          <div>
            <Button
              paddingX="py-3"
              paddingY="px-6"
              variant="white"
              icon={<AiChatIcon className="text-text-secondary" />}
            >
              Compare Versions
            </Button>
          </div>
          <div>
            <Button
              onClick={() => setActiveModal("RUN")}
              paddingX="py-3"
              paddingY="px-6"
              variant="white"
              icon={<RunIcon className="text-text-secondary" />}
            >
              Run Validation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FieldDictionary;
