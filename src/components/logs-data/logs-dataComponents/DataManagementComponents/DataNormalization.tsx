import React, { useState } from "react";
import CoverageCount from "../../../dashboard/dash-components/CoverageCount";
import {
  AiChatIcon,
  ExportIcon,
  MoreIcon,
  RoundXIcon,
  RunIcon,
} from "../../../../utils/icons";
import Button from "../../../props/Button";
import DataNormalizationTable from "./DataNormalizationTable";

const DataNormalization = () => {
  const [activeModal, setActiveModal] = useState<
    "EXPORT_SCHEMA" | "COMPARE_VERSIONS" | "RUN" | null
  >(null);
  return (
    <div className="border border-border rounded-[18px] p-6 flex flex-col gap-8 bg-white">
      {/*====== coverage count========== */}
      <div className="flex items-center gap-12 py-7 ">
        <CoverageCount
          text="Schema Version"
          borderColor="border-text-text-secondary"
          textColor="text-text-secondary"
        >
          v1.6.2
        </CoverageCount>

        <CoverageCount
          text="Total Fields"
          borderColor="border-text-text-secondary"
          textColor="text-text-secondary"
        >
          184 Fields
        </CoverageCount>

        <CoverageCount
          text="Mapping Coverage"
          borderColor="border-success"
          textColor="text-success"
        >
          91.3% mapped
        </CoverageCount>

        <CoverageCount
          text="Unmapped Fields"
          borderColor="border-warning"
          textColor="text-warning"
        >
          32 unmapped
        </CoverageCount>
      </div>
      {/*====== coverage count========== */}

      {/* =======table==== */}
      <DataNormalizationTable />

      {/* ==========AI Auto============== */}
      <div className="flex flex-col gap-3 bg-default py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card h-[396px]">
        <div className="flex items-center justify-between">
          <p className="text-2xl text-text-secondary">
            AI Auto-Mapping Suggestions
          </p>
          <MoreIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}

        <div>
          <div className="flex items-center gap-3 pb-2">
            <AiChatIcon className="text-primary" />
            <p className="text-text-primary text-xl">AI Insight</p>
          </div>
          <div className="flex items-center gap-2 pl-10 pb-2">
            <li className="list-disc">List of suggested mappings with</li>
            <p className="bg-success text-default rounded-lg px-2 py-1 text-xs">
              {" "}
              Accept
            </p>
            <p className="bg-error text-default rounded-lg px-2 py-1 text-xs">
              {" "}
              Reject
            </p>
          </div>
          <div className="flex items-center gap-2 pl-10">
            <li className="list-disc">List of suggested mappings with</li>
            <p className="bg-success text-default rounded-lg px-2 py-1 text-xs">
              {" "}
              Accept
            </p>
            <p className="bg-error text-default rounded-lg px-2 py-1 text-xs">
              {" "}
              Reject
            </p>
          </div>
        </div>
      </div>
      {/* ======================== */}

      {/* ==========Footer Actions======= */}
      <section className="pt-10">
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

export default DataNormalization;
