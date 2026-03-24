import { SeverityIndicator, type Incident } from "../../../utils/incident";
import type { ColumnDef } from "../../../types/table";
import { ChevronRight1Icon, DetailsIcon } from "../../../utils/icons";
import Table from "../../../shared/Table";
import { useState } from "react";
import ViewSummaryModal from "../incident-modals/ViewSummaryModal";

interface TableProps {
  data: Incident[];
}

const ResolvedTable = ({ data }: TableProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const columns: ColumnDef<Incident>[] = [
    {
      key: "name",
      header: "Incident name",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.name}</span>
      ),
    },
    {
      key: "source",
      header: "Detection Source:",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.source}</span>
      ),
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
        <span className="text-text-secondary text-sm">{i.resolutionTime}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      cell: () => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white px-2 py-1 rounded-lg text-xs hover:bg-primary-hover transition-colors cursor-pointer"
          >
            View summary
          </button>
          <ChevronRight1Icon className="text-text-muted" />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table<Incident>
        data={data}
        columns={columns}
        showHeader={false}
        className="bg-transparent"
      />
      <ViewSummaryModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
export default ResolvedTable;
