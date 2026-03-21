import {
  dateFormats,
  getTimeZones,
  languages,
  themes,
} from "../../../../utils/timezone";
import { Select } from "../../../props/Select";
import SettingsHeader from "../../../props/SettingsHeader";
import Toggle from "../../../props/Toggle";

const PrefencesLocal = () => {
  return (
    <>
      {/* Preferences */}
      <div>
        <SettingsHeader
          title="Preferences"
          desc="Control display settings, notifications, and localization."
        />

        <div className="flex flex-col gap-5 max-w-[226px] text-text-secondary mt-6">
          {/* theme */}
          <div className="flex items-center justify-between">
            <p>Theme</p>
            <div className="w-[99px]">
              <Select options={themes} iconVariant="down1" />
            </div>
          </div>

          {/* nothification */}
          <div className="flex items-center justify-between">
            <p>Email Notification</p>
            <Toggle size="sm" />
          </div>

          {/* updates */}
          <div className="flex items-center justify-between">
            <p>Product Updates</p>
            <Toggle size="sm" />
          </div>

          {/* summary */}
          <div className="flex items-center justify-between">
            <p>Weekly Summary</p>
            <Toggle size="sm" />
          </div>
        </div>
      </div>

      {/* Localization */}
      <div className="mt-6">
        <SettingsHeader title="Localization" />

        <div className="flex flex-col gap-5 max-w-[341px] text-text-secondary mt-6">
          {/* theme */}
          <div className="flex items-center justify-between">
            <p>Time zone</p>
            <div className="w-[188px]">
              <Select options={getTimeZones()} iconVariant="down1" />
            </div>
          </div>

          {/* language */}
          <div className="flex items-center justify-between">
            <p>Language</p>
            <div className="w-[154px]">
              <Select options={languages} iconVariant="down1" />
            </div>
          </div>

          {/* date format */}
          <div className="flex items-center justify-between">
            <p>Date Formate</p>
            <div className="w-[162px]">
              <Select options={dateFormats} iconVariant="down1" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrefencesLocal;
