// components/sidebar/Sidebar.tsx
import { useNavigate } from "react-router-dom";
import { SidebarRoutes } from "../routes/SidebarRoutes";
import { motion } from "motion/react";
import { useSidebarCounts } from "../hooks/useSidebarCounts";
import { LogoIcon, LogoText, ToggleIcon } from "../utils/icons";
import { useRef } from "react";

import { sidebarVariants } from "./sidebar/variants";
import { useSidebarStore } from "../store/sidebarStore";
import type { SidebarRoute } from "../types/extra";
import OtherSettings from "../components/sidebar/OtherSettings";
import SidebarModal from "../components/sidebar/SidebarModal";
import SidebarNavigation from "../components/sidebar/SidebarNavigation";

const Sidebar = () => {
  const navigate = useNavigate();
  const counts = useSidebarCounts();
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const {
    isSidebarOpen,
    toggleSidebar,
    expandedItems,
    modalState,
    setModalState,
    toggleExpandItem,
    setExpandedItems,
    closeModal,
  } = useSidebarStore();

  const groups = SidebarRoutes.reduce((acc, route) => {
    (acc[route.group] ||= []).push(route);
    return acc;
  }, {} as Record<"main" | "support", SidebarRoute[]>);

  return (
    <>
      <motion.div
        className="fixed md:sticky top-0 h-screen bg-white flex flex-col shrink-0 z-70 py-[34px]"
        variants={sidebarVariants}
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
      >
        {/* Logo */}
        <div
          className={`transition-all ${
            isSidebarOpen ? "px-14" : "px-8"
          } pb-8 flex items-center gap-2.5`}
        >
          <div>
            <LogoIcon />
          </div>
          {isSidebarOpen && <LogoText />}
        </div>

        <div className="w-full h-0.5 border-line opacity-25"></div>

        {/* togglesidebar */}
        <button
          className="absolute -right-2.5 top-[97px] cursor-pointer"
          onClick={toggleSidebar}
        >
          <ToggleIcon className="hover:opacity-80 transition-opacity" />
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {Object.entries(groups).map(([key, routes]) => (
            <SidebarNavigation
              key={key}
              groupKey={key}
              routes={routes}
              isSidebarOpen={isSidebarOpen}
              buttonRefs={buttonRefs}
              counts={counts}
              expandedItems={expandedItems}
              onToggleExpand={toggleExpandItem}
              onSetModalState={setModalState}
              onSetExpandedItems={setExpandedItems}
            />
          ))}
        </nav>

        {/* other sidebar settings */}
        <div className="px-4">
          <OtherSettings />
        </div>
      </motion.div>

      {/* Modal for collapsed sidebar children */}
      <SidebarModal
        modalState={modalState}
        onCloseModal={closeModal}
        navigate={navigate}
        buttonRefs={buttonRefs}
      />
    </>
  );
};

export default Sidebar;
