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
  width?: string;
  paddingX?: string;
  paddingY?: string;
  shadow?: string;
  lineHeight?: string;
  textSize?: string;
  format?: string;
  font?: string;
}

export interface InputProps {
  type: "text" | "email" | "password" | "time";
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  name: string;
  search?: boolean;
  width?: string;
  reset?: boolean;
  approved?: boolean | "";
  disabled?: boolean;
  error?: boolean | "";
  searchPosition?: "left" | "right";
  maxLength?: number;
  height?: string;
}

export interface RadioButtonProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  desc?: string;
}

export interface ToggleButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}
