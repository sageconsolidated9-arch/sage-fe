import React, { useMemo, useState } from "react";
import Tabs from "../../../props/Tabs";
import DataNormalization from "./DataNormalization";
import FieldDictionary from "./FieldDictionary";
import EnrichmentPipeline from "./EnrichmentPipeline";
import RetentionStorage from "./RetentionStorage";
import { mockDataNormalization } from "../../../../utils/dataNormalizationtMapping";
import { XIcon } from "../../../../utils/icons";
import Dropdown from "../../../props/Dropdown";
import Input from "../../../props/Input";

interface DataTableTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const DataManagementTableTabs = ({
  activeTab,
  setActiveTab,
}: DataTableTabsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState([
    "Last 24 Hours",
    "Endpoint",
    "Required",
    "Nework",
  ]);

  const filterOptions = [
    { label: "Workstations", value: "Workstations" },
    { label: "Role-based groups", value: "Role-based groups" },
    { label: "Cloud resources", value: "Cloud resources" },
    { label: "Network Logs", value: "Network Logs" },
    { label: "Last 24 Hours", value: "Last 24 Hours" },
  ];

  const tabs = [
    { id: "data", label: "Data Normalization" },
    { id: "field", label: "Field Dictionary" },
    { id: "enrichment", label: "Enrichment Pipeline" },
    { id: "retention", label: "Retention & Storage" },
  ];

  // Logic: Filter data based on search and (optionally) category filters
  const filteredData = useMemo(() => {
    return mockDataNormalization.filter((DataNormalization) => {
      const matchesSearch = DataNormalization.RawField.toLowerCase().includes(
        searchQuery.toLowerCase(),
      );

      // Add category filtering logic here if your data has categories
      return matchesSearch;
    });
  }, [searchQuery, filters]);

  const removeFilter = (filterToRemove: string) => {
    setFilters(filters.filter((f) => f !== filterToRemove));
  };

  // Helper function to render the correct component
  const renderContent = () => {
    switch (activeTab) {
      case "data":
        return (
          <div className="h-[50vh]">
            <DataNormalization />
          </div>
        );
      case "field":
        return <FieldDictionary />;
      case "enrichment":
        return <EnrichmentPipeline />;
      case "retention":
        return <RetentionStorage />;
      default:
        return <DataNormalization />;
    }
  };

  return (
    <div className="my-6">
      <div className="flex justify-between gap-6 flex-wrap items-start mb-6">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
          className="p-2"
        />

        {activeTab === "field" && (
          <div className="flex flex-col items-end gap-4 flex-1">
            <div className="flex items-center gap-4 w-full justify-end">
              <div className="max-w-md w-full">
                <Input
                  name="search"
                  type="text"
                  placeholder="Search fields…"
                  search
                  searchPosition="left"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Dropdown
                  placeholder="Filter"
                  options={filterOptions}
                  selectedValues={filters}
                  onSelect={(value) => {
                    if (!filters.includes(value)) {
                      setFilters([...filters, value]);
                    }
                  }}
                />
              </div>
            </div>

            {/* Active Filter Tags */}
            <div className="flex flex-wrap items-center gap-3">
              {filters.map((filter) => (
                <div
                  key={filter}
                  className="flex items-center gap-2 rounded-lg bg-hover-light py-1 px-2 "
                >
                  <span className="text-xs font-medium text-text-primary">
                    {filter}
                  </span>
                  <button
                    onClick={() => removeFilter(filter)}
                    className="cursor-pointer"
                  >
                    <XIcon className="text-text-secondary w-[18px] h-[18px]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default DataManagementTableTabs;
