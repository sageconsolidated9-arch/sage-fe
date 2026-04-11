import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "../../../types/table";
import {
  mockPlayBook,
  StatusBadge,
  type MyPlayBook,
} from "../../../utils/myPlayBook";
import Table from "../../../shared/Table";
import {
  CloneIcon,
  DisableIcon,
  EditIcon,
  MoreIcon,
  PauseIcon,
  ZapIcon,
} from "../../../utils/icons";
import Drawer from "../../props/Drawer";
import Checkbox from "../../props/Checkbox";
import {
  StatusBadges,
  type ExecutionHistory,
  mockExecutionHistory,
} from "../../../utils/PlayBookExcutionHistory";

interface TableProps {
  data?: MyPlayBook[];
}

const MyPlayBookTable = ({ data = mockPlayBook }: TableProps) => {
  const [selectedPlayBook, setSelectedPlayBook] = useState<MyPlayBook | null>(
    null,
  );
  const navigate = useNavigate();

  const handleIncidentQueueClick = () => {
    navigate("/incidents-&-alerts");
  };

  // Main Table Columns
  const columns: ColumnDef<MyPlayBook>[] = [
    {
      key: "name",
      header: "Playbook Name",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.name}</span>
      ),
    },
    {
      key: "triggers",
      header: "Triggers",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.triggers}</span>
      ),
    },
    {
      key: "lastRun",
      header: "Last Run",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.lastRun}</span>
      ),
    },
    {
      key: "rules",
      header: "Linked Rules",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.rules}</span>
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
              setSelectedPlayBook(i);
            }}
          >
            <MoreIcon className="text-text-secondary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <PauseIcon className="text-warning" />
          </button>
          <button
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <DisableIcon className="text-error" />
          </button>
        </div>
      ),
    },
  ];

  // Drawer Table Columns (Execution History)
  const historyColumns: ColumnDef<ExecutionHistory>[] = [
    {
      key: "DateTime",
      header: "Date & Time",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.DateTime}</span>
      ),
    },
    {
      key: "ExecutionID",
      header: "Execution ID",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.ExecutionID}</span>
      ),
    },
    {
      key: "Statuss",
      header: "Status",
      cell: (i) => <StatusBadges Statuss={i.Statuss} />,
    },
    {
      key: "Result",
      header: "Result",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Result}</span>
      ),
    },
  ];

  return (
    <>
      <Table<MyPlayBook>
        data={data}
        columns={columns}
        showHeader={false}
        showCheckboxes={true}
        showFooter={false}
        className="bg-transparent"
      />

      <Drawer
        isOpen={!!selectedPlayBook}
        onClose={() => setSelectedPlayBook(null)}
        width="700px"
      >
        <Drawer.Header title="Suspicious Login Response" />

        <Drawer.Body>
          <div className="flex flex-col gap-6">
            {/* ======= */}
            <div className="flex flex-col gap-3">
              {/* Status Row */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-secondary text-base">
                  Status:
                </span>
                <span className="bg-[#34A853] text-white px-3 py-1 rounded-lg text-xs font-medium">
                  Active
                </span>
              </div>

              {/* Type Row */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary text-base">
                  Type:
                </span>
                <span className="text-text-secondary text-base font-normal">
                  Adaptive
                </span>
              </div>
            </div>
            {/* Trigger & Overrides */}
            <div className="flex flex-col gap-3">
              <p className="text-xl font-normal">Trigger & Overrides</p>
              <div className="flex gap-1.5 items-center pl-7 text-xs">
                <li className="text-base text-text-primary">
                  Current triggers:
                </li>
                <p className="bg-hover-light px-2 py-0.5 rounded-xl">
                  Failed logins 5 within 10 mins
                </p>
                <p className="bg-hover-light px-2 py-0.5 rounded-xl">
                  Login from unusual geolocation
                </p>
              </div>
              {/* ======== */}
              <div className="flex gap-1.5 items-center pl-7 text-xs">
                <li className="text-base text-text-primary">Overrides:</li>
                <p className="bg-hover-light px-2 py-0.5 rounded-xl">
                  Pause execution on weekends
                </p>
                <p className="bg-hover-light px-2 py-0.5 rounded-xl">
                  Require analyst approval for admin accounts
                </p>
              </div>
            </div>

            {/* Execution History Table - FIXED HERE */}
            <div className="flex flex-col gap-3">
              <p className="text-xl font-normal">Execution History</p>

              <Table<ExecutionHistory>
                data={mockExecutionHistory}
                columns={historyColumns}
                showHeader={false}
                showFooter={false}
                className="bg-transparent"
              />
            </div>

            {/* Linked Rules */}
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xl text-text-primary">Linked Rules</p>
                <p className="text-text-secondary text-sm">
                  Linked rules use data from this feed to enrich detection and
                  correlation logic.
                </p>
              </div>
              <Checkbox label="Simulated phishing + privilege escalation attempt" />
              <Checkbox label="Unauthorized Login" />
            </div>
          </div>
        </Drawer.Body>

        <div className="px-8 pb-10">
          <div className="flex flex-col">
            <div
              className="underline text-primary-hover mb-8 cursor-pointer"
              onClick={handleIncidentQueueClick}
            >
              <p>View Full Incident in Incident Queue</p>
            </div>

            <div className="flex items-center gap-10">
              {[
                { Icon: ZapIcon, label: "Run Now" },
                { Icon: EditIcon, label: "Edit" },
                { Icon: CloneIcon, label: "Clone" },
                { Icon: DisableIcon, label: "Disable" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1 cursor-pointer hover:opacity-80"
                >
                  <Icon className="text-primary-hover" />
                  <p className="text-sm font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MyPlayBookTable;
