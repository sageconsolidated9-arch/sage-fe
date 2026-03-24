import React from "react";
import Radio from "./Radio";

interface ContainmentOption {
  id: string;
  title: string;
  recommended?: boolean;
  descriptions: string[];
}

interface ContainmentOptionCardProps {
  option: ContainmentOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ContainmentOptionCard = ({
  option,
  isSelected,
  onSelect,
}: ContainmentOptionCardProps) => {
  return (
    <div
      onClick={() => onSelect(option.id)}
      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 flex flex-col gap-2 ${
        isSelected ? "border-primary" : "border-border "
      }`}
    >
      <div className="flex justify-between items-start">
        <h4
          className={`text-sm font-bold ${isSelected ? "text-text-secondary" : "text-text-secondary"}`}
        >
          {option.title}{" "}
          {option.recommended && <span className="">(Recommended)</span>}
        </h4>

        {/* Using your custom Radio component */}
        <div className="pointer-events-none">
          {/* pointer-events-none because the parent div handles the click for the whole card */}
          <Radio
            id={option.id}
            name="containment-options"
            checked={isSelected}
            onChange={() => onSelect(option.id)}
            label="" // Keep empty as we handle the title styling above
          />
        </div>
      </div>

      <ul className=" list-disc list-inside text-xs font-normal text-text-secondary">
        {option.descriptions.map((desc, idx) => (
          <li key={idx} className="">
            {desc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContainmentOptionCard;
