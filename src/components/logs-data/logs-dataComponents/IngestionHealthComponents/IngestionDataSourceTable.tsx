import React, { useMemo, useState } from "react";
import {
  mockIngestionDataSource,
  StatusActionIcon,
  StatusBadge,
  type IngestionDataSource,
} from "../../../../utils/ingestionHealthDataSource";
import type { ColumnDef } from "../../../../types/table";
import {
  ChevronLeft1Icon,
  ChevronRight1Icon,
  DisableIcon,
  EditIcon,
  MoreIcon,
  Plus1Icon,
  ResetIcon,
  ZapIcon,
} from "../../../../utils/icons";
import Table from "../../../../shared/Table";
import Input from "../../../props/Input";
import Dropdown from "../../../props/Dropdown";
import Drawer from "../../../props/Drawer";
import Button from "../../../props/Button";
import { useNavigate } from "react-router-dom";  

interface TableProps {
  data?: IngestionDataSource[];
}
const IngestionDataSourceTable = ({
  data = mockIngestionDataSource,
}: TableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate("/logs-&-data/data-quality");
  };

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

  // Logic: Filter data based on search and (optionally) category filters
  const filteredData = useMemo(() => {
    return mockIngestionDataSource.filter((IngestionDataSource) => {
      const matchesSearch = IngestionDataSource.Source.toLowerCase().includes(
        searchQuery.toLowerCase(),
      );

      // Add category filtering logic here if your data has categories
      return matchesSearch;
    });
  }, [searchQuery, filters]);

  const [selectedIngestionDataSource, setSelectedIngestionDataSource] =
    useState<IngestionDataSource | null>(null);

  // main table columns
  const columns: ColumnDef<IngestionDataSource>[] = [
    {
      key: "Source",
      header: "Source",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Source}</span>
      ),
    },
    {
      key: "Type",
      header: "Type",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Type}</span>
      ),
    },

    {
      key: "EventsToday",
      header: "Events Today",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.EventsToday}</span>
      ),
    },
    {
      key: "LastEvent",
      header: "Last Event",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.LastEvent}</span>
      ),
    },

    {
      key: "status",
      header: "Status",
      cell: (i) => <StatusBadge status={i.status} />,
    },

    {
      key: "action",
      header: "Actions",
      cell: (i) => (
        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIngestionDataSource(i);
            }}
          >
            <MoreIcon className="text-text-primary" />
          </button>
          {/* Status-specific icon rendered here */}
          <StatusActionIcon status={i.status} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex gap-8">
      {/* ============table============= */}
      <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[1000px] ">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-text-secondary">Data Source</p>
          <MoreIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}
        <div className="pb-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            {[
              { Icon: Plus1Icon, label: "View Logs", onClick: handleViewClick },
              { Icon: EditIcon, label: "Manage" },
              { Icon: DisableIcon, label: "Disconnect" },
              { Icon: ResetIcon, label: "Sync" },
            ].map(({ Icon, label, onClick }) => (
              <div
                key={label}
                className={`flex items-center gap-2 ${onClick ? "cursor-pointer hover:opacity-80" : ""}`}
                onClick={onClick}
              >
                <Icon className="text-primary-hover" />
                <p>{label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 ">
            <div className="max-w-md ">
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
        </div>
        
        <Table<IngestionDataSource>
          data={data}
          columns={columns}
          showHeader={false}
          showCheckboxes={true}
          showFooter={false}
          className="bg-transparent"
        />
        <div className="flex items-center gap-2 justify-end">
          <div className="flex items-center gap-2 text-input-border">
            <ChevronLeft1Icon />
            <ChevronRight1Icon />
          </div>
          <div>
            <p>Showing 1-4 of 1</p>
          </div>
        </div>

        {/* ===========Drawer============ */}
        <Drawer
          isOpen={!!selectedIngestionDataSource}
          onClose={() => setSelectedIngestionDataSource(null)}
          width="700px"
        >
          <Drawer.Header title="auth_logs" children />

          <div className="pl-7 ">
            <p className="text-text-primary text-base flex gap-2">
              Status:
              <span className="bg-success px-2 py-1 text-default tracking-[2%] text-xs rounded-lg">
                Active
              </span>
            </p>
          </div>
          <Drawer.Body>
            <div className="flex flex-col gap-8">
              {/* ===============Source Summary============ */}
              <div>
                <div className="text-text-primary text-base font-bold pb-3">
                  <p>Source Summary</p>
                </div>

                <div className="flex flex-col gap-2 text-base text-text-secondary">
                  <p className="flex justify-between">
                    File Name: <span className="font-bold">auth_logs</span>
                  </p>
                  <p className="flex justify-between">
                    Source Type:{" "}
                    <span className="font-bold">Search & Reporting</span>
                  </p>
                  <p className="flex justify-between">
                    Host: <span className="font-bold">Lab PC</span>
                  </p>
                  <p className="flex justify-between">
                    Index: <span className="font-bold">Default</span>
                  </p>
                </div>
              </div>
              {/* ===============Source Summary============ */}

              {/* ===========Statistics================== */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <p className="text-text-primary font-bold text-base">
                    Statistics
                  </p>
                  <p className="text-primary-hover text-sm">View all</p>
                </div>

                {/* ===============Statistics============ */}
                <div className="grid grid-cols-2 gap-2">
                  {/* ========1===== */}
                  <div className="bg-surface border-2 border-border rounded-[8.5px] py-[12.75px] px-[11.33px] w-[314px] flex flex-col gap-2 text-text-secondary">
                    <p className=" text-xs leading-[17px] font-bold">
                      Event Volume
                    </p>

                    <div>
                      <p className=" text-[9px]">Total events</p>
                      <p className=" text-[15px] font-bold">
                        5,893 <span className="font-normal"> events</span>
                      </p>
                    </div>

                    {/* border */}
                    <div className="border border-border"></div>
                    {/* border */}

                    <div>
                      <p className="text-[9px]">Trend</p>
                      <p className="text-[15px] ">
                        <span className="font-bold text-primary">+12% </span>
                        from previous period
                      </p>
                    </div>
                  </div>
                  {/* ========1===== */}
                  {/* ========2===== */}
                  <div className="bg-surface border-2 border-border rounded-[8.5px] py-[12.75px] px-[11.33px] w-[314px] flex flex-col gap-2 text-text-secondary">
                    <p className=" text-xs leading-[17px] font-bold">
                      Top Hosts
                    </p>

                    <div className="leading-[150%] text-[9px]">
                      <p className="flex gap-3">
                        DESKTOP-8BR6NKB <span className="font-bold">2,304</span>
                      </p>
                      <p className="flex gap-3">
                        SERVER-12
                        <span className="font-bold">1,102</span>
                      </p>
                      <p className="flex gap-3">
                        LAPTOP-22 <span className="font-bold">890 </span>
                      </p>
                    </div>

                    {/* border */}
                    <div className="border border-border"></div>
                    {/* border */}

                    <div>
                      <p className="text-[9px]">Filter by host</p>
                    </div>
                  </div>
                  {/* ========2===== */}
                  {/* ========3===== */}
                  <div className="bg-surface border-2 border-border rounded-[8.5px] py-[12.75px] px-[11.33px] w-[314px] flex flex-col gap-2 text-text-secondary">
                    <p className=" text-xs leading-[17px] font-bold">
                      Top Users
                    </p>

                    <div className="leading-[150%] text-[9px]">
                      <p className="flex gap-3">
                        admin
                        <span className="font-bold">980</span>
                      </p>
                      <p className="flex gap-3">
                        root
                        <span className="font-bold">740</span>
                      </p>
                      <p className="flex gap-3">
                        john
                        <span className="font-bold"> 320</span>
                      </p>
                    </div>
                  </div>
                  {/* ========3===== */}
                  {/* ========4===== */}
                  <div className="bg-surface border-2 border-border rounded-[8.5px] py-[12.75px] px-[11.33px] w-[314px] flex flex-col gap-2 text-text-secondary">
                    <p className=" text-xs leading-[17px] font-bold">
                      Severity Breakdown
                    </p>

                    <div className="leading-[150%] text-[9px]">
                      <p className="flex gap-3">
                        High
                        <span>60%</span>
                      </p>
                      <p className="flex gap-3">
                        Medium
                        <span>25%</span>
                      </p>
                      <p className="flex gap-3">
                        Low
                        <span>15%</span>
                      </p>
                    </div>
                  </div>
                  {/* ========4===== */}
                  {/* ========5===== */}
                  <div className="bg-surface border-2 border-border rounded-[8.5px] py-[12.75px] px-[11.33px] w-[314px] flex flex-col gap-2 text-text-secondary">
                    <p className=" text-xs leading-[17px] font-bold">
                      Status Breakdown
                    </p>

                    <div className="leading-[150%] text-[15px]">
                      <p className="flex gap-3">
                        Failed
                        <span className="font-bold">70%</span>
                      </p>
                      <p className="flex gap-3">
                        Success
                        <span className="font-bold">30%</span>
                      </p>
                    </div>
                  </div>
                  {/* ========5====== */}
                </div>
                {/* ===============Statistics============ */}
              </div>
              {/* ===========Statistics================== */}
            </div>
          </Drawer.Body>

          <Drawer.Footer className="justify-start">
            <div className="flex items-center gap-6 ">
              <div>
                <Button
                  paddingX="px-4"
                  paddingY="py-2"
                  height="min-h-[0px]"
                  icon={<ZapIcon className="text-white" />}
                >
                  Run Search
                </Button>
              </div>
              <div>
                <Button
                  paddingX="px-4"
                  paddingY="py-2"
                  height="min-h-[0px]"
                  variant="white"
                >
                  Investigation
                </Button>
              </div>
            </div>
          </Drawer.Footer>
        </Drawer>
        {/* ===========Drawer============ */}
      </div>
      {/* ============table============= */}

      {/* ============chart============ */}
      <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[500px]">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-text-secondary">
            Volume Over Time
          </p>
          <MoreIcon />
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}
      </div>
      {/* ============chart============ */}
    </div>
  );
};

export default IngestionDataSourceTable;
