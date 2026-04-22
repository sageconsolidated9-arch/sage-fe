import React from "react";
import Button from "../../../props/Button";
import { MonitorIcon } from "../../../../utils/icons";

const DataMangementHeader = ({ activeTab }: { activeTab: string }) => {
  // Configuration object for dynamic content based on the activeTab ID
  const headerContent: Record<string, { title: string; desc: string }> = {
    data: {
      title: "Data Normalization",
      desc: "Review how events are mapped into the unified schema. Identify unmapped fields, validation issues, and suggested improvements.",
    },
    field: {
      title: "Field Dictionary",
      desc: "Search and explore all canonical fields, their definitions, example values, and linked detections.",
    },
    enrichment: {
      title: "Enrichment Pipeline",
      desc: "View how events are enriched with contextual metadata to improve investigations.",
    },
    retention: {
      title: "Retention & Storage",
      desc: "Control how long logs are retained and where historical data is stored.",
    },
  };

  // Fallback to 'data' if activeTab doesn't match
  const current = headerContent[activeTab] || headerContent["data"];

  return (
    <div className="flex flex-col gap-4">
      <div className="text-text-muted text-base">
        Logs & Data /
        <span className="text-text-primary"> Data Management </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 max-w-[596px]">
          <p className="text-text-primary text-xl ">{current.title}</p>
          <p className="text-text-secondary text-xs">{current.desc}</p>
        </div>

        <div>
          <Button
            paddingX="px-4"
            paddingY="py-2"
            height="min-h-[0px]"
            icon={<MonitorIcon className="text-white" />}
          >
            Schema Change Monitor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataMangementHeader;
