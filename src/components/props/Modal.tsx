import { type ReactNode, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { XIcon } from "../../utils/icons";

interface ModalContextProps {
  onClose: () => void;
}
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

// 2. Main Modal Wrapper
const Modal = ({
  isOpen,
  onClose,
  children,
  maxWidth = "550px",
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 400 },
    },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
  };

  return (
    <ModalContext.Provider value={{ onClose }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A202C]/15 backdrop-blur-xs p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          >
            <motion.div
              className="w-full bg-surface rounded-[18px] p-[30px] shadow-card flex flex-col overflow-hidden gap-y-6 mx-auto"
              style={{ maxWidth }}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

// 3. Subcomponents
const Header = ({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) => {
  const context = useContext(ModalContext);
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-2">
      {title ? (
        <h2 className="text-[20px] text-text-primary">{title}</h2>
      ) : (
        children
      )}
      <button
        onClick={context?.onClose}
        className="flex items-center gap-1 text-text-secondary hover:text-text-primary cursor-pointer"
      >
        Close <XIcon className="w-6 h-6 text-text-secondary" />
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
  <div className={` overflow-y-auto max-h-[50vh] ${className}`}>{children}</div>
);

const Footer = ({ children }: { children: ReactNode }) => (
  <div className=" flex items-center gap-3">{children}</div>
);

// 4. Attach Subcomponents to Modal object
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
