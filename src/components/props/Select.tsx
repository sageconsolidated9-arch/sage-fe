import React from "react";
import { getImageSrc } from "../../utils/imageUtils";
import { ChevronDown, Info } from "lucide-react";
import {
  ChevronDown1Icon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  InfoFillIcon,
} from "../../utils/icons";

interface SelectOption {
  label: string;
  value: string;
  image?: string;
}

interface CustomSelectInputProps {
  className?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  disabled?: boolean;
  width?: string;
  showInfo?: boolean; // Optional info icon like in the image
  infoTooltip?: string; // Tooltip text for info icon
  iconVariant?: "down" | "upDown" | "down1"; // To match the input variants
}

export const Select = ({
  className = "",
  label,
  placeholder = "Select an option",
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  width,
  showInfo = false,
  infoTooltip,
  iconVariant = "down",
}: CustomSelectInputProps) => {
  const selected = options.find((opt) => opt.value === value);

  return (
    <div className={`relative w-full flex flex-col gap-1 ${width || ""}`}>
      {/* Label row with optional info icon - matches Input component pattern */}
      {label && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="block text-sm text-text-primary">
              {label}
              {/* {required && <span className="text-red-500 ml-1">*</span>} */}
            </label>
            {showInfo && (
              <div className="relative group">
                <InfoFillIcon className="text-warning w-6 h-6" />

                {infoTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    {infoTooltip}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative">
        {/* Optional image/icon for selected item */}
        {selected?.image && (
          <img
            src={selected.image}
            alt={selected.label}
            className="rounded-full h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        )}

        <select
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={`
            ${className === "" ? "bg-surface border border-input-border" : className}
            w-full text-sm text-text-tertiary leading-[22px] appearance-none rounded-xl py-2 focus:outline-none
            ${disabled ? "bg-gray-50 cursor-not-allowed" : "cursor-pointer"}
            ${selected?.image ? "pl-10" : "px-4"}
            pr-10
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-1">
          {iconVariant === "upDown" ? (
            <ChevronUpDownIcon className="h-6 w-6 text-text-secondary" />
          ) : iconVariant === "down1" ? (
            <ChevronDown1Icon className="h-6 w-6 text-text-secondary" />
          ) : (
            <ChevronDownIcon className="h-6 w-6 text-text-secondary" />
          )}
        </div>
      </div>
    </div>
  );
};
