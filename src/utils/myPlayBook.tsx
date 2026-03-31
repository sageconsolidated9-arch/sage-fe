export interface MyPlayBook {
  id: string;
  name: string;
  triggers: string;
  lastRun?: string;
  rules?: string;
  status?: "Active" | "Inactive";
}

export const mockPlayBook: MyPlayBook[] = [
  {
    id: "1",
    name: "Suspicious Login Response",
    triggers: "Alert: Failed Logins",
    lastRun: "Sep 12, 09:42",
    rules: "3 Rules",
    status: "Active",
  },
  {
    id: "2",
    name: "Ransomware Containment",
    triggers: "Rule: Suspicious File",
    lastRun: "Sep 12, 09:42",
    rules: "5 Rules",
    status: "Inactive",
  },
  {
    id: "3",
    name: "Phishing Email Quarantine",
    triggers: "Rule: Suspicious File",
    lastRun: "Sep 11, 22:15",
    rules: "5 Rules",
    status: "Active",
  },
  {
    id: "4",
    name: "Isolate Endpoint",
    triggers: "Hunt: PowerShell Abuse",
    lastRun: "Sep 10, 14:33",
    rules: "2 Rules",
    status: "Active",
  },
];

export const StatusBadge = ({ status }: { status: MyPlayBook["status"] }) => {
  const styles: Record<string, string> = {
    Active: "bg-success text-white",
    Inactive: "bg-border text-text-primary",
  };

  return (
    <span className={`px-2 py-1 rounded-lg text-xs ${styles[status || "New"]}`}>
      {status}
    </span>
  );
};
