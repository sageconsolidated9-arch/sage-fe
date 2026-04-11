export interface Parser {
  id: string;
  name: string;
  dataSource: string;
  events: string;
  errorRate: string;
  lastUpdated?: string;
  owner?: string;
  status?: "Active" | "Warning" | "Error";
}

export const mockParser: Parser[] = [
  {
    id: "1",
    name: "CiscoVPN Regex",
    dataSource: "Network",
    status: "Active",
    events: "12.4K",
    errorRate: "0.2%",
    owner: "SecOps Team",
    lastUpdated: "Sep 20, 2025",
  },
  {
    id: "2",
    name: "Custom Web Proxy",
    dataSource: "Proxy/HTTP",
    status: "Warning",
    events: "8.2K",
    errorRate: "5.1%",
    owner: "NetOps",
    lastUpdated: "Sep 18, 2025",
  },
  {
    id: "3",
    name: "Legacy App Logs",
    dataSource: "Application",
    status: "Error",
    events: "0",
    errorRate: "100%",
    owner: "DevOps",
    lastUpdated: "Sep 18, 2025",
  },
];

export const StatusBadge = ({ status }: { status: Parser["status"] }) => {
  const styles: Record<string, string> = {
    Active: "bg-success text-default",
    Warning: "bg-warning text-default",
    Error: "bg-error text-default",
  };

  return (
    <span className={`px-2 py-1 rounded-lg text-xs ${styles[status || "New"]}`}>
      {status}
    </span>
  );
};
