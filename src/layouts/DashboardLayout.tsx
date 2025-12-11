import React, { useEffect, useState } from "react";
import Sidebar from "../shared/Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "../shared/Topbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const isOpen = isMobile ? false : isSidebarOpen;
  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 overflow-auto">
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
