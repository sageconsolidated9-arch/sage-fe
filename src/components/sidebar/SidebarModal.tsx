// components/sidebar/SidebarModal.tsx
import { motion, AnimatePresence } from "motion/react";
import type { SidebarRoute } from "../../types/extra";
import type { NavigateFunction } from "react-router-dom";
import type { RefObject } from "react";
import { backdropVariants, modalVariants } from "../../shared/sidebar/variants";

interface SidebarModalProps {
  modalState: {
    isOpen: boolean;
    route: SidebarRoute | null;
    position: { top: number; left: number } | null;
  };
  onCloseModal: () => void;
  navigate: NavigateFunction;
  buttonRefs: RefObject<{ [key: string]: HTMLButtonElement | null }>;
}

const SidebarModal = ({
  modalState,
  onCloseModal,
  navigate,
}: SidebarModalProps) => {
  const handleChildClickFromModal = (childPath: string) => {
    navigate(childPath);
    onCloseModal();
  };

  if (!modalState.isOpen || !modalState.route || !modalState.position) {
    return null;
  }

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-transparent z-80"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onCloseModal}
        />

        {/* Modal Tooltip */}
        <motion.div
          className="fixed z-90 bg-white rounded-2xl border border-white min-w-[166px] p-4 modal-shadow"
          style={{
            top: `${modalState.position.top}px`,
            left: `${modalState.position.left}px`,
          }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#2422200F]">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-lg bg-[#f2f2f2]">
                <modalState.route.icon className="text-primary" />
              </div>
              <h3 className="font-medium text-base text-[#2422208F]">
                {modalState.route.name}
              </h3>
            </div>
          </div>

          {/* Children List */}
          <div className="py-3">
            {modalState.route.children?.map((child) => (
              <button
                key={child.path}
                onClick={() => handleChildClickFromModal(child.path)}
                className={`flex items-center w-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-[#f2f2f2] hover:text-primary cursor-pointer rounded-xl ${
                  location.pathname === child.path
                    ? "text-primary bg-[#f2f2f2]"
                    : "text-[#24222099]"
                }`}
              >
                <span className="whitespace-nowrap">{child.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default SidebarModal;
