import React, { useState, useMemo } from "react";
import Tabs from "../../props/Tabs";
import InprogressTable from "./InprogressTable";
import ResolvedTable from "./ResolvedTable";
import Input from "../../props/Input";
import { Select } from "../../props/Select";
import { XIcon } from "../../../utils/icons";
import { mockIncidents } from "../../../utils/incident";
import Dropdown from "../../props/Dropdown";

const IncidentTableTabs = () => {
  const [activeTab, setActiveTab] = useState("inprogress");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState([
    "Last 24 Hours",
    "Workstations",
    "Role-based groups",
    "Cloud resources",
  ]);

  const filterOptions = [
    { label: "Workstations", value: "Workstations" },
    { label: "Role-based groups", value: "Role-based groups" },
    { label: "Cloud resources", value: "Cloud resources" },
    { label: "Network Logs", value: "Network Logs" },
    { label: "Last 24 Hours", value: "Last 24 Hours" },
  ];

  const tabs = [
    { id: "inprogress", label: "In Progress" },
    { id: "resolved", label: "Resolved" },
  ];

  // Logic: Filter data based on search and (optionally) category filters
  const filteredData = useMemo(() => {
    return mockIncidents.filter((incident) => {
      const matchesSearch = incident.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Add category filtering logic here if your data has categories
      return matchesSearch;
    });
  }, [searchQuery, filters]);

  const removeFilter = (filterToRemove: string) => {
    setFilters(filters.filter((f) => f !== filterToRemove));
  };

  return (
    <div className="bg-surface py-[27px] px-[30px] rounded-[18px] shadow-card">
      <div className="flex justify-between gap-6 flex-wrap items-start mb-6">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
          className="p-2"
        />

        <div className="flex flex-col items-end gap-4 flex-1">
          <div className="flex items-center gap-4 w-full justify-end">
            <div className="max-w-md w-full">
              <Input
                name="search"
                type="text"
                placeholder="Search Incidents & Alerts..."
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
            <button className="bg-white border border-gray-300 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all whitespace-nowrap">
              Generate Timeline
            </button>
          </div>

          {/* Active Filter Tags */}
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => (
              <div
                key={filter}
                className="flex items-center gap-2 rounded-lg bg-gray-100 py-1.5 px-3 border border-gray-200"
              >
                <span className="text-xs font-medium text-gray-600">
                  {filter}
                </span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="cursor-pointer hover:text-red-500 transition-colors"
                >
                  <XIcon className="text-gray-400 w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "inprogress" ? (
          <InprogressTable data={filteredData} />
        ) : (
          <ResolvedTable data={filteredData} />
        )}
      </div>
    </div>
  );
};

export default IncidentTableTabs;
