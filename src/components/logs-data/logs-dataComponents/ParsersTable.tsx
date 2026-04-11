import React, { useState } from "react";
import {
  mockParser,
  StatusBadge,
  type Parser,
} from "../../../utils/parserLibrary";
import type { ColumnDef } from "../../../types/table";
import {
  ChevronDown1Icon,
  ImportIcon,
  MarkIcon,
  MoreIcon,
} from "../../../utils/icons";
import Table from "../../../shared/Table";
import CoverageCount from "../../dashboard/dash-components/CoverageCount";
import Drawer from "../../props/Drawer";
import Button from "../../props/Button";
import TextArea from "../../props/TextArea";
import {
  mockFieldMapping,
  StatusBadges,
  type FieldMapping,
} from "../../../utils/parserFieldMapping";

interface TableProps {
  data?: Parser[];
}

const ParsersTable = ({ data = mockParser }: TableProps) => {
  const [selectedParser, setSelectedParser] = useState<Parser | null>(null);

  // main table columns
  const columns: ColumnDef<Parser>[] = [
    {
      key: "name",
      header: "Parser Name",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.name}</span>
      ),
    },
    {
      key: "dataSource",
      header: "Data Source",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.dataSource}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (i) => <StatusBadge status={i.status} />,
    },
    {
      key: "events",
      header: "Events Parsed (24h)",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.events}</span>
      ),
    },
    {
      key: "errorRate",
      header: "Error Rate",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.errorRate}</span>
      ),
    },

    {
      key: "owner",
      header: "Owner",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.owner}</span>
      ),
    },
    {
      key: "lastUpdated",
      header: "Last Updated ",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.lastUpdated}</span>
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
              setSelectedParser(i);
            }}
          >
            <MoreIcon className="text-text-secondary" />
          </button>
        </div>
      ),
    },
  ];

  // Drawer Table Columns (Parser Field Mapping)
  const FieldMappingColumns: ColumnDef<FieldMapping>[] = [
    {
      key: "RawField",
      header: "Raw Field",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.RawField}</span>
      ),
    },
    {
      key: "Normalized",
      header: "Normalized",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Normalized}</span>
      ),
    },
    {
      key: "Statuss",
      header: "Status",
      cell: (i) => <StatusBadges Statuss={i.Statuss} />,
    },
    {
      key: "Action",
      header: "Action",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Action}</span>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center gap-12 py-7">
        <CoverageCount
          text="Total Custom Parsers"
          borderColor="border-primary-hover"
          textColor="text-primary-hover"
        >
          14
        </CoverageCount>

        <CoverageCount
          text="Active Parsers"
          borderColor="border-success"
          textColor="text-success"
        >
          12
        </CoverageCount>

        <CoverageCount
          text="Error Rate (last 24h)"
          borderColor="border-warning"
          textColor="text-text-primary"
        >
          2.3%
        </CoverageCount>

        <CoverageCount
          text="Last Updated"
          borderColor="border-text-muted"
          textColor=""
        >
          <span className="text-xl  text-text-secondary">
            Sep 23, 2025 · 09:42 AM
          </span>
        </CoverageCount>
      </div>

      <Table<Parser>
        data={data}
        columns={columns}
        showHeader={false}
        showCheckboxes={true}
        showFooter={false}
        className="bg-transparent"
      />

      <Drawer
        isOpen={!!selectedParser}
        onClose={() => setSelectedParser(null)}
        width="650px"
      >
        <Drawer.Header title="Edit Parser: PaloAlto-Parser" children />
        <Drawer.Body>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <p className="text-text-primary text-base">Tags:</p>
              <div className="flex items-center gap-2 text-text-secondary text-xs">
                <p className="bg-hover-light py-0.5 px-1.5 rounded-lg">
                  Firewall
                </p>
                <p className="bg-hover-light py-0.5 px-1.5 rounded-lg">JSON</p>
                <p className="bg-hover-light py-0.5 px-1.5 rounded-lg">v1.4</p>
              </div>
            </div>

            {/* ====parser logic==== */}
            <div>
              <div className="flex items-center justify-between">
                <p className="text-base font-bold">Parser Logic</p>
                <p className="flex items-center gap-1.5 text-sm">
                  <MarkIcon className="text-success" />
                  Save Changes
                </p>
              </div>
            </div>
            {/* ====parser logic==== */}

            {/* border */}
            <div className="border border-border my-5"></div>
            {/* border */}

            {/* ========Test Sample======== */}
            <div>
              <p className="text-base font-bold">Test Samples</p>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-base font-normal">
                Upload or choose sample logs.
              </p>
              <Button
                paddingX="px-4"
                paddingY="py-1.5"
                height="min-h-[0px]"
                variant="white"
                icon={<ImportIcon className="text-text-secondary" />}
              >
                <div className="flex items-center gap-2 lowercase">
                  Import
                  <ChevronDown1Icon />
                </div>
              </Button>
            </div>

            <div>
              <TextArea
                name="description"
                label="Test Log Input"
                placeholder="Enter your log"
                rows={3}
                resize="none"
              />
            </div>

            <div>
              <p className="text-text-secondary text-sm font-normal pb-2">
                Parsed Output
              </p>
              <div className="bg-default border border-border rounded-xl py-3 px-4 font-fira-code">
                <p className="pb-2">
                  “Missing required field:{" "}
                  <span className="text-error">source.ip</span>”
                </p>
                <p>“Unexpected format in line 41”</p>
              </div>
            </div>
            {/* ========Test Sample======== */}

            {/* border */}
            <div className="border border-border my-5"></div>
            {/* border */}

            {/* table field mapping */}
            <div className="flex flex-col gap-3">
              <p className="text-text-primary text-base font-bold">
                Normalized Field Mapping
              </p>
              <Table<FieldMapping>
                data={mockFieldMapping}
                columns={FieldMappingColumns}
                showHeader={false}
                showFooter={false}
                className="bg-transparent"
              />
            </div>
            {/* table field mapping */}
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default ParsersTable;
