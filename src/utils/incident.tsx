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
  const colors = [
    "bg-blue-200",
    "bg-orange-400",
    "bg-orange-600",
    "bg-red-600",
  ];
  const activeColor = colors[level - 1];

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`w-3 h-2 rounded-sm ${step <= level ? activeColor : "bg-gray-200"}`}
        />
      ))}
    </div>
  );
};

export const StatusBadge = ({ status }: { status: Incident["status"] }) => {
  const styles: Record<string, string> = {
    New: "bg-green-100 text-green-700 border-green-200",
    Investigating: "bg-blue-100 text-blue-700 border-blue-200",
    "Running Playbook": "bg-purple-100 text-purple-700 border-purple-200",
    Contained: "bg-gray-100 text-gray-700 border-gray-200",
    "Needs Review": "bg-orange-100 text-orange-700 border-orange-200",
    "Pending Approval": "bg-red-100 text-red-700 border-red-200",
    Dismissed: "bg-zinc-700 text-white border-zinc-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-medium border ${styles[status || "New"]}`}
    >
      {status}
    </span>
  );
};
