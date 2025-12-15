// layouts/DashboardLayout.tsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../shared/Topbar";
import { useSidebarStore } from "../store/sidebarStore";
import Sidebar from "../shared/Sidebar";

const DashboardLayout = () => {
  const { isSidebarOpen, setIsMobile, toggleSidebar } = useSidebarStore();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [setIsMobile]);

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <Sidebar />
      <main className="flex-1 overflow-auto custom-scrollbar">
        <div className="flex flex-col">
          <div className="sticky top-0 z-50">
            <Topbar toggleSidebar={toggleSidebar} />
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
