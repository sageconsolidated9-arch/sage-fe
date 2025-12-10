export interface SidebarRoute {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  group: "main" | "support";
}
