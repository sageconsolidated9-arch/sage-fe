import { Settings, ShieldAlert } from "lucide-react";
import Table from "../../../shared/Table";
import {
  AiChatIcon,
  ChevronRight1Icon,
  ChevronRightIcon,
  ShieldIcon,
} from "../../../utils/icons";
import {
  mockIncidents,
  SeverityIndicator,
  StatusBadge,
  type Incident,
} from "../../../utils/incident";
import type { ColumnDef } from "../../../types/table";

interface TableProps {
  data: Incident[];
}

const InprogressTable = ({ data }: TableProps) => {
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
      key: "timeDetected",
      header: "Time Detected",
      cell: (i) => (
        <span className="text-gray-500 text-sm">{i.timeDetected}</span>
      ),
    },
    {
      key: "status",
      header: "Status:",
      cell: (i) => (
        <div className="flex gap-2 items-center">
          {i.status === "New" && <StatusBadge status="New" />}
          <StatusBadge status={i.status} />
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      cell: () => (
        <div className="flex items-center gap-3">
          <ShieldIcon className="text-selection" />
          <AiChatIcon className="text-primary-hover" />
          <ChevronRight1Icon className="text-text-muted" />
        </div>
      ),
    },
  ];

  return (
    <Table<Incident>
      data={data}
      columns={columns}
      showHeader={false}
      className="bg-transparent"
    />
  );
};

export default InprogressTable;
