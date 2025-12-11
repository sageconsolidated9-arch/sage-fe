import React from "react";
import { getImageSrc } from "../utils/imageUtils";

interface SidebarProps {
  toggleSidebar: () => void;
}
const Topbar = ({ toggleSidebar }: SidebarProps) => {
  return (
    <div className="sticky top-0 w-full py-3 px-6 h-[91px] flex items-center bg-red-500">
      <div className="flex items-center justify-between w-full">
        {/* search bar */}
        <div className="px-3 bg-[#F5F5F5] rounded-md search-shadow w-[30%] flex items-center gap-2">
          {/* icon svg */}
          <div>
            <img src={getImageSrc("search.svg")} alt="search icon" />
          </div>

          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-[#707071] py-2"
            placeholder="Search..."
          />
        </div>
        {/* profile */}
        profile
      </div>
    </div>
  );
};

export default Topbar;
