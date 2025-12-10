import { useNavigate } from "react-router-dom";
import { SidebarRoutes } from "../routes/SidebarRoutes";
import { useAuth } from "../store/auth";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { getImageSrc } from "../utils/imageUtils";
import type { SidebarRoute } from "../types/extra";
import { SidebarLink } from "../hooks/SidebarLinks";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();

  const groups = SidebarRoutes.reduce((acc, route) => {
    (acc[route.group] ||= []).push(route);
    return acc;
  }, {} as Record<"main" | "support", SidebarRoute[]>);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const sidebarVariants: Variants = {
    // sidebar open
    open: {
      width: "330px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },

    //sidebar closed
    closed: {
      width: "104px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    // sidebar open
    open: {
      opacity: 1,
      display: "block",
      transition: {
        delay: 0.1,
        duration: 0.2,
      },
    },

    //sidebar closed
    closed: {
      opacity: 0,
      display: "none",
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="fixed md:sticky top-0 side-shadow h-screen bg-white flex flex-col shrink-0 z-70"
      variants={sidebarVariants}
      initial="open"
      animate={isOpen ? "open" : "closed"}
    >
      {/* Logo */}
      <div className={`transition-all px-6 py-8`}>
        <img src={getImageSrc("logo.svg")} alt="Renimail Logo" loading="lazy" />
      </div>

      {/* Navigation Links */}

      <nav className="flex-1 p-6 space-y-2">
        {Object.entries(groups).map(([key, routes]) => (
          <div key={key}>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.p
                  variants={textVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className={`uppercase leading-[100%] font-bold px-3 mb-2 whitespace-nowrap ${
                    key === "support" ? "mt-7" : ""
                  }`}
                >
                  {key}
                </motion.p>
              )}
              <div className="space-y-2">
                {routes.map((route) => {
                  const Icon = route.icon;

                  return (
                    <SidebarLink
                      key={route.path}
                      to={route.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? "border border-border-focus bg-primary-50 text-primary-900"
                            : "text-text-tertiary hover:bg-primary-50 hover:text-primary-900 border border-white hover:border-border-focus"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            className={`w-5 h-5 transition-colors duration-200 ${
                              isActive
                                ? "text-primary-900"
                                : "text-text-tertiary group-hover:text-primary-900"
                            }`}
                          />
                          {/* <AnimatePresence mode="wait"> */}
                          {isOpen && (
                            <motion.span
                              variants={textVariants}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              className="flex-1 font-normal flex items-center justify-between whitespace-nowrap"
                            >
                              {route.name}
                              <span className="">expand icon</span>
                            </motion.span>
                          )}
                          {/* </AnimatePresence> */}
                        </>
                      )}
                    </SidebarLink>
                  );
                })}
              </div>
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-6"></div>
    </motion.div>
  );
};

export default Sidebar;
