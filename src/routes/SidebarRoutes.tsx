import { lazy } from "react";
import type { SidebarRoute } from "../types/extra";
import {
  AutomationIcon,
  DashboardIcon,
  IncidentIcon,
  RulesIcon,
} from "../utils/icons";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Incidents = lazy(() => import("../pages/incident"));
const Rules = lazy(() => import("../pages/rules"));
const Automation = lazy(() => import("../pages/automation"));

// Import child components
const DetectionRuleLibrary = lazy(
  () => import("../pages/rules/detection-rule")
);
const RuleBuilderUI = lazy(() => import("../pages/rules/rule-builder"));
const AnomalyModels = lazy(() => import("../pages/rules/anomaly-models"));

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
    name: "Rules",
    path: "/rules",
    icon: RulesIcon,
    component: Rules, // This could be a layout or index page
    count: true,
    group: "main",
    children: [
      {
        name: "Detection Rule Library",
        path: "/rules/detection-rules-library",
        component: DetectionRuleLibrary,
      },
      {
        name: "Rule Builder UI",
        path: "/rules/rule-builder-ui",
        component: RuleBuilderUI,
      },
      {
        name: "Anomaly Models",
        path: "/rules/anomaly-models", // Fixed path - should be under /rules
        component: AnomalyModels,
      },
    ],
  },
  {
    name: "Automation",
    path: "/automation",
    icon: AutomationIcon,
    component: Automation,
    group: "support",
  },
];
