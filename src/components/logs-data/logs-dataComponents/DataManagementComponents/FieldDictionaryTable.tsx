import React, { useState } from "react";
import {
  mockFieldDictionary,
  type FieldDictionary,
} from "../../../../utils/fieldDictionaryList";
import type { ColumnDef } from "../../../../store/tableStore";
import Table from "../../../../shared/Table";

interface TableProps {
  data?: FieldDictionary[];
}

const FieldDictionaryTable = ({ data = mockFieldDictionary }: TableProps) => {
  const [selectedFieldDictionary, setSelectedFieldDictionary] =
    useState<FieldDictionary | null>(null);
  // main table columns
  const columns: ColumnDef<FieldDictionary>[] = [
    {
      key: "Field",
      header: "Field",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Field}</span>
      ),
    },
    {
      key: "Category",
      header: "Category",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Category}</span>
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
      key: "Description",
      header: "Description",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Description}</span>
      ),
    },
    {
      key: "UsedBy",
      header: "Used By",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.UsedBy}</span>
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
              setSelectedFieldDictionary(i);
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
      <p className="text-text-primary text-2xl pb-3">Field</p>
      <div className="border border-input-border rounded-[18px] p-3">
        <Table<FieldDictionary>
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

export default FieldDictionaryTable;
