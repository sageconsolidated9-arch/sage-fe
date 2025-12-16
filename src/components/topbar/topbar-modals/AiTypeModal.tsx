// components/modals/AiTypeModal.tsx
import { motion, AnimatePresence } from "motion/react";
import { StarsIcon, XIcon } from "../../../utils/icons";
import { useNavigate } from "react-router-dom";
import { AI_ITEMS } from "../../../types/sidebar-types";

interface AiTypeModalProps {
  isOpen: boolean;
  position: { top: number; left: number } | null;
  onClose: () => void;
}

const AiTypeModal = ({ isOpen, position, onClose }: AiTypeModalProps) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (itemId: string) => {
    // Handle navigation or actions based on menu item
    switch (itemId) {
      case "explainer":
        navigate("/ai/explainer-ai");
        break;
      case "sage":
        navigate("/ai/sage-ai");
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="fixed z-100 bg-white rounded-2xl border border-gray-200 shadow-top-search w-[130px] max-h-[88px] overflow-y-auto px-1"
          style={{
            top: `${position.top + 10}px`,
            left: `${position.left - 70}px`,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-2">
            {AI_ITEMS.map((item) => (
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

export default AiTypeModal;
