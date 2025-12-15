import { useNavigate } from "react-router-dom";
import { SidebarRoutes } from "../routes/SidebarRoutes";
import { useAuth } from "../store/auth";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { getImageSrc } from "../utils/imageUtils";
import type { SidebarRoute, SidebarRouteChild } from "../types/extra";
import { SidebarLink } from "../hooks/SidebarLinks";
import { useSidebarCounts } from "../hooks/useSidebarCounts";
import {
  ChevronUpDownIcon,
  ChevronUpIcon,
  LogoIcon,
  LogoText,
  PlusIcon,
  ThemesIcon,
} from "../utils/icons";
import { useState } from "react";
import { div } from "motion/react-client";
import Button from "../components/props/Button";
import Toggle from "../components/props/Toggle";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface ExpandedState {
  [key: string]: boolean;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();
  const counts = useSidebarCounts();

  // State to track which nav items are expanded
  const [expandedItems, setExpandedItems] = useState<ExpandedState>({});

  const groups = SidebarRoutes.reduce((acc, route) => {
    (acc[route.group] ||= []).push(route);
    return acc;
  }, {} as Record<"main" | "support", SidebarRoute[]>);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const toggleExpand = (
    routeName: string,
    routePath: string,
    children?: SidebarRouteChild[]
  ) => {
    setExpandedItems((prev) => ({
      ...prev,
      [routeName]: !prev[routeName],
    }));

    // If the item has children and is being expanded (not collapsed),
    // navigate to the first child route
    if (children && children.length > 0 && !expandedItems[routeName]) {
      navigate(children[0].path);
    }
  };

  const handleParentClick = (
    routePath: string,
    hasChildren: boolean,
    children?: SidebarRouteChild[],
    routeName?: string
  ) => {
    if (hasChildren && children && children.length > 0) {
      // Navigate to the first child when parent is clicked
      navigate(children[0].path);

      // Also expand if not already expanded
      if (routeName && !expandedItems[routeName]) {
        setExpandedItems((prev) => ({
          ...prev,
          [routeName]: true,
        }));
      }
    } else {
      // If no children, navigate to the parent route
      navigate(routePath);
    }
  };

  const sidebarVariants: Variants = {
    open: {
      width: "330px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      width: "104px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    open: {
      opacity: 1,
      display: "block",
      transition: {
        delay: 0.1,
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      display: "none",
      transition: {
        duration: 0.1,
      },
    },
  };

  const rotateVariants = {
    expanded: {
      rotate: 180,
      transition: { duration: 0.2 },
    },
    collapsed: {
      rotate: 0,
      transition: { duration: 0.2 },
    },
  };

  // Function to get count for a route
  const getCountForRoute = (routeName: string): number | null => {
    const countKey = routeName.toLowerCase().replace(/[^a-z]/g, "");
    return counts[countKey as keyof typeof counts] || null;
  };

  return (
    <motion.div
      className="fixed md:sticky top-0 h-screen bg-white flex flex-col shrink-0 z-70 py-[34px]"
      variants={sidebarVariants}
      initial="open"
      animate={isOpen ? "open" : "closed"}
    >
      {/* Logo */}
      <div className={`transition-all px-14 pb-8 flex items-center gap-2.5`}>
        <LogoIcon />
        {isOpen && <LogoText />}
      </div>

      <div className="w-full h-0.5 border-line opacity-25"></div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {Object.entries(groups).map(([key, routes]) => (
          <div key={key}>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.p
                  variants={textVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className={`uppercase leading-6 tracking-[0.4px] font-medium text-[11px] px-5 mb-2 whitespace-nowrap ${
                    key === "support" ? "mt-10" : ""
                  }`}
                >
                  {key === "support" ? (
                    <div className="w-full h-[0.5px] border-line opacity-25"></div>
                  ) : (
                    key
                  )}
                </motion.p>
              )}
              <div className="space-y-2">
                {routes.map((route) => {
                  const Icon = route.icon;
                  const count = route.count
                    ? getCountForRoute(route.name)
                    : null;
                  const isExpanded = expandedItems[route.name];
                  const hasChildren =
                    (route.children && route.children.length > 0) ?? false;

                  return (
                    <div key={route.path} className="space-y-1">
                      <div className="relative z-10">
                        <button
                          onClick={() =>
                            handleParentClick(
                              route.path,
                              hasChildren,
                              route.children,
                              route.name
                            )
                          }
                          className={`flex items-center space-x-3 px-5 py-4 rounded-xl transition-all duration-200 group font-inter text-sm font-medium w-full text-left cursor-pointer relative ${
                            // Check if either parent or any child is active
                            location.pathname === route.path ||
                            route.children?.some(
                              (child) => location.pathname === child.path
                            )
                              ? "bg-[#f2f2f2] text-primary"
                              : "text-[#24222099] bg-white hover:bg-[#f2f2f2] hover:text-primary"
                          }`}
                        >
                          <Icon
                            className={`transition-colors duration-200 ${
                              location.pathname === route.path ||
                              route.children?.some(
                                (child) => location.pathname === child.path
                              )
                                ? "text-primary"
                                : "text-[#24222099] group-hover:text-primary"
                            }`}
                          />
                          {isOpen && (
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
                                        (child) =>
                                          location.pathname === child.path
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
                        {hasChildren && (
                          <button
                            onClick={() =>
                              toggleExpand(
                                route.name,
                                route.path,
                                route.children
                              )
                            }
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
                        {hasChildren && isExpanded && isOpen && (
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
                                  key={child.path}
                                  to={child.path}
                                  className={({ isActive }) =>
                                    `flex w-fit items-center space-x-3 px-3.5 py-2 relative rounded-xl transition-all duration-200 text-xs ${
                                      isActive
                                        ? "bg-[#F2F2F2] text-primary"
                                        : "text-[#2422208F] hover:bg-[#f2f2f2]"
                                    }`
                                  }
                                >
                                  {({ isActive }) => (
                                    <>
                                      <span>{child.name}</span>
                                    </>
                                  )}
                                </SidebarLink>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* other sidebar settings */}
      <div className="px-4">
        {/* connect data */}
        <div className="px-2">
          <div className="border border-[#ff9000] bg-white/12 py-6 px-4 rounded-[28px] w-full grid place-items-center gap-y-5">
            <div>
              <h1 className="text-center font-semibold text-[#242220] leading-[156%] tracking-[1%]">
                Let's start!
              </h1>
              <p className="text-center max-w-44 mx-auto font-medium text-[13px] leading-[160%] text-[#2422208F]">
                Connecting a Data Sources cant be easier, let get you started
              </p>
            </div>

            <div className="w-fit">
              <Button
                lineHeight="leading-[130px]"
                paddingX="px-6"
                paddingY="py-[11px]"
                icon={<PlusIcon />}
                textSize="text-sm"
                shadow="shadow-button-light"
              >
                Connect Data
              </Button>
            </div>
          </div>
        </div>
        {/* themes */}
        <div className="flex items-center justify-between mt-6">
          {/* icon and text */}
          <div className="flex px-2 items-center gap-4 text-[#2422208F]">
            <div>
              <ThemesIcon />
            </div>

            <p className="text-sm font-medium leading-5 font-inter">Themes</p>
          </div>

          <div>
            <Toggle size="sm" />
          </div>
        </div>

        <div className="w-full h-0.5 border-line opacity-25 my-5"></div>

        {/* profile */}
        <div className="p-2 w-full flex items-center gap-6">
          <div className="flex items-center gap-2">
            {/* avatar */}
            <div className="relative w-10 aspect-square rounded-full p-0.5 bg-[linear-gradient(139.7deg,#FF9000_4.46%,#6344E7_55.5%,#FA4F19_106.54%)]">
              <div className="w-full h-full rounded-full bg-white overflow-hidden">
                <img
                  src={getImageSrc("avatar.png")}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>

            {/* name */}
            <div className="flex flex-col justify-between">
              {/* description */}
              <p className="text-xs leading-[100%] tracking-[2%] text-[#24222099]">
                Product Designer
              </p>

              <p className="text-xs leading-[100%] tracking-[2%] text-[#242220] pt-1">
                Andrew Smith
              </p>
            </div>
          </div>

          {/* icons */}
          <div className="flex flex-col justify-between">
            <button className="cursor-pointer text-[#24222099]">
              <ChevronUpDownIcon />
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-[#24222099]">
          2025 Sage Consolidated
        </p>
      </div>
    </motion.div>
  );
};

export default Sidebar;
