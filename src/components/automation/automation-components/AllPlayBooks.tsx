import React from "react";
import Input from "../../props/Input";
import {
  ChevronDown1Icon,
  ExportIcon,
  ImportIcon,
  PlusIcon,
} from "../../../utils/icons";
import Button from "../../props/Button";

const AllPlayBooks = () => {
  return (
    <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px]  relative ">
      {/* ============*/}
      <div className="text-text-muted text-base">
        Automation / <span className="text-text-primary">Playbooks</span>
      </div>

      {/* ========== */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4 max-w-[654px]">
          <p className="text-text-primary text-xl">All Playbooks</p>
          <p className="text-text-secondary text-xs">
            Manage adaptive, generative playbooks that automate responses to
            threats. Review execution history, fine-tune trigger conditions, and
            set overrides to align with your security workflows.{" "}
          </p>
        </div>

        <div className="max-w-md w-full">
          <Input
            name="search"
            type="text"
            placeholder="Search by playbook name, type, or status…"
            search
            searchPosition="left"
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2 items-center w-full justify-end flex-end">
        <div>
          <Button
            paddingX="px-4"
            paddingY="py-2"
            height="min-h-[0px]"
            icon={<PlusIcon className="text-white" />}
          >
            NEW PLAYBOOK
          </Button>
        </div>
        <div>
          <Button
            paddingX="px-4"
            paddingY="py-2"
            height="min-h-[0px]"
            variant="white"
            icon={<ImportIcon className="text-text-secondary" />}
          >
            <div className="flex items-center gap-2">
              IMPORT
              <ChevronDown1Icon />
            </div>
          </Button>
        </div>
        <div>
          <Button
            paddingX="px-4"
            paddingY="py-2"
            height="min-h-[0px]"
            variant="white"
            icon={<ExportIcon className="text-text-secondary" />}
          >
            EXPORT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllPlayBooks;
