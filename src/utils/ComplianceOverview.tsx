export interface ComplianceOverview {
  id: string;
  Standard: string;
  Details: string;
  status?: "Compliant" | "PartiallyCompliant" | "InProgress";
}

export const mockComplianceOverview: ComplianceOverview[] = [
  {
    id: "1",
    Standard: "SOC 2",
    Details: "4 controls need attention.",
    status: "PartiallyCompliant",
  },
  {
    id: "2",
    Standard: "ISO 27001",
    Details: "All mandatory controls satisfied.",
    status: "Compliant",
  },
  {
    id: "3",
    Standard: "NIST 800-53",
    Details: "Policy alignment ongoing.",
    status: "InProgress",
  },
  {
    id: "4",
    Standard: "GDPR",
    Details: "No data exposure events detected.",
    status: "Compliant",
  },
];

export const StatusBadge = ({
  status,
}: {
  status: ComplianceOverview["status"];
}) => {
  const styles: Record<string, string> = {
    Compliant: "bg-success text-default",
    PartiallyCompliant: "bg-warning text-default",
    InProgress: "bg-error text-default",
  };

  return (
    <span className={`px-2 py-1 rounded-lg text-xs ${styles[status || "New"]}`}>
      {status}
    </span>
  );
};
