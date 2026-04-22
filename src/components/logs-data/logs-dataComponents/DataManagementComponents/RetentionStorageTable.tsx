import React, { useState } from "react";
import {
  mockSourceBasedRetention,
  StatusBadge,
  type SourceBasedRetention,
} from "../../../../utils/retentionStorageList";
import type { ColumnDef } from "../../../../types/table";
import Table from "../../../../shared/Table";

interface TableProps {
  data?: SourceBasedRetention[];
}

const RetentionStorageTable = ({
  data = mockSourceBasedRetention,
}: TableProps) => {
  const [selectedSourceBasedRetention, setSelectedSourceBasedRetention] =
    useState<SourceBasedRetention | null>(null);
  // main table columns
  const columns: ColumnDef<SourceBasedRetention>[] = [
    {
      key: " Source",
      header: "Source",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Source}</span>
      ),
    },
    {
      key: "Retention",
      header: "Retention",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Retention}</span>
      ),
    },
    {
      key: "status",
      header: "Storage Tier",
      cell: (i) => <StatusBadge status={i.status} />,
    },
    {
      key: "CostEst",
      header: "Cost Est.",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.CostEst}</span>
      ),
    },

    {
      key: "Actions",
      header: "Actions",
      cell: (i) => (
        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSourceBasedRetention(i);
            }}
          >
            <span className="text-primary text-sm underline ">{i.Actions}</span>
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <p className="text-text-primary text-2xl pb-3">Source-Based Retention</p>
      <div className="border border-input-border rounded-[18px] p-3">
        <Table<SourceBasedRetention>
          data={data}
          columns={columns}
          showHeader={false}
          showCheckboxes={false}
          showFooter={false}
          className="bg-transparent"
        />
      </div>
    </div>
  );
};

export default RetentionStorageTable;
