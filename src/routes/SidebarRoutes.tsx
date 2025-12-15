import { lazy } from "react";
import type { SidebarRoute } from "../types/extra";
import {
  AutomationIcon,
  DashboardIcon,
  HuntingIcon,
  IncidentIcon,
  IntegrationIcon,
  LogsIcon,
  NotebooksIcon,
  ReportingIcon,
  RulesIcon,
  ThreatIcon,
} from "../utils/icons";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Incidents = lazy(() => import("../pages/incident"));
const Automation = lazy(() => import("../pages/automation"));
const Notebooks = lazy(() => import("../pages/notebooks"));

// Import child components
const DetectionRuleLibrary = lazy(
  () => import("../pages/rules/detection-rule")
);
const RuleBuilderUI = lazy(() => import("../pages/rules/rule-builder"));
const AnomalyModels = lazy(() => import("../pages/rules/anomaly-models"));
const SecurityIntegrations = lazy(
  () => import("../pages/integration/security-integrations")
);
const IamIntegrations = lazy(
  () => import("../pages/integration/iam-integrations")
);
const CommunicationIntegration = lazy(
  () => import("../pages/integration/communication")
);
const ExportOptions = lazy(() => import("../pages/reporting/export-options"));
const ComplianceReport = lazy(
  () => import("../pages/reporting/compliance-report")
);
const ReportingDashboard = lazy(() => import("../pages/reporting/r-dashboard"));
const ParserTransformer = lazy(
  () => import("../pages/logs-data/parser-transformation")
);
const DataManagement = lazy(() => import("../pages/logs-data/data-management"));
const Ingestion = lazy(() => import("../pages/logs-data/ingestion"));

const Playbook = lazy(() => import("../pages/automation/playbooks"));
const PlaybookEditor = lazy(
  () => import("../pages/automation/playbook-editor")
);
const SageAi = lazy(() => import("../pages/automation/sage-ai"));
const AdvancedLogSearch = lazy(() => import("../pages/hunting/advanced-log"));
const AttackPathVisualizer = lazy(() => import("../pages/hunting/attack-path"));
const AiAssistedThreat = lazy(() => import("../pages/hunting/ai-assisted"));
const TiFeeds = lazy(() => import("../pages/threat-intelligence/ti-feeds"));
const EntityProfiles = lazy(
  () => import("../pages/threat-intelligence/entity-profiles")
);
const Indicators = lazy(
  () => import("../pages/threat-intelligence/indicators")
);

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
        path: "/rules/anomaly-models",
        component: AnomalyModels,
      },
    ],
  },
  {
    name: "Threat Intelligence",
    path: "/threat-intelligence",
    icon: ThreatIcon,
    group: "main",
    children: [
      {
        name: "TI Feeds",
        path: "/threat-intelligence/ti-feeds",
        component: TiFeeds,
      },
      {
        name: "Indicators (IoCs)",
        path: "/threat-intelligence/indicators",
        component: Indicators,
      },
      {
        name: "Anomaly Models",
        path: "/threat-intelligence/entity-profiles",
        component: EntityProfiles,
      },
    ],
  },
  {
    name: "Hunting",
    path: "/hunting",
    icon: HuntingIcon,
    group: "main",
    children: [
      {
        name: "Advanced Log Search",
        path: "/hunting/advanced-log-search",
        component: AdvancedLogSearch,
      },
      {
        name: "Attack Path Visualizer",
        path: "/hunting/attack-path-visualizer",
        component: AttackPathVisualizer,
      },
      {
        name: "AI-Assisted Threat Hunt",
        path: "/hunting/ai-assisted-threat-hunt",
        component: AiAssistedThreat,
      },
    ],
  },
  {
    name: "Automation",
    path: "/automation",
    icon: AutomationIcon,
    group: "support",
    children: [
      {
        name: "Playbook",
        path: "/automation/playbook",
        component: Playbook,
      },
      {
        name: "Playbook Editor",
        path: "/automation/playbook-editor",
        component: PlaybookEditor,
      },
      {
        name: "Sage AI",
        path: "/automation/sage-ai",
        component: SageAi,
      },
    ],
  },
  {
    name: "Logs & Data",
    path: "/logs-&-data",
    icon: LogsIcon,
    group: "support",
    children: [
      {
        name: "Ingestion",
        path: "/logs-&-data/ingestion",
        component: Ingestion,
      },
      {
        name: "Data Management",
        path: "/logs-&-data/data-management",
        component: DataManagement,
      },
      {
        name: "Parser & Transformation",
        path: "/logs-&-data/parser-&-transformation",
        component: ParserTransformer,
      },
    ],
  },

  {
    name: "Notebooks",
    path: "/notebooks",
    icon: NotebooksIcon,
    component: Notebooks,
    group: "support",
  },
  {
    name: "Reporting",
    path: "/reporting",
    icon: ReportingIcon,
    group: "support",
    children: [
      {
        name: "Dashboard",
        path: "/reporting/reporting-dashboard",
        component: ReportingDashboard,
      },
      {
        name: "Compliance Report",
        path: "/reporting/compliance-report",
        component: ComplianceReport,
      },
      {
        name: "Export Options",
        path: "/reporting/export-options", // Fixed path - should be under /rules
        component: ExportOptions,
      },
    ],
  },
  {
    name: "Integration",
    path: "/integration",
    icon: IntegrationIcon,
    group: "support",
    children: [
      {
        name: "Security Integrations",
        path: "/integration/security-integrations",
        component: SecurityIntegrations,
      },
      {
        name: "IAM Integrations",
        path: "/integration/iam-integrations",
        component: IamIntegrations,
      },
      {
        name: "Communication Integrations",
        path: "/integration/communication-integrations",
        component: CommunicationIntegration,
      },
    ],
  },
];
