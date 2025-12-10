import { lazy } from "react";
import type { SidebarRoute } from "../types/extra";
import { AutomationIcon, DashboardIcon, IncidentIcon } from "../utils/icons";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Incidents = lazy(() => import("../pages/incident"));
const Automation = lazy(() => import("../pages/automation"));

export const SidebarRoutes: SidebarRoute[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    group: "main",
  },
  {
    name: "Incidents & Alerts",
    path: "/incidents-&-alerts",
    icon: IncidentIcon,
    component: Incidents,
    group: "main",
  },
  {
    name: "Automation",
    path: "/automation",
    icon: AutomationIcon,
    component: Automation,
    group: "support",
  },
];
