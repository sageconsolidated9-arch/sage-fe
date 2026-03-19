import React from "react";
import SettingsCard from "../../props/SettingsCard";
import { CheckIcon } from "lucide-react";
import {
  CircleCheckIcon,
  CircleFilledCheckIcon,
  ResetIcon,
} from "../../../../utils/icons";

const RecoveryOptions = () => {
  return (
    <>
      <SettingsCard>
        <SettingsCard.Header
          title="Login Credentials"
          children={
            <button className="flex items-center gap-2 cursor-pointer">
              <ResetIcon className="w-[18px] h-[18px] text-primary-hover" />
              <span>Generate new codes</span>
            </button>
          }
        />

        <SettingsCard.Row label="Recommended" value="Generated 10 Oct. 2024" />
        <SettingsCard.Row
          label="Authenticator App"
          children={
            <div className="flex items-center gap-2">
              <CircleFilledCheckIcon className="w-[18px] h-[18px] text-success" />
              <p className="underline">Download</p>
            </div>
          }
        />
      </SettingsCard>
    </>
  );
};

export default RecoveryOptions;
