import type { Variants } from "motion/react";

export const sidebarVariants: Variants = {
  open: { width: "330px", transition: { duration: 0.3, ease: "easeInOut" } },
  closed: { width: "104px", transition: { duration: 0.3, ease: "easeInOut" } },
};

export const textVariants = {
  open: {
    opacity: 1,
    display: "block",
    transition: { delay: 0.1, duration: 0.2 },
  },
  closed: { opacity: 0, display: "none", transition: { duration: 0.1 } },
};

export const rotateVariants = {
  expanded: { rotate: 180, transition: { duration: 0.2 } },
  collapsed: { rotate: 0, transition: { duration: 0.2 } },
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -10 },
};

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
