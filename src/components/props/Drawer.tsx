import { type ReactNode, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { XIcon } from "../../utils/icons";

interface DrawerContextProps {
  onClose: () => void;
}
const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  position?: "right" | "left";
}

const Drawer = ({
  isOpen,
  onClose,
  children,
  width = "560px",
  position = "right",
}: DrawerProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Slide from right or left
  const drawerVariants: Variants = {
    hidden: {
      x: position === "right" ? "100%" : "-100%",
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.8,
      },
    },
    exit: {
      x: position === "right" ? "100%" : "-100%",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <DrawerContext.Provider value={{ onClose }}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 z-10 bg-[#1A202C]/25 backdrop-blur-sm"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={onClose}
            />

            {/* Drawer Panel */}
            <motion.div
              className={`absolute top-0 bottom-0 z-50 bg-surface shadow-2xl flex flex-col ${
                position === "right" ? "right-0" : "left-0"
              }`}
              style={{ width, maxWidth: "100%" }}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DrawerContext.Provider>
  );
};

// Subcomponents
const Header = ({
  title,
  children,
  showBorder = true,
}: {
  title?: string;
  children?: ReactNode;
  showBorder?: boolean;
}) => {
  const context = useContext(DrawerContext);
  return (
    <div
      className={`flex items-center justify-between px-8 py-6 ${
        showBorder ? "border-b border-gray-100" : ""
      }`}
    >
      {title ? (
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      ) : (
        <div className="flex-1">{children}</div>
      )}
      <button
        onClick={context?.onClose}
        className="ml-4 flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
      >
        <span>Close</span>
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

const Body = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`flex-1 overflow-y-auto px-8 py-6 ${className}`}>
    {children}
  </div>
);

const Footer = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`border-t border-gray-100 px-8 py-6 flex items-center justify-end gap-3 ${className}`}
  >
    {children}
  </div>
);

// Attach Subcomponents
Drawer.Header = Header;
Drawer.Body = Body;
Drawer.Footer = Footer;

export default Drawer;
