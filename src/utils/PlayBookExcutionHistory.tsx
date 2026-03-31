export interface ExecutionHistory {
  id: string;
  DateTime: string;
  ExecutionID: string;
  Statuss?: "Success" | "Partial";
  Result?: string;
}

export const mockExecutionHistory: ExecutionHistory[] = [
  {
    id: "1",
    DateTime: "Aug 14, 2025 11:20",
    ExecutionID: "EXE-3920",
    Statuss: "Success",
    Result: "2 accounts locked	",
  },
  {
    id: "2",
    DateTime: "Aug 12, 2025 14:02",
    ExecutionID: "EXE-3914",
    Statuss: "Partial",
    Result: "Contained on 3/5 endpoints",
  },
];

export const StatusBadges = ({
  Statuss,
}: {
  Statuss: ExecutionHistory["Statuss"];
}) => {
  const styles: Record<string, string> = {
    Success: "bg-success text-default",
    Partial: "bg-warning text-surface",
  };

  return (
    <span
      className={`px-2 py-1 rounded-lg text-xs ${styles[Statuss || "New"]}`}
    >
      {Statuss}
    </span>
  );
};
