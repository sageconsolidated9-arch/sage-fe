import React from "react";
import {
  mockIncidents,
  SeverityIndicator,
  StatusBadge,
  type Incident,
} from "../../../utils/incident";
import type { ColumnDef } from "../../../types/table";
import { ChevronRightIcon } from "../../../utils/icons";
import Table from "../../../shared/Table";

interface TableProps {
  data: Incident[];
}

const ResolvedTable = ({ data }: TableProps) => {
  const columns: ColumnDef<Incident>[] = [
    {
      key: "name",
      header: "Incident name",
      cell: (i) => <span className="text-gray-600 text-sm">{i.name}</span>,
    },
    {
      key: "source",
      header: "Detection Source:",
      cell: (i) => <span className="text-gray-500 text-sm">{i.source}</span>,
    },
    {
      key: "severity",
      header: "Severity",
      cell: (i) => <SeverityIndicator level={i.severity} />,
    },
    {
      key: "resolutionTime",
      header: "Resolution Time",
      cell: (i) => (
        <span className="text-gray-500 text-sm">{i.resolutionTime}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="bg-orange-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-orange-700 transition-colors">
            View summary
          </button>
          <ChevronRightIcon className="text-gray-400" />
        </div>
      ),
    },
  ];

  return (
    <Table<Incident>
      data={data}
      columns={columns}
      showHeader={true}
      className="bg-transparent"
    />
  );
};
export default ResolvedTable;
