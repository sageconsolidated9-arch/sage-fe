import React, { useState, useRef, useEffect } from "react";
import {
  AiChatIcon,
  AngleDownIcon,
  ChevronDownIcon,
  NotificationIcon,
  SearchIcon,
  StarsIcon,
  WorldIcon,
} from "../utils/icons";
import Button from "../components/props/Button";
import WhatsNewModal from "../components/topbar/topbar-modals/WhatsNewModal";
import NotificationsModal from "../components/topbar/topbar-modals/NotificationModal";
import SearchModal from "../components/topbar/topbar-modals/SearchModal";
import AiTypeModal from "../components/topbar/topbar-modals/AiTypeModal";

interface SidebarProps {
  toggleSidebar: () => void;
}

const Topbar = ({ toggleSidebar }: SidebarProps) => {
  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiTypeOpen, setIsAiTypeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const whatsNewRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const aiTypeRef = useRef<HTMLButtonElement>(null);

  // Handle search input focus
  const handleSearchFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (searchContainerRef.current) {
      const rect = searchContainerRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 200, // Adjust based on modal width
      });
      setIsSearchOpen(true);
      setIsWhatsNewOpen(false);
      setIsNotificationsOpen(false);
      setIsAiTypeOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value && !isSearchOpen) {
      handleSearchFocus(e as any);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
    }
    if (e.key === "Enter" && searchQuery.trim()) {
      // Handle search submission
      console.log("Searching for:", searchQuery);
      setIsSearchOpen(false);
    }
  };

  const handleWhatsNewClick = () => {
    if (whatsNewRef.current) {
      const rect = whatsNewRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setIsWhatsNewOpen(!isWhatsNewOpen);
      setIsNotificationsOpen(false);
      setIsSearchOpen(false);
      setIsAiTypeOpen(false);
    }
  };

  const handleNotificationsClick = () => {
    if (notificationsRef.current) {
      const rect = notificationsRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setIsNotificationsOpen(!isNotificationsOpen);
      setIsWhatsNewOpen(false);
      setIsSearchOpen(false);
      setIsAiTypeOpen(false);
    }
  };

  const handleAiTypeClick = () => {
    if (aiTypeRef.current) {
      const rect = aiTypeRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setIsAiTypeOpen(!isAiTypeOpen);
      setIsNotificationsOpen(false);
      setIsWhatsNewOpen(false);
      setIsSearchOpen(false);
    }
  };

  const closeAllModals = () => {
    setIsWhatsNewOpen(false);
    setIsNotificationsOpen(false);
    setIsSearchOpen(false);
    setIsAiTypeOpen(false);
  };

  // Close search modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        isSearchOpen
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      <div className="sticky top-0 w-full py-3 px-6 h-[91px] flex items-center bg-[#F6F7FC] shadow-top-bar">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1 flex items-center gap-x-4">
            <div className="w-fit">
              <Button
                iconPosition="right"
                textSize="text-sm"
                paddingX="px-6"
                paddingY="py-[11px]"
                icon={<ChevronDownIcon />}
                format="capitalized"
              >
                Global View
              </Button>
            </div>
            <div ref={searchContainerRef} className="w-[40%] relative">
              <div className="px-4 bg-white border border-[#0300011F] rounded-xl search-shadow w-full flex items-center gap-2">
                <SearchIcon className="text-[#4A3F3C]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="flex-1 bg-transparent outline-none text-[#4A3F3C] py-3"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onKeyDown={handleSearchKeyDown}
                />
                {searchQuery && (
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            {/* What's New */}
            <div
              ref={whatsNewRef}
              className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleWhatsNewClick}
            >
              <StarsIcon className="text-primary" />
              <p className="leading-[100%] tracking-[2%] text-text-primary">
                What's new
              </p>
            </div>

            {/* World */}
            <button className="rounded-xl bg-[#4444440F] w-10 aspect-square grid place-items-center cursor-pointer hover:bg-[#4444441F] transition-colors">
              <WorldIcon className="text-[#1E1A19]" />
            </button>

            {/* Notification */}
            <button
              ref={notificationsRef}
              className="rounded-xl bg-[#4444440F] w-[66px] h-10 flex items-center justify-center gap-1 cursor-pointer hover:bg-[#4444441F] transition-colors"
              onClick={handleNotificationsClick}
            >
              <NotificationIcon className="text-[#1E1A19]" />
              <div className="min-w-[22px] h-[21px] rounded-lg grid place-items-center bg-primary text-white font-medium text-sm leading-[100%] tracking-[2%]">
                <p>12</p>
              </div>
            </button>

            {/* Divider */}
            <div className="w-px h-[17px] bg-[#DAD3CE]"></div>

            {/* AI Category */}
            <button
              ref={aiTypeRef}
              onClick={handleAiTypeClick}
              className="rounded-xl bg-[#4444440F] w-16 h-10 flex items-center justify-center gap-1 cursor-pointer hover:bg-[#4444441F] transition-colors"
            >
              <AiChatIcon className="text-[#1E1A19]" />
              <div className="w-px h-[11px] bg-[#DAD3CE]"></div>
              <AngleDownIcon className="text-[#1E1A19]" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <WhatsNewModal
        isOpen={isWhatsNewOpen}
        position={modalPosition}
        onClose={closeAllModals}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        position={modalPosition}
        onClose={closeAllModals}
      />

      <AiTypeModal
        isOpen={isAiTypeOpen}
        position={modalPosition}
        onClose={closeAllModals}
      />

      <SearchModal
        isOpen={isSearchOpen}
        position={modalPosition}
        onClose={closeAllModals}
        searchQuery={searchQuery}
      />
    </>
  );
};

export default Topbar;
