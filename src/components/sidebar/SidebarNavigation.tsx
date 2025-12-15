// components/sidebar/SidebarNavigation.tsx
import { motion, AnimatePresence } from "motion/react";

import SidebarRouteItem from "./SidebarRouteItem";
import type { SidebarRoute } from "../../types/extra";
import type { RefObject } from "react";
import { textVariants } from "../../shared/sidebar/variants";

interface SidebarNavigationProps {
  groupKey: string;
  routes: SidebarRoute[];
  isSidebarOpen: boolean;
  buttonRefs: RefObject<{ [key: string]: HTMLButtonElement | null }>;
  counts: Record<string, number>;
  expandedItems: Record<string, boolean>;
  onToggleExpand: (routeName: string) => void;
  onSetModalState: (modalState: any) => void;
  onSetExpandedItems: (items: Record<string, boolean>) => void;
}

const SidebarNavigation = ({
  groupKey,
  routes,
  isSidebarOpen,
  buttonRefs,
  counts,
  expandedItems,
  onToggleExpand,
  onSetModalState,
  onSetExpandedItems,
}: SidebarNavigationProps) => {
  return (
    <div>
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            variants={textVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`uppercase leading-6 tracking-[0.4px] font-medium text-[11px] px-5 mb-2 whitespace-nowrap ${
              groupKey === "support" ? "mt-10" : ""
            }`}
          >
            {groupKey === "support" ? (
              <div className="w-full h-[0.5px] border-line opacity-25"></div>
            ) : (
              groupKey
            )}
          </motion.div>
        )}
        <div className="space-y-2">
          {routes.map((route) => (
            <SidebarRouteItem
              key={route.path}
              route={route}
              isSidebarOpen={isSidebarOpen}
              buttonRefs={buttonRefs}
              counts={counts}
              expandedItems={expandedItems}
              onToggleExpand={onToggleExpand}
              onSetModalState={onSetModalState}
              onSetExpandedItems={onSetExpandedItems}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default SidebarNavigation;
