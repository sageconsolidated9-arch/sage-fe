import { useRef } from "react";
import { useSidebarStore } from "../../store/sidebarStore";
import Button from "../../components/props/Button";
import { ChevronUpDownIcon, PlusIcon, ThemesIcon } from "../../utils/icons";
import Toggle from "../../components/props/Toggle";
import { getImageSrc } from "../../utils/imageUtils";
import ProfileModal from "./ProfileModal";

const OtherSettings = () => {
  const {
    isSidebarOpen,
    profileModalState,
    toggleProfileModal,
    closeProfileModal,
  } = useSidebarStore();
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const handleProfileIconClick = () => {
    if (profileButtonRef.current) {
      const rect = profileButtonRef.current.getBoundingClientRect();

      // Calculate position based on sidebar state
      const modalPosition = {
        top: rect.bottom + window.scrollY, // Position below the profile button
        left: isSidebarOpen
          ? rect.right + window.scrollX
          : rect.left + window.scrollX,
      };

      toggleProfileModal(modalPosition);
    }
  };

  return (
    <div className="">
      {/* Connect Data Section */}
      {isSidebarOpen ? (
        <div className="">
          <div className="border border-[#2422208F] bg-white/12 py-6 px-4 rounded-[28px] w-[246px] mx-auto grid place-items-center gap-y-5">
            <div>
              <h1 className="text-center font-semibold text-[#242220] leading-[156%] tracking-[1%] whitespace-nowrap">
                Let's start!
              </h1>
              <p className="text-center w-44 mx-auto font-medium text-[13px] leading-[160%] text-[#2422208F]">
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
      ) : (
        <div className="px-2">
          <div className="w-full flex items-center justify-center">
            <div className="w-fit">
              <Button
                paddingX="px-4"
                paddingY="py-2"
                textSize="text-sm"
                shadow="shadow-button-light"
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Themes Section */}
      <div className="flex items-center justify-between mt-6">
        {/* Icon and Text */}
        {isSidebarOpen && (
          <div className="flex px-2 items-center gap-4 text-[#2422208F]">
            <div>
              <ThemesIcon />
            </div>
            <p className="text-sm font-medium leading-5 font-inter">Themes</p>
          </div>
        )}

        <div
          className={`${
            isSidebarOpen ? "" : "w-full flex items-center justify-center"
          }`}
        >
          <Toggle size="sm" />
        </div>
      </div>

      <div className="w-full h-0.5 border-line opacity-25 my-5"></div>

      {/* Profile Section */}
      <button
        className="p-2 w-full flex items-center gap-6 justify-between cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
        onClick={handleProfileIconClick}
        ref={profileButtonRef}
      >
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="relative w-10 aspect-square rounded-full p-0.5 bg-[linear-gradient(139.7deg,#FF9000_4.46%,#6344E7_55.5%,#FA4F19_106.54%)]">
            <div className="w-full h-full rounded-full bg-white overflow-hidden">
              <img
                src={getImageSrc("avatar.png")}
                className="w-full h-full object-cover"
                alt="User avatar"
              />
            </div>
          </div>

          {/* Name and Role */}
          {isSidebarOpen && (
            <div className="flex flex-col justify-between">
              <p className="text-xs leading-[100%] tracking-[2%] text-[#24222099]">
                Product Designer
              </p>
              <p className="text-xs leading-[100%] tracking-[2%] text-[#242220] pt-1">
                Andrew Smith
              </p>
            </div>
          )}
        </div>

        {/* Chevron Icon - Always show when sidebar is open, show a different icon when collapsed */}
        {isSidebarOpen ? (
          <div className="flex flex-col justify-between">
            <div
              className="cursor-pointer text-[#24222099] hover:text-primary transition-colors"
              aria-label="Open profile menu"
            >
              <ChevronUpDownIcon />
            </div>
          </div>
        ) : (
          // Show a simpler indicator when sidebar is collapsed
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          </div>
        )}
      </button>

      {/* Copyright */}
      {isSidebarOpen && (
        <p className="text-center text-sm text-[#24222099]">
          2025 Sage Consolidated
        </p>
      )}

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileModalState.isOpen}
        position={profileModalState.position}
        onClose={closeProfileModal}
      />
    </div>
  );
};

export default OtherSettings;
