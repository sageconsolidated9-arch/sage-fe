export type SeverityLevel = 1 | 2 | 3 | 4;

export interface Incident {
  id: string;
  name: string;
  source: string;
  severity: SeverityLevel;
  timeDetected?: string;
  resolutionTime?: string;
  status?:
    | "New"
    | "Investigating"
    | "Running Playbook"
    | "Contained"
    | "Needs Review"
    | "Pending Approval"
    | "Dismissed";
}

export const mockIncidents: Incident[] = [
  {
    id: "1",
    name: "Suspicious Login from Unusual Location",
    source: "IDS Alert",
    severity: 1,
    timeDetected: "2 minutes ago",
    resolutionTime: "2 minutes ago",
    status: "New",
  },
  {
    id: "2",
    name: "Malicious Macro Doc",
    source: "IDS Alert",
    severity: 2,
    timeDetected: "14 minutes ago",
    status: "Running Playbook",
  },
  {
    id: "3",
    name: "Large outbound data transfer detected...",
    source: "IDS Alert",
    severity: 4,
    timeDetected: "Aug 13, 2025 08:05 am",
    resolutionTime: "Aug 13, 2025 08:05 am",
    status: "Investigating",
  },
  {
    id: "4",
    name: "Social Engineering Attempt",
    source: "192.172.1.2",
    severity: 2,
    timeDetected: "Aug 4, 2025 12:14 am",
    resolutionTime: "Aug 4, 2025 12:14 am",
    status: "Contained",
  },
  {
    id: "5",
    name: "Scanning IP Ranges",
    source: "192.172.1.2",
    severity: 4,
    timeDetected: "Aug 4, 2025 12:14 am",
    status: "Pending Approval",
  },
  {
    id: "6",
    name: "Ransomware",
    source: "C://Downloads/file.exe",
    severity: 2,
    timeDetected: "Aug 4, 2025 12:14 am",
    status: "Dismissed",
  },
];

export const SeverityIndicator = ({ level }: { level: SeverityLevel }) => {
  const colors = ["bg-info", "bg-warning", "bg-error", "bg-primary-hover"];
  const activeColor = colors[level - 1];

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`w-[9px] h-[9px] rounded-xs ${step <= level ? activeColor : "bg-border"}`}
        />
      ))}
    </div>
  );
};

export const StatusBadge = ({ status }: { status: Incident["status"] }) => {
  const styles: Record<string, string> = {
    New: "bg-success text-text-primary",
    Investigating: "bg-info text-text-primary",
    "Running Playbook": "bg-[#7265FF] text-text-primary",
    Contained: "bg-border text-text-primary",
    "Needs Review": "bg-warning text-white",
    "Pending Approval": "bg-error text-text-primary",
    Dismissed: "bg-text-secondary text-white",
  };

  return (
    <span className={`px-2 py-1 rounded-lg text-xs ${styles[status || "New"]}`}>
      {status}
    </span>
  );
};
