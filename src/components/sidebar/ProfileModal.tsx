// components/sidebar/ProfileModal.tsx
import { motion, AnimatePresence } from "motion/react";

import { useNavigate } from "react-router-dom";
import { backdropVariants, modalVariants } from "../../shared/sidebar/variants";
import { PROFILE_MENU_ITEMS } from "../../types/sidebar-types";

interface ProfileModalProps {
  isOpen: boolean;
  position: { top: number; left: number } | null;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, position, onClose }: ProfileModalProps) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (itemId: string) => {
    // Handle navigation or actions based on menu item
    switch (itemId) {
      case "profile":
        navigate("/profile");
        break;
      case "users":
        navigate("/settings/users");
        break;
      case "organization":
        navigate("/settings/organization");
        break;
      case "billing":
        navigate("/billing");
        break;
      default:
        break;
    }
    onClose();
  };

  if (!isOpen || !position) {
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
          onClick={onClose}
        />

        {/* Modal Tooltip */}
        <motion.div
          className="fixed z-100 bg-white rounded-2xl border border-white min-w-[166px] p-2 modal-shadow"
          style={{
            top: `${position.top - 190}px`, // Position below the chevron icon
            left: `${position.left + 20}px`, // Position to align with the right edge
          }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Content */}
          <div className="py-2">
            {PROFILE_MENU_ITEMS.map((item) => (
              <div key={item.id}>
                {item.divider ? (
                  <div className="w-full h-px bg-[#2422200F] my-2" />
                ) : (
                  <button
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`flex items-center w-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-[#f2f2f2] hover:text-primary cursor-pointer rounded-lg ${
                      location.pathname.includes(item.id)
                        ? "text-primary bg-[#f2f2f2]"
                        : "text-[#2422208F]"
                    }`}
                  >
                    {item.icon && (
                      <item.icon className="w-5 h-5 mr-3 text-[#24222099]" />
                    )}
                    <span className="whitespace-nowrap text-xs">
                      {item.label}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default ProfileModal;
