import React, { useState } from "react";
import Tabs from "../../../props/Tabs";
import Input from "../../../props/Input";
import Dropdown from "../../../props/Dropdown";
import { XIcon } from "../../../../utils/icons";
import ComplianceTab from "./ComplianceTab";
import AuditLogTab from "./AuditLogTab";

interface ReportLibraryTableTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const ReportLibraryTableTabs = ({
  activeTab,
  setActiveTab,
}: ReportLibraryTableTabsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const tabs = [
    { id: "compliance", label: "Compliance" },
    { id: "auditLog", label: "Audit Log" },
  ];

  const [filters, setFilters] = useState([
    "Framework",
    "Status",
    "Owner",
    "Time Range",
  ]);
  const filterOptions = [
    { label: "Workstations", value: "Workstations" },
    { label: "Role-based groups", value: "Role-based groups" },
    { label: "Cloud resources", value: "Cloud resources" },
    { label: "Network Logs", value: "Network Logs" },
    { label: "Last 24 Hours", value: "Last 24 Hours" },
  ];

  //   // Logic: Filter data based on search and (optionally) category filters
  //   const filteredData = useMemo(() => {
  //     return mockIngestionDataSource.filter((IngestionDataSource) => {
  //       const matchesSearch = IngestionDataSource.Source.toLowerCase().includes(
  //         searchQuery.toLowerCase(),
  //       );

  //       // Add category filtering logic here if your data has categories
  //       return matchesSearch;
  //     });
  //   }, [searchQuery, filters]);

  const removeFilter = (filterToRemove: string) => {
    setFilters(filters.filter((f) => f !== filterToRemove));
  };

  return (
    <div className="my-2 ">
      <div className="flex items-center justify-between">
        <div className="flex justify-between gap-6 flex-wrap items-start mb-6">
          <div className="flex items-center gap-5 flex-wrap">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              variant="underline"
              className="p-2"
            />
          </div>
        </div>

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
      </div>

      <div className="mt-4">
        {activeTab === "compliance" ? (
          <div className="h-[50vh]">
            <p className="text-xs text-text-secondary">
              Compliance is automatically measured using available logs,
              configurations, and control mappings.
            </p>
            <ComplianceTab />
          </div>
        ) : (
          <div className="h-[50vh]">
            <AuditLogTab />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportLibraryTableTabs;
