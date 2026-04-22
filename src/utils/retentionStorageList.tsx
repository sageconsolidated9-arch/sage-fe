export interface SourceBasedRetention {
  id: string;
  Source: string;
  Retention: string;
  CostEst: string;
  Actions?: string;
  status?: "Hot" | "Warm" | "Cold";
}

export const mockSourceBasedRetention: SourceBasedRetention[] = [
  {
    id: "1",
    Source: "Azure AD",
    Retention: "90 days",
    CostEst: "$85/mo",
    Actions: "Edit",
    status: "Hot",
  },
  {
    id: "2",
    Source: "Firewall",
    Retention: "180 days",
    CostEst: "$41/mo",
    Actions: "Edit",
    status: "Warm",
  },
  {
    id: "3",
    Source: "EDR",
    Retention: "365 days",
    CostEst: "$22/mo",
    Actions: "Edit",
    status: "Cold",
  },
];

export const StatusBadge = ({
  status,
}: {
  status: SourceBasedRetention["status"];
}) => {
  const styles: Record<string, string> = {
    Cold: "bg-success text-default",
    Hot: "bg-error text-default",
    Warm: "bg-selection text-default",
  };

  return (
    <span className={`px-2 py-1 rounded-lg text-xs ${styles[status || "New"]}`}>
      {status}
    </span>
  );
};
