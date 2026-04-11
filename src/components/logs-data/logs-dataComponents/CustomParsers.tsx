import React, { useState } from "react";
import Button from "../../props/Button";
import {
  ChevronDown1Icon,
  ExportIcon,
  ImportIcon,
  PlusIcon,
  ResetIcon,
} from "../../../utils/icons";
import NewParserModal from "../logs-data-modals/NewParserModal";

const CustomParsers = ({ activeTab }: { activeTab: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLogsView = activeTab === "Sample-logs-viewer";

  return (
    <div className="flex flex-col gap-4">
      {/* ============*/}
      <div className="text-text-muted text-base">
        Logs & Data /<span className="text-text-primary"> Custom Parsers </span>
      </div>

      {/* ========== */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4 ">
          <p className="text-text-primary text-xl">
            {isLogsView ? "Sample Logs Viewer  " : "Custom Parsers"}
          </p>
          <p className="text-text-secondary text-xs">
            {isLogsView
              ? "Select a data source to explore recent raw and parsed logs for validation and debugging."
              : "Define how raw logs are extracted, structured, and normalized. Create new parsers or improve existing ones with AI-assisted suggestions."}
          </p>
        </div>

        {/* BUTTONS WITH OVERLAY */}
        <div className="relative flex gap-2 items-center w-full justify-end flex-end">
          {/* Overlay logic */}
          {isLogsView && (
            <div className="absolute inset-0 z-10 bg-white/50 cursor-not-allowed rounded-md" />
          )}

          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              icon={<PlusIcon className="text-white" />}
              onClick={() => setIsOpen(true)}
              disabled={isLogsView}
            >
              NEW PARSER
            </Button>
          </div>
          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              variant="white"
              icon={<ImportIcon className="text-text-secondary" />}
              disabled={isLogsView}
            >
              <div className="flex items-center gap-2">IMPORT PARSER</div>
            </Button>
          </div>
          <div>
            <Button
              paddingX="px-4"
              paddingY="py-2"
              height="min-h-[0px]"
              variant="white"
              icon={<ResetIcon className="text-text-secondary" />}
              disabled={isLogsView}
            >
              RUN VALIDATION
            </Button>
          </div>
        </div>
      </div>

      {/* ================== */}
      <div>
        <NewParserModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default CustomParsers;
