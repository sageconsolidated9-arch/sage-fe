import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface SidebarRouteChild {
  name: string;
  path: string;
  component?: React.LazyExoticComponent<React.ComponentType<any>>;
}

export interface SidebarRoute {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  component?: React.LazyExoticComponent<React.ComponentType<any>>;
  count?: boolean;
  group: "main" | "support";
  children?: SidebarRouteChild[];
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: "primary" | "white";
  iconPosition?: "left" | "right";
  height?: string;
  paddingX?: string;
  paddingY?: string;
  shadow?: string;
  lineHeight?: string;
  textSize?: string;
  format?: string;
}

export interface ToggleButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}
