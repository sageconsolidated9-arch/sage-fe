import React, { useState } from "react";
import {
  mockReportLibrary,
  StatusActionIcon,
  type ReportLibrary,
} from "../../../../utils/ReportLibraryCompliance";
import type { ColumnDef } from "../../../../types/table";
import Table from "../../../../shared/Table";
import { Import2Icon } from "../../../../utils/icons";

interface TableProps {
  data?: ReportLibrary[];
}

const ComplianceTab = ({ data = mockReportLibrary }: TableProps) => {
  const [selectedReportLibrary, setSelectedReportLibrary] =
    useState<ReportLibrary | null>(null);

  // main table columns
  const columns: ColumnDef<ReportLibrary>[] = [
    {
      key: " ReportName",
      header: " Report Name",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.ReportName}</span>
      ),
    },
    {
      key: "Framework",
      header: "Framework",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Framework}</span>
      ),
    },

    {
      key: "Coverage",
      header: "Coverage",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Coverage}</span>
      ),
    },
    {
      key: " LastGenerated",
      header: "Last Generated",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.LastGenerated}</span>
      ),
    },
    {
      key: " Owner",
      header: "Owner",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Owner}</span>
      ),
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
              setSelectedReportLibrary(i);
            }}
          >
            <Import2Icon className="text-selection" />
          </button>
          {/* Status-specific icon rendered here */}
          <StatusActionIcon status={i.Owner} />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-6">
      <Table<ReportLibrary>
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

export default ComplianceTab;
