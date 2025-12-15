import type { SidebarRoute, SidebarRouteChild } from "./extra";

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export interface ExpandedState {
  [key: string]: boolean;
}

export interface ModalState {
  isOpen: boolean;
  route: SidebarRoute | null;
  position: { top: number; left: number } | null;
}

export interface SidebarLogicReturn {
  logout: () => void;
  navigate: any;
  counts: any;
  buttonRefs: React.RefObject<{ [key: string]: HTMLButtonElement | null }>;
  expandedItems: ExpandedState;
  modalState: ModalState;
  groups: Record<"main" | "support", SidebarRoute[]>;
  toggleExpand: (
    routeName: string,
    routePath: string,
    children?: SidebarRouteChild[]
  ) => void;
  handleParentClick: (
    route: SidebarRoute,
    routePath: string,
    hasChildren: boolean,
    children?: SidebarRouteChild[],
    routeName?: string
  ) => void;
  handleChildClickFromModal: (childPath: string) => void;
  closeModal: () => void;
  getCountForRoute: (routeName: string) => number | null;
}

// types/profile.ts
export interface ProfileMenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  path?: string;
  onClick?: () => void;
  divider?: boolean;
}

export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  { id: "billing", label: "Billing & Usage" },
  { id: "users", label: "Users & Roles" },
  { id: "organization", label: "Organization Settings" },
  { id: "profile", label: "Profile Settings" },
];
