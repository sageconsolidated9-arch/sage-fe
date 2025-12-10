// components/SidebarLink.tsx
import { NavLink, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  to: string;
  children: (p: { isActive: boolean }) => ReactNode;
  className?: string | ((p: { isActive: boolean }) => string);
}

export const SidebarLink: React.FC<Props> = ({ to, children, className }) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(to); // ← match every sub-path
  const cls =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <NavLink to={to} className={cls} end={false}>
      {() => children({ isActive })}
    </NavLink>
  );
};
