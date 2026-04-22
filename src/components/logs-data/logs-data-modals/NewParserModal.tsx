import React, { useState } from "react";
import Modal from "../../props/Modal";
import TextArea from "../../props/TextArea";
import Input from "../../props/Input";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MarkIcon,
  PlusIcon,
  SquaredInfoIcon,
  ZapIcon,
} from "../../../utils/icons";
import Toggle from "../../props/Toggle";
import {
  mockSchemaPreview,
  type SchemaPreview,
} from "../../../utils/parserSchemaPreview";
import type { ColumnDef } from "../../../store/tableStore";
import Table from "../../../shared/Table";
import { Select } from "../../props/Select";

interface NewParserModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ParserType = [
  { label: "JSON · CSV · Regex · Key-Value", value: "parserType" },
];
const DataSource = [{ label: "Select data source", value: "dataSource" }];

const NewParserModal = ({ isOpen, setIsOpen }: NewParserModalProps) => {
  // Modal Table Columns (Shema preview)
  const SchemaColumns: ColumnDef<SchemaPreview>[] = [
    {
      key: "RawField",
      header: "Raw Field",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.RawField}</span>
      ),
    },
    {
      key: "Value",
      header: "Value",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.Value}</span>
      ),
    },
    {
      key: "MappedTo",
      header: "Mapped To",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.MappedTo}</span>
      ),
    },
  ];
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="990px">
        <Modal.Header title="Summary of Suspicious Login from Unusual Location" />
        <Modal.Body>
          <>
            {/* General Info */}
            <div className="flex flex-col gap-3">
              <p className="text-base text-shadow-text-primary font-medium leading-7 tracking-[-0.15%]">
                General Info
              </p>
              <div className="">
                <div className="flex items-center gap-4">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter your parser name"
                    label="Parser Name"
                  />

                  <Select
                    label="Parser Type"
                    options={ParserType}
                    placeholder="JSON · CSV · Regex · Key-Value"
                    iconVariant="down1"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select
                  label="Parser Type"
                  options={DataSource}
                  placeholder="Select data source"
                  iconVariant="down1"
                />

                <TextArea
                  name="description"
                  label="Description"
                  placeholder="Explain the new parser"
                  rows={3}
                  resize="none"
                />
              </div>

              <div className="flex items-center gap-2 text-warning mt-1 ">
                <SquaredInfoIcon />
                <p className="font-fira-code text-xs">
                  Need help? <span className="underline">See AI guide →</span>
                </p>
              </div>
            </div>
            {/* General Info */}

            {/* border */}
            <div className="border border-border my-5"></div>
            {/* border */}

            {/* =======parsing method ===== */}
            <div className="pb-8">
              <p className="text-base text-text-primary font-medium leading-7 tracking-[-0.15%] pb-2">
                Parsing Method
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-text-muted gap-6">
                  <p className="bg-default border-t border-x border-border py-2.5 px-3 text-text-primary rounded-t-2xl">
                    Regex Rule
                  </p>
                  <p>JSON Mapping</p>
                  <p>CSV Template</p>
                  <p>Assist (AI/NLP)</p>
                </div>

                {/*toggle  */}
                <div className="">
                  <Toggle label="Auto-generate parser" />
                </div>
                {/* toggle */}
              </div>

              <div className="bg-default border border-border p-4  rounded-b-2xl rounded-tr-2xl h-[87px] text-text-muted">
                <p className="flex items-center">
                  Use named groups like (?P
                  <ChevronLeftIcon />
                  username
                  <ChevronRightIcon />
                  .*) to map fields.
                </p>
              </div>
            </div>
            {/* =======parsing method ===== */}

            {/* test parser and schema preview */}
            <div className="flex gap-3">
              {/* ====test parser=== */}
              <div className="flex flex-col gap-2 max-w-[489px]">
                <div>
                  <p className="text-base text-text-primary font-medium leading-7 tracking-[-0.15%] pb-2">
                    Test Parser
                  </p>
                </div>
                <div className="text-sm flex flex-col gap-2">
                  <p className="text-text-secondary ">Sample Log Input</p>
                  <p className="text-text-muted bg-surface border border-border rounded-xl p-4 h-[90px]">
                    Paste a sample log and test your parser. Verify that key
                    fields map correctly
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-text-secondary pb-2">Output (JSON)</p>
                  <div className=" bg-default border border-border rounded-xl p-4 h-[100px] font-fira-code text-error">
                    <p> "user.username": "jdoe",</p>
                    <p>"network.client.ip": "185.92.11.3",</p>
                    <p>"event.timestamp":"2025-09-23T09:42Z"</p>
                  </div>
                </div>
              </div>
              {/* ====test parser=== */}

              {/* border */}
              <div className="border border-border "></div>
              {/* border */}

              {/* ========-Schema Preview====== */}
              <div>
                <Table<SchemaPreview>
                  data={mockSchemaPreview}
                  columns={SchemaColumns}
                  showHeader={false}
                  showFooter={false}
                  className="bg-transparent"
                />
              </div>
              {/* ========-Schema Preview====== */}
            </div>
            {/* test parser and schema preview */}

            {/* links */}
            <div className="flex items-center gap-6 pt-7">
              <div className="flex items-center gap-1">
                <ZapIcon className="text-warning" />
                <p>Run Test</p>
              </div>
              <div className="flex items-center gap-1">
                <MarkIcon className="text-success" />
                <p>Save Changes</p>
              </div>
              <div className="flex items-center gap-1">
                <PlusIcon className="text-primary-hover" />
                <p>Add New Mapping</p>
              </div>
            </div>
            {/* links */}
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewParserModal;
