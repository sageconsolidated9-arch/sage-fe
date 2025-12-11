import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function RulesMenu() {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full max-w-sm">
      {/* Header */}
      <div
        className="flex items-center justify-between bg-white shadow-sm rounded-2xl px-5 py-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          {/* Icon placeholder */}
          <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center">
            <span className="text-orange-500 font-bold text-sm">+</span>
          </div>

          <span className="text-orange-600 font-semibold text-lg">Rules</span>

          {/* Count pill */}
          <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium">
            34
          </span>
        </div>

        <ChevronDown
          className={`text-orange-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Collapsible Content */}
      {open && (
        <div className="mt-4 pl-10 relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>

          <div className="flex flex-col gap-6">
            {/* Highlighted item */}
            <div className="relative flex items-center">
              {/* Connector curve */}
              <div className="absolute -left-6 w-6 h-6 border-l border-b border-gray-300 rounded-bl"></div>

              <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl font-medium shadow-sm">
                Detection Rule Library
              </div>
            </div>

            {/* Normal item */}
            <div className="relative flex items-center">
              <div className="absolute -left-6 w-6 h-6 border-l border-b border-gray-300 rounded-bl"></div>
              <span className="text-gray-600 text-base">Rule Builder UI</span>
            </div>

            {/* Normal item */}
            <div className="relative flex items-center">
              <div className="absolute -left-6 w-6 h-6 border-l border-b border-gray-300 rounded-bl"></div>
              <span className="text-gray-600 text-base">Anomaly Models</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
