// components/sidebar/SidebarRouteItem.tsx
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUpIcon } from "../../utils/icons";
import type { SidebarRoute } from "../../types/extra";
import type { RefObject } from "react";
import { rotateVariants, textVariants } from "../../shared/sidebar/variants";
import { SidebarLink } from "../../hooks/SidebarLinks";

interface SidebarRouteItemProps {
  route: SidebarRoute;
  isSidebarOpen: boolean;
  buttonRefs: RefObject<{ [key: string]: HTMLButtonElement | null }>;
  counts: Record<string, number>;
  expandedItems: Record<string, boolean>;
  onToggleExpand: (routeName: string) => void;
  onSetModalState: (modalState: any) => void;
  onSetExpandedItems: (items: Record<string, boolean>) => void;
}

const SidebarRouteItem = ({
  route,
  isSidebarOpen,
  buttonRefs,
  counts,
  expandedItems,
  onToggleExpand,
  onSetModalState,
  onSetExpandedItems,
}: SidebarRouteItemProps) => {
  const navigate = useNavigate();
  const Icon = route.icon;

  const isExpanded = expandedItems[route.name];
  const hasChildren = (route.children && route.children.length > 0) ?? false;

  const getCountForRoute = (
    routeName: string,
    counts: Record<string, number>
  ) => {
    const countKey = routeName.toLowerCase().replace(/[^a-z]/g, "");
    return counts[countKey] || null;
  };

  const count = route.count ? getCountForRoute(route.name, counts) : null;

  const handleParentClick = () => {
    // If sidebar is collapsed and item has children, show modal
    if (
      !isSidebarOpen &&
      hasChildren &&
      route.children &&
      route.children.length > 0
    ) {
      const button = route.name ? buttonRefs.current[route.name] : null;
      if (button) {
        const rect = button.getBoundingClientRect();
        onSetModalState({
          isOpen: true,
          route: route,
          position: {
            top: rect.top,
            left: rect.right + 8,
          },
        });
      }
      return;
    }

    // Original behavior for expanded sidebar
    if (isSidebarOpen) {
      if (hasChildren && route.children && route.children.length > 0) {
        // Navigate to the first child when parent is clicked
        navigate(route.children[0].path);

        // Also expand if not already expanded
        if (route.name && !expandedItems[route.name]) {
          onSetExpandedItems({
            ...expandedItems,
            [route.name]: true,
          });
        }
      } else {
        // If no children, navigate to the parent route
        navigate(route.path);
      }
    } else {
      // If sidebar is collapsed and no children, navigate directly
      navigate(route.path);
    }
  };

  return (
    <div className="space-y-1" key={route.path}>
      <div className="relative z-10">
        <button
          ref={(el) => {
            if (route.name) {
              buttonRefs.current[route.name] = el;
            }
          }}
          onClick={handleParentClick}
          className={`flex items-center space-x-3 px-5 py-4 rounded-xl transition-all duration-200 group font-inter text-sm font-medium w-full text-left cursor-pointer relative ${
            // Check if either parent or any child is active
            location.pathname === route.path ||
            route.children?.some((child) => location.pathname === child.path)
              ? "bg-[#f2f2f2] text-primary"
              : "text-[#24222099] bg-white hover:bg-[#f2f2f2] hover:text-primary"
          }`}
        >
          <Icon
            className={`transition-colors duration-200 ${
              location.pathname === route.path ||
              route.children?.some((child) => location.pathname === child.path)
                ? "text-primary"
                : "text-[#24222099] group-hover:text-primary"
            }`}
          />
          {isSidebarOpen && (
            <motion.div
              variants={textVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex-1 flex items-center justify-between whitespace-nowrap"
            >
              <span className="flex items-center gap-2.5">
                {route.name}
                {count != null && (
                  <span
                    className={`rounded-lg py-0.5 px-1.5 text-xs text-white font-medium ${
                      location.pathname === route.path ||
                      route.children?.some(
                        (child) => location.pathname === child.path
                      )
                        ? "bg-primary"
                        : "bg-[#24222099]"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </span>
            </motion.div>
          )}
        </button>

        {/* Expand/Collapse toggle for items with children */}
        {hasChildren && isSidebarOpen && (
          <button
            onClick={() => onToggleExpand(route.name)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <motion.div
              variants={rotateVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
            >
              <ChevronUpIcon
                className={`${
                  location.pathname === route.path ||
                  route.children?.some(
                    (child) => location.pathname === child.path
                  )
                    ? "text-primary"
                    : "text-[#24222099]"
                }`}
              />
            </motion.div>
          </button>
        )}
      </div>

      {/* Children links */}
      <AnimatePresence>
        {hasChildren && isExpanded && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-20 space-y-1"
          >
            {route.children?.map((child, index) => (
              <div className="relative" key={index}>
                {/* connector curve */}
                <div className="absolute -left-4 -top-6.5 h-11 w-3 border-l-[1.4px] border-b-[1.4px] border-[#24222029] rounded-bl-lg"></div>
                <SidebarLink
                  to={child.path}
                  className={({ isActive }) =>
                    `flex w-fit items-center space-x-3 px-3.5 py-2 relative rounded-xl transition-all duration-200 text-xs ${
                      isActive
                        ? "bg-[#F2F2F2] text-primary"
                        : "text-[#2422208F] hover:bg-[#f2f2f2]"
                    }`
                  }
                >
                  {({ isActive }) => <span>{child.name}</span>}
                </SidebarLink>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarRouteItem;
