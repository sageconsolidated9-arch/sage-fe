import React, { useState } from "react";
import {
  mockDataNormalization,
  StatusBadge,
  type DataNormalization,
} from "../../../../utils/dataNormalizationtMapping";
import type { ColumnDef } from "../../../../store/tableStore";
import Table from "../../../../shared/Table";
import Drawer from "../../../props/Drawer";
import { MarkIcon, SquaredInfoIcon } from "../../../../utils/icons";

interface TableProps {
  data?: DataNormalization[];
}

const DataManagementTable = ({ data = mockDataNormalization }: TableProps) => {
  const [selectedDataNormalization, setSelectedDataNormalization] =
    useState<DataNormalization | null>(null);

  // main table columns
  const columns: ColumnDef<DataNormalization>[] = [
    {
      key: " RawField",
      header: " Raw Field",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.RawField}</span>
      ),
    },
    {
      key: "NormalizedField",
      header: "Normalized Field",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.NormalizedField}</span>
      ),
    },

    {
      key: "DataSource",
      header: "Data Source",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.DataSource}</span>
      ),
    },
    {
      key: "Confidence",
      header: "Confidence",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Confidence}</span>
      ),
    },

    {
      key: "status",
      header: "Status",
      cell: (i) => <StatusBadge status={i.status} />,
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
              setSelectedDataNormalization(i);
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
      <p className="text-text-primary text-2xl pb-3">Mapping</p>
      <div className="border border-input-border rounded-[18px] p-3">
        <Table<DataNormalization>
          data={data}
          columns={columns}
          showHeader={false}
          showCheckboxes={false}
          showFooter={false}
          className="bg-transparent"
        />
      </div>

      <Drawer
        isOpen={!!selectedDataNormalization}
        onClose={() => setSelectedDataNormalization(null)}
        width="650px"
      >
        <Drawer.Header title="Field Mapping: src_ip → source.ip" children />

        <div className="pl-7 ">
          <p className="text-text-primary text-base flex gap-2">
            Status:
            <span className="bg-success px-2 py-1 text-default tracking-[2%] text-xs rounded-lg">
              Mapped
            </span>
          </p>
        </div>
        <Drawer.Body>
          <div>
            {" "}
            {/* ====overview ==*/}
            <div>
              <p className="font-bold text-text-primary text-base pb-3">
                Overview
              </p>
              <div className="list-disc flex flex-col gap-4 pl-7">
                <li className="text-text-primary">
                  Raw field:{" "}
                  <span className="text-text-secondary font-bold bg-hover-light rounded-lg py-0.5 px-1.5">
                    src_ip
                  </span>
                </li>
                <li className="text-text-primary">
                  Normalized field:{" "}
                  <span className="text-text-secondary font-bold bg-hover-light rounded-lg py-0.5 px-1.5">
                    source.ip
                  </span>
                </li>
                <li className="text-text-primary">
                  Confidence:{" "}
                  <span className="text-text-secondary font-bold bg-hover-light rounded-lg py-0.5 px-1.5">
                    97%
                  </span>
                </li>
                <li className="text-text-primary">
                  Data sources using this:
                  <span className="text-text-secondary font-bold bg-hover-light rounded-lg py-0.5 px-1.5">
                    12
                  </span>
                </li>
              </div>
            </div>
            {/* ====overview ==*/}
            <div>
              <div className="flex items-center justify-between pt-10 pb-5">
                <p className="text-base font-bold">Sample Logs</p>
                <p className="flex items-center gap-1.5 text-sm">
                  <MarkIcon className="text-success" />
                  Apply Mapping
                </p>
              </div>
              <div className="bg-default border border-border rounded-xl py-3 px-4 font-fira-code leading-6">
                <p className="pb-2 ">
                  “This field strongly resembles an IP source field. Recommend
                  mapping to
                  <span className="text-error pl-2">source.ip</span>”
                </p>
              </div>

              <div className="flex items-center gap-2 text-warning pt-3 ">
                <SquaredInfoIcon />
                <p className="tracking-[2%] text-xs">
                  Highlight how field appears in raw events.
                </p>
              </div>
            </div>
            {/* border */}
            <div className="border border-border my-9"></div>
            {/* border */}
          </div>
        </Drawer.Body>
        <div className="tracking-[2%] text-sm py-6 pl-8">
          <p>Last Modified: Aug 13, 2025 by SOC_Manager</p>
        </div>
      </Drawer>
    </div>
  );
};

export default DataManagementTable;
