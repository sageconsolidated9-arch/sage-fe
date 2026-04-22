import React from "react";

interface RetentionSliderProps {
  value: number;
  onChange: (val: number) => void;
}

const RetentionSlider = ({ value, onChange }: RetentionSliderProps) => {
  // Calculate percentage for the active orange track
  const min = 1;
  const max = 365;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-[500px] py-4">
      <div className="relative w-full flex flex-col">
        {/* Custom Track Background */}
        <div className="relative h-2 w-full bg-[#A3B1C2] rounded-full overflow-hidden">
          {/* Active Orange Part */}
          <div
            className="absolute h-full bg-[#FF4D17]"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Real Input (Invisible but functional) */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute -top-1 w-full h-4 opacity-0 cursor-pointer z-20"
        />

        {/* Custom Visual Thumb */}
        <div
          className="absolute -top-4 w-10 h-10 bg-[#FF4D17] border-[4px] border-white rounded-full shadow-md pointer-events-none z-10"
          style={{ left: `calc(${percentage}% - 14px)` }}
        />

        {/* Labels */}
        <div className="flex justify-between mt-5 text-[#4A5568] text-sm font-medium">
          <span className={value === 1 ? "font-bold" : ""}>1 Day</span>
          <span className="absolute left-1/2 -translate-x-1/2">
            <span className="text-[#FF4D17] font-bold">{value} Days</span>
          </span>
          <span className={value === 365 ? "font-bold" : ""}>365 Days</span>
        </div>
      </div>
    </div>
  );
};

export default RetentionSlider;
