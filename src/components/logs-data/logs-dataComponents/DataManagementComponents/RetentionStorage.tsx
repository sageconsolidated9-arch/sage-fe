import React, { useState } from "react";
import Button from "../../../props/Button";
import {
  AchieveIcon,
  EditIcon,
  RunIcon,
  SquaredInfoIcon,
  XIcon,
} from "../../../../utils/icons";
import RetentionStorageTable from "./RetentionStorageTable";
import { Select } from "../../../props/Select";
import Input from "../../../props/Input";
import RetentionSlider from "../../../../utils/RetentionSlider";

const Tier = [
  { label: " Hot", value: "parserType" },
  { label: " Warm", value: "parserType" },
  { label: " Cold", value: "parserType" },
  { label: "Archive", value: "parserType" },
];

const RetentionStorage = () => {
  const [activeModal, setActiveModal] = useState<
    "EXPORT_SCHEMA" | "COMPARE_VERSIONS" | "RUN" | null
  >(null);

  const [retentionDays, setRetentionDays] = useState(90);
  return (
    <div className="border border-border rounded-[18px] p-6 flex flex-col gap-8 bg-surface">
      {/* ================= */}
      <section className="flex gap-8 items-center justify-center">
        <div className="flex flex-col items-center gap-5 bg-surface  shadow-card rounded-2xl py-7 px-8 min-w-[470px]">
          <p className="text-text-secondary tracking-[2%] text-xl">
            Default Retention
          </p>
          <p className="text-text-primary text-[40px] font-bold tracking-[-0.5%] leading-10">
            90 days
          </p>
          <p className="text-primary underline text-sm tracking-[2%]">Edit</p>
        </div>

        <div className="flex flex-col items-center gap-5 bg-surface shadow-card rounded-2xl py-7 px-8 min-w-[470px]">
          <p className="text-text-secondary tracking-[2%] text-xl">
            Default Retention
          </p>
          <p className="text-text-primary text-[40px] font-bold tracking-[-0.5%] leading-10">
            2.4 TB
          </p>
          <p className="text-text-secondary text-sm tracking-[2%]">
            Stored in S3 cold tier.
          </p>
        </div>
        <div className="flex flex-col items-center bg-surface shadow-card rounded-2xl py-7 px-8 min-w-[470px]">
          <p className="text-text-secondary tracking-[2%] text-xl pb-5">
            Default Retention
          </p>
          <p className="text-text-primary text-[20px] font-bold tracking-[-0.5%] leading-10">
            <span className="bg-error text-default rounded-lg py-1 px-2 text-xs">
              Hot
            </span>{" "}
            1.1 TB
          </p>
          <p className="text-text-primary text-[20px] font-bold tracking-[-0.5%] leading-10">
            <span className="bg-selection text-default rounded-lg py-1 px-2 text-xs">
              Warm
            </span>{" "}
            3.2 TB
          </p>
        </div>
      </section>
      {/* ================= */}

      {/* ========Source Based Retention Table============== */}
      <RetentionStorageTable />
      {/* ========Source Based Retention Table============== */}

      {/* ===========Edit Retention ========*/}
      <div className="border border-primary rounded-[18px] p-6 flex flex-col gap-4 bg-white">
        <div className="flex justify-between ">
          <p className="text-text-primary text-2xl">Edit Retention</p>
          <button className="ml-4 flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer font-bold">
            <XIcon className="w-5 h-5" />
            <span>Close</span>
          </button>
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}

        <div className="flex gap-5 items-center">
          <p className="text-text-secondary text-xs">Retention Period:</p>
          <RetentionSlider value={retentionDays} onChange={setRetentionDays} />
        </div>

        <div className="max-w-[400px] flex flex-col gap-4">
          <Select
            label="Tier:"
            options={Tier}
            placeholder="Select One"
            iconVariant="down"
          />

          <Input
            name="name"
            type="text"
            placeholder="$85/month"
            label="Cost preview"
          />
        </div>

        <div className="flex items-center gap-2 text-warning mt-1 ">
          <SquaredInfoIcon />
          <p className="font-fira-code text-xs">
            Most users choose 180 days for firewall logs.
          </p>
        </div>
      </div>
      {/* ===========Edit Retention ========*/}

      {/* ==========Footer Actions======= */}
      <section className="">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl text-text-primary">Recommended Actions</h1>
        </div>
        <div className="flex items-center gap-4 pt-4">
          <div>
            <Button
              onClick={() => setActiveModal("EXPORT_SCHEMA")}
              paddingX="py-3"
              paddingY="px-6"
              icon={<EditIcon className="text-white" />}
            >
              Edit Global Retention
            </Button>
          </div>
          <div>
            <Button
              paddingX="py-3"
              paddingY="px-6"
              variant="white"
              icon={<AchieveIcon className="text-text-secondary" />}
            >
              Archive Data
            </Button>
          </div>
          <div className="">
            <Button
              onClick={() => setActiveModal("RUN")}
              paddingX="py-3"
              paddingY="px-6"
              variant="white"
              icon={<RunIcon className="text-text-secondary" />}
              disabled
            >
              Run Validation
            </Button>
          </div>
        </div>
      </section>
      {/* ==========Footer Actions======= */}
    </div>
  );
};

export default RetentionStorage;
