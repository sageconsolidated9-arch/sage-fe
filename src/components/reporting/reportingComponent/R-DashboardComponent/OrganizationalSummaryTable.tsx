import React, { useState } from "react";
import {
  mockOrganizationalSummary,
  StatusBadge,
  type OrganizationalSummary,
} from "../../../../utils/OrganizationalSummary";
import type { ColumnDef } from "../../../../types/table";

import Table from "../../../../shared/Table";

interface TableProps {
  data?: OrganizationalSummary[];
}

const OrganizationalSummaryTable = ({
  data = mockOrganizationalSummary,
}: TableProps) => {
  const [selectedOrganizationalSummary, setselectedOrganizationalSummary] =
    useState<OrganizationalSummary | null>(null);

  // main table columns
  const columns: ColumnDef<OrganizationalSummary>[] = [
    {
      key: " BusinessUnit",
      header: " Business Unit",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.BusinessUnit}</span>
      ),
    },
    {
      key: "  Posture",
      header: " Posture",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Posture}</span>
      ),
    },

    {
      key: "OpenRisks",
      header: "Open Risks",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.OpenRisks}</span>
      ),
    },
    {
      key: "RecentIncidents",
      header: "Recent Incidents",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.RecentIncidents}</span>
      ),
    },

    {
      key: "status",
      header: "Status",
      cell: (i) => <StatusBadge status={i.status} />,
    },
  ];

  return (
    <div>
      <Table<OrganizationalSummary>
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

export default OrganizationalSummaryTable;
