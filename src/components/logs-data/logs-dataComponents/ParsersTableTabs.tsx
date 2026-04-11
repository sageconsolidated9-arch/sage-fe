import React from "react";
import Tabs from "../../props/Tabs";
import {
  ChevronLeft1Icon,
  ChevronRight1Icon,
  DisableIcon,
  EditIcon,
  ExportIcon,
  ZapIcon,
} from "../../../utils/icons";
import ParsersTable from "./ParsersTable";
import SampleLogsViewer from "./SampleLogsViewer";

interface ParserTableTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const ParsersTableTabs = ({
  activeTab,
  setActiveTab,
}: ParserTableTabsProps) => {
  const tabs = [
    { id: "parsers", label: "Parsers" },
    { id: "Sample-logs-viewer", label: "Sample Logs Viewer" },
  ];
  return (
    <div className="my-6">
      <div className="flex justify-between gap-6 flex-wrap items-start mb-6">
        <div className="flex items-center gap-5 flex-wrap">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="underline"
            className="p-2"
          />

          <div className="text-sm gap-6 flex items-center font-normal">
            {activeTab === "parsers" ? (
              <>
                {[
                  { Icon: EditIcon, label: "Edit" },
                  { Icon: ZapIcon, label: "Test " },
                  { Icon: ExportIcon, label: "Export" },
                  { Icon: DisableIcon, label: "Disable" },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1 cursor-pointer hover:opacity-80"
                  >
                    <Icon className="text-primary-hover" />
                    <p>{label}</p>
                  </div>
                ))}
              </>
            ) : (
              <>{/* Nothing to display */}</>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-input-border">
            <ChevronLeft1Icon />
            <ChevronRight1Icon />
          </div>
          <div>
            <p>Showing 1-4 of 1</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "parsers" ? (
          <div className="h-[50vh]">
            <ParsersTable />
          </div>
        ) : (
          <div className="h-fit">
            <SampleLogsViewer />
          </div>
        )}
      </div>
    </div>
  );
};

export default ParsersTableTabs;
