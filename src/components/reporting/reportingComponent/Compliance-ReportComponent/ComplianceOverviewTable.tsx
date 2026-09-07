import React from "react";
import {
  mockComplianceOverview,
  StatusBadge,
  type ComplianceOverview,
} from "../../../../utils/ComplianceOverview";
import type { ColumnDef } from "../../../../types/table";
import Table from "../../../../shared/Table";

interface TableProps {
  data?: ComplianceOverview[];
}

const ComplianceOverviewTable = ({
  data = mockComplianceOverview,
}: TableProps) => {
  // main table columns
  const columns: ColumnDef<ComplianceOverview>[] = [
    {
      key: " Standard",
      header: " Standard",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Standard}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (i) => <StatusBadge status={i.status} />,
    },
    {
      key: "Details",
      header: " Details",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Details}</span>
      ),
    },
  ];

  return (
    <div>
      <Table<ComplianceOverview>
        data={data}
        columns={columns}
        showHeader={false}
        showCheckboxes={false}
        showFooter={false}
        className="bg-transparent"
      />
    </div>
  );
};

export default ComplianceOverviewTable;
