import React from "react";
import Button from "../../../props/Button";
import { PlusIcon } from "../../../../utils/icons";

const EntityProfilesHeader = () => {
  return (
    <div>
      <div className=" bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-10 flex flex-col gap-7 ">
        <div className="text-text-muted text-base leading-6 font-medium">
          Threat Intelligence /
          <span className="text-text-primary text-base">
            {" "}
            Threat Entity Profiles{" "}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 max-w-[800px]">
            <p className="text-text-primary text-xl ">Threat Entity Profiles</p>
            <p className="text-text-secondary text-xs">
              Explore adversary groups, their tactics, techniques, and
              procedures (TTPs). Profiles include threat actor context, MITRE
              ATT&CK mappings, and links to active simulations for readiness
              testing
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <Button
                paddingX="px-4"
                paddingY="py-2"
                height="min-h-[0px]"
                icon={<PlusIcon className="text-white" />}
              >
                Add Profiles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityProfilesHeader;
