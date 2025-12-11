export interface SidebarRouteChild {
  name: string;
  path: string;
  component?: React.LazyExoticComponent<React.ComponentType<any>>;
}

export interface SidebarRoute {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  count?: boolean;
  group: "main" | "support";
  children?: SidebarRouteChild[];
}
