import React from "react";
import Checkbox from "../../props/Checkbox";
import Button from "../../props/Button";
import { MarkIcon } from "../../../utils/icons";

interface PlaybookCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actions: string[];
  triggers: string[];
  buttonText: string;
  isChecked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  onButtonClick?: () => void;
}

const AiRecommendCard: React.FC<PlaybookCardProps> = ({
  title,
  description,
  icon,
  actions,
  triggers,
  buttonText,
  isChecked,
  onCheckChange,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col p-4 bg-white border border-border rounded-[18px] min-w-600px] gap-2.5">
      {/* Header Row */}
      <div className="flex justify-between items-start ">
        <div className="flex items-center gap-2">
          <div className="text-primary-hover">{icon}</div>
          <h3 className="font-bold text-base text-text-secondary">{title}</h3>
        </div>
        <Checkbox
          checked={isChecked}
          onChange={onCheckChange}
          className="mt-1"
        />
      </div>

      {/* Description */}
      <p className="text-xs text-text-secondary ">{description}</p>

      {/* Actions Section */}
      <div className=" flex gap-2.5 items-center">
        <span className="text-sm font-medium text-text-secondary">
          Actions:
        </span>
        <p className="text-xs text-text-primary">{actions.join(" · ")}</p>
      </div>

      {/* Triggers Section */}
      <div className=" flex gap-2.5 items-center mb-1">
        <span className="text-sm font-medium text-text-secondary">
          Triggers:
        </span>
        <div className="flex flex-wrap gap-2">
          {triggers.map((trigger, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-[#ED89363D] text-[10px] rounded-full font-medium text-text-primary"
            >
              {trigger}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button  */}
      <div className="mt-auto">
        <Button
          paddingY="py-1.5"
          paddingX="px-4"
          variant="white"
          height="min-h-[0px]"
          onClick={onButtonClick}
          icon={<MarkIcon className="text-text-secondary w-4.5 h-4.5" />}
        >
          <span className="text-text-secondary text-[11px]"> {buttonText}</span>
        </Button>
      </div>
    </div>
  );
};

export default AiRecommendCard;
