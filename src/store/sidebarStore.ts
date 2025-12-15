// store/sidebarStore.ts
import { create } from "zustand";
import type { SidebarRoute } from "../types/extra";

interface SidebarStore {
  isSidebarOpen: boolean;
  isMobile: boolean;
  expandedItems: Record<string, boolean>;
  modalState: {
    isOpen: boolean;
    route: SidebarRoute | null;
    position: { top: number; left: number } | null;
  };
  profileModalState: {
    isOpen: boolean;
    position: { top: number; left: number } | null;
  };
  toggleSidebar: () => void;
  setIsMobile: (isMobile: boolean) => void;
  setExpandedItems: (items: Record<string, boolean>) => void;
  toggleExpandItem: (routeName: string) => void;
  setModalState: (modalState: SidebarStore["modalState"]) => void;
  closeModal: () => void;
  setProfileModalState: (state: SidebarStore["profileModalState"]) => void;
  toggleProfileModal: (position?: { top: number; left: number }) => void;
  closeProfileModal: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: true,
  isMobile: false,
  expandedItems: {},
  modalState: {
    isOpen: false,
    route: null,
    position: null,
  },
  profileModalState: {
    isOpen: false,
    position: null,
  },

  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),

  setIsMobile: (isMobile) => set({ isMobile }),

  setExpandedItems: (items) => set({ expandedItems: items }),

  toggleExpandItem: (routeName) =>
    set((state) => ({
      expandedItems: {
        ...state.expandedItems,
        [routeName]: !state.expandedItems[routeName],
      },
    })),

  setModalState: (modalState) => set({ modalState }),

  closeModal: () =>
    set({
      modalState: { isOpen: false, route: null, position: null },
    }),

  setProfileModalState: (profileModalState) => set({ profileModalState }),

  toggleProfileModal: (position) =>
    set((state) => ({
      profileModalState: {
        isOpen: !state.profileModalState.isOpen,
        position: position || state.profileModalState.position,
      },
    })),

  closeProfileModal: () =>
    set({
      profileModalState: { isOpen: false, position: null },
    }),
}));
