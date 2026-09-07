export interface OrganizationalSummary {
  id: string;
  BusinessUnit: string;
  Posture: string;
  OpenRisks: string;
  RecentIncidents: string;
  status?: "Secure" | "Watch" | "AtRisk";
}

export const mockOrganizationalSummary: OrganizationalSummary[] = [
  {
    id: "1",
    BusinessUnit: "Finance",
    Posture: "94%",
    OpenRisks: "4",
    RecentIncidents: "2",
    status: "Secure",
  },
  {
    id: "2",
    BusinessUnit: "IT & Cloud",
    Posture: "97%",
    OpenRisks: "6",
    RecentIncidents: "4",
    status: "Watch",
  },
  {
    id: "3",
    BusinessUnit: "HR",
    Posture: "95%",
    OpenRisks: "1",
    RecentIncidents: "0",
    status: "Secure",
  },
  {
    id: "4",
    BusinessUnit: "Sales",
    Posture: "81%",
    OpenRisks: "4",
    RecentIncidents: "3",
    status: "AtRisk",
  },
];

export const StatusBadge = ({
  status,
}: {
  status: OrganizationalSummary["status"];
}) => {
  const styles: Record<string, string> = {
    Secure: "bg-success text-default",
    Watch: "bg-warning text-default",
    AtRisk: "bg-error text-default",
  };

  return (
    <span className={`px-2 py-1 rounded-lg text-xs ${styles[status || "New"]}`}>
      {status}
    </span>
  );
};
