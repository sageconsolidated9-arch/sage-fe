import React, { useState } from "react";
import type { ToggleButtonProps } from "../../types/extra";

const Toggle: React.FC<ToggleButtonProps> = ({
  checked: controlledChecked,
  onChange,
  disabled = false,
  size = "md",
  label,
  className = "",
}) => {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(false);

  // Use controlled or uncontrolled state
  const isChecked =
    controlledChecked !== undefined ? controlledChecked : uncontrolledChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !isChecked;

    // Update uncontrolled state if not controlled
    if (controlledChecked === undefined) {
      setUncontrolledChecked(newValue);
    }

    // Call onChange callback
    onChange?.(newValue);
  };

  // Size classes
  const sizeClasses = {
    sm: {
      container: "w-9 h-5",
      knob: "w-4 h-4",
      knobTranslate: "translate-x-4",
      label: "text-sm",
    },
    md: {
      container: "w-11 h-6",
      knob: "w-5 h-5",
      knobTranslate: "translate-x-5",
      label: "text-base",
    },
    lg: {
      container: "w-14 h-7",
      knob: "w-6 h-6",
      knobTranslate: "translate-x-7",
      label: "text-lg",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`
          relative inline-flex items-center rounded-full transition-colors duration-200
          focus:outline-none
          ${currentSize.container}
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          ${isChecked ? "bg-primary" : "bg-[#B3B3B3]"}
        `}
      >
        <span
          className={`
            inline-block transform rounded-full bg-[#1E1A19] shadow-sm transition-transform duration-200
            ${currentSize.knob}
            ${isChecked ? currentSize.knobTranslate : "translate-x-0.5"}
          `}
        />
      </button>

      {label && (
        <span
          className={`
            ml-3 font-medium
            ${currentSize.label}
            ${disabled ? "text-gray-400" : "text-gray-900"}
          `}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Toggle;
