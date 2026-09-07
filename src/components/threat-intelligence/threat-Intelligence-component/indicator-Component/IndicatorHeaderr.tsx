import React from "react";
import Button from "../../../props/Button";
import { PlusIcon } from "../../../../utils/icons";

const IndicatorHeaderr = () => {
  return (
    <div className=" bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card z-10">
      <div className="flex justify-between">
        <div className="text-text-muted text-base leading-6 font-medium">
          Threat Intelligence /
          <span className="text-text-primary text-base">
            {" "}
            Indicators (IoCs){" "}
          </span>
        </div>

        <div>
          <Button
            paddingX="px-4"
            paddingY="py-2"
            height="min-h-[0px]"
            icon={<PlusIcon className="text-white" />}
          >
            Add IoC
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndicatorHeaderr;
