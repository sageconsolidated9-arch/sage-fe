import {
  ChevronRight1Icon,
  DisableIcon,
  EditIcon,
  MoreIcon,
  ResetIcon,
  Schedule2Icon,
  ToolsIcon,
} from "./icons";

export interface ReportLibrary {
  id: string;
  ReportName: string;
  Framework: string;
  Coverage: string;
  LastGenerated: string;
  Owner: string;
}

export const mockReportLibrary: ReportLibrary[] = [
  {
    id: "1",
    ReportName: "SOC 2 — Monthly Summary",
    Framework: "SOC 2",
    Coverage: "92%",
    LastGenerated: "Sep 20, 2025",
    Owner: "Compliance Team",
  },
  {
    id: "2",
    ReportName: "ISO 27001 Control Status",
    Framework: "ISO 27001",
    Coverage: "100%",
    LastGenerated: "Sep 18, 2025",
    Owner: "IT-Sec",
  },
  {
    id: "3",
    ReportName: "GDPR Data Access Audit",
    Framework: "GDPR",
    Coverage: "Pass",
    LastGenerated: "Sep 12, 2025",
    Owner: "DPO",
  },
  {
    id: "4",
    ReportName: "NIST Control Mapping",
    Framework: "NIST",
    Coverage: "84%",
    LastGenerated: "Aug 30, 2025",
    Owner: "Audit Team",
  },
  {
    id: "5",
    ReportName: "GDPR Data Access Audit",
    Framework: "GDPR",
    Coverage: "Pass",
    LastGenerated: "Sep 12, 2025",
    Owner: "DPO",
  },
  {
    id: "6",
    ReportName: "ISO 27001 Control Status",
    Framework: "ISO 27001",
    Coverage: "100%",
    LastGenerated: "Sep 18, 2025",
    Owner: "IT-Sec",
  },
  {
    id: "7",
    ReportName: "SOC 2 — Monthly Summary",
    Framework: "SOC 2",
    Coverage: "92%",
    LastGenerated: "Sep 20, 2025",
    Owner: "Compliance Team",
  },
  {
    id: "8",
    ReportName: "NIST Control Mapping",
    Framework: "NIST",
    Coverage: "84%",
    LastGenerated: "Aug 30, 2025",
    Owner: "Audit Team",
  },
];

/**
 * New Helper Component for Row Actions
 */
export const StatusActionIcon = ({
  Owner,
}: {
  status: ReportLibrary["Owner"];
}) => {
  switch (Owner) {
    case "Compliance Team":
      return <Schedule2Icon className="text-error w-5 h-5" />;
    case "Audit Team":
      return <EditIcon className="text-primary-hover w-5 h-5" />;

    default:
      return <ChevronRight1Icon className="text-text-primary w-4 h-4" />;
  }
};
